import dates from './utils/dates'

let weekRangeFormat = ({ start, end }, culture, local) =>
  local.format(start, 'MMM dd', culture) +
  ' - ' +
  local.format(end, dates.eq(start, end, 'month') ? 'dd' : 'MMM dd', culture)

let formats = {
  dateFormat: 'dd',
  dayFormat: 'ddd dd/MM',
  weekdayFormat: 'ddd',

  monthHeaderFormat: 'MMMM yyyy',
  dayHeaderFormat: 'dddd MMM dd',
  dayRangeHeaderFormat: weekRangeFormat,
}

export function set(_formats) {
  if (arguments.length > 1) _formats = { [_formats]: arguments[1] }

  Object.assign(formats, _formats)
}

export default function format(fmts) {
  return {
    ...formats,
    ...fmts,
  }
}
