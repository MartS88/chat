function countWords(inputString) {
  // Шаг 1: Создаем объект для хранения слов и их количества
  const wordCounts = {};
  let currentWord = "";

  // Шаг 2: Итерируем по каждому символу строки
  for (let i = 0; i < inputString.length; i++) {
    const char = inputString[i];

    // Шаг 3: Если символ является буквой или цифрой
    if (/[a-zA-Z0-9]/.test(char)) {
      currentWord += char;  // Добавляем символ к текущему слову
    } else {
      // Шаг 4: Если символ разделитель и текущее слово не пустое
      if (currentWord) {
        // Шаг 5: Добавляем слово в словарь или увеличиваем счетчик
        wordCounts[currentWord] = (wordCounts[currentWord] || 0) + 1;
        currentWord = "";  // Обнуляем текущее слово
      }
    }
  }

  // Шаг 6: Добавляем последнее слово, если строка не закончилась на разделителе
  if (currentWord) {
    wordCounts[currentWord] = (wordCounts[currentWord] || 0) + 1;
  }

  // Шаг 7: Выводим результат на экран
  for (let word in wordCounts) {
    console.log(`${word} - ${wordCounts[word]}`);
  }
  return wordCounts
}

// Пример использования:
const text = "apple banana orange apple";
countWords(text);
