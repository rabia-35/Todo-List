import {useState} from 'react'
import {useDispatch, useSelector } from "react-redux"
import {addTodoAsync} from "../../Redux/todoState/todoStateSlice"

function Header() {
	const addTodoIsLoading = useSelector(state=>state.todos.addTodoIsLoading)
	const error = useSelector(state=>state.todos.addTodoError)
	const [title, setTitle]=useState("")
	const dispatch=useDispatch()

	const handleSubmit=async (e)=>{
		if(!title) return;

		e.preventDefault();
		await dispatch(addTodoAsync({ title }))
		setTitle("")
	}
	

  return (
    <header className="header">
		<h1>todos</h1>
		<form onSubmit={handleSubmit} style={{display:'flex', alignItems:"center"}}>
			<input className="new-todo" placeholder="What needs to be done?" value={title} onChange={(e)=>setTitle(e.target.value)} />
			{addTodoIsLoading && <span style={{paddingRight:10}}>Loading...</span>}
			{error && <span style={{color:"red"}}>{error}</span>}
		</form>
	</header>
  )
}

export default Header