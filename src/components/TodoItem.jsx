import React, {useState} from 'react'
import { useTodo } from '../contexts/TodoContext'

function TodoItem({todo}) {
    const [isTodoEditable, setIsTodoEditable] = useState(false)
    const [todoMsg, setTodoMsg] = useState(todo.todo)
    const {updateTodo, deleteTodo, toggleStatus} = useTodo()

    const editTodo = () => {
        updateTodo(todo.id, {...todo, todo: todoMsg})
        setIsTodoEditable(false)
    }

    const toggleCompleted = () => {
        toggleStatus(todo.id)
    }

  return (
    <div className={`w-full flex items-center bg-fuchsia-200 border rounded-lg h-12 p-2 my-4 ${todo.completed ? "bg-green-300" : "bg-fuchsia-200"}`}>
      <div className="flex absolute text-[0.6em] border rounded-xl bg-gradient-to-r from-violet-500 to-fuchsia-500 px-1 gap-2 mb-11 font-bold items-center text-white">
        <p>{todo.time}</p> |
        <p>{todo.date}</p>
      </div>

      <input 
        type="checkbox" 
        className="cursor-pointer"
        checked={todo.completed}
        onChange={toggleCompleted}
      />

      <input 
        type="text" 
        className={`h-8 mx-2 px-2 w-full bg-transparent  outline-none font-medium ${isTodoEditable ? "border border-black/10": ""} ${todo.completed ? "line-through": ""}`}
        value={todoMsg}
        onChange={(e) => setTodoMsg(e.target.value)}
        readOnly={!isTodoEditable || todo.completed}
      />
      
      <button
            className="inline-flex w-8 h-8 rounded-lg text-sm border border-black/10 justify-center items-center bg-gray-50 hover:bg-gray-100 shrink-0 disabled:opacity-50"
                
                onClick={() => {
                    if (todo.completed) return;

                    if (isTodoEditable) {
                        editTodo();
                    } else setIsTodoEditable((prev) => !prev);
                }}
                disabled={todo.completed}
            >
                {isTodoEditable ? "📁" : "✏️"}
            </button>
            {/* Delete Todo Button */}
            <button
                className="inline-flex w-8 h-8 rounded-lg text-sm border border-black/10 justify-center items-center bg-gray-50 hover:bg-gray-100 shrink-0 ml-1"
                onClick={() => deleteTodo(todo.id)}
            >
                ❌
            </button>
    </div>
  )
}

export default TodoItem
