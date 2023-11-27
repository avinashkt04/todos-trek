import React, { useState } from 'react'
import { useTodo } from '../contexts/TodoContext';

function TodoForm() {
    const [todo, setTodo] = useState("")
    const {todos, addTodo} = useTodo()

    const add = (e) => {
        e.preventDefault();
        
        if(!todo) return
        
        addTodo({todo, completed: false})
        setTodo("")
    }

  return (
    <form onSubmit={add} className='flex'>
        <input 
            type="text" 
            className='w-full h-10 outline-none font-medium  px-3 border border-black/10 rounded-l-lg bg-gray-100'
            placeholder='Write Todo...'
            value={todo}
            onChange={(e) => setTodo(e.target.value)}
        />
        <button 
            className='h-10 outline-none font-medium py-1 px-3 text-xl rounded-r-lg bg-green-700 shrink-0 hover:bg-green-600 active:bg-green-600 text-white'
            type='submit'
        >
            Add
        </button>
    </form>
  )
}

export default TodoForm
