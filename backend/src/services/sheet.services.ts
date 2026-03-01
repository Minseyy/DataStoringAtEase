import { google } from 'googleapis';
import prisma from '../lib/prismaClient';

export const getGoogleClient = async (userId: number) => {
  const user = await prisma.user.findUnique({
    where: { id: userId },
  });

  if (!user || !user.googleAccessToken) {
    throw new Error('User not authenticated with Google');
  }

  const oauth2Client = new google.auth.OAuth2(
    process.env.GOOGLE_CLIENT_ID,
    process.env.GOOGLE_CLIENT_SECRET
 );

 oauth2Client.setCredentials({
    access_token: user.googleAccessToken,
    refresh_token: user.googleRefreshToken,
    expiry_date: user.googleExpiryDate ? Number(user.googleExpiryDate) : undefined,
  });
    return oauth2Client;
};

export const importSheet = async (userId: number, sheetId: string) => {
  const auth = await getGoogleClient(userId);
  const sheets = google.sheets({ version: 'v4', auth });
  const response = await sheets.spreadsheets.values.get({
    spreadsheetId: sheetId,
    range: 'Sheet1!A1:Z1000',
  });

  const values = response.data.values
  if (!values || values.length === 0) {
    throw new Error('Sheet is empty');
  }

  const headers = values[0];
  // transforms rows from JSON to array of objects with keys <- header name and value
  const rows = values.slice(1).map((row, index) => {
    const rowData: { [key: string]: string | null } = {};
    headers.forEach((header, colIndex) => {
        rowData[header] = row[colIndex] ?? null;
    });
    // + 2 because we skip the header, recall that row numbers in sheets start at 1, so the first data row is actually row 2
    return {rowIndex: index + 2, data: rowData};
  });

  // create sheet record in db
  const sheet = await prisma.sheet.create({
    data: {
      sheetName: `imported Sheet ${sheetId} at ${new Date().toISOString()}`,
      sourceType: 'google',
      sourceRef: sheetId,
      userId: userId,
      lastSyncedAt: new Date(),
    },
  })

    // Insert all rows in a specific "sheet" <- linked by sheetId
    await prisma.row.createMany({
        data: rows.map(row => ({
          sheetId: sheet.id,  // refers to the sheet id from prev recorded sheet
          rowIndex: row.rowIndex,  // no of row in sheet (data starts at 2)
          data: row.data,    // value in the row with key as header name and value as cell value
        }))
    });
  
  return sheet;
}

// Push data from db to google sheet(sync)
export const pushToGoogleSheet = async (sheetId: number) => {
    const sheet = await prisma.sheet.findUnique({
        where: { id: sheetId },
        include: { rows: true }, // Has data/rows
    })

    if (!sheet) throw new Error ("Sheet not found");
    if (sheet.sourceType !== 'google') throw new Error ("Sheet is not linked to Google Sheets");
    if (!sheet.sourceRef) throw new Error ("Google Sheet ID missing");


    const auth = await getGoogleClient(sheet.userId);
    const sheetsApi = google.sheets({ version: 'v4', auth });

    if(sheet.rows.length === 0) return; // No data to push

    const header = Object.keys(sheet.rows[0].data as any); // Get header from first row's data keys

    const values = [
        header, // First row is header
        ...sheet.rows.map(row => header.map(h => (row.data as any)[h] ?? '')) // Map each row's data to the order of header, fill empty if no value
    ]

    if 

    await sheetsApi.spreadsheets.values.update({
        spreadsheetId: sheet.sourceRef, // Google Sheet ID stored in sourceRef
        range: 'Sheet1!A1', // Starting cell to update
        valueInputOption: 'RAW', // Use RAW to input data as-is without parsing
        requestBody: {
            values,
        },
    });
}
