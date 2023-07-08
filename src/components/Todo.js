import React, { useState, useRef, useEffect } from 'react';
import './Todo.css';
import { AiOutlineFileDone, AiOutlineEdit, AiFillDelete } from 'react-icons/ai';

function Todo() {
  const [todo, setTodo] = useState('');
  const [Todos, setTodos] = useState([]);
  const [editId,setEditID]=useState(0)
  const [error, setError] = useState('');


  const handleSubmit = (e) => {
    e.preventDefault();
  };

//////ADD-ITEMS---& EDIT-ITEMS
const addTodo = () => {
  if (todo.trim() !== '') { // Check if todo is not empty or whitespace
    const trimmedTodo = todo.trim();
    const isDuplicate = Todos.some((item) => item.list === trimmedTodo);
    if (isDuplicate) {
      setError('Duplicate todo found. Please enter a unique todo.');
    } else {
      if (editId) {
        const editTodo = Todos.find((todo) => todo.id === editId);
        const updatedTodo = Todos.map((to) =>
          to.id === editTodo.id ? { id: to.id, list: trimmedTodo } : { id: to.id, list: to.list }
        );
        setTodos(updatedTodo);
        setEditID(0);
        setTodo('');
      } else {
        setTodos([...Todos, { list: trimmedTodo, id: Date.now(), status: false }]);
        setTodo('');
      }
      setError(''); // Clear the error message
    }
  } else {
    setError('Please enter a valid todo.');
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
  };


//EDIT-ITEMS-----------
  const onEdit =(id)=>{
    const editTodo=    Todos.find((to)=> to.id===id)
    setTodo(editTodo.list)
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
      {error && <div className='error'>{error}</div>} {/* Display error message */}
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
