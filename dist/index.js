var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __commonJS = (cb, mod) => function __require() {
  return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));

// node_modules/classnames/index.js
var require_classnames = __commonJS({
  "node_modules/classnames/index.js"(exports2, module2) {
    (function() {
      "use strict";
      var hasOwn = {}.hasOwnProperty;
      var nativeCodeString = "[native code]";
      function classNames() {
        var classes = [];
        for (var i = 0; i < arguments.length; i++) {
          var arg = arguments[i];
          if (!arg) continue;
          var argType = typeof arg;
          if (argType === "string" || argType === "number") {
            classes.push(arg);
          } else if (Array.isArray(arg)) {
            if (arg.length) {
              var inner = classNames.apply(null, arg);
              if (inner) {
                classes.push(inner);
              }
            }
          } else if (argType === "object") {
            if (arg.toString !== Object.prototype.toString && !arg.toString.toString().includes("[native code]")) {
              classes.push(arg.toString());
              continue;
            }
            for (var key in arg) {
              if (hasOwn.call(arg, key) && arg[key]) {
                classes.push(key);
              }
            }
          }
        }
        return classes.join(" ");
      }
      if (typeof module2 !== "undefined" && module2.exports) {
        classNames.default = classNames;
        module2.exports = classNames;
      } else if (typeof define === "function" && typeof define.amd === "object" && define.amd) {
        define("classnames", [], function() {
          return classNames;
        });
      } else {
        window.classNames = classNames;
      }
    })();
  }
});

// src/index.tsx
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

// src/components/constants.ts
var KEYS = {
  ENTER: [10, 13],
  TAB: 9,
  BACKSPACE: 8,
  UP_ARROW: 38,
  DOWN_ARROW: 40,
  ESCAPE: 27,
  SPACE: 32,
  COMMA: 188
};
var SEPARATORS = {
  ENTER: "Enter",
  TAB: "Tab",
  COMMA: ",",
  SPACE: " ",
  SEMICOLON: ";"
};
var DEFAULT_PLACEHOLDER = "Press enter to add new tag";
var DEFAULT_LABEL_FIELD = "text";
var DEFAULT_CLASSNAMES = {
  tags: "ReactTags__tags",
  tagInput: "ReactTags__tagInput",
  tagInputField: "ReactTags__tagInputField",
  selected: "ReactTags__selected",
  tag: "ReactTags__tag",
  remove: "ReactTags__remove",
  suggestions: "ReactTags__suggestions",
  activeSuggestion: "ReactTags__activeSuggestion",
  editTagInput: "ReactTags__editTagInput",
  editTagInputField: "ReactTags__editTagInputField",
  clearAll: "ReactTags__clearAll"
};
var INPUT_FIELD_POSITIONS = {
  INLINE: "inline",
  TOP: "top",
  BOTTOM: "bottom"
};
var ERRORS = {
  TAG_LIMIT: "Tag limit reached!"
};

// src/components/ReactTags.tsx
import { useEffect as useEffect2, createRef as createRef2, useRef as useRef2, useState, Fragment } from "react";

// node_modules/lodash-es/_freeGlobal.js
var freeGlobal = typeof global == "object" && global && global.Object === Object && global;
var freeGlobal_default = freeGlobal;

// node_modules/lodash-es/_root.js
var freeSelf = typeof self == "object" && self && self.Object === Object && self;
var root = freeGlobal_default || freeSelf || Function("return this")();
var root_default = root;

// node_modules/lodash-es/_Symbol.js
var Symbol2 = root_default.Symbol;
var Symbol_default = Symbol2;

// node_modules/lodash-es/_getRawTag.js
var objectProto = Object.prototype;
var hasOwnProperty = objectProto.hasOwnProperty;
var nativeObjectToString = objectProto.toString;
var symToStringTag = Symbol_default ? Symbol_default.toStringTag : void 0;
function getRawTag(value) {
  var isOwn = hasOwnProperty.call(value, symToStringTag), tag = value[symToStringTag];
  try {
    value[symToStringTag] = void 0;
    var unmasked = true;
  } catch (e) {
  }
  var result = nativeObjectToString.call(value);
  if (unmasked) {
    if (isOwn) {
      value[symToStringTag] = tag;
    } else {
      delete value[symToStringTag];
    }
  }
  return result;
}
var getRawTag_default = getRawTag;

// node_modules/lodash-es/_objectToString.js
var objectProto2 = Object.prototype;
var nativeObjectToString2 = objectProto2.toString;
function objectToString(value) {
  return nativeObjectToString2.call(value);
}
var objectToString_default = objectToString;

// node_modules/lodash-es/_baseGetTag.js
var nullTag = "[object Null]";
var undefinedTag = "[object Undefined]";
var symToStringTag2 = Symbol_default ? Symbol_default.toStringTag : void 0;
function baseGetTag(value) {
  if (value == null) {
    return value === void 0 ? undefinedTag : nullTag;
  }
  return symToStringTag2 && symToStringTag2 in Object(value) ? getRawTag_default(value) : objectToString_default(value);
}
var baseGetTag_default = baseGetTag;

// node_modules/lodash-es/isObjectLike.js
function isObjectLike(value) {
  return value != null && typeof value == "object";
}
var isObjectLike_default = isObjectLike;

// node_modules/lodash-es/isSymbol.js
var symbolTag = "[object Symbol]";
function isSymbol(value) {
  return typeof value == "symbol" || isObjectLike_default(value) && baseGetTag_default(value) == symbolTag;
}
var isSymbol_default = isSymbol;

// node_modules/lodash-es/_arrayMap.js
function arrayMap(array, iteratee) {
  var index = -1, length = array == null ? 0 : array.length, result = Array(length);
  while (++index < length) {
    result[index] = iteratee(array[index], index, array);
  }
  return result;
}
var arrayMap_default = arrayMap;

// node_modules/lodash-es/isArray.js
var isArray = Array.isArray;
var isArray_default = isArray;

// node_modules/lodash-es/_baseToString.js
var INFINITY = 1 / 0;
var symbolProto = Symbol_default ? Symbol_default.prototype : void 0;
var symbolToString = symbolProto ? symbolProto.toString : void 0;
function baseToString(value) {
  if (typeof value == "string") {
    return value;
  }
  if (isArray_default(value)) {
    return arrayMap_default(value, baseToString) + "";
  }
  if (isSymbol_default(value)) {
    return symbolToString ? symbolToString.call(value) : "";
  }
  var result = value + "";
  return result == "0" && 1 / value == -INFINITY ? "-0" : result;
}
var baseToString_default = baseToString;

// node_modules/lodash-es/isObject.js
function isObject(value) {
  var type = typeof value;
  return value != null && (type == "object" || type == "function");
}
var isObject_default = isObject;

// node_modules/lodash-es/isFunction.js
var asyncTag = "[object AsyncFunction]";
var funcTag = "[object Function]";
var genTag = "[object GeneratorFunction]";
var proxyTag = "[object Proxy]";
function isFunction(value) {
  if (!isObject_default(value)) {
    return false;
  }
  var tag = baseGetTag_default(value);
  return tag == funcTag || tag == genTag || tag == asyncTag || tag == proxyTag;
}
var isFunction_default = isFunction;

// node_modules/lodash-es/_coreJsData.js
var coreJsData = root_default["__core-js_shared__"];
var coreJsData_default = coreJsData;

// node_modules/lodash-es/_isMasked.js
var maskSrcKey = function() {
  var uid = /[^.]+$/.exec(coreJsData_default && coreJsData_default.keys && coreJsData_default.keys.IE_PROTO || "");
  return uid ? "Symbol(src)_1." + uid : "";
}();
function isMasked(func) {
  return !!maskSrcKey && maskSrcKey in func;
}
var isMasked_default = isMasked;

// node_modules/lodash-es/_toSource.js
var funcProto = Function.prototype;
var funcToString = funcProto.toString;
function toSource(func) {
  if (func != null) {
    try {
      return funcToString.call(func);
    } catch (e) {
    }
    try {
      return func + "";
    } catch (e) {
    }
  }
  return "";
}
var toSource_default = toSource;

// node_modules/lodash-es/_baseIsNative.js
var reRegExpChar = /[\\^$.*+?()[\]{}|]/g;
var reIsHostCtor = /^\[object .+?Constructor\]$/;
var funcProto2 = Function.prototype;
var objectProto3 = Object.prototype;
var funcToString2 = funcProto2.toString;
var hasOwnProperty2 = objectProto3.hasOwnProperty;
var reIsNative = RegExp(
  "^" + funcToString2.call(hasOwnProperty2).replace(reRegExpChar, "\\$&").replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, "$1.*?") + "$"
);
function baseIsNative(value) {
  if (!isObject_default(value) || isMasked_default(value)) {
    return false;
  }
  var pattern = isFunction_default(value) ? reIsNative : reIsHostCtor;
  return pattern.test(toSource_default(value));
}
var baseIsNative_default = baseIsNative;

// node_modules/lodash-es/_getValue.js
function getValue(object, key) {
  return object == null ? void 0 : object[key];
}
var getValue_default = getValue;

// node_modules/lodash-es/_getNative.js
function getNative(object, key) {
  var value = getValue_default(object, key);
  return baseIsNative_default(value) ? value : void 0;
}
var getNative_default = getNative;

// node_modules/lodash-es/_WeakMap.js
var WeakMap = getNative_default(root_default, "WeakMap");
var WeakMap_default = WeakMap;

