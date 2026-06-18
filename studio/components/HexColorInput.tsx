import {Card, Flex, Stack, TextInput} from '@sanity/ui'
import type {ChangeEvent} from 'react'
import {PatchEvent, set, setIfMissing, unset, type ObjectInputProps} from 'sanity'

const HEX_COLOR_PATTERN = /^#([0-9A-Fa-f]{3}|[0-9A-Fa-f]{6})$/

interface ThemeColorValue {
  _type?: string
  hex?: string
}

function normalizeHex(hex: string): string {
  const trimmed = hex.trim()
  if (trimmed.length === 0) return '#000000'

  const prefixed = trimmed.startsWith('#') ? trimmed : `#${trimmed}`
  if (!HEX_COLOR_PATTERN.test(prefixed)) return '#000000'

  if (prefixed.length === 4) {
    const [, r, g, b] = prefixed
    return `#${r}${r}${g}${g}${b}${b}`.toUpperCase()
  }

  return prefixed.toUpperCase()
}

export function HexColorInput(props: ObjectInputProps<ThemeColorValue>) {
  const {value, onChange, elementProps, readOnly} = props
  const currentHex = typeof value?.hex === 'string' ? value.hex : ''
  const swatchValue = normalizeHex(currentHex || '#749B26')

  const setHexValue = (hexValue: string) => {
    const nextValue = hexValue.trim()
    if (nextValue.length === 0) {
      onChange(PatchEvent.from([unset(['hex'])]))
      return
    }

    const normalized = nextValue.startsWith('#') ? nextValue.toUpperCase() : `#${nextValue.toUpperCase()}`
    onChange(
      PatchEvent.from([
        setIfMissing({_type: props.schemaType.name}),
        set(normalized, ['hex']),
      ])
    )
  }

  const handleTextChange = (event: ChangeEvent<HTMLInputElement>) => {
    setHexValue(event.currentTarget.value)
  }

  const handleColorPickerChange = (event: ChangeEvent<HTMLInputElement>) => {
    setHexValue(event.currentTarget.value)
  }

  return (
    <Stack space={3}>
      <Flex align="center" gap={3}>
        <Card
          radius={2}
          border
          shadow={1}
          style={{
            width: 36,
            height: 36,
            backgroundColor: swatchValue,
          }}
        />
        <input
          aria-label={`${props.schemaType.title || 'Color'} picker`}
          type="color"
          value={swatchValue}
          disabled={readOnly}
          onChange={handleColorPickerChange}
          style={{height: 36, width: 72, cursor: readOnly ? 'not-allowed' : 'pointer'}}
        />
      </Flex>

      <TextInput
        id={elementProps.id}
        value={currentHex}
        readOnly={readOnly}
        onChange={handleTextChange}
        onBlur={elementProps.onBlur}
        onFocus={elementProps.onFocus}
        placeholder="#RRGGBB"
      />
    </Stack>
  )
}
