module.exports = function parseStringAsArray(arrayAsString){
      foo = String(arrayAsString);
      return foo.split(',').map(stringAsArray => stringAsArray.trim());
}
