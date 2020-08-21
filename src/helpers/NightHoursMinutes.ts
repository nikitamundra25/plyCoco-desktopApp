import moment from 'moment';

// export const getNightMinutes = function (
//   nightStart: any,
//   nightEnd: any,
//   startTime: any,
//   endTime: any
// ) {
//   var nightStartTime = nightStart.replace(",", "T");
//   var endStart = endTime.replace(",", "T");
//   var shiftStart = startTime.replace(",", "T");
//   console.log(
//     "********************",
//     nightStartTime,
//     "ggggggggggggggg",
//     nightStart
//   );

//   let nightShiftStartTime: any = moment(nightStart).format();
//   console.log("&&&&&&&&&&&&&&&&&&&&&&&", nightShiftStartTime);
//   let nightShiftEndTime: any = new Date(nightEnd);
//   nightShiftEndTime.setDate(nightShiftEndTime.getDate() + 1);
//   let shiftEndTime: any = new Date(endStart);
//   let shiftStartTime: any = new Date(shiftStart);

//   // console.log('nightShiftStartTime',nightShiftStartTime)
//   // console.log('nightShiftEndTime',nightShiftEndTime)
//   // console.log('shiftEndTime',shiftEndTime)
//   // console.log('shiftStartTime',shiftStartTime)

//   if (moment(endStart).isBefore(nightShiftStartTime)) {
//     // console.log('moment(endStart).isBefore(nightShiftStartTime)',moment(endStart).isBefore(nightShiftStartTime))
//     console.log("END TIME IS LESS THAN NIGHT");
//     return 0;
//   }

//   if (moment(nightShiftStartTime).isBefore(shiftStartTime)) {
//     nightShiftStartTime = shiftStartTime;
//     console.log("SHIFT START TIME IS LATE THAN NIGH TIME");
//     // console.log('update - shiftEndTime',shiftEndTime)
//   }

//   if (moment(nightShiftEndTime).isBefore(shiftEndTime)) {
//     shiftEndTime = nightShiftEndTime;
//     console.log("END TIME IS CROSSING END TIME OF 6AM THAN NIGHT");
//     // console.log('update - shiftEndTime',shiftEndTime)
//   }

//   var convertedShiftEndTime: any = moment(shiftEndTime);
//   var convertedNigthEndTime: any = moment(nightShiftStartTime);
//   var diff = convertedShiftEndTime.diff(convertedNigthEndTime, "minutes");
//   console.log("Difffffffffffffffffffffffffff", diff);
//   console.log("convertedShiftEndTime", shiftEndTime);
//   console.log("convertedNigthEndTime", nightShiftStartTime);

//   let minutes = Math.abs(diff).toFixed(2);
//   // console.log('FINALYYYY',minutes);
//   return minutes;
// };

