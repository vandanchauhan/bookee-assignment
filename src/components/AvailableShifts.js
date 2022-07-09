import "./schedulerStyle.css";
import { useEffect, useState } from "react";
import moment from "moment";
import { getShiftsByArea, getShiftsByDay } from './util';
import { renderShifts, renderDayHeader } from './commonComponents';

function AvailableShifts({ sortedShiftsData, availableShiftsData, setActionTaken, actionTaken, myShiftsData}) {
    const [availableShifts, setAvailableShifts] = useState();
    const [myShifts, setmyShifts] = useState();
    const [currArea, setCurrArea] = useState();
    const [currAreaShifts, setCurrAreaShifts] = useState();
    const [buttonLoading, setButtonLoading] = useState();

    
    // Component did mount 
    useEffect(() => {
        console.log('Available slots mounted');
        const shiftsByArea = getShiftsByArea(availableShiftsData);
        setAvailableShifts({...shiftsByArea});
    }, []);

    useEffect(() => {
      console.log('Available shift data changed');
      if (availableShifts) {
        setCurrArea(Object.keys(availableShifts)[0]);
      }
    }, [availableShifts]);

    useEffect(() => {
      setmyShifts(myShiftsData);
    }, [currArea]);

    // On selected area changed
    useEffect(() => {
        if (currArea) {
            console.log('Available slots re mounted');
            const shiftsForCurrArea = availableShifts[currArea];
            const shiftsSortedByDay = getShiftsByDay(shiftsForCurrArea);
            setCurrAreaShifts({...shiftsSortedByDay});
        }
    }, [currArea]);

    const handleAreaChange = (currArea) => {
        setCurrArea(currArea);
    }

  const renderShiftAreas = (availableShifts) => {
      return Object.keys(availableShifts).map((area, index) => {
        return <div key={area} className="flex flex-1 flex-row justify-evenly cursor-pointer">
          <p className={area === currArea ? 'text-xl text-[#004FB4] font-semibold' : 'text-xl text-[#a4b8d4] font-semibold'} onClick={() => handleAreaChange(area)}>
            {area} ({availableShifts[area].length})
          </p>
        </div>
      });
  }

  const renderCurrShifts = (currShiftsData) => {
    return currShiftsData && myShifts && Object.keys(currShiftsData).map((shiftDay, index) => {
      return <div key={shiftDay}>
          {renderDayHeader(shiftDay)}
          {renderShifts(currShiftsData[shiftDay], 1, setActionTaken, actionTaken, myShifts)}
      </div>
    })
  }

  return (
    <div className="min-h-screen">
      <div className="flex flex-row border-borderGrey border-b bg-white p-4 rounded-tl-md rounded-tr-md">
        {availableShifts && renderShiftAreas(availableShifts)}
      </div>
      <div>
        {renderCurrShifts(currAreaShifts)}
      </div>
    </div>
  );
}

export default AvailableShifts;
