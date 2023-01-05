export function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export function makeErrorMessage(message: string) {
  return message.split(":")[0]
}

export function getTodayString(date: Date) {
  //yyyy-MM-dd
  return `${date.getFullYear()}-${date.getMonth()+1}-${date.getDate()}`
}