var count = (arr)=> {
  return 'there arr' + arr.length + 'element in the array'
}
var adder = (a,b) => {
  return `the sun of the 2 number is ${a+b}`
}
// module.exports.count = count
// module.exports.adder = adder 导出方式
module.exports = {
  count,
  adder
}