// node_modules/lodash-es/noop.js
function noop() {
}
var noop_default = noop;

// node_modules/lodash-es/_baseFindIndex.js
function baseFindIndex(array, predicate, fromIndex, fromRight) {
  var length = array.length, index = fromIndex + (fromRight ? 1 : -1);
  while (fromRight ? index-- : ++index < length) {
    if (predicate(array[index], index, array)) {
      return index;
    }
  }
  return -1;
}
var baseFindIndex_default = baseFindIndex;

// node_modules/lodash-es/_baseIsNaN.js
function baseIsNaN(value) {
  return value !== value;
}
var baseIsNaN_default = baseIsNaN;

// node_modules/lodash-es/_strictIndexOf.js
function strictIndexOf(array, value, fromIndex) {
  var index = fromIndex - 1, length = array.length;
  while (++index < length) {
    if (array[index] === value) {
      return index;
    }
  }
  return -1;
}
var strictIndexOf_default = strictIndexOf;

// node_modules/lodash-es/_baseIndexOf.js
function baseIndexOf(array, value, fromIndex) {
  return value === value ? strictIndexOf_default(array, value, fromIndex) : baseFindIndex_default(array, baseIsNaN_default, fromIndex);
}
var baseIndexOf_default = baseIndexOf;

// node_modules/lodash-es/_arrayIncludes.js
function arrayIncludes(array, value) {
  var length = array == null ? 0 : array.length;
  return !!length && baseIndexOf_default(array, value, 0) > -1;
}
var arrayIncludes_default = arrayIncludes;

// node_modules/lodash-es/_isIndex.js
var MAX_SAFE_INTEGER = 9007199254740991;
var reIsUint = /^(?:0|[1-9]\d*)$/;
function isIndex(value, length) {
  var type = typeof value;
  length = length == null ? MAX_SAFE_INTEGER : length;
  return !!length && (type == "number" || type != "symbol" && reIsUint.test(value)) && (value > -1 && value % 1 == 0 && value < length);
}
var isIndex_default = isIndex;

// node_modules/lodash-es/eq.js
function eq(value, other) {
  return value === other || value !== value && other !== other;
}
var eq_default = eq;

// node_modules/lodash-es/isLength.js
var MAX_SAFE_INTEGER2 = 9007199254740991;
function isLength(value) {
  return typeof value == "number" && value > -1 && value % 1 == 0 && value <= MAX_SAFE_INTEGER2;
}
var isLength_default = isLength;

// node_modules/lodash-es/isArrayLike.js
function isArrayLike(value) {
  return value != null && isLength_default(value.length) && !isFunction_default(value);
}
var isArrayLike_default = isArrayLike;

// node_modules/lodash-es/_isPrototype.js
var objectProto4 = Object.prototype;
function isPrototype(value) {
  var Ctor = value && value.constructor, proto = typeof Ctor == "function" && Ctor.prototype || objectProto4;
  return value === proto;
}
var isPrototype_default = isPrototype;

// node_modules/lodash-es/_baseTimes.js
function baseTimes(n, iteratee) {
  var index = -1, result = Array(n);
  while (++index < n) {
    result[index] = iteratee(index);
  }
  return result;
}
var baseTimes_default = baseTimes;

// node_modules/lodash-es/_baseIsArguments.js
var argsTag = "[object Arguments]";
function baseIsArguments(value) {
  return isObjectLike_default(value) && baseGetTag_default(value) == argsTag;
}
var baseIsArguments_default = baseIsArguments;

// node_modules/lodash-es/isArguments.js
var objectProto5 = Object.prototype;
var hasOwnProperty3 = objectProto5.hasOwnProperty;
var propertyIsEnumerable = objectProto5.propertyIsEnumerable;
var isArguments = baseIsArguments_default(/* @__PURE__ */ function() {
  return arguments;
}()) ? baseIsArguments_default : function(value) {
  return isObjectLike_default(value) && hasOwnProperty3.call(value, "callee") && !propertyIsEnumerable.call(value, "callee");
};
var isArguments_default = isArguments;

// node_modules/lodash-es/stubFalse.js
function stubFalse() {
  return false;
}
var stubFalse_default = stubFalse;

// node_modules/lodash-es/isBuffer.js
var freeExports = typeof exports == "object" && exports && !exports.nodeType && exports;
var freeModule = freeExports && typeof module == "object" && module && !module.nodeType && module;
var moduleExports = freeModule && freeModule.exports === freeExports;
var Buffer2 = moduleExports ? root_default.Buffer : void 0;
var nativeIsBuffer = Buffer2 ? Buffer2.isBuffer : void 0;
var isBuffer = nativeIsBuffer || stubFalse_default;
var isBuffer_default = isBuffer;

// node_modules/lodash-es/_baseIsTypedArray.js
var argsTag2 = "[object Arguments]";
var arrayTag = "[object Array]";
var boolTag = "[object Boolean]";
var dateTag = "[object Date]";
var errorTag = "[object Error]";
var funcTag2 = "[object Function]";
var mapTag = "[object Map]";
var numberTag = "[object Number]";
var objectTag = "[object Object]";
var regexpTag = "[object RegExp]";
var setTag = "[object Set]";
var stringTag = "[object String]";
var weakMapTag = "[object WeakMap]";
var arrayBufferTag = "[object ArrayBuffer]";
var dataViewTag = "[object DataView]";
var float32Tag = "[object Float32Array]";
var float64Tag = "[object Float64Array]";
var int8Tag = "[object Int8Array]";
var int16Tag = "[object Int16Array]";
var int32Tag = "[object Int32Array]";
var uint8Tag = "[object Uint8Array]";
var uint8ClampedTag = "[object Uint8ClampedArray]";
var uint16Tag = "[object Uint16Array]";
var uint32Tag = "[object Uint32Array]";
var typedArrayTags = {};
typedArrayTags[float32Tag] = typedArrayTags[float64Tag] = typedArrayTags[int8Tag] = typedArrayTags[int16Tag] = typedArrayTags[int32Tag] = typedArrayTags[uint8Tag] = typedArrayTags[uint8ClampedTag] = typedArrayTags[uint16Tag] = typedArrayTags[uint32Tag] = true;
typedArrayTags[argsTag2] = typedArrayTags[arrayTag] = typedArrayTags[arrayBufferTag] = typedArrayTags[boolTag] = typedArrayTags[dataViewTag] = typedArrayTags[dateTag] = typedArrayTags[errorTag] = typedArrayTags[funcTag2] = typedArrayTags[mapTag] = typedArrayTags[numberTag] = typedArrayTags[objectTag] = typedArrayTags[regexpTag] = typedArrayTags[setTag] = typedArrayTags[stringTag] = typedArrayTags[weakMapTag] = false;
function baseIsTypedArray(value) {
  return isObjectLike_default(value) && isLength_default(value.length) && !!typedArrayTags[baseGetTag_default(value)];
}
var baseIsTypedArray_default = baseIsTypedArray;

// node_modules/lodash-es/_baseUnary.js
function baseUnary(func) {
  return function(value) {
    return func(value);
  };
}
var baseUnary_default = baseUnary;

// node_modules/lodash-es/_nodeUtil.js
var freeExports2 = typeof exports == "object" && exports && !exports.nodeType && exports;
var freeModule2 = freeExports2 && typeof module == "object" && module && !module.nodeType && module;
var moduleExports2 = freeModule2 && freeModule2.exports === freeExports2;
var freeProcess = moduleExports2 && freeGlobal_default.process;
var nodeUtil = function() {
  try {
    var types = freeModule2 && freeModule2.require && freeModule2.require("util").types;
    if (types) {
      return types;
    }
    return freeProcess && freeProcess.binding && freeProcess.binding("util");
  } catch (e) {
  }
}();
var nodeUtil_default = nodeUtil;

// node_modules/lodash-es/isTypedArray.js
var nodeIsTypedArray = nodeUtil_default && nodeUtil_default.isTypedArray;
var isTypedArray = nodeIsTypedArray ? baseUnary_default(nodeIsTypedArray) : baseIsTypedArray_default;
var isTypedArray_default = isTypedArray;

// node_modules/lodash-es/_arrayLikeKeys.js
var objectProto6 = Object.prototype;
var hasOwnProperty4 = objectProto6.hasOwnProperty;
function arrayLikeKeys(value, inherited) {
  var isArr = isArray_default(value), isArg = !isArr && isArguments_default(value), isBuff = !isArr && !isArg && isBuffer_default(value), isType = !isArr && !isArg && !isBuff && isTypedArray_default(value), skipIndexes = isArr || isArg || isBuff || isType, result = skipIndexes ? baseTimes_default(value.length, String) : [], length = result.length;
  for (var key in value) {
    if ((inherited || hasOwnProperty4.call(value, key)) && !(skipIndexes && // Safari 9 has enumerable `arguments.length` in strict mode.
    (key == "length" || // Node.js 0.10 has enumerable non-index properties on buffers.
    isBuff && (key == "offset" || key == "parent") || // PhantomJS 2 has enumerable non-index properties on typed arrays.
    isType && (key == "buffer" || key == "byteLength" || key == "byteOffset") || // Skip index properties.
    isIndex_default(key, length)))) {
      result.push(key);
    }
  }
  return result;
}
var arrayLikeKeys_default = arrayLikeKeys;

// node_modules/lodash-es/_overArg.js
function overArg(func, transform) {
  return function(arg) {
    return func(transform(arg));
  };
}
var overArg_default = overArg;

