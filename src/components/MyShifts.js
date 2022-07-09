import { useEffect, useState } from "react";
import "../App.css";
import { renderShifts, renderDayHeader } from './commonComponents';
import { getShiftsByDay } from './util';


function MyShifts({ myShiftsData, setActionTaken, actionTaken }) {
  const [myShifts, setMyShifts] = useState();

  useEffect(() => {
    const shiftsSortedByDay = getShiftsByDay(myShiftsData);
    setMyShifts(shiftsSortedByDay);
  }, []);

  const renderCurrShifts = (myShiftsData) => {
    return myShiftsData &&  Object.keys(myShiftsData).map((shiftDay, index) => {
      return <div key={shiftDay}>
          {renderDayHeader(shiftDay)}
          {renderShifts(myShiftsData[shiftDay], 1, setActionTaken, actionTaken)}
      </div>
    })
  }

  return (
    <div className="min-h-screen">
      <div className="rounded-tl-md rounded-tr-md mt-1">
        {renderCurrShifts(myShifts)}
      </div>
    </div>
  );
}

export default MyShifts;
