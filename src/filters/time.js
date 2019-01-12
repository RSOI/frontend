export default function (str) {
  const date = str.split('T')
  const time = date[1].split('.')[0]
  return `${date[0]} в ${time}`
}
