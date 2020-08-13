import moment from "moment";

export const getNightMinutes = function (
  nightStart: any,
  nightEnd: any,
  startTime: any,
  endTime: any
) {
  var nightStartTime = nightStart.replace(",", "T");
  var endStart = endTime.replace(",", "T");
  var shiftStart = startTime.replace(",", "T");
  console.log(
    "********************",
    nightStartTime,
    "ggggggggggggggg",
    nightStart
  );

  let nightShiftStartTime: any = moment(nightStart).format();
  console.log("&&&&&&&&&&&&&&&&&&&&&&&", nightShiftStartTime);
  let nightShiftEndTime: any = new Date(nightEnd);
  nightShiftEndTime.setDate(nightShiftEndTime.getDate() + 1);
  let shiftEndTime: any = new Date(endStart);
  let shiftStartTime: any = new Date(shiftStart);

  // console.log('nightShiftStartTime',nightShiftStartTime)
  // console.log('nightShiftEndTime',nightShiftEndTime)
  // console.log('shiftEndTime',shiftEndTime)
  // console.log('shiftStartTime',shiftStartTime)

  if (moment(endStart).isBefore(nightShiftStartTime)) {
    // console.log('moment(endStart).isBefore(nightShiftStartTime)',moment(endStart).isBefore(nightShiftStartTime))
    console.log("END TIME IS LESS THAN NIGHT");
    return 0;
  }

  if (moment(nightShiftStartTime).isBefore(shiftStartTime)) {
    nightShiftStartTime = shiftStartTime;
    console.log("SHIFT START TIME IS LATE THAN NIGH TIME");
    // console.log('update - shiftEndTime',shiftEndTime)
  }

  if (moment(nightShiftEndTime).isBefore(shiftEndTime)) {
    shiftEndTime = nightShiftEndTime;
    console.log("END TIME IS CROSSING END TIME OF 6AM THAN NIGHT");
    // console.log('update - shiftEndTime',shiftEndTime)
  }

  var convertedShiftEndTime: any = moment(shiftEndTime);
  var convertedNigthEndTime: any = moment(nightShiftStartTime);
  var diff = convertedShiftEndTime.diff(convertedNigthEndTime, "minutes");
  console.log("Difffffffffffffffffffffffffff", diff);
  console.log("convertedShiftEndTime", shiftEndTime);
  console.log("convertedNigthEndTime", nightShiftStartTime);

  let minutes = Math.abs(diff).toFixed(2);
  // console.log('FINALYYYY',minutes);
  return minutes;
};

export const getSundayMinutes = function (
  startTime: any,
  endTime: any,
  midnightTime: any
) {
  console.log("getSundayMinutesgetSundayMinutes");

  let shiftStart = startTime.replace(",", "T");
  let endStart = endTime.replace(",", "T");
  let midnightStartTime = midnightTime.replace(",", "T");

  let shiftStartTime: any = new Date(shiftStart);
  let shiftEndTime: any = new Date(endStart);
  let shiftMidnightTime: any = new Date(midnightStartTime);
  shiftMidnightTime.setDate(shiftMidnightTime.getDate() + 1);

  // console.log('shiftStartTime',shiftStartTime)
  // console.log('shiftEndTime',shiftEndTime)
  // console.log('shiftMidnightTime',shiftMidnightTime)

  let dayShiftStart = shiftStartTime.getDay();
  let dayShiftEnd = shiftEndTime.getDay();

  //  console.log('dayShiftStart',dayShiftStart)
  //  console.log('dayShiftEnd',dayShiftEnd)

  if (dayShiftStart !== 0 && dayShiftEnd !== 0) {
    console.log("START AND END BOTH DATE IS NOT ON SUNDAY");
    return 0;
  } else if (dayShiftStart === 0 && dayShiftEnd === 0) {
    console.log("START AND END BOTH DATE IS ON SUNDAY");
    var diff = (shiftEndTime - shiftStartTime) / 1000;
    diff /= 60;
    let minutes = Math.abs(diff).toFixed(2);
    console.log("Sunday Day1+1", minutes);
    return minutes;
  } else if (dayShiftStart === 0) {
    console.log("START DAY IS SUNDAY");
    var diff = (shiftMidnightTime - shiftStartTime) / 1000;
    diff /= 60;
    let minutes = Math.abs(diff).toFixed(2);
    console.log("Sunday Day1", minutes);
    return minutes;
  } else {
    console.log("END DAY IS SUNDAY");
    var diff = (shiftEndTime - shiftMidnightTime) / 1000;
    diff /= 60;
    let minutes = Math.abs(diff).toFixed(2);
    // console.log('Sunday Day1',minutes);
    return minutes;
  }
};

export const getMinutes = function (startTime: any, endTime: any) {
  console.log("getMinutesgetMinutes");
  var resStart = startTime.replace(",", "T");
  // console.log('startTime',startTime)
  // console.log('resStart',resStart)
  var endStart = endTime.replace(",", "T");
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
  let finalHours = rhours + ":" + rminutes;
  return finalHours;
};
