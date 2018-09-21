import _ from 'lodash'

/**
 * 数组排序  支持数组对像
 * @param arr
 * @param sort
 * @param key      对像的排序字段
 * @param delUnit   是否要删除的单位，删除后当数值处理  eg  12.36%
 * @returns []
 * @constructor
 */
const ArraySort = (arr, sort = 'asc', key, delUnit) => {
  if (Object.prototype.toString.call(arr) !== '[object Array]') {
    console.error('第一个参数必须是数组')
    return
  }
  if (!arr.length) return []
  let copyArray = _.cloneDeep(arr)
  let zhArray = []
  let notZhArray = []
  _.forEach(copyArray, item => {
    let value = key ? item[key] : item
    if (escape(value).indexOf('%u') === 0) { // 中文开头
      zhArray.push(item)
    } else {
      notZhArray.push(item)
    }
  })
  notZhArray.sort(function (a, b) {
    let valueA = key ? a[key] : a
    let valueB = key ? b[key] : b
    if(delUnit){
      valueA = valueA.replace(delUnit,'') - 0
      valueB = valueB.replace(delUnit,'') - 0
    }
    if (sort === 'asc') {
      return valueA > valueB ? 1 : -1
    }
    if (sort === 'desc') {
      return valueB > valueA ? 1 : -1
    }
  })
  zhArray.sort(function (a, b) {
    let valueA = key ? a[key] : a
    let valueB = key ? b[key] : b
    if (sort === 'asc') {
      return valueA.localeCompare(valueB, 'zh')
    }
    if (sort === 'desc') {
      return valueB.localeCompare(valueA, 'zh')
    }
  })
  let backArr = [...notZhArray, ...zhArray]
  if (sort === 'desc') {
    backArr = [...zhArray, ...notZhArray]
  }
  return backArr
}
/**
 * @desc 数据类型检测
 * @param obj 待检测的数据
 * @return {String} 类型字符串
 */
function type(obj) {
  var toString=Object.prototype.toString;
  var toType = {};
  var typeArr=['Undefined','Null','Boolean','Number','String','Object','Array','Function','Date','RegExp','Error','Arguments']
  typeArr.map(function(item, index) {
    toType["[object " + item + "]"] = item.toLowerCase();
  })

  return typeof obj !== "object" ? typeof obj : toType[toString.call(obj)];
}

/**
 * @desc 是否是 Undefined 类型检测
 * @param obj 待检测的数据
 * @return {Boolean} 布尔值
 */
function isUndefined(obj) {
  return obj === void 0;
}
/**
 * @desc 是否是 Null 类型检测
 * @param obj 待检测的数据
 * @return {Boolean} 布尔值
 */
function isNull(obj) {
  return obj === null;
}
/**
 * @desc 是否是 Boolean 类型检测
 * @param obj 待检测的数据
 * @return {Boolean} 布尔值
 */
function isBoolean(obj) {
  return typeof(obj) === 'boolean';
}
/**
 * @desc 是否是 Number 类型检测
 * @param obj 待检测的数据
 * @return {Boolean} 布尔值
 */
function isNumber(obj) {
  return typeof(obj) === 'number';
}
/**
 * @desc 是否是 String 类型检测
 * @param obj 待检测的数据
 * @return {Boolean} 布尔值
 */
function isString(obj) {
  return typeof(obj) === 'string';
}
/**
 * @desc 是否是 Object 类型检测
 * @param obj 待检测的数据
 * @return {Boolean} 布尔值
 */
function isObject(obj) {
  return Object.prototype.toString.call(obj) === '[object Object]';
}
/**
 * @desc 是否是 Array 类型检测
 * @param obj 待检测的数据
 * @return {Boolean} 布尔值
 */
function isArray(obj){
  return Array.isArray?Array.isArray(obj):Object.prototype.toString.call(obj) === '[object Array]';
}
/**
 * @desc 是否是 Function 类型检测
 * @param obj 待检测的数据
 * @return {Boolean} 布尔值
 */
function isFunction(obj){
  return typeof(obj) === 'function';
}
/**
 * @desc 是否是 Date 类型检测
 * @param obj 待检测的数据
 * @return {Boolean} 布尔值
 */
function isDate(obj){
  return Object.prototype.toString.call(obj) === '[object Date]';
}
/**
 * @desc 是否是 RegExp 类型检测
 * @param obj 待检测的数据
 * @return {Boolean} 布尔值
 */
function isRegExp(obj){
  return Object.prototype.toString.call(obj) === '[object RegExp]';
}
/**
 * @desc 是否是 Error 类型检测
 * @param obj 待检测的数据
 * @return {Boolean} 布尔值
 */
function isError(obj){
  return Object.prototype.toString.call(obj) === '[object Error]';
}
/**
 * @desc 是否是 Arguments 类型检测
 * @param obj 待检测的数据
 * @return {Boolean} 布尔值
 */
function isArguments(obj){
  return Object.prototype.toString.call(obj) === '[object Arguments]';
}




const Utils = {
  ArraySort
}

export default Utils