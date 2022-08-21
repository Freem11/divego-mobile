 function getToday(DateVal) {

  let yr0 = DateVal.getFullYear().toString();
  let mth0 = (DateVal.getMonth() + 1).toString();
  let dy0 = DateVal.getDate().toString();

  if (dy0.length == 1) {
    dy0 = "0" + dy0;
  }

  if (mth0.length == 1) {
    mth0 = "0" + mth0;
  }

  let formattedDate = yr0 + "-" + mth0 + "-" + dy0;

    return formattedDate;
  }

export { getToday };