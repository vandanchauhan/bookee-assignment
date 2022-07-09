import { useEffect, useState } from "react";
import "../App.css";
import { renderShifts, renderDayHeader } from "./commonComponents";
import { getShiftsByDay } from "./util";

function MyShifts({ myShiftsData, setActionTaken, actionTaken }) {
  const [myShifts, setMyShifts] = useState();
  const [buttonLoading, setButtonLoading] = useState(false);
  const [myShiftsArr, setMyShiftsArr] = useState();

  useEffect(() => {
    const shiftsSortedByDay = getShiftsByDay(myShiftsData);
    setMyShifts(shiftsSortedByDay);
    setMyShiftsArr(myShiftsData);
  }, []);

  const renderCurrShifts = (myShiftsData) => {
    return (
      myShiftsData &&
      Object.keys(myShiftsData).map((shiftDay, index) => {
        return (
          <div key={shiftDay}>
            {renderDayHeader(shiftDay)}
            {renderShifts(
              myShiftsData[shiftDay],
              0,
              setActionTaken,
              actionTaken,
              myShiftsArr,
              buttonLoading,
              setButtonLoading
            )}
          </div>
        );
      })
    );
  };

  return (
    <div className="min-h-screen">
      {myShiftsArr && myShiftsArr.length === 0 && 
        <p className="text-xl text-[#004FB4] font-semibold text-center mt-10">
          No Shifts booked yet, Please go to Available Shifts tab to book a slot!!
        </p>
        }
      <div className="rounded-tl-md rounded-tr-md mt-1">
        {renderCurrShifts(myShifts)}
      </div>
    </div>
  );
}

export default MyShifts;
