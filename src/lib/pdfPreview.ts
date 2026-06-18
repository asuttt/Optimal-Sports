const pdfPreviewCache = new Map<string, string>();
const pdfPreviewPromiseCache = new Map<string, Promise<string>>();
const pdfPageCountCache = new Map<string, number>();
const pdfPageCountPromiseCache = new Map<string, Promise<number>>();
let isPdfWorkerConfigured = false;

export const PDF_MENU_THUMBNAIL_WIDTH = 1000;
export const PDF_MENU_MODAL_WIDTH = 1800;

function getCacheKey(pdfUrl: string, targetWidth: number) {
  return `${pdfUrl}|${targetWidth}`;
}

function getPageCacheKey(pdfUrl: string, targetWidth: number, pageNumber: number) {
  return `${pdfUrl}|${targetWidth}|page:${pageNumber}`;
}

async function ensurePdfWorkerConfigured() {
  const pdfjsLib = await import('pdfjs-dist');
  if (!isPdfWorkerConfigured) {
    const workerSrc = new URL('pdfjs-dist/build/pdf.worker.mjs', import.meta.url).toString();
    pdfjsLib.GlobalWorkerOptions.workerSrc = workerSrc;
    isPdfWorkerConfigured = true;
  }

  return pdfjsLib;
}

export function getPdfPreviewFromCache(pdfUrl: string, targetWidth: number) {
  return pdfPreviewCache.get(getCacheKey(pdfUrl, targetWidth)) ?? null;
}

export function getPdfPagePreviewFromCache(pdfUrl: string, targetWidth: number, pageNumber: number) {
  return pdfPreviewCache.get(getPageCacheKey(pdfUrl, targetWidth, pageNumber)) ?? null;
}

export async function getPdfPageCount(pdfUrl: string): Promise<number> {
  if (typeof document === 'undefined') {
    throw new Error('PDF preview rendering is only supported in the browser.');
  }

  const cachedCount = pdfPageCountCache.get(pdfUrl);
  if (typeof cachedCount === 'number') return cachedCount;

  const pendingPromise = pdfPageCountPromiseCache.get(pdfUrl);
  if (pendingPromise) return pendingPromise;

  const countPromise = (async () => {
    const pdfjsLib = await ensurePdfWorkerConfigured();
    const loadingTask = pdfjsLib.getDocument({ url: pdfUrl });
    const pdfDocument = await loadingTask.promise;

    try {
      const pageCount = pdfDocument.numPages;
      pdfPageCountCache.set(pdfUrl, pageCount);
      return pageCount;
    } finally {
      pdfDocument.cleanup();
      await pdfDocument.destroy();
    }
  })();

  pdfPageCountPromiseCache.set(pdfUrl, countPromise);
  try {
    return await countPromise;
  } finally {
    pdfPageCountPromiseCache.delete(pdfUrl);
  }
}

export async function renderPdfPagePreview(pdfUrl: string, targetWidth: number, pageNumber = 1): Promise<string> {
  if (typeof document === 'undefined') {
    throw new Error('PDF preview rendering is only supported in the browser.');
  }

  const normalizedPage = Math.max(1, Math.floor(pageNumber));
  const cacheKey = getPageCacheKey(pdfUrl, targetWidth, normalizedPage);
  const cachedSrc = pdfPreviewCache.get(cacheKey);
  if (cachedSrc) return cachedSrc;

  const cachedPromise = pdfPreviewPromiseCache.get(cacheKey);
  if (cachedPromise) return cachedPromise;

  const renderPromise = (async () => {
    const pdfjsLib = await ensurePdfWorkerConfigured();
    const loadingTask = pdfjsLib.getDocument({ url: pdfUrl });
    const pdfDocument = await loadingTask.promise;

    try {
      const safePageNumber = Math.min(normalizedPage, pdfDocument.numPages);
      const page = await pdfDocument.getPage(safePageNumber);
      const initialViewport = page.getViewport({ scale: 1 });
      const scale = targetWidth / initialViewport.width;
      const viewport = page.getViewport({ scale });

      const canvas = document.createElement('canvas');
      canvas.width = Math.round(viewport.width);
      canvas.height = Math.round(viewport.height);
      const context = canvas.getContext('2d');
      if (!context) throw new Error('Failed to initialize PDF canvas context.');

      await page.render({ canvasContext: context, viewport }).promise;
      const previewSrc = canvas.toDataURL('image/jpeg', 0.9);
      page.cleanup();
      pdfPreviewCache.set(cacheKey, previewSrc);
      if (safePageNumber === 1) {
        pdfPreviewCache.set(getCacheKey(pdfUrl, targetWidth), previewSrc);
      }

      return previewSrc;
    } finally {
      pdfDocument.cleanup();
      await pdfDocument.destroy();
    }
  })();

  pdfPreviewPromiseCache.set(cacheKey, renderPromise);
  try {
    return await renderPromise;
  } finally {
    pdfPreviewPromiseCache.delete(cacheKey);
  }
}

export async function renderPdfFirstPagePreview(pdfUrl: string, targetWidth: number): Promise<string> {
  return renderPdfPagePreview(pdfUrl, targetWidth, 1);
}

export function prewarmPdfFirstPagePreviews(pdfUrls: string[], targetWidth: number) {
  pdfUrls.forEach((pdfUrl) => {
    void renderPdfFirstPagePreview(pdfUrl, targetWidth).catch(() => {});
  });
}