export const getNightMinutes = function(
  date: any,
  startHourNight: any,
  startTime: any,
  endTime: any,
) {
  let nightStartTime: any = date + 'T' + startHourNight;
  let nightEndTime: any = date + 'T' + '06:00';

  let shiftStart: any = date + 'T' + startTime;
  let shiftEnd: any = date + 'T' + endTime;
  console.log(
    nightStartTime,
    nightEndTime,
    shiftStart,
    shiftEnd,
    'getNightMinutes',
  );

  if (moment(shiftStart).isSameOrAfter(moment(shiftEnd))) {
    console.log('in iffffffff');

    shiftEnd = moment(shiftEnd)
      .add(1, 'day')
      .toDate();
    nightEndTime = moment(nightEndTime)
      .add(1, 'day')
      .toDate();
    if (moment(nightStartTime).isSameOrAfter(moment(shiftStart))) {
      if (moment(nightEndTime).isSameOrAfter(moment(shiftEnd))) {
        let diff: any =
          (new Date(nightStartTime).getTime() - new Date(shiftEnd).getTime()) /
          1000;
        diff /= 60;
        let minutes: any = Math.abs(diff).toFixed(2);
        minutes = parseInt(minutes);
        return minutes;
      } else {
        let diff: any =
          (new Date(nightEndTime).getTime() -
            new Date(nightStartTime).getTime()) /
          1000;
        diff /= 60;
        let minutes: any = Math.abs(diff).toFixed(2);
        minutes = parseInt(minutes);
        return minutes;
      }
    } else {
      if (moment(nightEndTime).isSameOrAfter(moment(shiftEnd))) {
        let diff: any = (new Date(shiftStart).getTime() - shiftEnd) / 1000;
        diff /= 60;
        let minutes: any = Math.abs(diff).toFixed(2);
        minutes = parseInt(minutes);
        return minutes;
      } else {
        let diff: any =
          (new Date(nightEndTime).getTime() - new Date(shiftStart).getTime()) /
          1000;
        diff /= 60;
        let minutes: any = Math.abs(diff).toFixed(2);
        minutes = parseInt(minutes);
        return minutes;
      }
    }
  } else {
    console.log('in elsssssssss');

    nightStartTime = moment(nightStartTime)
      .subtract(1, 'day')
      .toDate();
    if (moment(nightStartTime).isSameOrAfter(moment(shiftStart))) {
      let diff: any =
        (new Date(nightStartTime).getTime() - new Date(shiftEnd).getTime()) /
        1000;
      diff /= 60;
      let minutes: any = Math.abs(diff).toFixed(2);
      minutes = parseInt(minutes);
      return minutes;
    } else if (moment(shiftEnd).isSameOrAfter(moment(nightStartTime))) {
      if (moment(shiftStart).isSameOrAfter(moment(nightStartTime))) {
        if (moment(shiftEnd).isSameOrAfter(moment(nightEndTime))) {
          nightStartTime = moment(nightStartTime)
            .add(1, 'day')
            .toDate();
          if (moment(shiftEnd).isSameOrAfter(moment(nightStartTime))) {
            if (moment(shiftEnd).isSameOrAfter(moment(nightEndTime))) {
              if (moment(nightStartTime).isAfter(moment(shiftStart))) {
                let diff: any =
                  (new Date(shiftEnd).getTime() -
                    new Date(nightStartTime).getTime()) /
                  1000;
                diff /= 60;
                let minutes: any = Math.abs(diff).toFixed(2);
                minutes = parseInt(minutes);
                return minutes;
              } else {
                let diff: any =
                  (new Date(nightEndTime).getTime() -
                    new Date(nightStartTime).getTime()) /
                  1000;
                diff /= 60;
                let minutes: any = Math.abs(diff).toFixed(2);
                minutes = parseInt(minutes);
                return minutes;
              }
            } else {
              let diff: any =
                (new Date(shiftEnd).getTime() -
                  new Date(nightStartTime).getTime()) /
                1000;
              diff /= 60;
              let minutes: any = Math.abs(diff).toFixed(2);
              minutes = parseInt(minutes);
              return minutes;
            }
          } else if (
            moment(nightStartTime).isSameOrAfter(moment(shiftStart)) &&
            moment(shiftEnd).isSameOrAfter(moment(nightEndTime))
          ) {
            let diff: any =
              (new Date(shiftStart).getTime() -
                new Date(nightEndTime).getTime()) /
              1000;
            diff /= 60;
            let minutes: any = Math.abs(diff).toFixed(2);
            minutes = parseInt(minutes);
            return minutes;
          } else {
            return 0;
          }
        } else {
          console.log('in final else');

          let diff: any =
            (new Date(shiftStart).getTime() - new Date(shiftEnd).getTime()) /
            1000;
          diff /= 60;
          let minutes: any = Math.abs(diff).toFixed(2);
          minutes = parseInt(minutes);
          return minutes;
        }
      } else {
        nightStartTime = moment(nightStartTime)
          .add(1, 'day')
          .toDate();
        let diff: any =
          (new Date(shiftEnd).getTime() - new Date(nightStartTime).getTime()) /
          1000;
        diff /= 60;
        let minutes: any = Math.abs(diff).toFixed(2);
        minutes = parseInt(minutes);
        return minutes;
      }
    } else {
      let diff: any =
        (new Date(shiftEnd).getTime() - new Date(shiftStart).getTime()) / 1000;
      diff /= 60;
      let minutes: any = Math.abs(diff).toFixed(2);
      minutes = parseInt(minutes);
      return minutes;
    }
  }
};

