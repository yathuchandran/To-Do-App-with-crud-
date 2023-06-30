import React, { useState, useRef, useEffect } from 'react';
import './Todo.css';
import { AiOutlineFileDone, AiOutlineEdit, AiFillDelete } from 'react-icons/ai';

function Todo() {
  const [todo, setTodo] = useState('');
  const [Todos, setTodos] = useState([]);
  const [editId,setEditID]=useState(0)

  const handleSubmit = (e) => {
    e.preventDefault();
  };

//////ADD-ITEMS---& EDIT-ITEMS
  const addTodo = () => {
    if (todo !=='') {
        setTodos([...Todos, { list: todo, id: Date.now(), status: false }]);
        console.log(Todos);
        setTodo('');
        
    }
    if (editId) {
        const editTodo=Todos.find((todo)=>todo.id ==editId)
        const updatedTodo=Todos.map((to)=>to.id==editTodo.id
        ?(to={id :to.id, list:todo}):(to={id:to.id, list:to.list}))
        setTodos(updatedTodo)
        setEditID(0)
        setTodo('')
    }
   
  };

  const inputRef = useRef(null);

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  //DELETE-ITEMS-------
  const handleDelete = (id) => {
    setTodos(Todos.filter((to) => to.id !== id));
  };

  //COMPLETE-ITEMS
  const onComplete = (id) => {
    const updatedTodos = Todos.map((to) => {
      if (to.id === id) {
        return { ...to, status: !to.status };
      }
      return to;
    });
    setTodos(updatedTodos);
    console.log(updatedTodos);
  };


//EDIT-ITEMS-----------
  const onEdit =(id)=>{
const editTodo=    Todos.find((to)=> to.id===id)
console.log(editTodo.list);
    setTodo(editTodo.list)
    console.log(setTodo);
    setEditID(editTodo.id)
}

  return (
   
    <div className='container'>
      <h2>TO-DO APP</h2>
      <form className='form-group' onSubmit={handleSubmit}>
        <input
          type='text'
          value={todo}
          ref={inputRef}
          placeholder='Enter your Todo'
          className='form-control'
          onChange={(event) => setTodo(event.target.value)}
        />
        <button type='button' onClick={addTodo}>
          {editId ? 'EDIT' : 'ADD'}
        </button>
      </form>
      <div className='list'>
        <ul>
          {Todos.map((to) => (
            <li className={`list-items ${to.status ? 'list-item' : ''}`} key={to.id}>
              <span style={{ textDecoration: to.status ? 'line-through' : 'none' }}>
                {to.list}
              </span>
              <div className='list-item-list'></div>
              <span>
                <AiOutlineFileDone
                  className='list-item-icons'
                  id='complete'
                  title='complete'
                  onClick={() => onComplete(to.id)}
                />
                <AiOutlineEdit className='list-item-icons' id='edit' title='edit' onClick={() => onEdit(to.id)}/>
                <AiFillDelete
                  className='list-item-icons'
                  id='delete'
                  title='delete'
                  onClick={() => handleDelete(to.id)}
                />
              </span>
            </li>
          ))}
        </ul>
      </div>
    </div>
   
  );
}

export default Todo;
