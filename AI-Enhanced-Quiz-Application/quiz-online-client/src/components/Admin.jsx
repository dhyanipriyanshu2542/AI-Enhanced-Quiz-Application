import React from 'react'
import { Link } from 'react-router-dom'
import './Admin.css';
	function Admin() {
	return (
		<section className=" admin-page">
			<h2 className="admin-heading">Welcome to admin home page</h2>
			<hr />
			<div className="page-heading">
				<Link to={"/create-quiz"} >
			<h4>Create a New Quiz</h4>	
				</Link>
				<Link to={"/all-quizzes"} >
            <h4 >Manage your quizzes here!</h4>
				</Link>
			</div>
		</section>
	)
}

export default Admin