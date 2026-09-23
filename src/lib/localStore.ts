"use client";

/**
 * Minimal localStorage-backed store for `useSyncExternalStore`.
 *
 * Browser storage is the single source of truth (same keys as the original
 * single-file dashboard), so saved data survives reloads — and the component
 * tree never needs a setState-in-effect hydration step (which the React lint
 * rules flag and which causes an extra render pass).
 */

type Listener = () => void;

const listeners = new Map<string, Set<Listener>>();
const jsonCache = new Map<string, { raw: string | null; value: unknown }>();

function emit(key: string) {
  listeners.get(key)?.forEach((cb) => cb());
}

export function subscribe(key: string, cb: Listener): () => void {
  let set = listeners.get(key);
  if (!set) {
    set = new Set();
    listeners.set(key, set);
  }
  set.add(cb);
  return () => {
    set.delete(cb);
  };
}

/** Snapshot for JSON-encoded values (cached so the reference stays stable). */
export function readJson<T>(key: string, fallback: T): T {
  const raw = window.localStorage.getItem(key);
  const hit = jsonCache.get(key);
  if (!hit || hit.raw !== raw) {
    let value: unknown = fallback;
    if (raw !== null) {
      try {
        value = JSON.parse(raw);
      } catch {
        value = fallback;
      }
    }
    jsonCache.set(key, { raw, value });
  }
  return jsonCache.get(key)!.value as T;
}

/** Snapshot for raw string values (e.g. the announcement text). */
export function readRaw(key: string, fallback: string): string {
  return window.localStorage.getItem(key) ?? fallback;
}

export function writeJson(key: string, value: unknown): void {
  try {
    window.localStorage.setItem(key, JSON.stringify(value));
  } catch {
    /* storage unavailable */
  }
  emit(key);
}

export function writeRaw(key: string, value: string): void {
  try {
    window.localStorage.setItem(key, value);
  } catch {
    /* storage unavailable */
  }
  emit(key);
}
