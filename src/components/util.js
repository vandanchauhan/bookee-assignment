import moment from "moment";

export const getShiftsByArea = (shiftsData) => {
    const shiftsByArea = shiftsData.reduce((segregatedShifts, currShift) => {
        const currArea = currShift.area;
        if (segregatedShifts[currArea] !== undefined) {
            const currAreaData = segregatedShifts[currArea];
            currAreaData.push(currShift);
        } else {
            segregatedShifts[currArea] = [{...currShift}];
        }
        return segregatedShifts;
    }, {});
    return {...shiftsByArea};
}

export const getShiftsByDay = (shiftsData) => {
  let shiftsByDay = shiftsData.reduce((segregatedShifts, currShift) => {
      const currDay = moment(currShift.startTime).calendar();
      if (segregatedShifts[currDay] !== undefined) {
          const currDayData = segregatedShifts[currDay];
          currDayData.push(currShift);
      } else {
          segregatedShifts[currDay] = [{...currShift}];
      }
      return segregatedShifts;
  }, {});
  return {...shiftsByDay};
}

export const segregateShiftsData = (shiftsData) => {
    let returnData = shiftsData.reduce(
      (reducedShiftsData, shift) => {
        if (shift.booked === true) {
          reducedShiftsData.myShifts.push(shift);
          reducedShiftsData.availableShifts.push(shift);
        } else {
          reducedShiftsData.availableShifts.push(shift);
        }
        return {...reducedShiftsData};
      },
      {
        myShifts: [],
        availableShifts: [],
      }
    );
    return {...returnData};
  };
  