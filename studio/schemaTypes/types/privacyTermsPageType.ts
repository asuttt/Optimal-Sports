import {defineArrayMember, defineField, defineType} from 'sanity'

const policyRichTextField = (name: string, title: string) =>
  defineField({
    name,
    title,
    type: 'array',
    validation: (rule) => rule.required(),
    of: [
      defineArrayMember({
        type: 'block',
        styles: [{title: 'Normal', value: 'normal'}],
        lists: [{title: 'Bullet', value: 'bullet'}],
        marks: {
          decorators: [{title: 'Bold', value: 'strong'}],
          annotations: [],
        },
      }),
    ],
  })

export const privacyTermsPageType = defineType({
  name: 'privacyTermsPage',
  title: 'Privacy & Terms',
  type: 'document',
  fields: [
    defineField({name: 'title', title: 'Page Title', type: 'string', validation: (rule) => rule.required()}),
    defineField({name: 'subtitle', title: 'Page Subtitle', type: 'string', validation: (rule) => rule.required()}),
    defineField({
      name: 'privacyTitle',
      title: 'Privacy Box Title',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    policyRichTextField('privacyContent', 'Privacy Policy Content'),
    defineField({
      name: 'termsTitle',
      title: 'Terms Box Title',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    policyRichTextField('termsContent', 'Terms & Conditions Content'),
  ],
})
