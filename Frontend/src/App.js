import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import AddTodoForm from './components/AddTodoForm';
import TodoList from './components/TodoList';
import TotalCompleteItems from './components/TotalCompleteItems';
import SignIn from './components/SignIn';
import { auth } from './firebase/firebaseConfig';

const App = () => {
	const [user, setUser] = useState(null);

	useEffect(() => {
		const unsubscribe = auth.onAuthStateChanged(user => {
			if (user) {
				setUser(user);
			} else {
				setUser(null);
			}
		});
		return () => unsubscribe();
	}, []);

	return (
		<div className='container bg-white p-4 mt-5'>
			<SignIn user={user} />
			{user && (
				<>
					<h1>My Todo List</h1>
					<AddTodoForm />
					<TodoList />
					<TotalCompleteItems />
				</>
			)}
		</div>
	);
};

export default App;
