// Vue 等價: <script setup lang="ts">
import { useParams, Link } from 'react-router-dom'
import { useArticle } from '@/hooks/useArticle'

export default function ArticleDetail() {
  // Vue: const route = useRoute(); const id = computed(() => route.params.id as string)
  const { id = '' } = useParams()

  // Vue: const { article, loading, error } = useArticle(id)
  const { article, loading, error } = useArticle(id)

  // ── 條件渲染 ── Vue 對應: v-if / v-else-if / v-else ──────────

  if (loading) return <p>載入中...</p>

  if (error) return (
    <div>
      <p>{error}</p>
      <Link to="/articles">回列表</Link>
    </div>
  )

  // ── 模板 ── Vue 對應: <template> 內的插值 {{ }} ───────────────

  return (
    <div>
      <h1>{article!.title}</h1>
      <p>{article!.content}</p>
      <Link to="/articles">回列表</Link>
    </div>
  )
}