// node_modules/lodash-es/_nativeKeys.js
var nativeKeys = overArg_default(Object.keys, Object);
var nativeKeys_default = nativeKeys;

// node_modules/lodash-es/_baseKeys.js
var objectProto7 = Object.prototype;
var hasOwnProperty5 = objectProto7.hasOwnProperty;
function baseKeys(object) {
  if (!isPrototype_default(object)) {
    return nativeKeys_default(object);
  }
  var result = [];
  for (var key in Object(object)) {
    if (hasOwnProperty5.call(object, key) && key != "constructor") {
      result.push(key);
    }
  }
  return result;
}
var baseKeys_default = baseKeys;

// node_modules/lodash-es/keys.js
function keys(object) {
  return isArrayLike_default(object) ? arrayLikeKeys_default(object) : baseKeys_default(object);
}
var keys_default = keys;

// node_modules/lodash-es/_nativeCreate.js
var nativeCreate = getNative_default(Object, "create");
var nativeCreate_default = nativeCreate;

// node_modules/lodash-es/_hashClear.js
function hashClear() {
  this.__data__ = nativeCreate_default ? nativeCreate_default(null) : {};
  this.size = 0;
}
var hashClear_default = hashClear;

// node_modules/lodash-es/_hashDelete.js
function hashDelete(key) {
  var result = this.has(key) && delete this.__data__[key];
  this.size -= result ? 1 : 0;
  return result;
}
var hashDelete_default = hashDelete;

// node_modules/lodash-es/_hashGet.js
var HASH_UNDEFINED = "__lodash_hash_undefined__";
var objectProto8 = Object.prototype;
var hasOwnProperty6 = objectProto8.hasOwnProperty;
function hashGet(key) {
  var data = this.__data__;
  if (nativeCreate_default) {
    var result = data[key];
    return result === HASH_UNDEFINED ? void 0 : result;
  }
  return hasOwnProperty6.call(data, key) ? data[key] : void 0;
}
var hashGet_default = hashGet;

// node_modules/lodash-es/_hashHas.js
var objectProto9 = Object.prototype;
var hasOwnProperty7 = objectProto9.hasOwnProperty;
function hashHas(key) {
  var data = this.__data__;
  return nativeCreate_default ? data[key] !== void 0 : hasOwnProperty7.call(data, key);
}
var hashHas_default = hashHas;

// node_modules/lodash-es/_hashSet.js
var HASH_UNDEFINED2 = "__lodash_hash_undefined__";
function hashSet(key, value) {
  var data = this.__data__;
  this.size += this.has(key) ? 0 : 1;
  data[key] = nativeCreate_default && value === void 0 ? HASH_UNDEFINED2 : value;
  return this;
}
var hashSet_default = hashSet;

// node_modules/lodash-es/_Hash.js
function Hash(entries) {
  var index = -1, length = entries == null ? 0 : entries.length;
  this.clear();
  while (++index < length) {
    var entry = entries[index];
    this.set(entry[0], entry[1]);
  }
}
Hash.prototype.clear = hashClear_default;
Hash.prototype["delete"] = hashDelete_default;
Hash.prototype.get = hashGet_default;
Hash.prototype.has = hashHas_default;
Hash.prototype.set = hashSet_default;
var Hash_default = Hash;

// node_modules/lodash-es/_listCacheClear.js
function listCacheClear() {
  this.__data__ = [];
  this.size = 0;
}
var listCacheClear_default = listCacheClear;

// node_modules/lodash-es/_assocIndexOf.js
function assocIndexOf(array, key) {
  var length = array.length;
  while (length--) {
    if (eq_default(array[length][0], key)) {
      return length;
    }
  }
  return -1;
}
var assocIndexOf_default = assocIndexOf;

// node_modules/lodash-es/_listCacheDelete.js
var arrayProto = Array.prototype;
var splice = arrayProto.splice;
function listCacheDelete(key) {
  var data = this.__data__, index = assocIndexOf_default(data, key);
  if (index < 0) {
    return false;
  }
  var lastIndex = data.length - 1;
  if (index == lastIndex) {
    data.pop();
  } else {
    splice.call(data, index, 1);
  }
  --this.size;
  return true;
}
var listCacheDelete_default = listCacheDelete;

// node_modules/lodash-es/_listCacheGet.js
function listCacheGet(key) {
  var data = this.__data__, index = assocIndexOf_default(data, key);
  return index < 0 ? void 0 : data[index][1];
}
var listCacheGet_default = listCacheGet;

// node_modules/lodash-es/_listCacheHas.js
function listCacheHas(key) {
  return assocIndexOf_default(this.__data__, key) > -1;
}
var listCacheHas_default = listCacheHas;

// node_modules/lodash-es/_listCacheSet.js
function listCacheSet(key, value) {
  var data = this.__data__, index = assocIndexOf_default(data, key);
  if (index < 0) {
    ++this.size;
    data.push([key, value]);
  } else {
    data[index][1] = value;
  }
  return this;
}
var listCacheSet_default = listCacheSet;

// node_modules/lodash-es/_ListCache.js
function ListCache(entries) {
  var index = -1, length = entries == null ? 0 : entries.length;
  this.clear();
  while (++index < length) {
    var entry = entries[index];
    this.set(entry[0], entry[1]);
  }
}
ListCache.prototype.clear = listCacheClear_default;
ListCache.prototype["delete"] = listCacheDelete_default;
ListCache.prototype.get = listCacheGet_default;
ListCache.prototype.has = listCacheHas_default;
ListCache.prototype.set = listCacheSet_default;
var ListCache_default = ListCache;

// node_modules/lodash-es/_Map.js
var Map = getNative_default(root_default, "Map");
var Map_default = Map;

// node_modules/lodash-es/_mapCacheClear.js
function mapCacheClear() {
  this.size = 0;
  this.__data__ = {
    "hash": new Hash_default(),
    "map": new (Map_default || ListCache_default)(),
    "string": new Hash_default()
  };
}
var mapCacheClear_default = mapCacheClear;

// node_modules/lodash-es/_isKeyable.js
function isKeyable(value) {
  var type = typeof value;
  return type == "string" || type == "number" || type == "symbol" || type == "boolean" ? value !== "__proto__" : value === null;
}
var isKeyable_default = isKeyable;

// node_modules/lodash-es/_getMapData.js
function getMapData(map, key) {
  var data = map.__data__;
  return isKeyable_default(key) ? data[typeof key == "string" ? "string" : "hash"] : data.map;
}
var getMapData_default = getMapData;

// node_modules/lodash-es/_mapCacheDelete.js
function mapCacheDelete(key) {
  var result = getMapData_default(this, key)["delete"](key);
  this.size -= result ? 1 : 0;
  return result;
}
var mapCacheDelete_default = mapCacheDelete;

// node_modules/lodash-es/_mapCacheGet.js
function mapCacheGet(key) {
  return getMapData_default(this, key).get(key);
}
var mapCacheGet_default = mapCacheGet;

// node_modules/lodash-es/_mapCacheHas.js
function mapCacheHas(key) {
  return getMapData_default(this, key).has(key);
}
var mapCacheHas_default = mapCacheHas;

// node_modules/lodash-es/_mapCacheSet.js
function mapCacheSet(key, value) {
  var data = getMapData_default(this, key), size = data.size;
  data.set(key, value);
  this.size += data.size == size ? 0 : 1;
  return this;
}
var mapCacheSet_default = mapCacheSet;

// node_modules/lodash-es/_MapCache.js
function MapCache(entries) {
  var index = -1, length = entries == null ? 0 : entries.length;
  this.clear();
  while (++index < length) {
    var entry = entries[index];
    this.set(entry[0], entry[1]);
  }
}
MapCache.prototype.clear = mapCacheClear_default;
MapCache.prototype["delete"] = mapCacheDelete_default;
MapCache.prototype.get = mapCacheGet_default;
MapCache.prototype.has = mapCacheHas_default;
MapCache.prototype.set = mapCacheSet_default;
var MapCache_default = MapCache;

// node_modules/lodash-es/toString.js
function toString(value) {
  return value == null ? "" : baseToString_default(value);
}
var toString_default = toString;

// node_modules/lodash-es/_arrayPush.js
function arrayPush(array, values) {
  var index = -1, length = values.length, offset = array.length;
  while (++index < length) {
    array[offset + index] = values[index];
  }
  return array;
}
var arrayPush_default = arrayPush;

// node_modules/lodash-es/_basePropertyOf.js
function basePropertyOf(object) {
  return function(key) {
    return object == null ? void 0 : object[key];
  };
}
var basePropertyOf_default = basePropertyOf;

// node_modules/lodash-es/_stackClear.js
function stackClear() {
  this.__data__ = new ListCache_default();
  this.size = 0;
}
var stackClear_default = stackClear;

// node_modules/lodash-es/_stackDelete.js
function stackDelete(key) {
  var data = this.__data__, result = data["delete"](key);
  this.size = data.size;
  return result;
}
var stackDelete_default = stackDelete;

// node_modules/lodash-es/_stackGet.js
function stackGet(key) {
  return this.__data__.get(key);
}
var stackGet_default = stackGet;

// node_modules/lodash-es/_stackHas.js
function stackHas(key) {
  return this.__data__.has(key);
}
var stackHas_default = stackHas;

