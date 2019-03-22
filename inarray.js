function inArray(el, arr) {
  arr = arr || this;
  return arr.indexOf( el ) != -1;
}
Array.prototype.inArray = inArray;

var test = [1,2,3,4,5];

console.log(inArray(3, test));
console.log(test.inArray(7));