// export const getSundayMinutes = function(
//   startTime: any,
//   endTime: any,
//   midnightTime: any,
// ) {
//   console.log('getSundayMinutesgetSundayMinutes');

//   let shiftStart = startTime.replace(',', 'T');
//   let endStart = endTime.replace(',', 'T');
//   let midnightStartTime = midnightTime.replace(',', 'T');

//   let shiftStartTime: any = new Date(shiftStart);
//   let shiftEndTime: any = new Date(endStart);
//   let shiftMidnightTime: any = new Date(midnightStartTime);
//   shiftMidnightTime.setDate(shiftMidnightTime.getDate() + 1);

//   // console.log('shiftStartTime',shiftStartTime)
//   // console.log('shiftEndTime',shiftEndTime)
//   // console.log('shiftMidnightTime',shiftMidnightTime)

//   let dayShiftStart = shiftStartTime.getDay();
//   let dayShiftEnd = shiftEndTime.getDay();

//   //  console.log('dayShiftStart',dayShiftStart)
//   //  console.log('dayShiftEnd',dayShiftEnd)

//   if (dayShiftStart !== 0 && dayShiftEnd !== 0) {
//     console.log('START AND END BOTH DATE IS NOT ON SUNDAY');
//     return 0;
//   } else if (dayShiftStart === 0 && dayShiftEnd === 0) {
//     console.log('START AND END BOTH DATE IS ON SUNDAY');
//     var diff = (shiftEndTime - shiftStartTime) / 1000;
//     diff /= 60;
//     let minutes = Math.abs(diff).toFixed(2);
//     console.log('Sunday Day1+1', minutes);
//     return minutes;
//   } else if (dayShiftStart === 0) {
//     console.log('START DAY IS SUNDAY');
//     var diff = (shiftMidnightTime - shiftStartTime) / 1000;
//     diff /= 60;
//     let minutes = Math.abs(diff).toFixed(2);
//     console.log('Sunday Day1', minutes);
//     return minutes;
//   } else {
//     console.log('END DAY IS SUNDAY');
//     var diff = (shiftEndTime - shiftMidnightTime) / 1000;
//     diff /= 60;
//     let minutes = Math.abs(diff).toFixed(2);
//     // console.log('Sunday Day1',minutes);
//     return minutes;
//   }
// };

export const getSundayMinutes = function(
  date: any,
  startTime: any,
  endTime: any,
) {
  let shiftStart: any = date + 'T' + startTime;
  let shiftEnd: any = date + 'T' + endTime;
  let midnightStartTime: any = date + 'T' + '00:00';
  console.log(shiftStart, shiftEnd, midnightStartTime, 'getSundayMinutes');

  let shiftMidnightTime: any = new Date(midnightStartTime);
  shiftMidnightTime.setDate(shiftMidnightTime.getDate() + 1);

  if (
    moment(shiftStart).isAfter(moment(shiftEnd)) ||
    moment(shiftStart).isSame(moment(shiftEnd))
  ) {
    shiftEnd = moment(shiftEnd)
      .add(1, 'day')
      .toDate();
  }

  let shiftStartTime: any = new Date(shiftStart);
  let shiftEndTime: any = new Date(shiftEnd);

  let dayShiftStart: any = shiftStartTime.getDay();
  let dayShiftEnd: any = shiftEndTime.getDay();

  if (dayShiftStart !== 0 && dayShiftEnd !== 0) {
    return 0;
  } else if (dayShiftStart === 0 && dayShiftEnd === 0) {
    var diff = (shiftEndTime - shiftStartTime) / 1000;
    diff /= 60;
    let minutes = Math.abs(diff).toFixed(2);
    return minutes;
  } else if (dayShiftStart === 0) {
    var diff = (shiftMidnightTime - shiftStartTime) / 1000;
    diff /= 60;
    let minutes = Math.abs(diff).toFixed(2);
    return minutes;
  } else {
    var diff = (shiftEndTime - shiftMidnightTime) / 1000;
    diff /= 60;
    let minutes = Math.abs(diff).toFixed(2);
    return minutes;
  }
};