// node_modules/lodash-es/_stackSet.js
var LARGE_ARRAY_SIZE = 200;
function stackSet(key, value) {
  var data = this.__data__;
  if (data instanceof ListCache_default) {
    var pairs = data.__data__;
    if (!Map_default || pairs.length < LARGE_ARRAY_SIZE - 1) {
      pairs.push([key, value]);
      this.size = ++data.size;
      return this;
    }
    data = this.__data__ = new MapCache_default(pairs);
  }
  data.set(key, value);
  this.size = data.size;
  return this;
}
var stackSet_default = stackSet;

// node_modules/lodash-es/_Stack.js
function Stack(entries) {
  var data = this.__data__ = new ListCache_default(entries);
  this.size = data.size;
}
Stack.prototype.clear = stackClear_default;
Stack.prototype["delete"] = stackDelete_default;
Stack.prototype.get = stackGet_default;
Stack.prototype.has = stackHas_default;
Stack.prototype.set = stackSet_default;
var Stack_default = Stack;

// node_modules/lodash-es/_arrayFilter.js
function arrayFilter(array, predicate) {
  var index = -1, length = array == null ? 0 : array.length, resIndex = 0, result = [];
  while (++index < length) {
    var value = array[index];
    if (predicate(value, index, array)) {
      result[resIndex++] = value;
    }
  }
  return result;
}
var arrayFilter_default = arrayFilter;

// node_modules/lodash-es/stubArray.js
function stubArray() {
  return [];
}
var stubArray_default = stubArray;

// node_modules/lodash-es/_getSymbols.js
var objectProto10 = Object.prototype;
var propertyIsEnumerable2 = objectProto10.propertyIsEnumerable;
var nativeGetSymbols = Object.getOwnPropertySymbols;
var getSymbols = !nativeGetSymbols ? stubArray_default : function(object) {
  if (object == null) {
    return [];
  }
  object = Object(object);
  return arrayFilter_default(nativeGetSymbols(object), function(symbol) {
    return propertyIsEnumerable2.call(object, symbol);
  });
};
var getSymbols_default = getSymbols;

// node_modules/lodash-es/_baseGetAllKeys.js
function baseGetAllKeys(object, keysFunc, symbolsFunc) {
  var result = keysFunc(object);
  return isArray_default(object) ? result : arrayPush_default(result, symbolsFunc(object));
}
var baseGetAllKeys_default = baseGetAllKeys;

// node_modules/lodash-es/_getAllKeys.js
function getAllKeys(object) {
  return baseGetAllKeys_default(object, keys_default, getSymbols_default);
}
var getAllKeys_default = getAllKeys;

// node_modules/lodash-es/_DataView.js
var DataView = getNative_default(root_default, "DataView");
var DataView_default = DataView;

// node_modules/lodash-es/_Promise.js
var Promise2 = getNative_default(root_default, "Promise");
var Promise_default = Promise2;

// node_modules/lodash-es/_Set.js
var Set = getNative_default(root_default, "Set");
var Set_default = Set;

// node_modules/lodash-es/_getTag.js
var mapTag2 = "[object Map]";
var objectTag2 = "[object Object]";
var promiseTag = "[object Promise]";
var setTag2 = "[object Set]";
var weakMapTag2 = "[object WeakMap]";
var dataViewTag2 = "[object DataView]";
var dataViewCtorString = toSource_default(DataView_default);
var mapCtorString = toSource_default(Map_default);
var promiseCtorString = toSource_default(Promise_default);
var setCtorString = toSource_default(Set_default);
var weakMapCtorString = toSource_default(WeakMap_default);
var getTag = baseGetTag_default;
if (DataView_default && getTag(new DataView_default(new ArrayBuffer(1))) != dataViewTag2 || Map_default && getTag(new Map_default()) != mapTag2 || Promise_default && getTag(Promise_default.resolve()) != promiseTag || Set_default && getTag(new Set_default()) != setTag2 || WeakMap_default && getTag(new WeakMap_default()) != weakMapTag2) {
  getTag = function(value) {
    var result = baseGetTag_default(value), Ctor = result == objectTag2 ? value.constructor : void 0, ctorString = Ctor ? toSource_default(Ctor) : "";
    if (ctorString) {
      switch (ctorString) {
        case dataViewCtorString:
          return dataViewTag2;
        case mapCtorString:
          return mapTag2;
        case promiseCtorString:
          return promiseTag;
        case setCtorString:
          return setTag2;
        case weakMapCtorString:
          return weakMapTag2;
      }
    }
    return result;
  };
}
var getTag_default = getTag;

// node_modules/lodash-es/_Uint8Array.js
var Uint8Array2 = root_default.Uint8Array;
var Uint8Array_default = Uint8Array2;

// node_modules/lodash-es/_setCacheAdd.js
var HASH_UNDEFINED3 = "__lodash_hash_undefined__";
function setCacheAdd(value) {
  this.__data__.set(value, HASH_UNDEFINED3);
  return this;
}
var setCacheAdd_default = setCacheAdd;

// node_modules/lodash-es/_setCacheHas.js
function setCacheHas(value) {
  return this.__data__.has(value);
}
var setCacheHas_default = setCacheHas;

// node_modules/lodash-es/_SetCache.js
function SetCache(values) {
  var index = -1, length = values == null ? 0 : values.length;
  this.__data__ = new MapCache_default();
  while (++index < length) {
    this.add(values[index]);
  }
}
SetCache.prototype.add = SetCache.prototype.push = setCacheAdd_default;
SetCache.prototype.has = setCacheHas_default;
var SetCache_default = SetCache;

// node_modules/lodash-es/_arraySome.js
function arraySome(array, predicate) {
  var index = -1, length = array == null ? 0 : array.length;
  while (++index < length) {
    if (predicate(array[index], index, array)) {
      return true;
    }
  }
  return false;
}
var arraySome_default = arraySome;

// node_modules/lodash-es/_cacheHas.js
function cacheHas(cache, key) {
  return cache.has(key);
}
var cacheHas_default = cacheHas;

// node_modules/lodash-es/_equalArrays.js
var COMPARE_PARTIAL_FLAG = 1;
var COMPARE_UNORDERED_FLAG = 2;
function equalArrays(array, other, bitmask, customizer, equalFunc, stack) {
  var isPartial = bitmask & COMPARE_PARTIAL_FLAG, arrLength = array.length, othLength = other.length;
  if (arrLength != othLength && !(isPartial && othLength > arrLength)) {
    return false;
  }
  var arrStacked = stack.get(array);
  var othStacked = stack.get(other);
  if (arrStacked && othStacked) {
    return arrStacked == other && othStacked == array;
  }
  var index = -1, result = true, seen = bitmask & COMPARE_UNORDERED_FLAG ? new SetCache_default() : void 0;
  stack.set(array, other);
  stack.set(other, array);
  while (++index < arrLength) {
    var arrValue = array[index], othValue = other[index];
    if (customizer) {
      var compared = isPartial ? customizer(othValue, arrValue, index, other, array, stack) : customizer(arrValue, othValue, index, array, other, stack);
    }
    if (compared !== void 0) {
      if (compared) {
        continue;
      }
      result = false;
      break;
    }
    if (seen) {
      if (!arraySome_default(other, function(othValue2, othIndex) {
        if (!cacheHas_default(seen, othIndex) && (arrValue === othValue2 || equalFunc(arrValue, othValue2, bitmask, customizer, stack))) {
          return seen.push(othIndex);
        }
      })) {
        result = false;
        break;
      }
    } else if (!(arrValue === othValue || equalFunc(arrValue, othValue, bitmask, customizer, stack))) {
      result = false;
      break;
    }
  }
  stack["delete"](array);
  stack["delete"](other);
  return result;
}
var equalArrays_default = equalArrays;

// node_modules/lodash-es/_mapToArray.js
function mapToArray(map) {
  var index = -1, result = Array(map.size);
  map.forEach(function(value, key) {
    result[++index] = [key, value];
  });
  return result;
}
var mapToArray_default = mapToArray;

// node_modules/lodash-es/_setToArray.js
function setToArray(set) {
  var index = -1, result = Array(set.size);
  set.forEach(function(value) {
    result[++index] = value;
  });
  return result;
}
var setToArray_default = setToArray;

// node_modules/lodash-es/_equalByTag.js
var COMPARE_PARTIAL_FLAG2 = 1;
var COMPARE_UNORDERED_FLAG2 = 2;
var boolTag2 = "[object Boolean]";
var dateTag2 = "[object Date]";
var errorTag2 = "[object Error]";
var mapTag3 = "[object Map]";
var numberTag2 = "[object Number]";
var regexpTag2 = "[object RegExp]";
var setTag3 = "[object Set]";
var stringTag2 = "[object String]";
var symbolTag2 = "[object Symbol]";
var arrayBufferTag2 = "[object ArrayBuffer]";
var dataViewTag3 = "[object DataView]";
var symbolProto2 = Symbol_default ? Symbol_default.prototype : void 0;
var symbolValueOf = symbolProto2 ? symbolProto2.valueOf : void 0;
function equalByTag(object, other, tag, bitmask, customizer, equalFunc, stack) {
  switch (tag) {
    case dataViewTag3:
      if (object.byteLength != other.byteLength || object.byteOffset != other.byteOffset) {
        return false;
      }
      object = object.buffer;
      other = other.buffer;
    case arrayBufferTag2:
      if (object.byteLength != other.byteLength || !equalFunc(new Uint8Array_default(object), new Uint8Array_default(other))) {
        return false;
      }
      return true;
    case boolTag2:
    case dateTag2:
    case numberTag2:
      return eq_default(+object, +other);
    case errorTag2:
      return object.name == other.name && object.message == other.message;
    case regexpTag2:
    case stringTag2:
      return object == other + "";
    case mapTag3:
      var convert = mapToArray_default;
    case setTag3:
      var isPartial = bitmask & COMPARE_PARTIAL_FLAG2;
      convert || (convert = setToArray_default);
      if (object.size != other.size && !isPartial) {
        return false;
      }
      var stacked = stack.get(object);
      if (stacked) {
        return stacked == other;
      }
      bitmask |= COMPARE_UNORDERED_FLAG2;
      stack.set(object, other);
      var result = equalArrays_default(convert(object), convert(other), bitmask, customizer, equalFunc, stack);
      stack["delete"](object);
      return result;
    case symbolTag2:
      if (symbolValueOf) {
        return symbolValueOf.call(object) == symbolValueOf.call(other);
      }
  }
  return false;
}
var equalByTag_default = equalByTag;

