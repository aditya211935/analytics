const formatDate = (date, isYearPresent = true) => {
  if (!date) return "";
  return new Date(date).toLocaleDateString("en-US", {
    day: "2-digit",
    month: "short",
    ...(isYearPresent && { year: "numeric" }),
  });
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

export { formatDate, storeObjectInUrl, getObjectFromUrl };
