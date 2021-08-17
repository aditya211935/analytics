function Cache(maxSize = 10, valid = 10) {
  this.cache = {};
  this.maxSize = maxSize;
  this.defaultValid = valid;

  var isExpired = function (time) {
    var timeNow = new Date().getTime();
    if (timeNow > time) return true;
    else return false;
  };

  this.clear = function () {
    this.cache = {};
  };

  this.exists = function (url) {
    if (this.cache[url] == null) return false;
    else return true;
  };

  this.delete = function (url) {
    delete this.cache[url];
  };

  this.set = function (response, valid) {
    if (!(response instanceof Response)) {
      throw new Error("response provided to set function is not an instance of Response.");
    }
    if (this.size() >= maxSize) this.clear();
    this.cache[response.url] = {
      response,
      expiry: new Date().getTime() + (valid || this.defaultValid) * 1000,
    };
  };

  this.get = function (url) {
    if (this.exists(url) === false) return undefined;
    var item = this.cache[url];
    if (isExpired(item.expiry)) return undefined;
    return item.response.clone();
  };

  this.size = function () {
    return Object.keys(this.cache).length;
  };
}

export default Cache;