// Calculates Holiday Minutes between two dates
export const getHolidayMinutes = async (
  date: any,
  startTime: any,
  endTime: any,
  stateId: any,
) => {
  if (!stateId) {
    stateId = '1359';
  }

  let shiftMidnightStart: any = date + 'T' + '00:00';
  let shiftMidnightEnd: any = date + 'T' + '24:00';
  let shiftStart: any = date + 'T' + startTime;
  let shiftEnd: any = date + 'T' + endTime;

  if (
    moment(shiftStart).isAfter(moment(shiftEnd)) ||
    moment(shiftStart).isSame(moment(shiftEnd))
  ) {
    shiftEnd = moment(shiftEnd)
      .add(1, 'day')
      .toDate();
    shiftMidnightStart = moment(shiftMidnightStart)
      .add(1, 'day')
      .toDate();
  }

  let shiftStartTime: any = new Date(shiftStart);
  let shiftEndTime: any = new Date(shiftEnd);
  let shiftMidnightStartTime: any = new Date(shiftMidnightStart);
  let shiftMidnightEndTime: any = new Date(shiftMidnightEnd);

  let startDate = moment(shiftStartTime).format('YYYY-MM-DD');
  let endDate = moment(shiftEndTime).format('YYYY-MM-DD');

  if (startDate === endDate) {
    let result = false; //await getGlobalHolidays(startDate, stateId);
    if (result) {
      var diff = (shiftEndTime - shiftStartTime) / 1000;
      diff /= 60;
      let minutes = Math.abs(diff).toFixed(2);
      return minutes;
    } else {
      return 0;
    }
  } else {
    let startDayResult = false; //await getGlobalHolidays(startDate, stateId);
    let minutes = 0;
    if (startDayResult) {
      var diff = (shiftMidnightEndTime - shiftStartTime) / 1000;
      diff /= 60;
      let newMinutes = Math.abs(diff).toFixed(2);
      minutes = minutes + parseInt(newMinutes);
    }

    let endDayResult = false; //await getGlobalHolidays(endDate, stateId);
    if (endDayResult) {
      var diff = (shiftEndTime - shiftMidnightStartTime) / 1000;
      diff /= 60;
      let newMinutes = Math.abs(diff).toFixed(2);
      minutes = minutes + parseInt(newMinutes);
    }
    return minutes;
  }
};

// Calculating EXCLUSIVE Hours for Leasing!
export const getLeasingExclusiveMinutes = async (
  date: any,
  startTime: any,
  endTime: any,
  startHourNight: any,
  stateId: any,
) => {
  let endHourNight = '06:00';
  let shiftMidnightStart = date + 'T' + '00:00';
  let shiftStart = date + 'T' + startTime;
  let shiftEnd: any = date + 'T' + endTime;

  let isSameDay = true;

  let obj: any = {};

  if (moment(shiftStart).isSameOrAfter(moment(shiftEnd))) {
    isSameDay = false;
    shiftEnd = moment(shiftEnd)
      .add(1, 'day')
      .toDate();
  }

  if (isSameDay) {
    let firstDayLeasingMinutesForAll = await getFirstDayLeasingMinutesForAll(
      date,
      startTime,
      endTime,
      stateId,
      startHourNight,
    );

    obj = {
      holidayMinutes: firstDayLeasingMinutesForAll.holidayMinutes,
      sundayMinutes: firstDayLeasingMinutesForAll.sundayMinutes,
      nightMinutes: firstDayLeasingMinutesForAll.nightMinutes,
    };
  } else {
    obj = await getFirstDayLeasingMinutesForAll(
      date,
      startTime,
      '00:00',
      stateId,
      startHourNight,
    );
    let secondDayLeasingMinutesForAll = await getSecondDayLeasingMinutesForAll(
      date,
      startTime,
      endTime,
      stateId,
      endHourNight,
    );

    obj = {
      holidayMinutes:
        obj.holidayMinutes + secondDayLeasingMinutesForAll.holidayMinutes,
      sundayMinutes:
        obj.sundayMinutes + secondDayLeasingMinutesForAll.sundayMinutes,
      nightMinutes:
        obj.nightMinutes + secondDayLeasingMinutesForAll.nightMinutes,
    };
  }

  return obj;
};

