import { supabase } from '../lib/supabase'
import { fetchJson, cached } from './api'

const FALLBACK = 'https://api.alquran.cloud/v1'

async function callQuranFoundation(path) {
  const { data, error } = await supabase.functions.invoke('quran-proxy', { body: { path } })
  if (error) throw error
  if (data?.error) throw new Error(data.error)
  return data
}

export async function getChapters() {
  return cached('zad:quran:chapters', 86400000, async () => {
    try {
      const data = await callQuranFoundation('/content/api/v4/chapters')
      if (Array.isArray(data?.chapters)) {
        return data.chapters.map((chapter) => ({
          id: chapter.id,
          name: chapter.name_arabic || chapter.name_simple,
          english: chapter.name_simple,
          count: chapter.verses_count,
          revelation: chapter.revelation_place,
          provider: 'Quran Foundation',
        }))
      }
    } catch (error) {
      console.info('Quran Foundation unavailable, using verified live fallback.', error?.message)
    }

    const data = await fetchJson(`${FALLBACK}/surah`)
    return (data.data || []).map((chapter) => ({
      id: chapter.number,
      name: chapter.name,
      english: chapter.englishName,
      count: chapter.numberOfAyahs,
      revelation: chapter.revelationType,
      provider: 'Al Quran Cloud',
    }))
  })
}

export async function getSurah(id) {
  try {
    const data = await callQuranFoundation(`/content/api/v4/verses/by_chapter/${id}?fields=text_uthmani&page=1&per_page=300`)
    if (Array.isArray(data?.verses)) {
      return {
        name: null,
        provider: 'Quran Foundation',
        ayahs: data.verses.map((verse) => ({
          number: verse.verse_number,
          text: verse.text_uthmani,
          page: verse.page_number,
          juz: verse.juz_number,
        })),
      }
    }
  } catch (error) {
    console.info('Quran Foundation reader fallback activated.', error?.message)
  }

  const data = await fetchJson(`${FALLBACK}/surah/${id}/quran-uthmani-quran-academy`)
  return {
    name: data.data?.name,
    provider: 'Al Quran Cloud',
    ayahs: (data.data?.ayahs || []).map((verse) => ({
      number: verse.numberInSurah,
      text: verse.text,
      page: verse.page,
      juz: verse.juz,
    })),
  }
}
