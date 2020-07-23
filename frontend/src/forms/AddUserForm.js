import React, { useState, useEffect } from 'react'
import ReactFileReader from 'react-file-reader'
import csv from 'csv';


const AddUserForm = props => {

	const [error, setError] = useState(null);
	const [isLoaded, setIsLoaded] = useState(false);
	const [items, setItems] = useState([]);

	const initialFormState = { id : null, name: '', username: ''}
	const [user, setUser] = useState(initialFormState)

	const handleInputChange = event => {
		const { name, value } = event.target

		setUser({ ...user, [name] : value})
	}

	const handleFiles = files => {
	    var reader = new FileReader();
	    reader.onload = function(e) {

	    	csv.parse(reader.result, (err, data) => {
		    	 
		    	 const requestOptions = {
		    		method : 'Post',
		    		headers: { 'Content-Type': 'application/json' },
		    		body: JSON.stringify(data)
		    	 }

		    	fetch("/getJson", requestOptions)
		    	  .then(res => res.json())
		    	  .then(
		    	    (result) => {
		    	      setIsLoaded(true);
		    	      console.log(result)
		    	      setItems(result.items);
		    	    },
		    	    // Nota: es importante manejar errores aquí y no en 
		    	    // un bloque catch() para que no interceptemos errores
		    	    // de errores reales en los componentes.
		    	    (error) => {
		    	      setIsLoaded(true);
		    	      setError(error);
		    	    }
		    	  )

	    	 });
	    }
	    reader.readAsText(files[0]);
	}

	useEffect(() => {
	  console.log('Bienvenido a Internet Solidario');
	}, [])
	

	return (
		<form>
			<label>Name</label>
			<input type="text" name="name" value={user.name} onChange={handleInputChange} />
			<label>UserName</label>
			<input type="text" name="username" value={user.username} onChange={handleInputChange} />
			<button>Add new user</button>
			<ReactFileReader handleFiles={handleFiles} fileTypes={'.csv'}>
			    <button type="button" className='btn'>Upload</button>
			</ReactFileReader>
		</form>
	)
}

export default AddUserForm