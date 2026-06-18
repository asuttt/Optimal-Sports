import {defineArrayMember, defineField, defineType} from 'sanity'

export const classesPageType = defineType({
  name: 'classesPage',
  title: 'Classes',
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
      name: 'classCards',
      title: 'Class Cards',
      type: 'array',
      validation: (rule) => rule.required().min(1),
      of: [
        defineArrayMember({
          type: 'object',
          fields: [
            defineField({
              name: 'label',
              title: 'Class Name',
              type: 'string',
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: 'hasMultipleSubsections',
              title: 'Has Multiple Subsections',
              type: 'boolean',
              initialValue: false,
            }),
            defineField({
              name: 'value',
              title: 'Class Description',
              type: 'text',
              rows: 4,
              hidden: ({parent}) => parent?.hasMultipleSubsections === true,
              validation: (rule) =>
                rule.custom((fieldValue, context) => {
                  if (context.parent?.hasMultipleSubsections) return true
                  if (typeof fieldValue === 'string' && fieldValue.trim().length > 0) return true
                  return 'Class Description is required unless multiple subsections are enabled.'
                }),
            }),
            defineField({
              name: 'subsections',
              title: 'Subsections',
              type: 'array',
              hidden: ({parent}) => parent?.hasMultipleSubsections !== true,
              of: [
                defineArrayMember({
                  type: 'object',
                  fields: [
                    defineField({
                      name: 'label',
                      title: 'Subsection Label',
                      type: 'string',
                      validation: (rule) => rule.required(),
                    }),
                    defineField({
                      name: 'value',
                      title: 'Subsection Description',
                      type: 'text',
                      rows: 3,
                      validation: (rule) => rule.required(),
                    }),
                  ],
                  preview: {
                    select: {title: 'label', subtitle: 'value'},
                  },
                }),
              ],
              validation: (rule) =>
                rule.custom((fieldValue, context) => {
                  if (!context.parent?.hasMultipleSubsections) return true
                  if (Array.isArray(fieldValue) && fieldValue.length > 0) return true
                  return 'Add at least one subsection when multiple subsections are enabled.'
                }),
            }),
          ],
          preview: {
            select: {
              title: 'label',
              value: 'value',
              hasMultipleSubsections: 'hasMultipleSubsections',
              subsections: 'subsections',
            },
            prepare({title, value, hasMultipleSubsections, subsections}) {
              const subsectionCount = Array.isArray(subsections) ? subsections.length : 0
              return {
                title: hasMultipleSubsections ? `${title ?? 'Untitled'} (Multiple)` : (title ?? 'Untitled'),
                subtitle: hasMultipleSubsections
                  ? `${subsectionCount} subsection${subsectionCount === 1 ? '' : 's'}`
                  : (value ?? ''),
              }
            },
          },
        }),
      ],
    }),
  ],
})
