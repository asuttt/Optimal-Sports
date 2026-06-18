import type {StructureResolver} from 'sanity/structure'

const singletonItem = (
  S: Parameters<StructureResolver>[0],
  title: string,
  schemaType: string,
  documentId: string
) =>
  S.listItem()
    .title(title)
    .child(S.document().schemaType(schemaType).documentId(documentId))

export const structure: StructureResolver = (S) =>
  S.list()
    .title('Gym Site Content')
    .items([
      singletonItem(S, 'Site Settings', 'siteSettings', 'siteSettings'),
      singletonItem(S, 'Privacy & Terms', 'privacyTermsPage', 'privacyTermsPage'),
      singletonItem(S, 'Home', 'homePage', 'homePage'),
      singletonItem(S, 'Our Story', 'ourStoryPage', 'ourStoryPage'),
      singletonItem(S, 'Facility', 'facilityPage', 'facilityPage'),
      singletonItem(S, 'Classes', 'classesPage', 'classesPage'),
      singletonItem(S, 'Personal Training', 'trainingPage', 'trainingPage'),
      singletonItem(S, 'Hospitality', 'clubHausPage', 'clubHausPage'),
      singletonItem(S, 'Memberships', 'membershipsPage', 'membershipsPage'),
      singletonItem(S, 'Schedule', 'schedulePage', 'schedulePage'),
    ])
