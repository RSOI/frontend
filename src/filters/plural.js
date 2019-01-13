const plurals = {
  question: ['вопрос', 'вопроса', 'вопросов'],
  answer: ['ответ', 'ответа', 'ответов'],
  score: ['очко', 'очка', 'очков']
}

export default function (sourceValue, pluralKey) {
  let parsedValue = parseFloat(sourceValue, 10)
  let plural = plurals[pluralKey]

  if (!isFinite(parsedValue) || !plural) {
    return String(sourceValue)
  }

  let n = Math.abs(parsedValue)
  n %= 100
  if (n >= 5 && n <= 20) {
    return plural[2]
  }
  n %= 10
  if (n === 1) {
    return plural[0]
  }
  if (n >= 2 && n <= 4) {
    return plural[1]
  }
  return plural[2]
}