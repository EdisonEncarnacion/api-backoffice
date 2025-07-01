import { randomUUID } from 'crypto';

const idMaps: Record<string, Map<number, string>> = {
    cash_register: new Map(),
    user: new Map(),
    state: new Map(),
    local: new Map(),
    work_shift: new Map(),
    serie: new Map(),
};

export function getOrCreateUUID(
    id: number,
    type: keyof typeof idMaps
): string {
    const map = idMaps[type];

    if (!map.has(id)) {
        const uuid = randomUUID();
        map.set(id, uuid);
        // console.warn(`🆕 Generado UUID para ${type}: ${id} → ${uuid}`);
    }

    return map.get(id)!;
}
