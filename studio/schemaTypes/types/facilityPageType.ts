import {defineArrayMember, defineField, defineType} from 'sanity'
import {HexColorInput} from '../../components/HexColorInput'

const FACILITY_FRAME_PREVIEW = [{title: 'Website Frame', aspectRatio: 4 / 3}]

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

export const facilityPageType = defineType({
  name: 'facilityPage',
  title: 'Facility',
  type: 'document',
  fields: [
    defineField({name: 'title', title: 'Title', type: 'string', validation: (rule) => rule.required()}),
    defineField({
      name: 'subtitle',
      title: 'Subtitle',
      type: 'text',
      rows: 5,
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'subtitleEmphasis',
      title: 'Subtitle Emphasis',
      description: 'Optional phrase from Subtitle to render in semibold.',
      type: 'string',
    }),
    defineField({
      name: 'amenities',
      title: 'Amenities',
      type: 'array',
      of: [defineArrayMember({type: 'string'})],
    }),
    colorField('amenityPillBackground', 'Pill Background', '#ECEAFB'),
    colorField('amenityPillBorder', 'Pill Border', '#A197D1'),
    colorField('amenityPillText', 'Pill Text', '#8F85C2'),
    defineField({
      name: 'photos',
      title: 'Photos',
      type: 'array',
      validation: (rule) => rule.required(),
      of: [
        defineArrayMember({
          type: 'object',
          fields: [
            defineField({
              name: 'image',
              title: 'Image',
              type: 'image',
              options: {hotspot: {previews: FACILITY_FRAME_PREVIEW}},
              fields: [defineField({name: 'alt', title: 'Image Label', type: 'string'})],
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: 'mobileImage',
              title: 'Mobile Image Override',
              description: 'Optional. If set, this image is used on mobile.',
              type: 'image',
              options: {hotspot: {previews: FACILITY_FRAME_PREVIEW}},
              fields: [defineField({name: 'alt', title: 'Image Label', type: 'string'})],
            }),
          ],
          preview: {
            select: {
              media: 'image',
              title: 'image.alt',
              mobileMedia: 'mobileImage',
            },
            prepare({media, mobileMedia, title}) {
              return {
                title: title || 'Facility Photo Slot',
                subtitle: mobileMedia ? 'Has mobile override' : 'Default only',
                media,
              }
            },
          },
        }),
      ],
    }),
  ],
})
