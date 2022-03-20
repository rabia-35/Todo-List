import {useEffect} from 'react'
import SectionFooter from './sectionFooter'
import { useSelector, useDispatch } from "react-redux"
import { toggle, destroy, selectTodos, getTodosAsync } from "../../Redux/todoState/todoStateSlice"

let filtered=[]

function Section() {
    const items=useSelector(selectTodos);
    const activeFilter=useSelector((state)=>state.todos.activeFilter)
    const dispatch=useDispatch();
    
useEffect(()=>{
dispatch(getTodosAsync())
}, [dispatch])

   filtered=items
    if(activeFilter!=="All"){
      filtered = items.filter(todo=> activeFilter==="Active" ? todo.completed===false : todo.completed===true)
    }
    const handleDestroy=(id)=>{

      if(window.confirm("Are You Sure?")){
        dispatch(destroy(id))
      }
    }
    
  return (
    <div>
        <section className="main">
		<input className="toggle-all" type="checkbox" />
		<label htmlFor="toggle-all">
			Mark all as complete
		</label>

		<ul className="todo-list">
			{
                filtered.map(item =>(
                    <li key={item.id} className={item.completed===true ? "completed" : ""}>
                        <div className="view">
                            <input className="toggle" type="checkbox" checked={item.completed} onChange={()=>dispatch(toggle(item.id))} />
                            <label>{item.title}</label>
                            <button className="destroy" onClick={()=>handleDestroy(item.id)} ></button>
                        </div>
			        </li>
                ))
            }	
		</ul>

	</section>
        <SectionFooter />
    </div>
  )
}

export default Section