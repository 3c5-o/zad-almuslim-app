export async function fetchJson(url, options = {}, timeout = 12000) {
  const controller = new AbortController()
  const timer = setTimeout(() => controller.abort(), timeout)
  try {
    const response = await fetch(url, { ...options, signal: controller.signal })
    const data = await response.json().catch(() => null)
    if (!response.ok) throw new Error(data?.message || data?.error || `HTTP ${response.status}`)
    return data
  } finally {
    clearTimeout(timer)
  }
}

export function cached(key, ttl, loader) {
  try {
    const raw = localStorage.getItem(key)
    if (raw) {
      const value = JSON.parse(raw)
      if (Date.now() - value.at < ttl) return Promise.resolve(value.data)
    }
  } catch {}

  return loader().then((data) => {
    try { localStorage.setItem(key, JSON.stringify({ at: Date.now(), data })) } catch {}
    return data
  })
}
