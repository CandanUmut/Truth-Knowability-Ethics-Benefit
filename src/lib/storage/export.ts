/**
 * JSON export and import. The dossier is the user's own document, portable
 * across devices via this single mechanism — there is no other "sync".
 */
import type { Deliberation } from '@/types/deliberation';

export interface ExportPayload {
  schema: 'teb-deliberation';
  schemaVersion: 1;
  exportedAt: string;
  deliberations: Deliberation[];
}

export function buildExport(deliberations: Deliberation[]): ExportPayload {
  return {
    schema: 'teb-deliberation',
    schemaVersion: 1,
    exportedAt: new Date().toISOString(),
    deliberations,
  };
}

export function downloadJSON(payload: ExportPayload, filename: string): void {
  const blob = new Blob([JSON.stringify(payload, null, 2)], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

export function parseImport(jsonText: string): Deliberation[] {
  const data: unknown = JSON.parse(jsonText);
  if (!data || typeof data !== 'object') {
    throw new Error('Invalid file: not a JSON object');
  }
  const obj = data as Partial<ExportPayload> & { deliberations?: unknown };
  if (obj.schema !== 'teb-deliberation') {
    throw new Error('Invalid file: not a Truth-Ethics-Benefit deliberation export');
  }
  if (!Array.isArray(obj.deliberations)) {
    throw new Error('Invalid file: missing deliberations array');
  }
  // Minimal validation: every entry has an id and a case.
  for (const item of obj.deliberations) {
    if (!item || typeof item !== 'object') {
      throw new Error('Invalid deliberation entry');
    }
    const d = item as Partial<Deliberation>;
    if (!d.id || !d.case || !d.niyya) {
      throw new Error('Invalid deliberation entry: missing required fields');
    }
  }
  return obj.deliberations as Deliberation[];
}
