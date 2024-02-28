import React from 'react';
import { useSelector } from 'react-redux';



const TotalCompleteItems = () => {
	const completedTodos = useSelector((state=> state.todos.filter((todos)=> todos.completed === true)))
	const totalNumber = useSelector ((state=> state.todos.length))
	return <h4 className='mt-3'>Total Complete Items:{completedTodos.length} Total Number {totalNumber}</h4>;
};

export default TotalCompleteItems;