const getFirstDayLeasingMinutesForAll = async (
  date: any,
  startTime: any,
  endTime: any,
  stateId: any,
  startHourNight: any,
) => {
  let obj = {
    holidayMinutes: 0,
    sundayMinutes: 0,
    nightMinutes: 0,
  };

  let holidayMinutes: any = await getHolidayMinutes(
    date,
    startTime,
    endTime,
    stateId,
  );
  holidayMinutes = parseInt(holidayMinutes);
  obj.holidayMinutes = holidayMinutes;

  if (holidayMinutes === 0) {
    let sundayMinutes: any = await getSundayMinutes(date, startTime, endTime);
    sundayMinutes = parseInt(sundayMinutes);
    obj.sundayMinutes = sundayMinutes;
    if (sundayMinutes === 0) {
      let nightMinutes = await getNightMinutes(
        date,
        startHourNight,
        startTime,
        endTime,
      );
      nightMinutes = parseInt(nightMinutes);
      obj.nightMinutes = nightMinutes;
    }
  }
  return obj;
};

const getSecondDayLeasingMinutesForAll = async (
  date: any,
  startTime: any,
  endTime: any,
  stateId: any,
  endHourNight: any,
) => {
  let obj = {
    holidayMinutes: 0,
    sundayMinutes: 0,
    nightMinutes: 0,
  };

  date = moment(date)
    .add(1, 'day')
    .format('YYYY-MM-DD');
  startTime = '00:00';

  let holidayMinutes: any = await getHolidayMinutes(
    date,
    startTime,
    endTime,
    stateId,
  );
  holidayMinutes = parseInt(holidayMinutes);
  obj.holidayMinutes = holidayMinutes;
  if (holidayMinutes === 0) {
    let sundayMinutes: any = await getSundayMinutes(date, startTime, endTime);
    sundayMinutes = parseInt(sundayMinutes);
    obj.sundayMinutes = sundayMinutes;
    if (sundayMinutes === 0) {
      let nightMinutes = await getNightMinutes(
        date,
        '00:00',
        startTime,
        endTime,
      );
      nightMinutes = parseInt(nightMinutes);
      obj.nightMinutes = nightMinutes;
    }
  }
  return obj;
};

// Calculating EXCLUSIVE Hours for Self Employee!
export const getSelfEmployeeExclusiveMinutes = async (
  date: any,
  startTime: any,
  endTime: any,
  startHourNight: any,
  stateId: any,
) => {
  // date = "2020-08-22"
  // startHourNight = "22:00"
  // startTime = "01:00"
  // endTime = "05:00"

  let endHourNight: any = '06:00';
  let shiftMidnightStart: any = date + 'T' + '00:00';
  let shiftStart: any = date + 'T' + startTime;
  let shiftEnd: any = date + 'T' + endTime;

  let isSameDay: any = true;

  let obj: any = {};

  if (moment(shiftStart).isSameOrAfter(moment(shiftEnd))) {
    isSameDay = false;
    shiftEnd = moment(shiftEnd)
      .add(1, 'day')
      .toDate();
  }

  if (isSameDay) {
    let firstDaySelfEmployeeMinutesForAll = await getFirstDaySelfEmployeeMinutesForAll(
      date,
      startTime,
      endTime,
      stateId,
      startHourNight,
    );
    obj = {
      holidayMinutes: firstDaySelfEmployeeMinutesForAll.holidayMinutes,
      nightMinutes: firstDaySelfEmployeeMinutesForAll.nightMinutes,
      saturdaySundayMinutes:
        firstDaySelfEmployeeMinutesForAll.saturdaySundayMinutes,
    };
  } else {
    obj = await getFirstDaySelfEmployeeMinutesForAll(
      date,
      startTime,
      '00:00',
      stateId,
      startHourNight,
    );

    let secondDaySelfEmployeeMinutesForAll = await getSecondDaySelfEmployeeMinutesForAll(
      date,
      startTime,
      endTime,
      stateId,
      endHourNight,
    );

    obj = {
      holidayMinutes:
        obj.holidayMinutes + secondDaySelfEmployeeMinutesForAll.holidayMinutes,
      nightMinutes:
        obj.nightMinutes + secondDaySelfEmployeeMinutesForAll.nightMinutes,
      saturdaySundayMinutes:
        obj.saturdaySundayMinutes +
        secondDaySelfEmployeeMinutesForAll.saturdaySundayMinutes,
    };
  }
  return obj;
};

