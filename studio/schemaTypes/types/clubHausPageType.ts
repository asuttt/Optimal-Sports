import {defineArrayMember, defineField, defineType} from 'sanity'

const CLUBHAUS_MENU_FRAME_PREVIEW = [{title: 'Website Frame', aspectRatio: 8.5 / 11}]
const CLUBHAUS_GALLERY_DESKTOP_FRAME_PREVIEWS = [
  {title: 'Desktop (Approx)', aspectRatio: 1 / 1},
  {title: 'Desktop Wide (Alt)', aspectRatio: 4 / 3},
]
const CLUBHAUS_GALLERY_MOBILE_FRAME_PREVIEWS = [{title: 'Mobile (Approx)', aspectRatio: 3 / 2}]

const normalizePdfPageCount = (value: unknown) => {
  const parsed = Number(value)
  if (!Number.isFinite(parsed)) return 1
  return Math.max(1, Math.floor(parsed))
}

const getMenuRenderPageCount = (menuItems: unknown[]) =>
  menuItems.reduce((total, item) => {
    if (!item || typeof item !== 'object') return total + 1
    const mediaType = 'mediaType' in item ? item.mediaType : undefined
    if (mediaType === 'pdf') {
      const pdfPageCount = 'pdfPageCount' in item ? item.pdfPageCount : undefined
      return total + normalizePdfPageCount(pdfPageCount)
    }
    return total + 1
  }, 0)

const getExpectedGalleryCount = (menuRenderPageCount: number) => 2 * (menuRenderPageCount + 1)

