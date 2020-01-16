module.exports = function parseStringAsArray(arrayAsString){
      return arrayAsString.split(',').map(stringAsArray => stringAsArray.trim());
}