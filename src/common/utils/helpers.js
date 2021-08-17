const formatDate = (date, isYearPresent = true) => {
  if (!date) return "";
  return new Date(date).toLocaleDateString("en-US", {
    day: "2-digit",
    month: "short",
    ...(isYearPresent && { year: "numeric" }),
  });
};

const isDateBefore = (date1, date2) => {
  if (new Date(date1).setHours(0, 0, 0, 0) <= new Date(date2).setHours(0, 0, 0, 0)) return true;
  else return false;
};

const isDateAfter = (date1, date2) => {
  if (new Date(date1).setHours(0, 0, 0, 0) >= new Date(date2).setHours(0, 0, 0, 0)) return true;
  else return false;
};

const storeObjectInUrl = (obj = {}, key = "query") => {
  if (typeof window !== "undefined") {
    const encodedObject = encodeURIComponent(JSON.stringify(obj));
    const url = [
      window.location.protocol,
      "//",
      window.location.host,
      window.location.pathname,
    ].join("");
    window.history.replaceState({ path: url }, "", `?${key}=${encodedObject}`);
  }
};

const getObjectFromUrl = (key = "query") => {
  if (typeof window != "undefined") {
    try {
      const searchParams = new URLSearchParams(window.location.search);
      const obj = JSON.parse(decodeURIComponent(searchParams.get(key)));
      return obj;
    } catch (err) {
      console.error(err);
    }
  }
};

const isValueWithinRange = (min, max, value, type) => {
  if (type === "date") {
    if (isDateAfter(value, min) && isDateBefore(value, max)) {
      return true;
    } else {
      return false;
    }
  } else if (type === "integer") {
    if (parseInt(value) >= parseInt(min) && parseInt(value) <= parseInt(max)) {
      return true;
    } else {
      return false;
    }
  } else if (type === "float") {
    if (parseFloat(value) >= parseFloat(min) && parseFloat(value) <= parseFloat(max)) {
      return true;
    } else {
      return false;
    }
  } else {
    console.error("No type was provided to isValueWithinRange function.");
    return false;
  }
};

const isLess = (value1, value2, type) => {
  if (type === "date") {
    if (isDateBefore(value1, value2)) {
      return -1;
    } else {
      return 1;
    }
  } else if (type === "integer") {
    if (parseInt(value1) <= parseInt(value2)) {
      return -1;
    } else {
      return 1;
    }
  } else if (type === "float") {
    if (parseFloat(value1) <= parseFloat(value2)) {
      return -1;
    } else {
      return 1;
    }
  } else {
    console.error("No type was provided to isLess function.");
    return -1;
  }
};

const shortenNumber = (num) => {
  const abbrevations = [
    { value: 1e9, symbol: "B" },
    { value: 1e6, symbol: "M" },
    { value: 1e3, symbol: "K" },
  ];

  var number = parseInt(num);
  for (let { value, symbol } of abbrevations) {
    if (number >= value) {
      number = Math.round((number / value) * 100) / 100;
      return `${number}${symbol}`;
    }
  }
  return number;
};

const getDistinctElements = (list = []) => {
  return [...new Set(list)];
};

const addDaysToDate = (date, days = 0) => {
  var newDate = new Date(date);
  newDate.setHours(0, 0, 0, 0);
  newDate.setDate(newDate.getDate() + days);
  return newDate;
};

const differenceInDays = (date1, date2) => {
  var diffTime = new Date(date1).setHours(0, 0, 0, 0) - new Date(date2).setHours(0, 0, 0, 0);
  var msInDay = 1000 * 60 * 60 * 24;
  return Math.ceil(diffTime / msInDay) || 0;
};

const numberFormatInteger = new Intl.NumberFormat("en-US");
const numberFormatFloat = new Intl.NumberFormat("en-US", {
  maximumFractionDigits: 2,
  minimumFractionDigits: 2,
});

const formatNumber = (number, type) => {
  if (!number) return 0;
  if (type === "integer") {
    return numberFormatInteger.format(number);
  } else {
    return numberFormatFloat.format(number);
  }
};

export {
  formatDate,
  storeObjectInUrl,
  getObjectFromUrl,
  isDateAfter,
  isDateBefore,
  isValueWithinRange,
  isLess,
  shortenNumber,
  getDistinctElements,
  differenceInDays,
  addDaysToDate,
  formatNumber,
};
