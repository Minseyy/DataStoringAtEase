import {useState} from 'react';
import { Link } from 'react-router';

interface SheetsButtonProps {
  sheetName: string;
  isOpen: boolean;
  onClick: (sheetName: string) => void;
}

export default function SheetsButton({ sheetName, isOpen, onClick }: SheetsButtonProps) {
  const [isSelected, setIsSelected] = useState(false);

  const handleClick = () => {
    setIsSelected(prev => !prev);
    onClick(sheetName);
  };

  return (
    <div className="text-center">
    <button 
      className={`btn ${isSelected ? 'btn-primary' : 'btn-outline-primary'}`}
      onClick={handleClick}
    >
    <i className="fa-regular fa-file-excel p-2"></i>
      {sheetName}
    </button>

    {/* If the sheet is open(isOpen = true), expands the options below it */  }
    {isOpen && (
        <div className="mt-2 d-flex flex-row gap-2 justify-content-center">
          {/* open a view page with dets with a button to directly open that sheet */}
          <button className="btn btn-sm btn-light"><Link to={`/view/${sheetName}`}>View</Link></button>
          {/* opens a add page with a form that has all columns in a corresponding sheet selected */}
          <button className="btn btn-sm btn-success"><Link to={`/add/${sheetName}`}>Add</Link></button>
        </div>  
    )}
    </div>
  );
}



