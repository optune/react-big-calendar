let defaultMessages = {
  date: 'Date',
  event: 'Event',
  allDay: 'All Day',
  day: 'Day',
  month: 'Month',
  previous: 'Back',
  next: 'Next',
  yesterday: 'Yesterday',
  tomorrow: 'Tomorrow',
  today: 'Today',

  noEventsInRange: 'There are no events in this range.',

  showMore: total => `+${total} more`,
}

export default function messages(msgs) {
  return {
    ...defaultMessages,
    ...msgs,
  }
}
