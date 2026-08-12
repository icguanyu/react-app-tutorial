import { NavLink, Outlet } from 'react-router-dom'
import './ArticleLayout.scss'

const articles = [
  { id: 1, title: '第一篇文章' },
  { id: 2, title: '第二篇文章' },
  { id: 3, title: '第三篇文章' },
]

export default function ArticleLayout() {
  return (
    <div className="article-layout">
      <aside className="article-sidebar">
        <h2>文章列表</h2>
        <nav>
          {articles.map((a) => (
            <NavLink key={a.id} to={`/articles/${a.id}`}>
              {a.title}
            </NavLink>
          ))}
        </nav>
      </aside>

      <main className="article-main">
        <Outlet />  {/* /articles/:id 的內容渲染在這裡 */}
      </main>
    </div>
  )
}
