import "./schedulerStyle.css";
import { useEffect, useState } from "react";
import { getShifts } from "../Apis/api";
import MyShifts from "./MyShifts";
import AvailableShifts from "./AvailableShifts";
import { segregateShiftsData } from "./util";
const _ = require('lodash'); 

function Scheduler() {
  const [shiftsData, setShiftsData] = useState();
  const [sortedShiftsData, setSortedShiftsData] = useState();
  const [actionTaken, setActionTaken] = useState(false);
  // 0 -> My shifts , 1 -> Available Shifts
  const [currTab, setCurrTab] = useState(1);

  const handleTabChange = (currTab) => {
    setCurrTab(currTab);
  };

  useEffect(() => {
    getShifts().then((res) => {
      setShiftsData(res.data);
    });
  }, []);

  useEffect(() => {
    console.log('Refetch data triggered');
    console.log('actionTaken:'+ actionTaken);
    console.log('currTab:'+ actionTaken);
    getShifts().then((res) => {
      setShiftsData(res.data);
    });
  }, [currTab, actionTaken]);

  useEffect(() => {
    if (shiftsData) {
      console.log('Main app state changed');
      debugger;
      const newData = segregateShiftsData(shiftsData);
      debugger;
      console.log(_.isEqual(shiftsData,newData));
      setSortedShiftsData({...newData});
    }
  }, [shiftsData]);

  return (
    <div  className="w-2/3 self-center">
      <div className="tabHeaderCont my-4">
        <div className="tabHeader ml-5">
          <p
            className={
              currTab === 0
                ? "text-2xl text-[#004FB4] font-semibold"
                : "text-2xl text-[#a4b8d4] font-semibold"
            }
            onClick={() => handleTabChange(0)}
          >
            My Shifts
          </p>
        </div>
        <div className="tabHeader ml-5">
          <p
            className={
              currTab === 1
                ? "text-2xl text-[#004FB4] font-semibold"
                : "text-2xl text-[#a4b8d4] font-semibold"
            }
            onClick={() => handleTabChange(1)}
          >
            Available Shifts
          </p>
        </div>
      </div>
      <div className="border border-borderGrey rounded-md bg-bgWhite">
        {sortedShiftsData &&
          (currTab === 0 ? (
            <MyShifts
              myShiftsData={sortedShiftsData.myShifts}
              setActionTaken={setActionTaken}
              actionTaken={actionTaken}
            />
          ) : (
            <AvailableShifts
              myShiftsData={sortedShiftsData.myShifts}
              availableShiftsData={sortedShiftsData?.availableShifts}
              setActionTaken={setActionTaken}
              actionTaken={actionTaken}
            />
          ))}
      </div>
    </div>
  );
}

export default Scheduler;

