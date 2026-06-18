import {sanityClient} from '@/lib/sanity/client'

export type NavRouteKey =
  | 'home'
  | 'our-story'
  | 'facility'
  | 'classes'
  | 'training'
  | 'club-haus'
  | 'memberships'
  | 'schedule'

export interface PublicNavigationItem {
  routeKey: NavRouteKey
  label: string
  to: string
  isVisible: boolean
}

export interface PublicBrandingSettings {
  mainLogoUrl: string
  mobileLogoUrl: string
  faviconUrl: string
}

export interface PublicThemeSettings {
  headerBackground: string
  pageBackground: string
  primaryAccent: string
  textColor: string
  cardBackground: string
  cardBorder: string
}

export interface PublicSeoSettings {
  defaultMetaTitle: string
  defaultMetaDescription: string
  author: string
}

export interface PublicFooterSettings {
  designerLinkUrl: string
}

export interface PublicSiteSettings {
  navigationItems: PublicNavigationItem[]
  branding: PublicBrandingSettings
  theme: PublicThemeSettings
  seo: PublicSeoSettings
  footer: PublicFooterSettings
}

const ROUTE_PATH_BY_KEY: Record<NavRouteKey, string> = {
  home: '/',
  'our-story': '/our-story',
  facility: '/facility',
  classes: '/classes',
  training: '/training',
  'club-haus': '/club-haus',
  memberships: '/memberships',
  schedule: '/schedule',
}

const DEFAULT_NAVIGATION_ITEMS: PublicNavigationItem[] = [
  {routeKey: 'home', label: 'Home', to: ROUTE_PATH_BY_KEY.home, isVisible: true},
  {routeKey: 'our-story', label: 'Our Story', to: ROUTE_PATH_BY_KEY['our-story'], isVisible: true},
  {routeKey: 'facility', label: 'Facility', to: ROUTE_PATH_BY_KEY.facility, isVisible: true},
  {routeKey: 'classes', label: 'Classes', to: ROUTE_PATH_BY_KEY.classes, isVisible: true},
  {routeKey: 'training', label: 'Personal Training', to: ROUTE_PATH_BY_KEY.training, isVisible: true},
  {routeKey: 'club-haus', label: 'Hospitality', to: ROUTE_PATH_BY_KEY['club-haus'], isVisible: true},
  {routeKey: 'memberships', label: 'Memberships', to: ROUTE_PATH_BY_KEY.memberships, isVisible: true},
  {routeKey: 'schedule', label: 'Schedule', to: ROUTE_PATH_BY_KEY.schedule, isVisible: true},
]

export const DEFAULT_PUBLIC_SITE_SETTINGS: PublicSiteSettings = {
  navigationItems: DEFAULT_NAVIGATION_ITEMS,
  branding: {
    mainLogoUrl: '',
    mobileLogoUrl: '',
    faviconUrl: '/favicon.ico',
  },
  theme: {
    headerBackground: '#F2EEE6',
    pageBackground: '#F8F5EF',
    primaryAccent: '#236A52',
    textColor: '#262626',
    cardBackground: '#FFFDFC',
    cardBorder: '#DED7CB',
  },
  seo: {
    defaultMetaTitle: 'Gym Site Template',
    defaultMetaDescription:
      'A reusable CMS-driven gym website starter with flexible public pages, schedule support, and an optional hospitality module.',
    author: 'Gym Site Template',
  },
  footer: {
    designerLinkUrl: '',
  },
}

interface ColorValueRaw {
  hex?: string
}

type ThemeColorRaw = string | ColorValueRaw

interface NavigationItemRaw {
  routeKey?: string
  path?: string
  label?: string
  isVisible?: boolean
}

interface AssetUrlRaw {
  asset?: {
    url?: string
  }
}

interface SiteSettingsRaw {
  navigationItems?: NavigationItemRaw[]
  branding?: {
    mainLogo?: AssetUrlRaw
    mobileLogo?: AssetUrlRaw
    favicon?: AssetUrlRaw
  }
  theme?: {
    headerBackground?: ThemeColorRaw
    pageBackground?: ThemeColorRaw
    primaryAccent?: ThemeColorRaw
    textColor?: ThemeColorRaw
    cardBackground?: ThemeColorRaw
    cardBorder?: ThemeColorRaw
  }
  seo?: {
    defaultMetaTitle?: string
    defaultMetaDescription?: string
    author?: string
  }
  footer?: {
    designerLinkUrl?: string
  }
}

const SITE_SETTINGS_QUERY = `
  *[_type == "siteSettings" && _id == "siteSettings"][0]{
    navigationItems[]{
      routeKey,
      path,
      label,
      isVisible
    },
    branding{
      mainLogo{
        asset->{
          url
        }
      },
      mobileLogo{
        asset->{
          url
        }
      },
      favicon{
        asset->{
          url
        }
      }
    },
    theme{
      headerBackground,
      pageBackground,
      primaryAccent,
      textColor,
      cardBackground,
      cardBorder
    },
    seo{
      defaultMetaTitle,
      defaultMetaDescription,
      author
    },
    footer{
      designerLinkUrl
    }
  }
`

function isNavRouteKey(value: string): value is NavRouteKey {
  return Object.prototype.hasOwnProperty.call(ROUTE_PATH_BY_KEY, value)
}

