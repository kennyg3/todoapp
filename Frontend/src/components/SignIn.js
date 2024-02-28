import React from 'react';
import { GoogleAuthProvider, signInWithPopup, signOut } from "firebase/auth";
import { auth } from "../firebase/firebaseConfig";

const SignIn = ({ user }) => {
	const handleGoogle = () => {
		const provider = new GoogleAuthProvider();
		signInWithPopup(auth, provider);
	};

	const handleSignOut = () => {
		signOut(auth);
	};

	return (
		<div className="d-flex justify-content-end mt-2">
			{user ? (
				<button className='btn btn-danger' onClick={handleSignOut}>Sign Out</button>
			) : (
				<button className='btn btn-success' onClick={handleGoogle}>Sign In</button>
			)}
		</div>
	);
};

export default SignIn;