// node_modules/lodash-es/_equalObjects.js
var COMPARE_PARTIAL_FLAG3 = 1;
var objectProto11 = Object.prototype;
var hasOwnProperty8 = objectProto11.hasOwnProperty;
function equalObjects(object, other, bitmask, customizer, equalFunc, stack) {
  var isPartial = bitmask & COMPARE_PARTIAL_FLAG3, objProps = getAllKeys_default(object), objLength = objProps.length, othProps = getAllKeys_default(other), othLength = othProps.length;
  if (objLength != othLength && !isPartial) {
    return false;
  }
  var index = objLength;
  while (index--) {
    var key = objProps[index];
    if (!(isPartial ? key in other : hasOwnProperty8.call(other, key))) {
      return false;
    }
  }
  var objStacked = stack.get(object);
  var othStacked = stack.get(other);
  if (objStacked && othStacked) {
    return objStacked == other && othStacked == object;
  }
  var result = true;
  stack.set(object, other);
  stack.set(other, object);
  var skipCtor = isPartial;
  while (++index < objLength) {
    key = objProps[index];
    var objValue = object[key], othValue = other[key];
    if (customizer) {
      var compared = isPartial ? customizer(othValue, objValue, key, other, object, stack) : customizer(objValue, othValue, key, object, other, stack);
    }
    if (!(compared === void 0 ? objValue === othValue || equalFunc(objValue, othValue, bitmask, customizer, stack) : compared)) {
      result = false;
      break;
    }
    skipCtor || (skipCtor = key == "constructor");
  }
  if (result && !skipCtor) {
    var objCtor = object.constructor, othCtor = other.constructor;
    if (objCtor != othCtor && ("constructor" in object && "constructor" in other) && !(typeof objCtor == "function" && objCtor instanceof objCtor && typeof othCtor == "function" && othCtor instanceof othCtor)) {
      result = false;
    }
  }
  stack["delete"](object);
  stack["delete"](other);
  return result;
}
var equalObjects_default = equalObjects;

// node_modules/lodash-es/_baseIsEqualDeep.js
var COMPARE_PARTIAL_FLAG4 = 1;
var argsTag3 = "[object Arguments]";
var arrayTag2 = "[object Array]";
var objectTag3 = "[object Object]";
var objectProto12 = Object.prototype;
var hasOwnProperty9 = objectProto12.hasOwnProperty;
function baseIsEqualDeep(object, other, bitmask, customizer, equalFunc, stack) {
  var objIsArr = isArray_default(object), othIsArr = isArray_default(other), objTag = objIsArr ? arrayTag2 : getTag_default(object), othTag = othIsArr ? arrayTag2 : getTag_default(other);
  objTag = objTag == argsTag3 ? objectTag3 : objTag;
  othTag = othTag == argsTag3 ? objectTag3 : othTag;
  var objIsObj = objTag == objectTag3, othIsObj = othTag == objectTag3, isSameTag = objTag == othTag;
  if (isSameTag && isBuffer_default(object)) {
    if (!isBuffer_default(other)) {
      return false;
    }
    objIsArr = true;
    objIsObj = false;
  }
  if (isSameTag && !objIsObj) {
    stack || (stack = new Stack_default());
    return objIsArr || isTypedArray_default(object) ? equalArrays_default(object, other, bitmask, customizer, equalFunc, stack) : equalByTag_default(object, other, objTag, bitmask, customizer, equalFunc, stack);
  }
  if (!(bitmask & COMPARE_PARTIAL_FLAG4)) {
    var objIsWrapped = objIsObj && hasOwnProperty9.call(object, "__wrapped__"), othIsWrapped = othIsObj && hasOwnProperty9.call(other, "__wrapped__");
    if (objIsWrapped || othIsWrapped) {
      var objUnwrapped = objIsWrapped ? object.value() : object, othUnwrapped = othIsWrapped ? other.value() : other;
      stack || (stack = new Stack_default());
      return equalFunc(objUnwrapped, othUnwrapped, bitmask, customizer, stack);
    }
  }
  if (!isSameTag) {
    return false;
  }
  stack || (stack = new Stack_default());
  return equalObjects_default(object, other, bitmask, customizer, equalFunc, stack);
}
var baseIsEqualDeep_default = baseIsEqualDeep;

// node_modules/lodash-es/_baseIsEqual.js
function baseIsEqual(value, other, bitmask, customizer, stack) {
  if (value === other) {
    return true;
  }
  if (value == null || other == null || !isObjectLike_default(value) && !isObjectLike_default(other)) {
    return value !== value && other !== other;
  }
  return baseIsEqualDeep_default(value, other, bitmask, customizer, baseIsEqual, stack);
}
var baseIsEqual_default = baseIsEqual;

// node_modules/lodash-es/_arrayIncludesWith.js
function arrayIncludesWith(array, value, comparator) {
  var index = -1, length = array == null ? 0 : array.length;
  while (++index < length) {
    if (comparator(value, array[index])) {
      return true;
    }
  }
  return false;
}
var arrayIncludesWith_default = arrayIncludesWith;

// node_modules/lodash-es/_escapeHtmlChar.js
var htmlEscapes = {
  "&": "&amp;",
  "<": "&lt;",
  ">": "&gt;",
  '"': "&quot;",
  "'": "&#39;"
};
var escapeHtmlChar = basePropertyOf_default(htmlEscapes);
var escapeHtmlChar_default = escapeHtmlChar;

