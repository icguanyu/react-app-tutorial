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
  // Vue: const article = ref<Article | null>(null)
  const [article, setArticle] = useState<Article | null>(null)

  // Vue: const loading = ref(true)
  const [loading, setLoading] = useState(true)

  // Vue: const error = ref<string | null>(null)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    // Vue: watch(id, async (newId) => { ... }, { immediate: true })
    // useEffect 的 deps array [id] ↔ watch 的第一個參數
    // { immediate: true } ↔ 不寫 immediate 時 useEffect 預設就會立即執行

    setLoading(true)
    setError(null)

    fetchArticle(id)
      .then((data) => {
        if (!data) setError(`找不到文章（id: ${id}）`)
        else setArticle(data)
      })
      .finally(() => setLoading(false))

    // Vue: onUnmounted(() => controller.abort())
    // React cleanup function ↔ Vue onUnmounted
    return () => {
      setArticle(null)
    }
  }, [id]) // [id] ↔ watch 的第一個參數

  // Vue: return { article, loading, error }
  return { article, loading, error }
}
