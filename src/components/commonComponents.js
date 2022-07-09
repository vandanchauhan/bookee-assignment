import moment from "moment";
import { bookShift, cancelShift } from "../Apis/api.js";
import { greenSpinner, pinkSpinner } from "./util";

export const bookButton = (onClick, isBlur, buttonLoading) => {
  return (
    <div
      onClick={() => {
        return !isBlur && onClick();
      }}
      className={
        isBlur
          ? "rounded-full border border-green opacity-50"
          : "rounded-full border border-green cursor-pointer"
      }
    >
      {buttonLoading ? (
        <p className="px-8 py-1 font-bold text-darkGreen">
          {greenSpinner()}
        </p>
      ) : (
        <p className="px-8 py-1 font-bold text-darkGreen">
          Book
        </p>
      )}
    </div>
  );
};

export const cancelButton = (onClick, isBlur, buttonLoading) => {
  return (
    <div
      onClick={() => {
        return !isBlur && onClick();
      }}
      className={
        isBlur
          ? "rounded-full border border-pink opacity-50"
          : "rounded-full border border-pink cursor-pointer"
      }
    >
      {buttonLoading ? (
        <p className="px-6 py-1 font-bold text-darkPink">
          {pinkSpinner()}
        </p>
      ) : (
        <p className="px-6 py-1 font-bold text-darkPink">
          Cancel
        </p>
      )}
    </div>
  );
};

export const bookLoadingButton = () => {
  return (
    <div className={"rounded-full border border-green"}>
      <p className="px-8 py-1 w-5 font-bold cursor-pointer text-darkGreen">
        {greenSpinner()}
      </p>
    </div>
  );
};

export const cancelLoadingButton = () => {
  return (
    <div className={"rounded-full border border-pink"}>
      <p className="px-8 py-1 w-5 font-bold cursor-pointer text-darkGreen">
        {greenSpinner()}
      </p>
    </div>
  );
};

export const renderDayHeader = (day) => {
  return (
    <div className="flex flex-row justify-start items-center p-3 px-10 border-borderGrey border-b bg-bgGray">
      <p className="text-textBlue font-bold text-lg">{day}</p>
    </div>
  );
};

const isShiftOverlapping = (shift, myShiftsData) => {
  let isOverlapping = false;
  const startTime = shift.startTime;
  const endTime = shift.endTime;
  myShiftsData &&
    myShiftsData.forEach((currShift, index) => {
      const isTimeOverLapping = (currShift.endTime === endTime && startTime === currShift.startTime) ||
      (currShift.endTime > startTime && startTime > currShift.startTime) ||
        (currShift.endTime > endTime && endTime > currShift.startTime);
      if (isTimeOverLapping) {
        isOverlapping = true;
      }
    });
  return isOverlapping;
};

export const renderSingleShift = (
  shift,
  currTab,
  setActionTaken,
  actionTaken,
  myShiftsData,
  buttonLoading,
  setButtonLoading
) => {
  const timeNow = new Date();
  const isOverlapping = isShiftOverlapping(shift, myShiftsData);
  return (
    <div
      key={shift.id}
      className="flex flex-row justify-between items-center p-3 px-10 border-borderGrey border-b bg-white"
    >
      <div className="flex flex-col">
        <div>
          <p className="text-textBlue font-semibold text-lg">
            {moment(shift.startTime).format("HH:mm")} -{" "}
            {moment(shift.endTime).format("HH:mm")}
          </p>
        </div>
        {currTab === 0 && (
          <div>
            <p className="text-darkGray font-normal text-md">{shift.area}</p>
          </div>
        )}
      </div>
      <div className="flex flex-row items-center">
        {shift.booked && currTab === 1 && (
          <p className="text-textBlue font-semibold text-md mr-4">Booked</p>
        )}
        {!shift.booked && isOverlapping && (
          <p className="text-darkPink font-semibold text-md mr-4">
            Overlapping
          </p>
        )}
        {shift.booked
          ? cancelButton(
              () => {
                setButtonLoading(shift.id);
                cancelShift(shift.id)
                  .then((res) => {
                    setActionTaken(!actionTaken);
                    // setButtonLoading(false);
                  })
                  .catch((err) => {});
              },
              timeNow > shift.startTime,
              buttonLoading === shift.id
            )
          : bookButton(
              () => {
                setButtonLoading(shift.id);
                bookShift(shift.id)
                  .then((res) => {
                    setActionTaken(!actionTaken);
                    // setButtonLoading(false);
                  })
                  .catch((err) => {});
              },
              timeNow > shift.startTime || isOverlapping,
              buttonLoading === shift.id
            )}
      </div>
    </div>
  );
};

export const renderShifts = (
  currShifts,
  currTab,
  setActionTaken,
  actionTaken,
  myShiftsData,
  buttonLoading,
  setButtonLoading
) => {
  return currShifts.map((shift, index) => {
    return renderSingleShift(
      shift,
      currTab,
      setActionTaken,
      actionTaken,
      myShiftsData,
      buttonLoading,
      setButtonLoading
    );
  });
};
