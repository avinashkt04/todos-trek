import { useEffect, useState } from 'react'
import './App.css'
import TodoForm from './components/TodoForm'
import TodoItem from './components/TodoItem'
import { TodoProvider } from './contexts/TodoContext'

function App() {
  const [todos, setTodos] = useState([])
  const [filter, setFilter] = useState("all")

  const onChange = (e) => {
    setFilter(e.target.value);
  }

  const timeStamp = () => {
    const currentDate = new Date();
    let date = currentDate.getDate();
    let month = (currentDate.getMonth() + 1);
    let year = currentDate.getFullYear();
    if(date < 10) date = "0" + date
    if(month < 10) month = "0" + month
    
    const formattedCurrentDate = [date, month, year].join('-');
    
    let hour = currentDate.getHours();
    let minutes = currentDate.getMinutes();
    if(hour < 10) {hour = "0" + hour}
    if(minutes < 10) {minutes = "0" + minutes; }
    
    const formattedTime = [(hour % 12 || 12), minutes].join(':') + " " + (hour>12 ? "PM" : "AM");

    return {formattedCurrentDate, formattedTime};
  }

  const addTodo = (todo) => {
    setTodos((prev) => [{id: Date.now(), ...todo, date: timeStamp().formattedCurrentDate, time: timeStamp().formattedTime}, ...prev])
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
  }, []);

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  return (
    <TodoProvider value={{todos, addTodo, updateTodo, deleteTodo, toggleStatus}}>
      <div className='bg-gradient-to-r from-violet-500 to-fuchsia-500 min-h-screen py-8'>
        <div className="w-full max-w-2xl mx-auto rounded-lg px-4 py-3">
          <div className='text-center text-4xl font-bold text-white py-3'>Manage your Todo</div>
          <div className="my-7">
            <TodoForm/>
          </div>
          <div className="flex justify-between">
            <button className='bg-fuchsia-200 border rounded-lg px-2 py-1'>{filter === "all" ? `All Todos : ${todos.length}` : filter === "active" ? `Active Todos : ${todos.filter((todo) => todo.completed === false).length}` : `Completed Todos : ${todos.filter((todo) => todo.completed === true).length}`}</button>
            <select className='bg-fuchsia-200 border rounded-lg px-2 outline-none py-1 cursor-pointer' onChange={onChange}>
              <option value="all" className='cursor-pointer'>All</option>
              <option value="active" className='cursor-pointer'>Active</option>
              <option value="completed" className='cursor-pointer'>Completed</option>
            </select>
          </div>
          <div>
            {
              filter==="all" ? (todos.length > 0 ?
                (todos.map((todo) => (
                  <div key={todo.id} className='w-full'>
                    <TodoItem todo={todo}/>
                  </div>
              ))) : <h1 className='text-2xl text-center mt-10 text-white'>No Todos Available</h1>) : filter === "active" ? (todos.length > 0 ? (todos.filter((todo) => todo.completed === false).length > 0 ?
                (todos.filter((todo) => todo.completed === false).map((todo) => (
                  <div key={todo.id} className='w-full'>
                    <TodoItem todo={todo}/>
                  </div>))) : <h1 className='text-2xl text-center mt-10 text-white'>No Active Todos Available</h1>
                ) : <h1 className='text-2xl text-center mt-10 text-white'>No Todos Available</h1>) : (todos.length > 0 ?(todos.filter((todo) => todo.completed === true).length > 0 ? (
                  todos.filter((todo) => todo.completed === true).map((todo) => (
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
