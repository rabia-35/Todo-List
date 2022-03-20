import React from 'react';
import {useSelector, useDispatch} from "react-redux"
import {changeActiveFilter, selectTodos, clearCompleted} from "../../Redux/todoState/todoStateSlice"

function SectionFooter() {
	const items=useSelector(selectTodos)
	const itemsLeft=items.filter(todo=>todo.completed===false).length
	const dispatch=useDispatch();
  return (
   <footer className="footer">
        <span className="todo-count">
			<strong>{itemsLeft}</strong>
			item{itemsLeft>1 ? "s" : ""} left
		</span>

		<ul className="filters">
			<li>
				<a href='#/' className="selected"  onClick={()=>dispatch(changeActiveFilter("All"))} >All</a>
			</li>
			<li>
				<a href='#/' onClick={()=>dispatch(changeActiveFilter("Active"))} >Active</a>
			</li>
			<li>
				<a href='#/' onClick={()=>dispatch(changeActiveFilter("Completed"))}>Completed</a>
			</li>
		</ul>
        <button className="clear-completed" onClick={()=>dispatch(clearCompleted())} >
			Clear completed
		</button>
   </footer>
  )
}

export default SectionFooter