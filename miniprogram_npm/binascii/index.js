module.exports = (function() {
var __MODS__ = {};
var __DEFINE__ = function(modId, func, req) { var m = { exports: {}, _tempexports: {} }; __MODS__[modId] = { status: 0, func: func, req: req, m: m }; };
var __REQUIRE__ = function(modId, source) { if(!__MODS__[modId]) return require(source); if(!__MODS__[modId].status) { var m = __MODS__[modId].m; m._exports = m._tempexports; var desp = Object.getOwnPropertyDescriptor(m, "exports"); if (desp && desp.configurable) Object.defineProperty(m, "exports", { set: function (val) { if(typeof val === "object" && val !== m._exports) { m._exports.__proto__ = val.__proto__; Object.keys(val).forEach(function (k) { m._exports[k] = val[k]; }); } m._tempexports = val }, get: function () { return m._tempexports; } }); __MODS__[modId].status = 1; __MODS__[modId].func(__MODS__[modId].req, m, m.exports); } return __MODS__[modId].m.exports; };
var __REQUIRE_WILDCARD__ = function(obj) { if(obj && obj.__esModule) { return obj; } else { var newObj = {}; if(obj != null) { for(var k in obj) { if (Object.prototype.hasOwnProperty.call(obj, k)) newObj[k] = obj[k]; } } newObj.default = obj; return newObj; } };
var __REQUIRE_DEFAULT__ = function(obj) { return obj && obj.__esModule ? obj.default : obj; };
__DEFINE__(1591527085065, function(require, module, exports) {


// Based on https://docs.python.org/2/library/binascii.html
var binascii = (function(){

  var hexlify = function(str) {
    var result = '';
    var padding = '00';
    for (var i=0, l=str.length; i<l; i++) {
      var digit = str.charCodeAt(i).toString(16);
      var padded = (padding+digit).slice(-2);
      result += padded;
    }
    return result;
  };

  var unhexlify = function(str) {
    var result = '';
    for (var i=0, l=str.length; i<l; i+=2) {
      result += String.fromCharCode(parseInt(str.substr(i, 2), 16));
    }
    return result;
  };


  return {
    b2a_hex: hexlify,
    hexlify: hexlify,

    a2b_hex: unhexlify,
    unhexlify: unhexlify
  };

})();

module.exports = binascii;

}, function(modId) {var map = {}; return __REQUIRE__(map[modId], modId); })
return __REQUIRE__(1591527085065);
})()
//# sourceMappingURL=index.js.map