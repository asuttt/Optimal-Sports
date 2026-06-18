import {defineArrayMember, defineField, defineType} from 'sanity'
import {HexColorInput} from '../../components/HexColorInput'

const HOME_FRAME_PREVIEW = [{title: 'Website Frame', aspectRatio: 16 / 10}]

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

const heroPhotoItem = defineArrayMember({
  type: 'object',
  fields: [
    defineField({
      name: 'image',
      title: 'Image',
      type: 'image',
      options: {hotspot: {previews: HOME_FRAME_PREVIEW}},
      fields: [
        defineField({
          name: 'alt',
          title: 'Image Label',
          type: 'string',
          validation: (rule) => rule.required(),
        }),
      ],
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'mobileImage',
      title: 'Mobile Image Override',
      description: 'Optional. If set, this image is used on mobile.',
      type: 'image',
      options: {hotspot: {previews: HOME_FRAME_PREVIEW}},
      fields: [
        defineField({
          name: 'alt',
          title: 'Image Label',
          type: 'string',
        }),
      ],
    }),
  ],
  preview: {
    select: {
      media: 'image',
      title: 'image.alt',
      hasMobileImage: 'mobileImage.asset',
    },
    prepare({media, title, hasMobileImage}) {
      return {
        title: title || 'Hero Photo',
        subtitle: hasMobileImage ? 'Has mobile override' : 'Default only',
        media,
      }
    },
  },
})

export const homePageType = defineType({
  name: 'homePage',
  title: 'Home',
  type: 'document',
  fields: [
    defineField({
      name: 'heroPhotos',
      title: 'Hero Slideshow',
      type: 'array',
      description: 'Displayed in a 16:10 frame on the website. Use hotspot/crop to fine-tune.',
      validation: (rule) => rule.required().min(1),
      of: [heroPhotoItem],
    }),
    defineField({
      name: 'hours',
      title: 'Hours',
      type: 'array',
      validation: (rule) => rule.required().min(1),
      of: [
        defineArrayMember({
          type: 'object',
          fields: [
            defineField({name: 'label', title: 'Label', type: 'string', validation: (rule) => rule.required()}),
            defineField({name: 'value', title: 'Value', type: 'string', validation: (rule) => rule.required()}),
          ],
          preview: {
            select: {
              title: 'label',
              subtitle: 'value',
            },
          },
        }),
      ],
    }),
    defineField({
      name: 'addressLines',
      title: 'Address',
      type: 'array',
      validation: (rule) => rule.required().min(1),
      of: [defineArrayMember({type: 'string'})],
    }),
    defineField({
      name: 'phone',
      title: 'Phone',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'email',
      title: 'Email',
      type: 'string',
      validation: (rule) => rule.required().email(),
    }),
    defineField({
      name: 'socialLinks',
      title: 'Social Links',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'object',
          fields: [
            defineField({name: 'platform', title: 'Platform', type: 'string', validation: (rule) => rule.required()}),
            defineField({name: 'url', title: 'URL', type: 'url', validation: (rule) => rule.required()}),
          ],
        }),
      ],
    }),
    defineField({
      name: 'announcement',
      title: 'Special Announcement',
      type: 'object',
      description:
        'Activation rule: this only appears on the website when Enabled is turned on and the Message field contains content.',
      fields: [
        defineField({
          name: 'enabled',
          title: 'Enabled',
          type: 'boolean',
          initialValue: false,
          description: 'Turn on to show the announcement when content is filled in.',
        }),
        defineField({
          name: 'displayMode',
          title: 'Display Mode',
          type: 'string',
          description: 'Optional. If left blank, the site will fall back to Banner.',
          options: {
            list: [
              {title: 'Banner — low urgency / general info', value: 'banner'},
              {title: 'Floating Card — major announcement', value: 'floating'},
            ],
            layout: 'dropdown',
          },
        }),
        defineField({
          name: 'title',
          title: 'Announcement Title',
          type: 'string',
        }),
        defineField({
          name: 'message',
          title: 'Announcement Message',
          type: 'text',
          rows: 4,
          description: 'Required for the announcement to appear on the site.',
          validation: (rule) =>
            rule.custom((value, context) => {
              const enabled =
                context.parent &&
                typeof context.parent === 'object' &&
                'enabled' in context.parent &&
                context.parent.enabled === true

              if (!enabled) return true

              const title =
                context.parent &&
                typeof context.parent === 'object' &&
                'title' in context.parent &&
                typeof context.parent.title === 'string'
                  ? context.parent.title.trim()
                  : ''

              const message = typeof value === 'string' ? value.trim() : ''

              const linkLabel =
                context.parent &&
                typeof context.parent === 'object' &&
                'linkLabel' in context.parent &&
                typeof context.parent.linkLabel === 'string'
                  ? context.parent.linkLabel.trim()
                  : ''

              const linkUrl =
                context.parent &&
                typeof context.parent === 'object' &&
                'linkUrl' in context.parent &&
                typeof context.parent.linkUrl === 'string'
                  ? context.parent.linkUrl.trim()
                  : ''

              const hasLink = linkLabel.length > 0 && linkUrl.length > 0

              if (title.length > 0 || message.length > 0 || hasLink) return true

              return 'When Enabled is turned on, add a title, a message, or a complete button label + link.'
            }),
        }),
        defineField({
          name: 'linkLabel',
          title: 'Link Label',
          type: 'string',
        }),
        defineField({
          name: 'linkUrl',
          title: 'Link URL',
          type: 'url',
        }),
        colorField(
          'buttonColor',
          'Button Fill Color',
          '#749B26',
          'Background color for the announcement CTA button.'
        ),
        colorField(
          'buttonTextColor',
          'Button Text Color',
          '#FFFFFF',
          'Text color for the announcement CTA button.'
        ),
      ],
    }),
  ],
  preview: {
    prepare() {
      return {
        title: 'Home',
      }
    },
  },
})
