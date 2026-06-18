import {defineArrayMember, defineField, defineType} from 'sanity'
import {HexColorInput} from '../../components/HexColorInput'

const colorField = (name: string, title: string, defaultHex: string, description?: string) =>
  defineField({
    name,
    title,
    type: 'object',
    initialValue: {
      _type: name,
      hex: defaultHex,
    },
    description,
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

export const membershipsPageType = defineType({
  name: 'membershipsPage',
  title: 'Memberships',
  type: 'document',
  fields: [
    defineField({name: 'title', title: 'Title', type: 'string', validation: (rule) => rule.required()}),
    defineField({
      name: 'subtitle',
      title: 'Subtitle',
      type: 'text',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'subtitleEmphasis',
      title: 'Subtitle Emphasis',
      description: 'Optional phrase from Subtitle to render in semibold.',
      type: 'string',
    }),
    defineField({
      name: 'leftBoxTitle',
      title: 'Left Box Title',
      type: 'string',
      validation: (rule) => rule.required(),
      initialValue: 'Drop-in Visits',
    }),
    defineField({
      name: 'leftBoxSubtitle',
      title: 'Left Box Subtitle',
      type: 'string',
      validation: (rule) => rule.required(),
      initialValue: 'No membership required',
    }),
    defineField({
      name: 'leftBoxPlans',
      title: 'Left Box Plans',
      type: 'array',
      validation: (rule) => rule.required().min(1),
      initialValue: [
        {label: 'Single', value: '$30'},
        {label: 'Pack of 10', value: '$280'},
      ],
      of: [
        defineArrayMember({
          type: 'object',
          fields: [
            defineField({name: 'label', title: 'Label', type: 'string', validation: (rule) => rule.required()}),
            defineField({name: 'value', title: 'Value', type: 'string', validation: (rule) => rule.required()}),
          ],
          preview: {
            select: {title: 'label', subtitle: 'value'},
          },
        }),
      ],
    }),
    defineField({
      name: 'rightBoxTitle',
      title: 'Right Box Title',
      type: 'string',
      validation: (rule) => rule.required(),
      initialValue: 'Monthly Memberships',
    }),
    defineField({
      name: 'rightBoxSubtitle',
      title: 'Right Box Subtitle',
      type: 'string',
      validation: (rule) => rule.required(),
      initialValue: 'Full access to equipment and classes',
    }),
    defineField({
      name: 'rightBoxPlans',
      title: 'Right Box Plans',
      type: 'array',
      validation: (rule) => rule.required().min(1),
      initialValue: [
        {label: 'Unlimited', value: '$165'},
        {label: 'Students/Family', value: '$135'},
        {label: 'Seniors', value: '$105'},
      ],
      of: [
        defineArrayMember({
          type: 'object',
          fields: [
            defineField({name: 'label', title: 'Label', type: 'string', validation: (rule) => rule.required()}),
            defineField({name: 'value', title: 'Value', type: 'string', validation: (rule) => rule.required()}),
          ],
          preview: {
            select: {title: 'label', subtitle: 'value'},
          },
        }),
      ],
    }),
    defineField({
      name: 'callToActionText',
      title: 'Call to Action Text',
      description: 'Use "[email]" where the email link should appear.',
      type: 'text',
      rows: 4,
      validation: (rule) =>
        rule.required().custom((value) => {
          const text = typeof value === 'string' ? value : ''
          if (!text.includes('[email]')) {
            return 'Call to Action Text must include [email].'
          }

          return true
        }),
      initialValue:
        'Get a free gym orientation with a certified personal trainer after you sign up!\nContact [email] to schedule yours today!',
    }),
    defineField({
      name: 'callToActionEmail',
      title: 'Call to Action Email',
      type: 'string',
      validation: (rule) => rule.email(),
      initialValue: 'hello@example.com',
    }),
    defineField({
      name: 'signupLabel',
      title: 'Signup Button Label',
      type: 'string',
      validation: (rule) => rule.required(),
      initialValue: 'Sign Up Today!',
    }),
    defineField({
      name: 'signupUrl',
      title: 'Signup Button URL',
      type: 'url',
      validation: (rule) => rule.required(),
      initialValue: '',
    }),
    colorField(
      'signupButtonColor',
      'Signup Button Color',
      '#749B26',
      'Background color for the signup button.'
    ),
    colorField(
      'signupButtonTextColor',
      'Signup Button Text Color',
      '#FFFFFF',
      'Text color for the signup button.'
    ),
  ],
})
