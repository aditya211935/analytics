import Cache from "./cache";

var cacheInst = null;
if (cacheInst === null) {
  cacheInst = new Cache(20, 20);
}

const wrapInPromise = (value) => new Promise((resolve, reject) => resolve(value));

const apiVersion = process.env.REACT_APP_API_VERSION;
const apiBaseUrl = process.env.REACT_APP_API_BASE_URL;
const apiBaseUrlWithVersion = `${apiBaseUrl}/${apiVersion}/dummy/`;

/**
 * A better way to cache responses would be to set cache headers
 * in the response from the backend itself. Instead of returning
 * cache_time key in response body, the server could set Cache-Control
 * headers in response, and then browser will by default cache the
 * subsequent api calls.
 * Reference: https://developer.mozilla.org/en-US/docs/Web/HTTP/Caching#freshness
 */
const request = async (url, init, prependBaseUrl = true) => {
  var newUrl = prependBaseUrl ? apiBaseUrlWithVersion + url : url;
  var cachedResponse = cacheInst.get(newUrl);
  if (cachedResponse) return wrapInPromise(cachedResponse);
  return fetch(newUrl, init).then(async (response) => {
    if (response.ok) {
      var parsedJson = await response.clone().json();
      if (parsedJson?.cache_time > 0) {
        cacheInst.set(response.clone(), parsedJson.cache_time);
      }
    }
    return response;
  });
};

export default request;
