export type FilterType = 'all' | 'active' | 'completed'

interface Props {
  filter: FilterType
  onChange: (filter: FilterType) => void
  activeCount: number
  completedCount: number
  onClearCompleted: () => void
}

const FILTERS: { key: FilterType; label: string }[] = [
  { key: 'all', label: 'All' },
  { key: 'active', label: 'Active' },
  { key: 'completed', label: 'Completed' },
]

export default function TodoFilter({
  filter,
  onChange,
  activeCount,
  completedCount,
  onClearCompleted,
}: Props) {
  return (
    <footer className="todo-footer">
      <span className="todo-count">
        {activeCount} item{activeCount !== 1 ? 's' : ''} left
      </span>

      <nav className="filters">
        {FILTERS.map(({ key, label }) => (
          <button
            key={key}
            className={filter === key ? 'active' : ''}
            onClick={() => onChange(key)}
          >
            {label}
          </button>
        ))}
      </nav>

      {completedCount > 0 && (
        <button className="clear-btn" onClick={onClearCompleted}>
          Clear completed
        </button>
      )}
    </footer>
  )
}
