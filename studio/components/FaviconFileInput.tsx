import {Button, Card, Flex, Stack, Text} from '@sanity/ui'
import {useEffect, useRef, useState} from 'react'
import {PatchEvent, set, unset, useClient, type FileInputProps} from 'sanity'

interface FileAssetData {
  _id: string
  url?: string
}

function getAssetRef(value: FileInputProps['value']): string | null {
  if (!value || typeof value !== 'object') return null

  const asset = (value as {asset?: {_ref?: string}}).asset
  if (!asset || typeof asset !== 'object') return null

  return typeof asset._ref === 'string' ? asset._ref : null
}

export function FaviconFileInput(props: FileInputProps) {
  const {value, readOnly, onChange, schemaType} = props
  const client = useClient({apiVersion: '2026-02-23'})
  const inputRef = useRef<HTMLInputElement | null>(null)
  const [previewUrl, setPreviewUrl] = useState<string | null>(null)
  const [isUploading, setIsUploading] = useState(false)
  const assetRef = getAssetRef(value)

  useEffect(() => {
    let isMounted = true

    if (!assetRef) {
      setPreviewUrl(null)
      return
    }

    const fetchPreview = async () => {
      const asset = await client.fetch<FileAssetData | null>('*[_id == $id][0]{_id, url}', {
        id: assetRef,
      })
      if (!isMounted) return
      setPreviewUrl(asset?.url || null)
    }

    void fetchPreview()

    return () => {
      isMounted = false
    }
  }, [assetRef, client])

  const onPickFile = () => {
    if (readOnly) return
    inputRef.current?.click()
  }

  const onFileSelected = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.currentTarget.files?.[0]
    if (!file || readOnly) return

    setIsUploading(true)
    try {
      const uploaded = await client.assets.upload('file', file, {
        filename: file.name,
      })

      onChange(
        PatchEvent.from(
          set({
            _type: schemaType.name,
            asset: {
              _type: 'reference',
              _ref: uploaded._id,
            },
          })
        )
      )
    } finally {
      setIsUploading(false)
      event.currentTarget.value = ''
    }
  }

  const clearFavicon = () => {
    if (readOnly) return
    onChange(PatchEvent.from(unset()))
  }

  return (
    <Stack space={3}>
      <input
        ref={inputRef}
        type="file"
        accept=".ico,image/x-icon,image/vnd.microsoft.icon,image/png,image/svg+xml"
        onChange={onFileSelected}
        style={{display: 'none'}}
      />

      <Card border radius={2} padding={2}>
        {previewUrl ? (
          <img
            src={previewUrl}
            alt="Favicon preview"
            style={{
              display: 'block',
              width: '100%',
              maxHeight: 140,
              objectFit: 'contain',
            }}
          />
        ) : (
          <Text muted size={1}>
            No favicon uploaded.
          </Text>
        )}
      </Card>

      <Flex gap={2}>
        <Button
          mode="ghost"
          text={previewUrl ? 'Replace Favicon' : 'Upload Favicon'}
          onClick={onPickFile}
          disabled={readOnly || isUploading}
        />
        {previewUrl ? (
          <Button mode="bleed" tone="critical" text="Remove" onClick={clearFavicon} disabled={readOnly || isUploading} />
        ) : null}
      </Flex>
    </Stack>
  )
}
