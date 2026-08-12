import { useState, useRef, useEffect } from 'react'
import type { Todo } from '../hooks/useTodos'

interface Props {
  todo: Todo
  onToggle: (id: string) => void
  onDelete: (id: string) => void
  onEdit: (id: string, text: string) => void
}

export default function TodoItem({ todo, onToggle, onDelete, onEdit }: Props) {
  const [editing, setEditing] = useState(false)
  const [editText, setEditText] = useState(todo.text)
  const inputRef = useRef<HTMLInputElement>(null) // Vue: templateRef

  // 進入編輯模式後自動 focus（Vue: watchEffect / nextTick）
  useEffect(() => {
    if (editing) inputRef.current?.focus()
  }, [editing])

  function startEditing() {
    setEditText(todo.text)
    setEditing(true)
  }

  function commitEdit() {
    onEdit(todo.id, editText)
    setEditing(false)
  }

  function handleKeyDown(e: React.KeyboardEvent) {
    if (e.key === 'Enter') commitEdit()
    if (e.key === 'Escape') setEditing(false)
  }

  return (
    <li className={`todo-item${todo.completed ? ' completed' : ''}${editing ? ' editing' : ''}`}>
      {editing ? (
        <input
          ref={inputRef}
          className="edit-input"
          value={editText}
          onChange={(e) => setEditText(e.target.value)}
          onBlur={commitEdit}
          onKeyDown={handleKeyDown}
        />
      ) : (
        <>
          <input
            type="checkbox"
            checked={todo.completed}
            onChange={() => onToggle(todo.id)}
          />
          <span className="todo-text" onDoubleClick={startEditing}>
            {todo.text}
          </span>
          <button className="delete-btn" onClick={() => onDelete(todo.id)} aria-label="Delete">
            ×
          </button>
        </>
      )}
    </li>
  )
}
