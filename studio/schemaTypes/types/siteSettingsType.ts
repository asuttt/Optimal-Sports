import {defineArrayMember, defineField, defineType} from 'sanity'
import {FaviconFileInput} from '../../components/FaviconFileInput'
import {HexColorInput} from '../../components/HexColorInput'

const NAV_ROUTE_OPTIONS = [
  {title: 'Home (/)', value: 'home'},
  {title: 'Our Story (/our-story)', value: 'our-story'},
  {title: 'Facility (/facility)', value: 'facility'},
  {title: 'Classes (/classes)', value: 'classes'},
  {title: 'Personal Training (/training)', value: 'training'},
  {title: 'Hospitality (/club-haus)', value: 'club-haus'},
  {title: 'Memberships (/memberships)', value: 'memberships'},
  {title: 'Schedule (/schedule)', value: 'schedule'},
]

const defaultNavigationItems = [
  {routeKey: 'home', label: 'Home', isVisible: true},
  {routeKey: 'our-story', label: 'Our Story', isVisible: true},
  {routeKey: 'facility', label: 'Facility', isVisible: true},
  {routeKey: 'classes', label: 'Classes', isVisible: true},
  {routeKey: 'training', label: 'Personal Training', isVisible: true},
  {routeKey: 'club-haus', label: 'Hospitality', isVisible: true},
  {routeKey: 'memberships', label: 'Memberships', isVisible: true},
  {routeKey: 'schedule', label: 'Schedule', isVisible: true},
]

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
          : 'Use a hex color like #236A52.'
      }),
  })

export const siteSettingsType = defineType({
  name: 'siteSettings',
  title: 'Site Settings',
  type: 'document',
  fields: [
    defineField({
      name: 'navigationItems',
      title: 'Navigation Items',
      description: 'Labels, visibility, and order for top navigation tabs.',
      type: 'array',
      initialValue: defaultNavigationItems,
      validation: (rule) =>
        rule
          .required()
          .min(1)
          .custom((items) => {
            const list = Array.isArray(items) ? items : []
            const routeKeys = list
              .map((item) => (item && typeof item === 'object' && 'routeKey' in item ? item.routeKey : null))
              .filter((value): value is string => typeof value === 'string')

            const uniqueRouteCount = new Set(routeKeys).size
            if (uniqueRouteCount !== routeKeys.length) {
              return 'Each route can only appear once.'
            }

            return true
          }),
      of: [
        defineArrayMember({
          type: 'object',
          fields: [
            defineField({
              name: 'routeKey',
              title: 'Route',
              type: 'string',
              options: {list: NAV_ROUTE_OPTIONS},
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: 'label',
              title: 'Label',
              type: 'string',
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: 'isVisible',
              title: 'Visible',
              type: 'boolean',
              initialValue: true,
            }),
          ],
          preview: {
            select: {title: 'label', routeKey: 'routeKey', isVisible: 'isVisible'},
            prepare({title, routeKey, isVisible}) {
              return {
                title: title || 'Navigation Item',
                subtitle: `${routeKey || 'unknown route'}${isVisible === false ? ' • Hidden' : ''}`,
              }
            },
          },
        }),
      ],
    }),
    defineField({
      name: 'branding',
      title: 'Branding',
      type: 'object',
      fields: [
        defineField({
          name: 'mainLogo',
          title: 'Main Logo',
          type: 'image',
          options: {hotspot: false},
        }),
        defineField({
          name: 'mobileLogo',
          title: 'Mobile Logo (Optional)',
          type: 'image',
          options: {hotspot: false},
        }),
        defineField({
          name: 'favicon',
          title: 'Favicon',
          type: 'file',
          description: 'Supports .ico, .png, and .svg.',
          options: {
            accept: '.ico,image/x-icon,image/vnd.microsoft.icon,image/png,image/svg+xml',
          },
          components: {
            input: FaviconFileInput,
          },
        }),
      ],
    }),
    defineField({
      name: 'theme',
      title: 'Theme Colors',
      description: 'Enter a hex value like #236A52.',
      type: 'object',
      fields: [
        colorField('headerBackground', 'Header Background', '#F2EEE6'),
        colorField('pageBackground', 'Page Background', '#F8F5EF'),
        colorField('primaryAccent', 'Primary Accent', '#236A52'),
        colorField('textColor', 'Text Color', '#262626'),
        colorField('cardBackground', 'Card Background', '#FFFDFC'),
        colorField('cardBorder', 'Card Border', '#DED7CB'),
      ],
    }),
    defineField({
      name: 'seo',
      title: 'SEO & Meta',
      type: 'object',
      fields: [
        defineField({
          name: 'defaultMetaTitle',
          title: 'Default Meta Title',
          type: 'string',
          initialValue: 'Gym Site Template',
          validation: (rule) => rule.required(),
        }),
        defineField({
          name: 'defaultMetaDescription',
          title: 'Default Meta Description',
          type: 'text',
          rows: 3,
          initialValue:
            'A reusable CMS-driven gym website starter with flexible public pages, schedule support, and an optional hospitality module.',
          validation: (rule) => rule.required(),
        }),
        defineField({
          name: 'author',
          title: 'Author',
          type: 'string',
          initialValue: 'Gym Site Template',
        }),
      ],
    }),
    defineField({
      name: 'footer',
      title: 'Footer',
      type: 'object',
      fields: [
        defineField({
          name: 'designerLinkUrl',
          title: 'Link URL',
          type: 'url',
          initialValue: '',
        }),
      ],
    }),
  ],
  preview: {
    prepare() {
      return {
        title: 'Site Settings',
      }
    },
  },
})
