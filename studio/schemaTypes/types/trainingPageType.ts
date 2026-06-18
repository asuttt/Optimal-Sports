import {defineArrayMember, defineField, defineType} from 'sanity'

export const trainingPageType = defineType({
  name: 'trainingPage',
  title: 'Personal Training',
  type: 'document',
  fields: [
    defineField({name: 'title', title: 'Title', type: 'string', validation: (rule) => rule.required()}),
    defineField({
      name: 'subtitle',
      title: 'Subtitle',
      type: 'text',
      rows: 3,
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'subtitleEmphasis',
      title: 'Subtitle Emphasis',
      description: 'Optional phrase from Subtitle to render in semibold.',
      type: 'string',
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
      initialValue: 'Get in touch with your coach today!\nContact [email] to get started.',
    }),
    defineField({
      name: 'callToActionEmail',
      title: 'Call to Action Email',
      type: 'string',
      validation: (rule) => rule.required().email(),
      initialValue: 'coach@example.com',
    }),
    defineField({
      name: 'ptDetailCardTitle',
      title: 'Body Subtitle',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'trainingCards',
      title: 'Personal Training Description Cards',
      type: 'array',
      validation: (rule) => rule.required().min(1),
      of: [
        defineArrayMember({
          type: 'object',
          fields: [
            defineField({
              name: 'label',
              title: 'Label',
              type: 'string',
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: 'value',
              title: 'Value',
              type: 'text',
              rows: 4,
              validation: (rule) => rule.required(),
            }),
          ],
          preview: {
            select: {title: 'label', subtitle: 'value'},
          },
        }),
      ],
    }),
  ],
})
