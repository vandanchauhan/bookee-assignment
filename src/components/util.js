import moment from "moment";

export const getShiftsByArea = (shiftsData) => {
  const shiftsByArea = shiftsData.reduce((segregatedShifts, currShift) => {
    const currArea = currShift.area;
    if (segregatedShifts[currArea] !== undefined) {
      const currAreaData = segregatedShifts[currArea];
      currAreaData.push(currShift);
    } else {
      segregatedShifts[currArea] = [{ ...currShift }];
    }
    return segregatedShifts;
  }, {});
  return { ...shiftsByArea };
};

export const getShiftsByDay = (shiftsData) => {
  let shiftsByDay = shiftsData.reduce((segregatedShifts, currShift) => {
    const currDay = moment(currShift.startTime).calendar();
    if (segregatedShifts[currDay] !== undefined) {
      const currDayData = segregatedShifts[currDay];
      currDayData.push(currShift);
    } else {
      segregatedShifts[currDay] = [{ ...currShift }];
    }
    return segregatedShifts;
  }, {});
  return { ...shiftsByDay };
};

export const segregateShiftsData = (shiftsData) => {
  let returnData = shiftsData.reduce(
    (reducedShiftsData, shift) => {
      if (shift.booked === true) {
        reducedShiftsData.myShifts.push(shift);
        reducedShiftsData.availableShifts.push(shift);
      } else {
        reducedShiftsData.availableShifts.push(shift);
      }
      return { ...reducedShiftsData };
    },
    {
      myShifts: [],
      availableShifts: [],
    }
  );
  return { ...returnData };
};

export const greenSpinner = () => (
  <svg
    width="38"
    height="38"
    viewBox="0 0 38 38"
    xmlns="http://www.w3.org/2000/svg"
    stroke="#16A64D"
  >
    <g fill="none" fill-rule="evenodd">
      <g transform="translate(1 1)" stroke-width="2">
        <circle stroke-opacity=".5" cx="18" cy="18" r="18" />
        <path d="M36 18c0-9.94-8.06-18-18-18">
          <animateTransform
            attributeName="transform"
            type="rotate"
            from="0 18 18"
            to="360 18 18"
            dur="1s"
            repeatCount="indefinite"
          />
        </path>
      </g>
    </g>
  </svg>
);

export const pinkSpinner = () => (
  <svg
    width="38"
    height="38"
    viewBox="0 0 38 38"
    xmlns="http://www.w3.org/2000/svg"
    stroke="#E2006A"
  >
    <g fill="none" fill-rule="evenodd">
      <g transform="translate(1 1)" stroke-width="2">
        <circle stroke-opacity=".5" cx="18" cy="18" r="18" />
        <path d="M36 18c0-9.94-8.06-18-18-18">
          <animateTransform
            attributeName="transform"
            type="rotate"
            from="0 18 18"
            to="360 18 18"
            dur="1s"
            repeatCount="indefinite"
          />
        </path>
      </g>
    </g>
  </svg>
);
