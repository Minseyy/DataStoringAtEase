import { google } from "googleapis"
import path from "path"

const auth = new google.auth.GoogleAuth({
  keyFile: path.join(__dirname, "../../spreadsheet-manager-app-2fb04f8b3cf0.json"),
  scopes: ["https://www.googleapis.com/auth/spreadsheets"],
})

export const sheetsClient = google.sheets({
  version: "v4",
  auth,
})