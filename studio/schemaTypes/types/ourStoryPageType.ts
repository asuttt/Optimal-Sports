import {defineField, defineType} from 'sanity'

const OUR_STORY_FRAME_PREVIEWS = [
  {title: 'Desktop', aspectRatio: 1},
  {title: 'Mobile', aspectRatio: 4 / 5},
]

export const ourStoryPageType = defineType({
  name: 'ourStoryPage',
  title: 'Our Story',
  type: 'document',
  fields: [
    defineField({name: 'title', title: 'Title', type: 'string', validation: (rule) => rule.required()}),
    defineField({
      name: 'subtitle',
      title: 'Subtitle',
      type: 'text',
      rows: 8,
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'subtitleEmphasis',
      title: 'Subtitle Emphasis',
      description: 'Optional phrase from Subtitle to render in semibold.',
      type: 'string',
    }),
    defineField({
      name: 'featureImages',
      title: 'Feature Image',
      type: 'array',
      validation: (rule) => rule.required().min(1).max(1),
      of: [
        {
          type: 'object',
          fields: [
            defineField({
              name: 'image',
              title: 'Image',
              type: 'image',
              options: {hotspot: {previews: OUR_STORY_FRAME_PREVIEWS}},
              fields: [defineField({name: 'alt', title: 'Image Label', type: 'string'})],
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: 'mobileImage',
              title: 'Mobile Image Override',
              description: 'Optional. If set, this image is used on mobile.',
              type: 'image',
              options: {hotspot: {previews: OUR_STORY_FRAME_PREVIEWS}},
              fields: [defineField({name: 'alt', title: 'Image Label', type: 'string'})],
            }),
          ],
          preview: {
            select: {
              media: 'image',
              mobileMedia: 'mobileImage',
              title: 'image.alt',
            },
            prepare({media, mobileMedia, title}) {
              return {
                title: title || 'Our Story Feature Image',
                subtitle: mobileMedia ? 'Has mobile override' : 'Default only',
                media,
              }
            },
          },
        },
      ],
    }),
  ],
})
