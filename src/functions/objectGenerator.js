// Compare individual's traits to master list of traits
const traits = { social: ['solo', 'social'], novelty: ['novelty', 'nostalgia'], conflict: ['active', 'passive'], scope: ['specific', 'general'] };

const contenders = ['boubaKikki', 'yin-yang']

// Can I add an index key to each object in the array
function archetypeListing() {
  this.number = ''
	this.name = ''
  this.description =''
  this.traits = []
}

let archetypeList = [];

const combineObjects = ([head, ...[headTail, ...tailTail]]) => {
  if (!headTail) return head

  const combined = headTail.reduce((acc, x) => {
    return acc.concat(head.map(h => `${h},${x}`.split(',')))
  }, [])


  return combineObjects([combined, ...tailTail])
}

function generateArchetypeList(object) {

	let array1 = [];
  let array2 = [];
  let array3 = [];
  let array4 = [];
// let array5 = [];
// let array6 = []; */

	let blankArchetype = new archetypeListing();

  for (let i = 0; i <= 1; i++) {
  	array1.push(Object.values(object)[0][i])
    array2.push(Object.values(object)[1][i])
    array3.push(Object.values(object)[2][i])
    array4.push(Object.values(object)[3][i])
//     array5.push(Object.values(object)[4][i])
//  array6.push(Object.values(object)[5][i])
  }

  let combinedArray = combineObjects([array1, array2, array3, array4])

    combinedArray.forEach(function(element, i) {
      blankArchetype.number = i + 1;
      blankArchetype.traits = combinedArray[i];
      archetypeList.push({...blankArchetype})
    })
  return archetypeList
}
console.log(generateArchetypeList(traits))

// // Compare individual's traits to master list of traits

// const traits = { social: ['solo', 'social'], novelty: ['novelty', 'nostalgia'], focus: ['outward', 'inward'], conflict: ['active', 'passive'], duty: ['service', 'perfection'], idealism: ['dreamy', 'grounded'] };

// const contenders = ['boubaKikki', 'yin-yang']

// //Can I add an index key to each object in the array
// function archetypeListing() {
//   this.number = ''
// 	this.name = ''
//   this.description =''
//   this.traits = []
// }

// let archetypeList = [];

// const combineObjects = ([head, ...[headTail, ...tailTail]]) => {
//   if (!headTail) return head

//   const combined = headTail.reduce((acc, x) => {
//     return acc.concat(head.map(h => `${h},${x}`.split(',')))
//   }, [])


//   return combineObjects([combined, ...tailTail])
// }

// function generateArchetypeList(object) {

// 	let array1 = [];
//   let array2 = [];
//   let array3 = [];
//   let array4 = [];
//   let array5 = [];
//   let array6 = [];


// 	let blankArchetype = new archetypeListing();

//   for (let i = 0; i <= 1; i++) {
//   	array1.push(Object.values(object)[0][i])
//     array2.push(Object.values(object)[1][i])
//     array3.push(Object.values(object)[2][i])
//     array4.push(Object.values(object)[3][i])
//     array5.push(Object.values(object)[4][i])
//     array6.push(Object.values(object)[5][i])
//   }

//   let combinedArray = combineObjects([array1, array2, array3, array4, array5, array6])

//     combinedArray.forEach(function(element, i) {
//       blankArchetype.number = i + 1;
//       blankArchetype.traits = combinedArray[i];
//       archetypeList.push({...blankArchetype})
//     })
//   return archetypeList
// }
// console.log(generateArchetypeList(traits))