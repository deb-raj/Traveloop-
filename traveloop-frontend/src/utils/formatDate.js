import { format, parseISO, differenceInDays } from 'date-fns'

export const formatDate = (date, fmt = 'MMM dd, yyyy') => {
  if (!date) return ''
  try {
    return format(typeof date === 'string' ? parseISO(date) : date, fmt)
  } catch {
    return date
  }
}

export const formatDateRange = (start, end) => {
  if (!start || !end) return ''
  return `${formatDate(start, 'MMM dd')} - ${formatDate(end, 'MMM dd, yyyy')}`
}

export const getTripDuration = (start, end) => {
  if (!start || !end) return 0
  try {
    return differenceInDays(parseISO(end), parseISO(start)) + 1
  } catch {
    return 0
  }
}