// node_modules/lodash-es/escape.js
var reUnescapedHtml = /[&<>"']/g;
var reHasUnescapedHtml = RegExp(reUnescapedHtml.source);
function escape(string) {
  string = toString_default(string);
  return string && reHasUnescapedHtml.test(string) ? string.replace(reUnescapedHtml, escapeHtmlChar_default) : string;
}
var escape_default = escape;

// node_modules/lodash-es/escapeRegExp.js
var reRegExpChar2 = /[\\^$.*+?()[\]{}|]/g;
var reHasRegExpChar = RegExp(reRegExpChar2.source);
function escapeRegExp(string) {
  string = toString_default(string);
  return string && reHasRegExpChar.test(string) ? string.replace(reRegExpChar2, "\\$&") : string;
}
var escapeRegExp_default = escapeRegExp;

// node_modules/lodash-es/isEqual.js
function isEqual(value, other) {
  return baseIsEqual_default(value, other);
}
var isEqual_default = isEqual;

// node_modules/lodash-es/_createSet.js
var INFINITY2 = 1 / 0;
var createSet = !(Set_default && 1 / setToArray_default(new Set_default([, -0]))[1] == INFINITY2) ? noop_default : function(values) {
  return new Set_default(values);
};
var createSet_default = createSet;

// node_modules/lodash-es/_baseUniq.js
var LARGE_ARRAY_SIZE2 = 200;
function baseUniq(array, iteratee, comparator) {
  var index = -1, includes = arrayIncludes_default, length = array.length, isCommon = true, result = [], seen = result;
  if (comparator) {
    isCommon = false;
    includes = arrayIncludesWith_default;
  } else if (length >= LARGE_ARRAY_SIZE2) {
    var set = iteratee ? null : createSet_default(array);
    if (set) {
      return setToArray_default(set);
    }
    isCommon = false;
    includes = cacheHas_default;
    seen = new SetCache_default();
  } else {
    seen = iteratee ? [] : result;
  }
  outer:
    while (++index < length) {
      var value = array[index], computed = iteratee ? iteratee(value) : value;
      value = comparator || value !== 0 ? value : 0;
      if (isCommon && computed === computed) {
        var seenIndex = seen.length;
        while (seenIndex--) {
          if (seen[seenIndex] === computed) {
            continue outer;
          }
        }
        if (iteratee) {
          seen.push(computed);
        }
        result.push(value);
      } else if (!includes(seen, computed, comparator)) {
        if (seen !== result) {
          seen.push(computed);
        }
        result.push(value);
      }
    }
  return result;
}
var baseUniq_default = baseUniq;

// node_modules/lodash-es/uniq.js
function uniq(array) {
  return array && array.length ? baseUniq_default(array) : [];
}
var uniq_default = uniq;

// src/components/ClearAllTags.tsx
import { jsx } from "react/jsx-runtime";
var ClearAllTags = (props) => {
  return /* @__PURE__ */ jsx("button", { "aria-label": props["aria-label"], className: props.classNames.clearAll, onClick: props.onClick, children: "Clear all" });
};
var ClearAllTags_default = ClearAllTags;

// src/components/Suggestions.tsx
import { createRef, memo, useEffect } from "react";
import { jsx as jsx2, jsxs } from "react/jsx-runtime";
var maybeScrollSuggestionIntoView = (suggestionEl, suggestionsContainer) => {
  const containerHeight = suggestionsContainer.offsetHeight;
  const suggestionHeight = suggestionEl.offsetHeight;
  const relativeSuggestionTop = suggestionEl.offsetTop - suggestionsContainer.scrollTop;
  if (relativeSuggestionTop + suggestionHeight >= containerHeight) {
    suggestionsContainer.scrollTop += relativeSuggestionTop - containerHeight + suggestionHeight;
  } else if (relativeSuggestionTop < 0) {
    suggestionsContainer.scrollTop += relativeSuggestionTop;
  }
};
var shouldRenderSuggestions = (query, minQueryLength, isFocused, shouldRenderSuggestionsCb) => {
  if (typeof shouldRenderSuggestionsCb === "function") {
    return shouldRenderSuggestionsCb(query);
  }
  return query.length >= minQueryLength && isFocused;
};
var SuggestionsComp = (props) => {
  const suggestionsContainerRef = createRef();
  const {
    labelField,
    minQueryLength,
    isFocused,
    classNames,
    selectedIndex,
    query
  } = props;
  useEffect(() => {
    if (!suggestionsContainerRef.current) {
      return;
    }
    const activeSuggestion = suggestionsContainerRef.current.querySelector(
      `.${classNames.activeSuggestion}`
    );
    if (activeSuggestion) {
      maybeScrollSuggestionIntoView(
        activeSuggestion,
        suggestionsContainerRef.current
      );
    }
  }, [selectedIndex]);
  const markIt = (tag, query2) => {
    const escapedRegex = query2.trim().replace(/[-\\^$*+?.()|[\]{}]/g, "\\$&");
    const { [labelField]: labelValue } = tag;
    return {
      __html: labelValue.replace(RegExp(escapedRegex, "gi"), (x) => {
        return `<mark>${escape_default(x)}</mark>`;
      })
    };
  };
  const renderSuggestion = (tag, query2) => {
    if (typeof props.renderSuggestion === "function") {
      return props.renderSuggestion(tag, query2);
    }
    return /* @__PURE__ */ jsx2("span", { dangerouslySetInnerHTML: markIt(tag, query2) });
  };
  const suggestions = props.suggestions.map((tag, index) => {
    return /* @__PURE__ */ jsx2(
      "li",
      {
        onMouseDown: props.handleClick.bind(null, index),
        onTouchStart: props.handleClick.bind(null, index),
        onMouseOver: props.handleHover.bind(null, index),
        className: index === props.selectedIndex ? props.classNames.activeSuggestion : "",
        children: renderSuggestion(tag, props.query)
      },
      index
    );
  });
  if (suggestions.length === 0 || !shouldRenderSuggestions(
    query,
    minQueryLength || 2,
    isFocused,
    props.shouldRenderSuggestions
  )) {
    return null;
  }
  return /* @__PURE__ */ jsx2(
    "div",
    {
      ref: suggestionsContainerRef,
      className: classNames.suggestions,
      "data-testid": "suggestions",
      children: /* @__PURE__ */ jsxs("ul", { children: [
        " ",
        suggestions,
        " "
      ] })
    }
  );
};
var arePropsEqual = (prevProps, nextProps) => {
  const { query, minQueryLength = 2, isFocused, suggestions } = nextProps;
  if (prevProps.isFocused === isFocused && isEqual_default(prevProps.suggestions, suggestions) && shouldRenderSuggestions(
    query,
    minQueryLength,
    isFocused,
    nextProps.shouldRenderSuggestions
  ) === shouldRenderSuggestions(
    prevProps.query,
    prevProps.minQueryLength ?? 2,
    prevProps.isFocused,
    prevProps.shouldRenderSuggestions
  ) && prevProps.selectedIndex === nextProps.selectedIndex) {
    return true;
  }
  return false;
};
var Suggestions = memo(SuggestionsComp, arePropsEqual);
var Suggestions_default = Suggestions;

// src/components/ReactTags.tsx
var import_classnames2 = __toESM(require_classnames(), 1);

// src/components/SingleTag.tsx
var import_classnames = __toESM(require_classnames(), 1);
import { useRef } from "react";
import { useDrag, useDrop } from "react-dnd";

// src/components/utils.ts
function buildRegExpFromDelimiters(delimiters) {
  const delimiterChars = delimiters.map((delimiter) => {
    const chrCode = delimiter - 48 * Math.floor(delimiter / 48);
    return String.fromCharCode(96 <= delimiter ? chrCode : delimiter);
  }).join("");
  const escapedDelimiterChars = escapeRegExp_default(delimiterChars);
  return new RegExp(`[${escapedDelimiterChars}]+`);
}
function getKeyCodeFromSeparator(separator) {
  switch (separator) {
    case SEPARATORS.ENTER:
      return [10, 13];
    case SEPARATORS.TAB:
      return 9;
    case SEPARATORS.COMMA:
      return 188;
    case SEPARATORS.SPACE:
      return 32;
    case SEPARATORS.SEMICOLON:
      return 186;
    default:
      return 0;
  }
}
function canDrag(params) {
  const { moveTag, readOnly, allowDragDrop } = params;
  return moveTag !== void 0 && !readOnly && allowDragDrop;
}
function canDrop(params) {
  const { readOnly, allowDragDrop } = params;
  return !readOnly && allowDragDrop;
}

// src/components/RemoveComponent.tsx
import { jsx as jsx3 } from "react/jsx-runtime";
var RemoveComponent = (props) => {
  const { readOnly, removeComponent, onRemove, className, tag, index } = props;
  const onKeydown = (event) => {
    if (KEYS.ENTER.includes(event.keyCode) || event.keyCode === KEYS.SPACE) {
      event.preventDefault();
      event.stopPropagation();
      return;
    }
    if (event.keyCode === KEYS.BACKSPACE) {
      onRemove(event);
    }
  };
  if (readOnly) {
    return /* @__PURE__ */ jsx3("span", {});
  }
  const ariaLabel = `Tag at index ${index} with value ${tag.id} focussed. Press backspace to remove`;
  if (removeComponent) {
    const Component = removeComponent;
    return /* @__PURE__ */ jsx3(
      Component,
      {
        "data-testid": "remove",
        onRemove,
        onKeyDown: onKeydown,
        className,
        "aria-label": ariaLabel,
        tag,
        index
      }
    );
  }
  return /* @__PURE__ */ jsx3(
    "button",
    {
      "data-testid": "remove",
      onClick: onRemove,
      onKeyDown: onKeydown,
      className,
      type: "button",
      "aria-label": ariaLabel,
      children: /* @__PURE__ */ jsx3(
        "svg",
        {
          xmlns: "http://www.w3.org/2000/svg",
          viewBox: "0 0 512 512",
          height: "12",
          width: "12",
          fill: "#fff",
          children: /* @__PURE__ */ jsx3("path", { d: "M376.6 84.5c11.3-13.6 9.5-33.8-4.1-45.1s-33.8-9.5-45.1 4.1L192 206 56.6 43.5C45.3 29.9 25.1 28.1 11.5 39.4S-3.9 70.9 7.4 84.5L150.3 256 7.4 427.5c-11.3 13.6-9.5 33.8 4.1 45.1s33.8 9.5 45.1-4.1L192 306 327.4 468.5c11.3 13.6 31.5 15.4 45.1 4.1s15.4-31.5 4.1-45.1L233.7 256 376.6 84.5z" })
        }
      )
    }
  );
};
var RemoveComponent_default = RemoveComponent;

// src/components/SingleTag.tsx
import { jsx as jsx4, jsxs as jsxs2 } from "react/jsx-runtime";
var ItemTypes = { TAG: "tag" };
var SingleTag = (props) => {
  const tagRef = useRef(null);
  const {
    readOnly = false,
    tag,
    classNames,
    index,
    moveTag,
    allowDragDrop = true,
    labelField = "text",
    tags
  } = props;
  const [{ isDragging }, drag] = useDrag(() => ({
    type: ItemTypes.TAG,
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging()
    }),
    item: props,
    canDrag: () => canDrag({ moveTag, readOnly, allowDragDrop })
  }), [tags]);
  const [, drop] = useDrop(() => ({
    accept: ItemTypes.TAG,
    drop: (item) => {
      const dragIndex = item.index;
      const hoverIndex = index;
      if (dragIndex === hoverIndex) {
        return;
      }
      props?.moveTag?.(dragIndex, hoverIndex);
    },
    canDrop: (item) => canDrop(item)
  }), [tags]);
  drag(drop(tagRef));
  const label = props.tag[labelField];
  const { className = "" } = tag;
  const opacity = isDragging ? 0 : 1;
  return /* @__PURE__ */ jsxs2(
    "span",
    {
      ref: tagRef,
      className: (0, import_classnames.default)("tag-wrapper", classNames.tag, className),
      style: {
        opacity,
        cursor: canDrag({ moveTag, readOnly, allowDragDrop }) ? "move" : "auto"
      },
      "data-testid": "tag",
      onClick: props.onTagClicked,
      onTouchStart: props.onTagClicked,
      children: [
        label,
        /* @__PURE__ */ jsx4(
          RemoveComponent_default,
          {
            tag: props.tag,
            className: classNames.remove,
            removeComponent: props.removeComponent,
            onRemove: props.onDelete,
            readOnly,
            index
          }
        )
      ]
    }
  );
};