export const clubHausPageType = defineType({
  name: 'clubHausPage',
  title: 'Hospitality',
  type: 'document',
  fields: [
    defineField({name: 'title', title: 'Title', type: 'string', validation: (rule) => rule.required()}),
    defineField({
      name: 'subtitle',
      title: 'Subtitle',
      type: 'text',
      rows: 4,
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'subtitleEmphasis',
      title: 'Subtitle Emphasis',
      description: 'Optional phrase from Subtitle to render in semibold.',
      type: 'string',
    }),
    defineField({
      name: 'menuItems',
      title: 'Menu Media',
      type: 'array',
      description: 'Supports 1 to 4 menu items.',
      validation: (rule) => rule.required().min(1).max(4),
      of: [
        defineArrayMember({
          type: 'object',
          fields: [
            defineField({
              name: 'mediaType',
              title: 'Media Type',
              type: 'string',
              initialValue: 'image',
              options: {
                list: [
                  {title: 'Image', value: 'image'},
                  {title: 'PDF', value: 'pdf'},
                ],
              },
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: 'label',
              title: 'Label',
              type: 'string',
            }),
            defineField({
              name: 'image',
              title: 'Image',
              type: 'image',
              hidden: ({parent}) => parent?.mediaType === 'pdf',
              options: {hotspot: {previews: CLUBHAUS_MENU_FRAME_PREVIEW}},
              fields: [defineField({name: 'alt', title: 'Image Label', type: 'string'})],
              validation: (rule) =>
                rule.custom((value, context) => {
                  if (context.parent?.mediaType === 'pdf') return true
                  if (value) return true
                  return 'Image is required when Media Type is Image.'
                }),
            }),
            defineField({
              name: 'mobileImage',
              title: 'Mobile Image Override',
              description: 'Optional. If set, this image is used on mobile for image-type items.',
              type: 'image',
              hidden: ({parent}) => parent?.mediaType === 'pdf',
              options: {hotspot: {previews: CLUBHAUS_MENU_FRAME_PREVIEW}},
              fields: [defineField({name: 'alt', title: 'Image Label', type: 'string'})],
            }),
            defineField({
              name: 'pdfFile',
              title: 'PDF File',
              type: 'file',
              hidden: ({parent}) => parent?.mediaType !== 'pdf',
              options: {
                accept: 'application/pdf',
              },
              validation: (rule) =>
                rule.custom((value, context) => {
                  if (context.parent?.mediaType !== 'pdf') return true
                  if (value) return true
                  return 'PDF File is required when Media Type is PDF.'
                }),
            }),
            defineField({
              name: 'pdfPageCount',
              title: 'PDF Page Count',
              description: 'Number of pages in this PDF that should render as menu cards.',
              type: 'number',
              hidden: ({parent}) => parent?.mediaType !== 'pdf',
              validation: (rule) =>
                rule.custom((value, context) => {
                  if (context.parent?.mediaType !== 'pdf') return true
                  if (typeof value !== 'number' || !Number.isFinite(value)) {
                    return 'PDF Page Count is required when Media Type is PDF.'
                  }
                  if (!Number.isInteger(value) || value < 1) {
                    return 'PDF Page Count must be a whole number of at least 1.'
                  }
                  if (value > 20) {
                    return 'PDF Page Count looks too high. Please confirm the value.'
                  }
                  return true
                }),
            }),
          ],
          preview: {
            select: {
              mediaType: 'mediaType',
              label: 'label',
              media: 'image',
              hasMobileImage: 'mobileImage.asset',
              pdfPageCount: 'pdfPageCount',
            },
            prepare({mediaType, label, media, hasMobileImage, pdfPageCount}) {
              const typeLabel = mediaType === 'pdf' ? 'PDF' : 'Image'
              const normalizedPdfPageCount = normalizePdfPageCount(pdfPageCount)
              return {
                title: label || `Menu Item (${typeLabel})`,
                subtitle:
                  mediaType === 'pdf'
                    ? `PDF · ${normalizedPdfPageCount} page${normalizedPdfPageCount === 1 ? '' : 's'}`
                    : hasMobileImage
                    ? 'Image with mobile override'
                    : 'Image',
                media,
              }
            },
          },
        }),
      ],
    }),
    defineField({
      name: 'galleryPhotos',
      title: 'Gallery Photos',
      type: 'array',
      description:
        'Gallery count is coupled to rendered menu pages: required photos = 2 × (rendered menu pages + 1).',
      validation: (rule) =>
        rule.required().custom((value, context) => {
          const photos = Array.isArray(value) ? value : []
          const menuItems = Array.isArray(context.document?.menuItems) ? context.document.menuItems : []

          if (menuItems.length < 1 || menuItems.length > 4) {
            return 'Set Menu Media to 1-4 items before validating gallery count.'
          }

          const menuRenderPageCount = getMenuRenderPageCount(menuItems)
          const expected = getExpectedGalleryCount(menuRenderPageCount)
          if (photos.length !== expected) {
            return `With ${menuRenderPageCount} rendered menu page${menuRenderPageCount === 1 ? '' : 's'}, gallery must have ${expected} photos.`
          }

          return true
        }),
      of: [
        defineArrayMember({
          type: 'object',
          fields: [
            defineField({
              name: 'image',
              title: 'Image',
              type: 'image',
              options: {hotspot: {previews: CLUBHAUS_GALLERY_DESKTOP_FRAME_PREVIEWS}},
              fields: [defineField({name: 'alt', title: 'Image Label', type: 'string'})],
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: 'mobileImage',
              title: 'Mobile Image Override',
              description: 'Optional. If set, this image is used on mobile.',
              type: 'image',
              options: {hotspot: {previews: CLUBHAUS_GALLERY_MOBILE_FRAME_PREVIEWS}},
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
                title: title || 'Gallery Photo Slot',
                subtitle: mobileMedia ? 'Has mobile override' : 'Default only',
                media,
              }
            },
          },
        }),
      ],
    }),
    defineField({
      name: 'callToActionText',
      title: 'Call to Action Text',
      type: 'string',
      initialValue: 'Interested in this optional area? Add a short CTA or link your audience to the next step.',
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
      initialValue: [],
    }),
  ],
})
