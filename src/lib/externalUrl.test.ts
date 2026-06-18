import {describe, expect, it} from 'vitest';
import {normalizeExternalUrl} from '@/lib/externalUrl';

describe('normalizeExternalUrl', () => {
  it('leaves mindbody links unchanged when no studio id is configured', () => {
    const output = normalizeExternalUrl('https://clients.mindbodyonline.com/asp/main_shop.asp?pMode=1&tabID=3');
    const parsed = new URL(output);

    expect(parsed.hostname).toBe('clients.mindbodyonline.com');
    expect(parsed.searchParams.get('studioid')).toBeNull();
    expect(parsed.searchParams.get('pMode')).toBe('1');
    expect(parsed.searchParams.get('tabID')).toBe('3');
  });

  it('keeps existing studioid value', () => {
    const output = normalizeExternalUrl(
      'https://clients.mindbodyonline.com/asp/main_shop.asp?studioid=123456&pMode=1'
    );
    const parsed = new URL(output);

    expect(parsed.searchParams.get('studioid')).toBe('123456');
  });

  it('supports mindbody URLs pasted without protocol', () => {
    const output = normalizeExternalUrl('clients.mindbodyonline.com/asp/main_shop.asp?pMode=1&tabID=3');
    const parsed = new URL(output);

    expect(parsed.protocol).toBe('https:');
    expect(parsed.searchParams.get('studioid')).toBeNull();
  });

  it('does not alter non-mindbody links', () => {
    const input = 'https://example.com/path?foo=bar';
    const output = normalizeExternalUrl(input);

    expect(output).toBe(input);
  });
});