// src/components/ReactTags.tsx
import { jsx as jsx5, jsxs as jsxs3 } from "react/jsx-runtime";
var ReactTags = (props) => {
  const {
    autofocus,
    autoFocus,
    readOnly,
    labelField,
    allowDeleteFromEmptyInput,
    allowAdditionFromPaste,
    allowDragDrop,
    minQueryLength,
    shouldRenderSuggestions: shouldRenderSuggestions2,
    removeComponent,
    autocomplete,
    inline,
    maxTags,
    allowUnique,
    editable,
    placeholder,
    delimiters,
    separators,
    tags,
    inputFieldPosition,
    inputProps,
    classNames,
    maxLength,
    inputValue,
    clearAll,
    ariaAttrs
  } = props;
  const [suggestions, setSuggestions] = useState(props.suggestions);
  const [query, setQuery] = useState("");
  const [isFocused, setIsFocused] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const [selectionMode, setSelectionMode] = useState(false);
  const [ariaLiveStatus, setAriaLiveStatus] = useState("");
  const [currentEditIndex, setCurrentEditIndex] = useState(-1);
  const [error, setError] = useState("");
  const reactTagsRef = createRef2();
  const textInput = useRef2(null);
  const tagInput = useRef2(null);
  useEffect2(() => {
    if (delimiters.length) {
      console.warn(
        "[Deprecation] The delimiters prop is deprecated and will be removed in v7.x.x, please use separators instead. If you have any concerns regarding this, please share your thoughts in https://github.com/react-tags/react-tags/issues/960"
      );
    }
  }, []);
  useEffect2(() => {
    if (typeof inline !== "undefined") {
      console.warn(
        "[Deprecation] The inline attribute is deprecated and will be removed in v7.x.x, please use inputFieldPosition instead."
      );
    }
  }, [inline]);
  useEffect2(() => {
    if (typeof autofocus !== "undefined") {
      console.warn(
        "[Deprecated] autofocus prop will be removed in 7.x so please migrate to autoFocus prop."
      );
    }
    if ((autofocus || autoFocus && autofocus !== false) && !readOnly) {
      resetAndFocusInput();
    }
  }, [autoFocus, autoFocus, readOnly]);
  useEffect2(() => {
    updateSuggestions();
  }, [query, props.suggestions]);
  const filteredSuggestions = (query2) => {
    let updatedSuggestions = props.suggestions.slice();
    if (allowUnique) {
      const existingTags = tags.map((tag) => tag.id.trim().toLowerCase());
      updatedSuggestions = updatedSuggestions.filter(
        (suggestion) => !existingTags.includes(suggestion.id.toLowerCase())
      );
    }
    if (props.handleFilterSuggestions) {
      return props.handleFilterSuggestions(query2, updatedSuggestions);
    }
    const exactSuggestions = updatedSuggestions.filter(
      (item) => getQueryIndex(query2, item) === 0
    );
    const partialSuggestions = updatedSuggestions.filter(
      (item) => getQueryIndex(query2, item) > 0
    );
    return exactSuggestions.concat(partialSuggestions);
  };
  const getQueryIndex = (query2, item) => {
    return item[labelField].toLowerCase().indexOf(query2.toLowerCase());
  };
  const resetAndFocusInput = () => {
    setQuery("");
    if (!textInput.current) {
      return;
    }
    textInput.current.value = "";
    textInput.current.focus();
  };
  const handleDelete = (index, event) => {
    event.preventDefault();
    event.stopPropagation();
    const currentTags = tags.slice();
    if (currentTags.length === 0) {
      return;
    }
    setError("");
    props?.handleDelete?.(index, event);
    updateAriaLiveStatus(index, currentTags);
  };
  const updateAriaLiveStatus = (index, tags2) => {
    if (!reactTagsRef?.current) {
      return;
    }
    const tagRemoveButtons = reactTagsRef.current.querySelectorAll(".ReactTags__remove");
    let ariaLiveStatus2 = "";
    if (index === 0 && tags2.length > 1) {
      ariaLiveStatus2 = `Tag at index ${index} with value ${tags2[index].id} deleted. Tag at index 0 with value ${tags2[1].id} focussed. Press backspace to remove`;
      tagRemoveButtons[0].focus();
    } else if (index > 0) {
      ariaLiveStatus2 = `Tag at index ${index} with value ${tags2[index].id} deleted. Tag at index ${index - 1} with value ${tags2[index - 1].id} focussed. Press backspace to remove`;
      tagRemoveButtons[index - 1].focus();
    } else {
      ariaLiveStatus2 = `Tag at index ${index} with value ${tags2[index].id} deleted. Input focussed. Press enter to add a new tag`;
      textInput.current?.focus();
    }
    setAriaLiveStatus(ariaLiveStatus2);
  };
  const handleTagClick = (index, tag, event) => {
    if (readOnly) {
      return;
    }
    if (editable) {
      setCurrentEditIndex(index);
      setQuery(tag[labelField]);
      tagInput.current?.focus();
    }
    props.handleTagClick?.(index, event);
  };
  const handleChange = (event) => {
    if (props.handleInputChange) {
      props.handleInputChange(event.target.value, event);
    }
    const query2 = event.target.value.trim();
    setQuery(query2);
  };
  const updateSuggestions = () => {
    const newSuggestions = filteredSuggestions(query);
    setSuggestions(newSuggestions);
    setSelectedIndex(
      selectedIndex >= newSuggestions.length ? newSuggestions.length - 1 : selectedIndex
    );
  };
  const handleFocus = (event) => {
    const value = event.target.value;
    if (props.handleInputFocus) {
      props.handleInputFocus(value, event);
    }
    setIsFocused(true);
  };
  const handleBlur = (event) => {
    const value = event.target.value;
    if (props.handleInputBlur) {
      props.handleInputBlur(value, event);
      if (textInput.current) {
        textInput.current.value = "";
      }
    }
    setIsFocused(false);
    setCurrentEditIndex(-1);
  };
  const handleKeyDown = (event) => {
    const nativeEvent = event.nativeEvent;
    if (nativeEvent.isComposing) {
      return;
    }
    if (event.key === "Escape") {
      event.preventDefault();
      event.stopPropagation();
      setSelectedIndex(-1);
      setSelectionMode(false);
      setSuggestions([]);
      setCurrentEditIndex(-1);
    }
    if ((separators.indexOf(event.key) !== -1 || delimiters.indexOf(event.keyCode) !== -1) && !event.shiftKey) {
      if (event.keyCode !== KEYS.TAB || query !== "") {
        event.preventDefault();
      }
      const selectedQuery = selectionMode && selectedIndex !== -1 ? suggestions[selectedIndex] : {
        id: query.trim(),
        [labelField]: query.trim(),
        className: ""
      };
      if (Object.keys(selectedQuery)) {
        addTag(selectedQuery);
      }
    }
    if (event.key === "Backspace" && query === "" && (allowDeleteFromEmptyInput || inputFieldPosition === INPUT_FIELD_POSITIONS.INLINE)) {
      handleDelete(tags.length - 1, event);
    }
    if (event.keyCode === KEYS.UP_ARROW) {
      event.preventDefault();
      setSelectedIndex(
        selectedIndex <= 0 ? suggestions.length - 1 : selectedIndex - 1
      );
      setSelectionMode(true);
    }
    if (event.keyCode === KEYS.DOWN_ARROW) {
      event.preventDefault();
      setSelectionMode(true);
      suggestions.length === 0 ? setSelectedIndex(-1) : setSelectedIndex((selectedIndex + 1) % suggestions.length);
    }
  };
  const tagLimitReached = () => {
    return maxTags && tags.length >= maxTags;
  };
  const handlePaste = (event) => {
    if (!allowAdditionFromPaste) {
      return;
    }
    if (tagLimitReached()) {
      setError(ERRORS.TAG_LIMIT);
      resetAndFocusInput();
      return;
    }
    setError("");
    event.preventDefault();
    const clipboardData = event.clipboardData || window.clipboardData;
    const clipboardText = clipboardData.getData("text");
    const { maxLength: maxLength2 = clipboardText.length } = props;
    const maxTextLength = Math.min(maxLength2, clipboardText.length);
    const pastedText = clipboardData.getData("text").substr(0, maxTextLength);
    let keycodes = delimiters;
    if (separators.length) {
      keycodes = [];
      separators.forEach((separator) => {
        const keycode = getKeyCodeFromSeparator(separator);
        if (Array.isArray(keycode)) {
          keycodes = [...keycodes, ...keycode];
        } else {
          keycodes.push(keycode);
        }
      });
    }
    const delimiterRegExp = buildRegExpFromDelimiters(keycodes);
    const tags2 = pastedText.split(delimiterRegExp).map((tag) => tag.trim());
    uniq_default(tags2).forEach(
      (tag) => addTag({
        id: tag.trim(),
        [labelField]: tag.trim(),
        className: ""
      })
    );
  };
  const addTag = (tag) => {
    if (!tag.id || !tag[labelField]) {
      return;
    }
    if (currentEditIndex === -1) {
      if (tagLimitReached()) {
        setError(ERRORS.TAG_LIMIT);
        resetAndFocusInput();
        return;
      }
      setError("");
    }
    const existingKeys = tags.map((tag2) => tag2.id.toLowerCase());
    if (allowUnique && existingKeys.indexOf(tag.id.trim().toLowerCase()) >= 0) {
      return;
    }
    if (autocomplete) {
      const possibleMatches = filteredSuggestions(tag[labelField]);
      console.warn(
        "[Deprecation] The autocomplete prop will be removed in 7.x to simplify the integration and make it more intutive. If you have any concerns regarding this, please share your thoughts in https://github.com/react-tags/react-tags/issues/949"
      );
      if (autocomplete === 1 && possibleMatches.length === 1 || autocomplete === true && possibleMatches.length) {
        tag = possibleMatches[0];
      }
    }
    if (currentEditIndex !== -1 && props.onTagUpdate)
      props.onTagUpdate(currentEditIndex, tag);
    else props?.handleAddition?.(tag);
    setQuery("");
    setSelectionMode(false);
    setSelectedIndex(-1);
    setCurrentEditIndex(-1);
    resetAndFocusInput();
  };
  const handleSuggestionClick = (index) => {
    addTag(suggestions[index]);
  };
  const handleClearAll = () => {
    if (props.onClearAll) {
      props.onClearAll();
    }
    setError("");
    resetAndFocusInput();
  };
  const handleSuggestionHover = (index) => {
    setSelectedIndex(index);
    setSelectionMode(true);
  };
  const moveTag = (dragIndex, hoverIndex) => {
    const dragTag = tags[dragIndex];
    props?.handleDrag?.(dragTag, dragIndex, hoverIndex);
  };
  const getTagItems = () => {
    const allClassNames2 = { ...DEFAULT_CLASSNAMES, ...props.classNames };
    return tags.map((tag, index) => {
      return /* @__PURE__ */ jsx5(Fragment, { children: currentEditIndex === index ? /* @__PURE__ */ jsx5("div", { className: allClassNames2.editTagInput, children: /* @__PURE__ */ jsx5(
        "input",
        {
          ref: (input) => {
            tagInput.current = input;
          },
          onFocus: handleFocus,
          value: query,
          onChange: handleChange,
          onKeyDown: handleKeyDown,
          onBlur: handleBlur,
          className: allClassNames2.editTagInputField,
          onPaste: handlePaste,
          "data-testid": "tag-edit"
        }
      ) }) : /* @__PURE__ */ jsx5(
        SingleTag,
        {
          index,
          tag,
          tags,
          labelField,
          onDelete: (event) => handleDelete(index, event),
          moveTag: allowDragDrop ? moveTag : void 0,
          removeComponent,
          onTagClicked: (event) => handleTagClick(index, tag, event),
          readOnly,
          classNames: allClassNames2,
          allowDragDrop
        }
      ) }, index);
    });
  };
  const tagItems = getTagItems();
  const allClassNames = { ...DEFAULT_CLASSNAMES, ...classNames };
  const { name: inputName, id: inputId } = props;
  const position = inline === false ? INPUT_FIELD_POSITIONS.BOTTOM : inputFieldPosition;
  const tagsComponent = !readOnly ? /* @__PURE__ */ jsxs3("div", { className: allClassNames.tagInput, children: [
    /* @__PURE__ */ jsx5(
      "input",
      {
        ...inputProps,
        ref: (input) => {
          textInput.current = input;
        },
        className: allClassNames.tagInputField,
        type: "text",
        placeholder,
        "aria-label": placeholder,
        onFocus: handleFocus,
        onBlur: handleBlur,
        onChange: handleChange,
        onKeyDown: handleKeyDown,
        onPaste: handlePaste,
        name: inputName,
        id: inputId,
        maxLength,
        value: inputValue,
        "data-automation": "input",
        "data-testid": "input"
      }
    ),
    /* @__PURE__ */ jsx5(
      Suggestions_default,
      {
        query: query.trim(),
        suggestions,
        labelField,
        selectedIndex,
        handleClick: handleSuggestionClick,
        handleHover: handleSuggestionHover,
        minQueryLength,
        shouldRenderSuggestions: shouldRenderSuggestions2,
        isFocused,
        classNames: allClassNames,
        renderSuggestion: props.renderSuggestion
      }
    ),
    clearAll && tags.length > 0 && /* @__PURE__ */ jsx5(ClearAllTags_default, { "aria-label": ariaAttrs?.clearAllLabel, classNames: allClassNames, onClick: handleClearAll }),
    error && /* @__PURE__ */ jsxs3("div", { "data-testid": "error", className: "ReactTags__error", children: [
      /* @__PURE__ */ jsx5(
        "svg",
        {
          xmlns: "http://www.w3.org/2000/svg",
          viewBox: "0 0 512 512",
          height: "24",
          width: "24",
          fill: "#e03131",
          children: /* @__PURE__ */ jsx5("path", { d: "M256 32c14.2 0 27.3 7.5 34.5 19.8l216 368c7.3 12.4 7.3 27.7 .2 40.1S486.3 480 472 480H40c-14.3 0-27.6-7.7-34.7-20.1s-7-27.8 .2-40.1l216-368C228.7 39.5 241.8 32 256 32zm0 128c-13.3 0-24 10.7-24 24V296c0 13.3 10.7 24 24 24s24-10.7 24-24V184c0-13.3-10.7-24-24-24zm32 224a32 32 0 1 0 -64 0 32 32 0 1 0 64 0z" })
        }
      ),
      error
    ] })
  ] }) : null;
  return /* @__PURE__ */ jsxs3(
    "div",
    {
      className: (0, import_classnames2.default)(allClassNames.tags, "react-tags-wrapper"),
      ref: reactTagsRef,
      children: [
        /* @__PURE__ */ jsx5(
          "p",
          {
            role: "alert",
            className: "sr-only",
            style: {
              position: "absolute",
              overflow: "hidden",
              clip: "rect(0 0 0 0)",
              margin: "-1px",
              padding: 0,
              width: "1px",
              height: "1px",
              border: 0
            },
            children: ariaLiveStatus
          }
        ),
        position === INPUT_FIELD_POSITIONS.TOP && tagsComponent,
        /* @__PURE__ */ jsxs3("div", { className: allClassNames.selected, children: [
          tagItems,
          position === INPUT_FIELD_POSITIONS.INLINE && tagsComponent
        ] }),
        position === INPUT_FIELD_POSITIONS.BOTTOM && tagsComponent
      ]
    }
  );
};
var ReactTags_default = ReactTags;

