import {defineArrayMember, defineField, defineType} from 'sanity'
import {HexColorInput} from '../../components/HexColorInput'

const TIME_INPUT_PATTERN = /^([01]\d|2[0-3]):?([0-5]\d)$/

function toCanonicalTime(value: string) {
  const match = value.trim().match(TIME_INPUT_PATTERN)
  if (!match) return null

  const hour = match[1]
  const minute = match[2]
  return `${hour}:${minute}`
}

function toMinutes(time: string) {
  const [hour, minute] = time.split(':').map(Number)
  return hour * 60 + minute
}

function isTopOfHour(time: string) {
  return time.endsWith(':00')
}

interface ScheduleRowValidationParent {
  startTime?: string
  isCancelled?: boolean
  isSubstitute?: boolean
}

function scheduleRowMember() {
  return defineArrayMember({
    type: 'object',
    fields: [
      defineField({
        name: 'classTitle',
        title: 'Class Title',
        type: 'string',
        validation: (rule) => rule.required(),
      }),
      defineField({
        name: 'instructor',
        title: 'Instructor',
        type: 'string',
        validation: (rule) => rule.required(),
      }),
      defineField({
        name: 'startTime',
        title: 'Start Time (24h)',
        description: 'Enter as HHmm (e.g. 1030). HH:mm is also accepted.',
        type: 'string',
        validation: (rule) =>
          rule.required().custom((value) => {
            if (typeof value !== 'string') return 'Start time is required.'
            return toCanonicalTime(value) ? true : 'Use HHmm or HH:mm format.'
          }),
      }),
      defineField({
        name: 'endTime',
        title: 'End Time (24h)',
        description: 'Enter as HHmm (e.g. 1145). HH:mm is also accepted.',
        type: 'string',
        validation: (rule) =>
          rule
            .required()
            .custom((value, context) => {
              if (typeof value !== 'string') return true

              const canonicalEnd = toCanonicalTime(value)
              if (!canonicalEnd) return 'Use HHmm or HH:mm format.'

              const parent = context.parent as ScheduleRowValidationParent | undefined
              const rawStartTime = typeof parent?.startTime === 'string' ? parent.startTime : ''
              const canonicalStart = rawStartTime ? toCanonicalTime(rawStartTime) : null
              if (!canonicalStart) return true

              if (toMinutes(canonicalEnd) <= toMinutes(canonicalStart)) {
                return 'End time must be later than start time.'
              }

              return true
            }),
      }),
      defineField({
        name: 'isCancelled',
        title: 'Cancelled',
        type: 'boolean',
        initialValue: false,
        validation: (rule) =>
          rule.custom((value, context) => {
            if (!value) return true
            const parent = context.parent as ScheduleRowValidationParent | undefined
            return parent?.isSubstitute ? 'A class cannot be both cancelled and substitute.' : true
          }),
      }),
      defineField({
        name: 'isSubstitute',
        title: 'Substitute',
        type: 'boolean',
        initialValue: false,
        validation: (rule) =>
          rule.custom((value, context) => {
            if (!value) return true
            const parent = context.parent as ScheduleRowValidationParent | undefined
            return parent?.isCancelled ? 'A class cannot be both substitute and cancelled.' : true
          }),
      }),
    ],
    preview: {
      select: {
        title: 'classTitle',
        instructor: 'instructor',
        startTime: 'startTime',
        endTime: 'endTime',
        isCancelled: 'isCancelled',
        isSubstitute: 'isSubstitute',
      },
      prepare({title, instructor, startTime, endTime, isCancelled, isSubstitute}) {
        const displayStart = typeof startTime === 'string' ? toCanonicalTime(startTime) : null
        const displayEnd = typeof endTime === 'string' ? toCanonicalTime(endTime) : null
        const statusPrefix = isCancelled ? '[CANCELLED] ' : isSubstitute ? '[SUBSTITUTE] ' : ''
        const statusSuffix = isCancelled ? ' • CANCELLED' : isSubstitute ? ' • SUBSTITUTE' : ''
        return {
          title: `${statusPrefix}${title ?? 'Untitled class'}`,
          subtitle: `${displayStart ?? '--:--'}-${displayEnd ?? '--:--'} • ${instructor ?? 'No instructor'}${statusSuffix}`,
        }
      },
    },
  })
}

