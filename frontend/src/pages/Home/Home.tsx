import { useState } from "react"
import SheetsButton from "../../components/SheetsButton/SheetsButton"

export default function Home() {
  const sheets = ["Sheet 1", "Sheet 2", "Sheet 3", "Sheet 4", "Sheet 5"]
    // openSheet stores name of current selected/opened sheet: null if none selected 
    // initial is none 
    // setOpenSheet toggles open/close state of a sheet: if same sheet clicked, close it (set to null); if different sheet clicked, open it (set to that sheet name) 
    // null closes the options 
    // Lifting state up
  const [openSheet, setOpenSheet] = useState<string | null>(null)

  const handleSheetClick = (sheetName: string) => {
    setOpenSheet(prev => (prev === sheetName ? null : sheetName))
  }

  return (
    <>
      <h2 className='text-muted fs-5'>
        Select the sheet to update:
      </h2>

      <div className="container p-4 border rounded">
        <div className="row justify-content-center">
          {sheets.map((sheet, index) => (
            <div
              key={index}
              className="col-12 col-md-4 mb-3 d-flex justify-content-center"
            >
              <SheetsButton
                sheetName={sheet}
                isOpen={openSheet === sheet}
                onClick={handleSheetClick}
              />
            </div>
          ))}

          <button className="btn btn-primary">
            Add More Sheets
          </button>
        </div>
      </div>
    </>
  )
}