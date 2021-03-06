import PropTypes from 'prop-types'
import React from 'react'
import cn from 'classnames'
import dates from './utils/dates'

let propTypes = {
  event: PropTypes.object.isRequired,
  slotStart: PropTypes.instanceOf(Date),
  slotEnd: PropTypes.instanceOf(Date),

  selected: PropTypes.bool,
  isAllDay: PropTypes.bool,
  continuesPrior: PropTypes.bool,
  continuesAfter: PropTypes.bool,

  accessors: PropTypes.object.isRequired,
  components: PropTypes.object.isRequired,
  getters: PropTypes.object.isRequired,
  localizer: PropTypes.object.isRequired,

  onSelect: PropTypes.func,
  onDoubleClick: PropTypes.func,

  isDesktop: PropTypes.bool,
}

const EventCell = props => {
  let {
    style,
    className,
    event,
    selected,
    isAllDay,
    onSelect,
    onDoubleClick,
    localizer,
    continuesPrior,
    continuesAfter,
    accessors,
    getters,
    children,
    components: { event: Event, eventWrapper: EventWrapper },
    isDesktop,
    ...other
  } = props

  let title = accessors.title(event)
  let tooltip = accessors.tooltip(event)
  let end = accessors.end(event)
  let start = accessors.start(event)
  let allDay = accessors.allDay(event)

  let showAsAllDay =
    isAllDay || allDay || dates.diff(start, dates.ceil(end, 'day'), 'day') > 1

  let userProps = getters.eventProp(event, start, end, selected)

  const content = (
    <div className="rbc-event-content" title={tooltip || undefined}>
      {Event ? (
        <Event
          event={event}
          title={title}
          isAllDay={allDay}
          localizer={localizer}
          isDesktop={isDesktop}
        />
      ) : (
        title
      )}
    </div>
  )

  return (
    <EventWrapper {...props} type="date">
      <div
        {...other}
        style={{ ...userProps.style, ...style }}
        className={cn('rbc-event', className, userProps.className, {
          'rbc-selected': selected,
          'rbc-event-allday': showAsAllDay,
          'rbc-event-continues-prior': continuesPrior,
          'rbc-event-continues-after': continuesAfter,
        })}
        onClick={e => onSelect && onSelect(event, e)}
        onDoubleClick={e => onDoubleClick && onDoubleClick(event, e)}
        data-cy={props.event.link.split('/').pop()}
      >
        {typeof children === 'function' ? children(content) : content}
      </div>
    </EventWrapper>
  )
}

EventCell.propTypes = propTypes

export default EventCell
