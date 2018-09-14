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

const Utils = {
  ArraySort
}

export default Utils