import { useEffect, useState } from 'react'
import './App.css'
import TodoForm from './components/TodoForm'
import TodoItem from './components/TodoItem'
import { TodoProvider } from './contexts/TodoContext'

function App() {
  const [todos, setTodos] = useState([])
  const [filter, setFilter] = useState("all")
  const [date, setDate] = useState('')

  useEffect(() => {
    
  }, []);
  
  const todoDate = () => {
    const today = new Date();
    let date = today.getDate().toString().padStart(2, "0");
    let month = (today.getMonth() + 1).toString().padStart(2, "0");
    let year = today.getFullYear();
    
    const currentDate = `${year}-${month}-${date}`

    const hour = today.getHours();
    const minutes = today.getMinutes().toString().padStart(2, '0');

    const currentTime = `${(hour % 12 || 12).toString().padStart(2, '0')}:${minutes} ${hour>=12 ? "PM" : "AM"}`
    return {currentDate, currentTime}
  }

  const addTodo = (todo) => {
    setTodos((prev) => [{id: Date.now(), ...todo, date: todoDate().currentDate, time: todoDate().currentTime}, ...prev])
  }

  const updateTodo = (id, todo) => {
    setTodos((prev) => prev.map((prevTodo) => (prevTodo.id === id ? todo : prevTodo)))
  }

  const deleteTodo = (id) => {
    setTodos((prev) => prev.filter((prevTodo) => (prevTodo.id !== id)))
  }

  const toggleStatus = (id) => {
    setTodos((prev) => prev.map((prevTodo) => prevTodo.id === id ? {...prevTodo, completed: !prevTodo.completed} : prevTodo))
  }

  useEffect(() => {
    const todos = JSON.parse(localStorage.getItem("todos"));
    if(todos && todos.length>0){
      setTodos(todos)
    }

    const today = new Date();
    const year = today.getFullYear();
    const month = (today.getMonth() + 1).toString().padStart(2, '0'); 
    const day = today.getDate().toString().padStart(2, '0');

    const defaultDate = `${year}-${month}-${day}`;
    setDate(defaultDate);
  }, []);

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  return (
    <TodoProvider value={{todos, addTodo, updateTodo, deleteTodo, toggleStatus}}>
      <div className='bg-gradient-to-r from-violet-500 to-fuchsia-500 min-h-screen py-8'>
        <div className="w-full max-w-2xl mx-auto rounded-lg px-4 py-3">
          <div className='text-center text-4xl font-bold text-white py-2'>Manage your Todo</div>
          <div className="my-4 text-center">
            <TodoForm/>
          </div>
          <div className="flex justify-between">
            <input type="date" className='outline-none bg-fuchsia-200 border rounded-lg px-2 py-1 w-[8.08rem] md:w-36' value={date} onChange={(e) => setDate(e.target.value)}/>
            <select className='bg-fuchsia-200 border rounded-lg px-2 outline-none py-1 cursor-pointer' onChange={(e) => setFilter(e.target.value)}>
              <option value="all" className='cursor-pointer'>All</option>
              <option value="active" className='cursor-pointer'>Active</option>
              <option value="completed" className='cursor-pointer'>Completed</option>
            </select>
          </div>
          <div className='flex justify-center items-center my-2'>
            <div className='bg-fuchsia-200 border rounded-lg px-2 py-1'>
              {filter === "all" ? `All Todos : ${todos.filter((todo) => todo.date === date).length}` : filter === "active" ? `Active Todos : ${todos.filter((todo) => todo.completed === false && todo.date === date).length}` : `Completed Todos : ${todos.filter((todo) => todo.completed === true && todo.date === date).length}`}
            </div>
          </div>
          <div>
            {
              filter==="all" ? (todos.filter((todo) => todo.date === date).length > 0 ?
                (todos.filter((todo) => todo.date === date).map((todo) => (
                  <div key={todo.id} className='w-full'>
                    <TodoItem todo={todo}/>
                  </div>
              ))) : <h1 className='text-2xl text-center mt-10 text-white'>No Todos Available</h1>) : filter === "active" ? (todos.filter((todo) => todo.date === date).length > 0 ? (todos.filter((todo) => todo.completed === false && todo.date === date).length > 0 ?
                (todos.filter((todo) => todo.completed === false && todo.date === date).map((todo) => (
                  <div key={todo.id} className='w-full'>
                    <TodoItem todo={todo}/>
                  </div>))) : <h1 className='text-2xl text-center mt-10 text-white'>No Active Todos Available</h1>
                ) : <h1 className='text-2xl text-center mt-10 text-white'>No Todos Available</h1>) : (todos.filter((todo) => todo.date === date).length > 0 ?(todos.filter((todo) => todo.completed === true && todo.date === date).length > 0 ? (
                  todos.filter((todo) => todo.completed === true && todo.date === date).map((todo) => (
                    <div key={todo.id} className='w-full'>
                      <TodoItem todo={todo}/>
                    </div>))) : <h1 className='text-2xl text-center mt-10 text-white'>No Todos have been Completed</h1>
                  ) : <h1 className='text-2xl text-center mt-10 text-white'>No Todos Available</h1>)
            }
          </div>
        </div>
      </div>
    </TodoProvider>
  )
}

export default App
