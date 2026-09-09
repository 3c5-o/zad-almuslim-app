import { fetchJson, cached } from './api'

export function getLocation() {
  return new Promise((resolve, reject) => {
    if (!navigator.geolocation) return reject(new Error('الموقع غير مدعوم في هذا المتصفح'))
    navigator.geolocation.getCurrentPosition(
      (position) => resolve({ lat: position.coords.latitude, lng: position.coords.longitude }),
      () => reject(new Error('تعذر الوصول إلى الموقع. فعّل إذن الموقع من المتصفح.')),
      { enableHighAccuracy: false, timeout: 9000, maximumAge: 3600000 },
    )
  })
}

export async function getPrayerTimes(lat, lng, method = 3) {
  const now = new Date()
  const date = `${String(now.getDate()).padStart(2, '0')}-${String(now.getMonth() + 1).padStart(2, '0')}-${now.getFullYear()}`
  const key = `zad:prayer:${date}:${lat.toFixed(2)}:${lng.toFixed(2)}:${method}`

  return cached(key, 6 * 3600000, async () => {
    const result = await fetchJson(
      `https://api.aladhan.com/v1/timings/${date}?latitude=${encodeURIComponent(lat)}&longitude=${encodeURIComponent(lng)}&method=${method}`,
    )
    return result.data
  })
}

export function qiblaBearing(lat, lng) {
  const kaabaLat = 21.422487
  const kaabaLng = 39.826206
  const phi1 = lat * Math.PI / 180
  const phi2 = kaabaLat * Math.PI / 180
  const delta = (kaabaLng - lng) * Math.PI / 180
  const y = Math.sin(delta) * Math.cos(phi2)
  const x = Math.cos(phi1) * Math.sin(phi2) - Math.sin(phi1) * Math.cos(phi2) * Math.cos(delta)
  return (Math.atan2(y, x) * 180 / Math.PI + 360) % 360
}
