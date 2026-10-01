import { useState, useEffect } from 'react'

// Vue: interface Article { ... }
interface Article {
  id: string
  title: string
  content: string
}

// 模擬 API（假裝有網路延遲）
// Vue: 同樣寫法，composable 外面的 helper function
const fakeDb: Record<string, Article> = {
  '1': { id: '1', title: '第一篇文章', content: '這是第一篇文章的詳細內容。' },
  '2': { id: '2', title: '第二篇文章', content: '這是第二篇文章的詳細內容。' },
  '3': { id: '3', title: '第三篇文章', content: '這是第三篇文章的詳細內容。' },
}

function fetchArticle(id: string): Promise<Article | null> {
  return new Promise((resolve) =>
    setTimeout(() => resolve(fakeDb[id] ?? null), 600),
  )
}

// ─────────────────────────────────────────────
// React 自訂 hook        ↔  Vue composable
// export function useArticle  ↔  export function useArticle
// ─────────────────────────────────────────────
export function useArticle(id: string) {
  // 只存「哪個 id 的結果」，loading / article / error 都從它推導
  // Vue: const result = ref<Result | null>(null)
  const [result, setResult] = useState<{
    id: string
    article: Article | null
    error: string | null
  } | null>(null)

  useEffect(() => {
    // Vue: watch(id, async (newId) => { ... }, { immediate: true })
    // useEffect 的 deps array [id] ↔ watch 的第一個參數
    // { immediate: true } ↔ 不寫 immediate 時 useEffect 預設就會立即執行

    // 不在 effect 本體同步 setLoading(true)：id 一變，loading 就自動由下面推導成 true
    let ignore = false

    fetchArticle(id).then((data) => {
      // 已經換到別的 id（或元件卸載），這個舊結果就丟掉，避免蓋掉新文章
      if (ignore) return
      setResult({ id, article: data, error: data ? null : `找不到文章（id: ${id}）` })
    })

    // Vue: onWatcherCleanup(() => { ignore = true })
    // React cleanup function：id 改變或卸載時執行
    return () => {
      ignore = true
    }
  }, [id]) // [id] ↔ watch 的第一個參數

  // Vue: const loading = computed(() => result.value?.id !== id)
  const current = result?.id === id ? result : null

  return {
    article: current?.article ?? null,
    loading: current === null,
    error: current?.error ?? null,
  }
}
