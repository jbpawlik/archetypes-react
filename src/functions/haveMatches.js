export default function haveMatches(array1, array2) {
  let counter = 0
  array1.forEach(function(element) {
    if (array2.includes(element))
    counter ++;
  })
  return counter
}