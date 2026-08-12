import { Link } from 'react-router-dom'

const articles = [
  { id: 1, title: '第一篇文章' },
  { id: 2, title: '第二篇文章' },
  { id: 3, title: '第三篇文章' },
]

export default function ArticleList() {
  return (
    <div>
      <h1>文章列表</h1>
      <ul>
        {articles.map((a) => (
          <li key={a.id}>
            <Link to={`/articles/${a.id}`}>{a.title}</Link>
          </li>
        ))}
      </ul>
    </div>
  )
}
