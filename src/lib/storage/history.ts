/**
 * Deliberation history persisted in IndexedDB via Dexie.
 * The user owns the data: nothing leaves the device, ever.
 */
import Dexie, { type EntityTable } from 'dexie';
import type { Deliberation } from '@/types/deliberation';

class HistoryDB extends Dexie {
  deliberations!: EntityTable<Deliberation, 'id'>;
  constructor() {
    super('teb.history');
    this.version(1).stores({
      deliberations: 'id, createdAt, updatedAt, status',
    });
  }
}

const db = new HistoryDB();

export async function saveDeliberation(d: Deliberation): Promise<void> {
  await db.deliberations.put(d);
}

export async function deleteDeliberation(id: string): Promise<void> {
  await db.deliberations.delete(id);
}

export async function listDeliberations(): Promise<Deliberation[]> {
  return db.deliberations.orderBy('updatedAt').reverse().toArray();
}

export async function getDeliberation(id: string): Promise<Deliberation | undefined> {
  return db.deliberations.get(id);
}

export async function importDeliberations(items: Deliberation[]): Promise<number> {
  let imported = 0;
  for (const item of items) {
    if (!item.id) continue;
    await db.deliberations.put(item);
    imported++;
  }
  return imported;
}

export async function clearHistory(): Promise<void> {
  await db.deliberations.clear();
}