// src/index.tsx
import { jsx as jsx6 } from "react/jsx-runtime";
var ReactTagsWrapper = (props) => {
  const {
    placeholder = DEFAULT_PLACEHOLDER,
    labelField = DEFAULT_LABEL_FIELD,
    suggestions = [],
    // Set delimeters to empty array if not provided
    delimiters = [],
    // Set separators to empty array if delimiters is provided
    separators = props.delimiters?.length ? [] : [SEPARATORS.ENTER, SEPARATORS.TAB],
    autofocus,
    autoFocus = true,
    inline,
    // TODO= Remove in v7.x.x
    inputFieldPosition = "inline",
    allowDeleteFromEmptyInput = false,
    allowAdditionFromPaste = true,
    autocomplete = false,
    readOnly = false,
    allowUnique = true,
    allowDragDrop = true,
    tags = [],
    inputProps = {},
    editable = false,
    clearAll = false,
    ariaAttrs = { clearAllLabel: "clear all tags" },
    handleDelete,
    handleAddition,
    onTagUpdate,
    handleDrag,
    handleFilterSuggestions,
    handleTagClick,
    handleInputChange,
    handleInputFocus,
    handleInputBlur,
    minQueryLength,
    shouldRenderSuggestions: shouldRenderSuggestions2,
    removeComponent,
    onClearAll,
    classNames,
    name,
    id,
    maxLength,
    inputValue,
    maxTags,
    renderSuggestion
  } = props;
  return /* @__PURE__ */ jsx6(
    ReactTags_default,
    {
      placeholder,
      labelField,
      suggestions,
      delimiters,
      separators,
      autofocus,
      autoFocus,
      inline,
      inputFieldPosition,
      allowDeleteFromEmptyInput,
      allowAdditionFromPaste,
      autocomplete,
      readOnly,
      allowUnique,
      allowDragDrop,
      tags,
      inputProps,
      editable,
      clearAll,
      ariaAttrs,
      handleDelete,
      handleAddition,
      onTagUpdate,
      handleDrag,
      handleFilterSuggestions,
      handleTagClick,
      handleInputChange,
      handleInputFocus,
      handleInputBlur,
      minQueryLength,
      shouldRenderSuggestions: shouldRenderSuggestions2,
      removeComponent,
      onClearAll,
      classNames,
      name,
      id,
      maxLength,
      inputValue,
      maxTags,
      renderSuggestion
    }
  );
};
var WithContext = ({ ...props }) => (
  // @ts-ignore
  /* @__PURE__ */ jsx6(DndProvider, { backend: HTML5Backend, children: /* @__PURE__ */ jsx6(ReactTagsWrapper, { ...props }) })
);
export {
  KEYS,
  SEPARATORS,
  WithContext,
  ReactTagsWrapper as WithOutContext
};
/*! Bundled license information:

classnames/index.js:
  (*!
  	Copyright (c) 2018 Jed Watson.
  	Licensed under the MIT License (MIT), see
  	http://jedwatson.github.io/classnames
  *)

lodash-es/lodash.js:
  (**
   * @license
   * Lodash (Custom Build) <https://lodash.com/>
   * Build: `lodash modularize exports="es" -o ./`
   * Copyright OpenJS Foundation and other contributors <https://openjsf.org/>
   * Released under MIT license <https://lodash.com/license>
   * Based on Underscore.js 1.8.3 <http://underscorejs.org/LICENSE>
   * Copyright Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
   *)
*/
//# sourceMappingURL=index.js.map
