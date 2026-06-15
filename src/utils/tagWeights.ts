import { TagID } from '../types';

const STORAGE_KEY = 'lango_tag_weights_v1';

export const ALPHA = 1;
export const BETA = 0.5;
export const THETA = 3;

export function loadTagWeights(): Partial<Record<TagID, number>> {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}');
  } catch { return {}; }
}

export function saveTagWeights(weights: Partial<Record<TagID, number>>): void {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(weights));
}

/**
 * W(i,j,t+1) = max(0, W(i,j,t) + α·E − β·C)
 * mode='error'  : E=1, C=0 → W += ALPHA
 * mode='correct': E=0, C=1 → W -= BETA
 * Returns the new weight value.
 */
export function updateTagWeight(tagId: TagID, mode: 'error' | 'correct'): number {
  const weights = loadTagWeights();
  const current = weights[tagId] ?? 0;
  const next = Math.max(0, current + (mode === 'error' ? ALPHA : -BETA));
  weights[tagId] = next;
  saveTagWeights(weights);
  return next;
}

export function getTagWeight(tagId: TagID): number {
  return loadTagWeights()[tagId] ?? 0;
}

export function isBarrierDetected(tagId: TagID): boolean {
  return getTagWeight(tagId) >= THETA;
}

export function resetTagWeight(tagId: TagID): void {
  const weights = loadTagWeights();
  weights[tagId] = 0;
  saveTagWeights(weights);
}

export function getAllBarriers(): TagID[] {
  const weights = loadTagWeights();
  return (Object.entries(weights) as [TagID, number][])
    .filter(([, w]) => w >= THETA)
    .map(([id]) => id);
}
