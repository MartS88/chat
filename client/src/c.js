

// function sum_pairs(ints, s) {
//   const pairsCount = new Map();
//   let result = undefined;
//   let minIndex = Infinity;
//
//   for (let i = 0; i < ints.length; i++) {
//     let current = ints[i];
//     let partner = s - current;
//
//
//     if (pairsCount.has(partner)) {
//       let partnerIndex = pairsCount.get(partner);
//
//       // Проверяем, меньше ли индекс найденной пары
//       if (i < minIndex) {
//         result = [partner, current];
//         minIndex = i;  // Обновляем минимальный индекс
//       }
//     }
//
//     // Запоминаем текущее число и его индекс
//     if (!pairsCount.has(current)) {
//       pairsCount.set(current, i);
//     }
//   }
//
//   return result;
// }
//
// // Примеры тестов
// console.log(sum_pairs([11, 3, 7, 5], 10)); // [3, 7]
// console.log(sum_pairs([4, 3, 2, 3, 4], 6)); // [4, 2]
// console.log(sum_pairs([0, 0, -2, 3], 2)); // undefined
// console.log(sum_pairs([10, 5, 2, 3, 7, 5], 10)); // [3, 7]



// Примеры
// console.log(sum_pairs([11, 3, 7, 5], 10)); // [3, 7]
// console.log(sum_pairs([4, 3, 2, 3, 4], 6)); // [4, 2]
// console.log(sum_pairs([0, 0, -2, 3], 2)); // null
// console.log(sum_pairs([10, 5, 2, 3, 7, 5], 10)); // [3, 7]




// var longestConsecutive = function(nums) {
//   if (nums.length === 0) {
//     return 0;
//   }
//   let count = 1;
//   let longest = 0;
//   nums = new Set(nums);
//   nums = Array.from(nums);
//   nums.sort((a,b)=> a-b);
//
//
//   for (let i = 0; i < nums.length; i++) {
//
//     if (nums[i] + 1 === nums[i+1]) {
//       count++;
//     }
//
//     else{
//         if(count > longest){
//           longest = count;
//         }
//         count = 1;
//       }
//
//     }
//     return longest;;
//
// };
// console.log('containsDuplicate', longestConsecutive([0,3,7,2,5,8,4,6,0,1]));
//
//
// var isIsomorphic = function(s, t) {
//
//   const sCount = new Map();
//   const tCount = new Map();
//
//   if (s.length !== t.length) {
//     return false;
//   }
//
//   for (let i = 0; i < s.length; i++) {
//     const sChar = s[i];
//     const tChar = t[i];
//
//     if (sCount.has(sChar)) {
//       if (sCount.get(sChar) !== tChar) {
//         return false;
//       }
//     } else {
//       sCount.set(sChar, tChar);
//     }
//
//     if (tCount.has(tChar)) {
//       if (tCount.get(tChar) !== sChar) {
//         return false;
//       }
//     } else {
//       tCount.set(tChar, sChar);
//     }
//   }
//   return true;
// };
// console.log(isIsomorphic('adda', 'egge'));


// var canConstruct = function(words, chars) {
//  const wordsCount = new Map();
//  const charsCount = new Map();
//
//  // Подсчитываем количество символов в строке chars
//  for (let char of chars) {
//   charsCount.set(char, (charsCount.get(char) || 0) + 1);
//  }
//
//  // Подсчитываем количество символов в каждом слове из words
//  for (let i = 0; i < words.length; i++) {
//   const word = words[i];
//   const charCount = {};
//
//   // Подсчет символов в слове
//   for (let char of word) {
//    charCount[char] = (charCount[char] || 0) + 1;
//   }
//
//   wordsCount.set(word, charCount);
//  }
//
//  const result = [];
//
//  // Проходим по каждому слову и проверяем, может ли оно быть построено из chars
//  for (let [word, wordCount] of wordsCount.entries()) {
//   let canBeConstructed = true;
//
//   // Проверяем, хватает ли символов в chars для данного слова
//   for (let char in wordCount) {
//    if (!charsCount.has(char) || wordCount[char] > charsCount.get(char)) {
//     canBeConstructed = false;
//     break;
//    }
//   }
//
//   if (canBeConstructed) {
//    result.push(word);
//   }
//  }
//
//  return result;
// };
//
// console.log(canConstruct(["cat", "bt", "hat", "tree"], "atach"));


// for (let char of magazine){
//  charCount.set(char,(charCount.get(char) || 0)+1)
// }
//
// for (let char of ransomNote){
//  if (!charCount.get(char) || charCount.get(char) === 0){
//   return false
//  }
//  charCount.set(char,(charCount.get(char) || 0) - 1)
// }
// return true

// var majorityElement = function(nums) {
//  const countMap = new Map()
//  const majorityCount = Math.floor(nums.length / 2)
//
//  for (let num of nums){
//   countMap.set(num,(countMap.get(num) || 0) + 1)
//
//   if (countMap.get(num) > majorityCount){
//    return num
//   }
//  }
//
// }
// console.log(majorityElement([3,2,3]));