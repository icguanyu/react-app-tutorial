import { useState, useCallback } from 'react'

export interface Todo {
  id: string
  text: string
  completed: boolean
  createdAt: number
}

export function useTodos() {
  const [todos, setTodos] = useState<Todo[]>([
    {
      id: crypto.randomUUID(),
      text: 'Learn React',
      completed: true,
      createdAt: Date.now(),
    }
  ])

  const update = useCallback((fn: (prev: Todo[]) => Todo[]) => {
    setTodos((prev) => fn(prev))
  }, [])

  const addTodo = useCallback(
    (text: string) => {
      const trimmed = text.trim()
      if (!trimmed) return
      update((prev) => [
        ...prev,
        { id: crypto.randomUUID(), text: trimmed, completed: false, createdAt: Date.now() },
      ])
    },
    [update],
  )

  const toggleTodo = useCallback(
    (id: string) => {
      update((prev) =>
        prev.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t)),
      )
    },
    [update],
  )

  const deleteTodo = useCallback(
    (id: string) => {
      update((prev) => prev.filter((t) => t.id !== id))
    },
    [update],
  )

  const editTodo = useCallback(
    (id: string, text: string) => {
      const trimmed = text.trim()
      // 編輯後清空 → 直接刪除
      if (!trimmed) {
        update((prev) => prev.filter((t) => t.id !== id))
        return
      }
      update((prev) => prev.map((t) => (t.id === id ? { ...t, text: trimmed } : t)))
    },
    [update],
  )

  const clearCompleted = useCallback(() => {
    update((prev) => prev.filter((t) => !t.completed))
  }, [update])

  return { todos, addTodo, toggleTodo, deleteTodo, editTodo, clearCompleted }
}