function normalizeHexColor(value: string | undefined, fallback: string): string {
  if (!value) return fallback
  const candidate = value.trim()
  if (/^#([0-9A-Fa-f]{3}|[0-9A-Fa-f]{6})$/.test(candidate)) {
    if (candidate.length === 4) {
      const [, r, g, b] = candidate
      return `#${r}${r}${g}${g}${b}${b}`.toUpperCase()
    }

    return candidate.toUpperCase()
  }

  return fallback
}

function colorToHex(value: ThemeColorRaw | undefined, fallback: string): string {
  if (typeof value === 'string') {
    return normalizeHexColor(value, fallback)
  }

  if (value && typeof value === 'object') {
    return normalizeHexColor(value.hex, fallback)
  }

  return fallback
}

function assetToUrl(asset: AssetUrlRaw | undefined): string {
  return asset?.asset?.url?.trim() || ''
}

function pathToRouteKey(path: string): NavRouteKey | null {
  const matched = Object.entries(ROUTE_PATH_BY_KEY).find(([, routePath]) => routePath === path)
  return (matched?.[0] as NavRouteKey | undefined) ?? null
}

function normalizeNavigationItems(items: NavigationItemRaw[] | undefined): PublicNavigationItem[] {
  if (!items || items.length === 0) return DEFAULT_NAVIGATION_ITEMS

  const seen = new Set<NavRouteKey>()
  const normalized: PublicNavigationItem[] = []

  for (const item of items) {
    const routeFromKey = typeof item.routeKey === 'string' && isNavRouteKey(item.routeKey) ? item.routeKey : null
    const routeFromPath = typeof item.path === 'string' ? pathToRouteKey(item.path.trim()) : null
    const routeKey = routeFromKey ?? routeFromPath

    if (!routeKey || seen.has(routeKey)) continue
    seen.add(routeKey)

    const defaultItem = DEFAULT_NAVIGATION_ITEMS.find((entry) => entry.routeKey === routeKey)
    normalized.push({
      routeKey,
      to: ROUTE_PATH_BY_KEY[routeKey],
      label: item.label?.trim() || defaultItem?.label || routeKey,
      isVisible: item.isVisible !== false,
    })
  }

  return normalized.length > 0 ? normalized : DEFAULT_NAVIGATION_ITEMS
}

export function hexToHslTriplet(hex: string): string {
  const normalized = normalizeHexColor(hex, '#749B26')
  const raw = normalized.replace('#', '')
  const r = parseInt(raw.slice(0, 2), 16) / 255
  const g = parseInt(raw.slice(2, 4), 16) / 255
  const b = parseInt(raw.slice(4, 6), 16) / 255

  const max = Math.max(r, g, b)
  const min = Math.min(r, g, b)
  const delta = max - min

  let h = 0
  if (delta !== 0) {
    if (max === r) h = ((g - b) / delta) % 6
    else if (max === g) h = (b - r) / delta + 2
    else h = (r - g) / delta + 4
    h *= 60
    if (h < 0) h += 360
  }

  const l = (max + min) / 2
  const s = delta === 0 ? 0 : delta / (1 - Math.abs(2 * l - 1))

  return `${Math.round(h)} ${Math.round(s * 100)}% ${Math.round(l * 100)}%`
}

export async function fetchSiteSettings(): Promise<PublicSiteSettings | null> {
  if (!sanityClient) return null

  const raw = await sanityClient.fetch<SiteSettingsRaw | null>(SITE_SETTINGS_QUERY)
  if (!raw) return null

  const defaultTheme = DEFAULT_PUBLIC_SITE_SETTINGS.theme
  const defaultSeo = DEFAULT_PUBLIC_SITE_SETTINGS.seo
  const defaultFooter = DEFAULT_PUBLIC_SITE_SETTINGS.footer

  const settings: PublicSiteSettings = {
    navigationItems: normalizeNavigationItems(raw.navigationItems),
    branding: {
      mainLogoUrl: assetToUrl(raw.branding?.mainLogo),
      mobileLogoUrl: assetToUrl(raw.branding?.mobileLogo),
      faviconUrl: assetToUrl(raw.branding?.favicon) || DEFAULT_PUBLIC_SITE_SETTINGS.branding.faviconUrl,
    },
    theme: {
      headerBackground: colorToHex(raw.theme?.headerBackground, defaultTheme.headerBackground),
      pageBackground: colorToHex(raw.theme?.pageBackground, defaultTheme.pageBackground),
      primaryAccent: colorToHex(raw.theme?.primaryAccent, defaultTheme.primaryAccent),
      textColor: colorToHex(raw.theme?.textColor, defaultTheme.textColor),
      cardBackground: colorToHex(raw.theme?.cardBackground, defaultTheme.cardBackground),
      cardBorder: colorToHex(raw.theme?.cardBorder, defaultTheme.cardBorder),
    },
    seo: {
      defaultMetaTitle: raw.seo?.defaultMetaTitle?.trim() || defaultSeo.defaultMetaTitle,
      defaultMetaDescription: raw.seo?.defaultMetaDescription?.trim() || defaultSeo.defaultMetaDescription,
      author: raw.seo?.author?.trim() || defaultSeo.author,
    },
    footer: {
      designerLinkUrl: raw.footer?.designerLinkUrl?.trim() || defaultFooter.designerLinkUrl,
    },
  }

  return settings
}