export const getFirstDaySelfEmployeeMinutesForAll = async (
  date: any,
  startTime: any,
  endTime: any,
  stateId: any,
  startHourNight: any,
) => {
  let obj = {
    holidayMinutes: 0,
    nightMinutes: 0,
    saturdaySundayMinutes: 0,
  };

  let shiftStart = date + 'T' + startTime;
  let shiftEnd = date + 'T' + endTime;
  let nightShiftStartTime = date + 'T' + startHourNight;
  let nightShiftEndTime = date + 'T' + '06:00';

  let holidayMinutes: any = await getHolidayMinutes(
    date,
    startTime,
    endTime,
    stateId,
  );
  holidayMinutes = parseInt(holidayMinutes);
  obj.holidayMinutes = holidayMinutes;

  if (holidayMinutes === 0) {
    let nightMinutes = await getNightMinutes(
      date,
      startHourNight,
      startTime,
      endTime,
    );
    nightMinutes = parseInt(nightMinutes);
    obj.nightMinutes = nightMinutes;

    if (moment(shiftStart).isBefore(moment(nightShiftStartTime))) {
      if (moment(shiftEnd).isBefore(moment(nightShiftEndTime))) {
        if (
          moment(shiftEnd).isAfter(moment(nightShiftEndTime)) &&
          moment(nightShiftStartTime).isAfter(moment(shiftStart))
        ) {
          let saturdaySundayMinutes: any = await getSaturdayAndSundayMinutes(
            date,
            startTime,
            startHourNight,
          );
          saturdaySundayMinutes = parseInt(saturdaySundayMinutes);
          obj.saturdaySundayMinutes = saturdaySundayMinutes;
        } else {
          obj.saturdaySundayMinutes = 0;
        }
      } else if (moment(shiftEnd).isBefore(moment(nightShiftStartTime))) {
        if (moment(shiftEnd).isAfter(moment(nightShiftEndTime))) {
          let saturdaySundayMinutes: any = await getSaturdayAndSundayMinutes(
            date,
            '06:00',
            endTime,
          );
          saturdaySundayMinutes = parseInt(saturdaySundayMinutes);
          obj.saturdaySundayMinutes = saturdaySundayMinutes;
        } else {
          let saturdaySundayMinutes: any = await getSaturdayAndSundayMinutes(
            date,
            startTime,
            endTime,
          );
          saturdaySundayMinutes = parseInt(saturdaySundayMinutes);
          obj.saturdaySundayMinutes = saturdaySundayMinutes;
        }
      } else {
        let saturdaySundayMinutes: any = await getSaturdayAndSundayMinutes(
          date,
          startTime,
          startHourNight,
        );
        saturdaySundayMinutes = parseInt(saturdaySundayMinutes);
        obj.saturdaySundayMinutes = saturdaySundayMinutes;
      }
    }
  }
  return obj;
};

export const getSecondDaySelfEmployeeMinutesForAll = async (
  date: any,
  startTime: any,
  endTime: any,
  stateId: any,
  endHourNight: any,
) => {
  let obj = {
    holidayMinutes: 0,
    nightMinutes: 0,
    saturdaySundayMinutes: 0,
  };

  date = moment(date)
    .add(1, 'day')
    .format('YYYY-MM-DD');
  startTime = '00:00';

  let shiftEnd = date + 'T' + endTime;
  let nightShiftEndTime = date + 'T' + endHourNight;

  let holidayMinutes: any = await getHolidayMinutes(
    date,
    startTime,
    endTime,
    stateId,
  );
  holidayMinutes = parseInt(holidayMinutes);
  obj.holidayMinutes = holidayMinutes;
  if (holidayMinutes === 0) {
    let nightMinutes = await getNightMinutes(date, '00:00', startTime, endTime);
    nightMinutes = parseInt(nightMinutes);
    obj.nightMinutes = nightMinutes;

    if (moment(nightShiftEndTime).isBefore(moment(shiftEnd))) {
      let saturdaySundayMinutes: any = await getSaturdayAndSundayMinutes(
        date,
        endHourNight,
        endTime,
      );
      saturdaySundayMinutes = parseInt(saturdaySundayMinutes);
      obj.saturdaySundayMinutes = saturdaySundayMinutes;
    }
  }
  return obj;
};