function dayField(name: string, title: string) {
  return defineField({
    name,
    title,
    type: 'array',
    of: [scheduleRowMember()],
    initialValue: [],
  })
}

const colorField = (name: string, title: string, defaultHex: string) =>
  defineField({
    name,
    title,
    type: 'object',
    initialValue: {
      _type: name,
      hex: defaultHex,
    },
    components: {
      input: HexColorInput,
    },
    fields: [
      defineField({
        name: 'hex',
        title: 'Hex',
        type: 'string',
      }),
    ],
    validation: (rule) =>
      rule.required().custom((value) => {
        const hex =
          value && typeof value === 'object' && 'hex' in value && typeof value.hex === 'string'
            ? value.hex
            : ''

        return /^#([0-9A-Fa-f]{3}|[0-9A-Fa-f]{6})$/.test(hex)
          ? true
          : 'Use a hex color like #749B26.'
      }),
  })

export const schedulePageType = defineType({
  name: 'schedulePage',
  title: 'Schedule',
  type: 'document',
  fields: [
    defineField({
      name: 'displayStartTime',
      title: 'Schedule Start Time (24h)',
      description: 'Enter as HHmm (e.g. 0700). Must be on the hour.',
      type: 'string',
      initialValue: '0700',
      validation: (rule) =>
        rule.required().custom((value) => {
          if (typeof value !== 'string') return 'Start time is required.'
          const canonical = toCanonicalTime(value)
          if (!canonical) return 'Use HHmm or HH:mm format.'
          if (!isTopOfHour(canonical)) return 'Start time must be on the hour (e.g. 0700, 0800).'
          return true
        }),
    }),
    defineField({
      name: 'displayEndTime',
      title: 'Schedule End Time (24h)',
      description: 'Enter as HHmm (e.g. 2000). Must be on the hour and later than start time.',
      type: 'string',
      initialValue: '2000',
      validation: (rule) =>
        rule.required().custom((value, context) => {
          if (typeof value !== 'string') return 'End time is required.'
          const canonicalEnd = toCanonicalTime(value)
          if (!canonicalEnd) return 'Use HHmm or HH:mm format.'
          if (!isTopOfHour(canonicalEnd)) return 'End time must be on the hour (e.g. 2000).'

          const rawStartTime = typeof context.document?.displayStartTime === 'string' ? context.document.displayStartTime : ''
          const canonicalStart = rawStartTime ? toCanonicalTime(rawStartTime) : null
          if (!canonicalStart) return true

          if (toMinutes(canonicalEnd) <= toMinutes(canonicalStart)) {
            return 'End time must be later than start time.'
          }

          return true
        }),
    }),
    dayField('monday', 'Monday'),
    dayField('tuesday', 'Tuesday'),
    dayField('wednesday', 'Wednesday'),
    dayField('thursday', 'Thursday'),
    dayField('friday', 'Friday'),
    dayField('saturday', 'Saturday'),
    dayField('sunday', 'Sunday'),
    colorField('scheduleBackgroundColor', 'Schedule Background Color', '#EFEFEF'),
    colorField('todayTabColor', 'Today Tab Color', '#749B26'),
    colorField('todayTabFillColor', 'Today Tab Fill Color', '#DBE3CC'),
    colorField('classTabColor', 'Class Tab Color', '#4B3AA8'),
    colorField('classTabFillColor', 'Class Tab Fill Color', '#F5F5F5'),
    colorField('cancelledClassTabColor', 'Cancelled Class Tab Color', '#DC2626'),
    colorField('cancelledClassFillColor', 'Cancelled Class Fill Color', '#FEF1F1'),
    colorField('substituteClassTabColor', 'Substitute Class Tab Color', '#4B3AA8'),
    colorField('substituteClassFillColor', 'Substitute Class Fill Color', '#ECEAFB'),
  ],
  preview: {
    prepare() {
      return {
        title: 'Schedule',
      }
    },
  },
})