// Calculates Saturday & Sunday Minutes between two dates
export const getSaturdayAndSundayMinutes = function(
  date: any,
  startTime: any,
  endTime: any,
) {
  let shiftStart: any = date + 'T' + startTime;
  let shiftEnd: any = date + 'T' + endTime;
  let midnightStartTime: any = date + 'T' + '00:00';

  let shiftMidnightTime: any = new Date(midnightStartTime);
  shiftMidnightTime.setDate(shiftMidnightTime.getDate() + 1);

  let shiftStartTime: any = new Date(shiftStart);
  let shiftEndTime: any = new Date(shiftEnd);

  if (
    moment(shiftStart).isAfter(moment(shiftEndTime)) ||
    moment(shiftStart).isSame(moment(shiftEndTime))
  ) {
    shiftEndTime = moment(shiftEndTime)
      .add(1, 'day')
      .toDate();
  }

  let dayShiftStart = shiftStartTime.getDay();
  let dayShiftEnd = shiftEndTime.getDay();

  if (
    dayShiftStart !== 0 &&
    dayShiftEnd !== 0 &&
    dayShiftStart !== 6 &&
    dayShiftEnd !== 6
  ) {
    return 0;
  } else if (
    (dayShiftStart === 0 && dayShiftEnd === 0) ||
    (dayShiftStart === 6 && dayShiftEnd === 6)
  ) {
    var diff = (shiftEndTime - shiftStartTime) / 1000;
    diff /= 60;
    let minutes = Math.abs(diff).toFixed(2);
    return minutes;
  } else {
    let minutes = 0;
    if (dayShiftStart === 6) {
      var diff = (shiftMidnightTime - shiftStartTime) / 1000;
      diff /= 60;
      let newMinutes = Math.abs(diff).toFixed(2);
      minutes = minutes + parseInt(newMinutes);
    }
    if (dayShiftEnd === 6) {
      var diff = (shiftEndTime - shiftMidnightTime) / 1000;
      diff /= 60;
      let newMinutes = Math.abs(diff).toFixed(2);
      minutes = minutes + parseInt(newMinutes);
    }
    if (dayShiftStart === 0) {
      var diff = (shiftMidnightTime - shiftStartTime) / 1000;
      diff /= 60;
      let newMinutes = Math.abs(diff).toFixed(2);
      minutes = minutes + parseInt(newMinutes);
    }
    if (dayShiftEnd === 0) {
      var diff = (shiftEndTime - shiftMidnightTime) / 1000;
      diff /= 60;
      let newMinutes = Math.abs(diff).toFixed(2);
      minutes = minutes + parseInt(newMinutes);
    }
    return minutes;
  }
};

export const getMinutes = function(startTime: any, endTime: any) {
  console.log('getMinutesgetMinutes');
  var resStart = startTime.replace(',', 'T');
  // console.log('startTime',startTime)
  // console.log('resStart',resStart)
  var endStart = endTime.replace(',', 'T');
  // console.log('endStart',endStart)
  // let startTimeArr =  moment(resStart).format('dddd MMMM D YYYY, h:mm:ss a')

  let startDateObj: any = new Date(resStart);
  // console.log('startDateObj.getDay()',startDateObj.getDay());

  let endDateObj: any = new Date(endStart);

  // console.log('endDateObj.getDay()',endDateObj.getDay());
  // console.log('startDateObj',startDateObj, typeof(startDateObj))
  // console.log('endDateObj',endDateObj, typeof(endDateObj));
  // console.log('hourshours',hours);

  var diff = (startDateObj - endDateObj) / 1000;
  diff /= 60;
  let minutes = Math.abs(diff).toFixed(2);
  // console.log('FINALYYYY',minutes);
  return minutes;
};

export const convertIntoHours = (n: any) => {
  var num = n;
  var hours = num / 60;
  var rhours = Math.floor(hours);
  var minutes = (hours - rhours) * 60;
  var rminutes = Math.round(minutes);
  let finalHours = rhours + ':' + rminutes;
  return finalHours;
};
