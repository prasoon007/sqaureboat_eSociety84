import React, { useState } from 'react'
import { useHistory } from 'react-router-dom';

function Signup(props) {
    let history = useHistory();
    const [credentials, setCredentials] = useState({ name: '', email: '', password: '', username: '', about: '' });
    const onSubmit = async (e) => {
        e.preventDefault();
        const response = await fetch('https://esociety84back.herokuapp.com/createUser', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ name: credentials.name, email: credentials.email, password: credentials.password, username: credentials.username, about: credentials.about })
        });
        const json = await response.json();
        if (json.success) {
            localStorage.setItem('token', json.authToken)
            history.push('/');
            props.updateAlert('Account created', 'success');
        }
        else {
            props.updateAlert('Invalid credentials', 'danger');
        }
    };
    const onChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value })
    };



    return (
        <>
            <div className="container mt-3">
                <div className='row'>
                    <div className='col-md-6'>
                        <div className="d-flex align-items-center">
                            <lottie-player className='mt-4' src="https://assets3.lottiefiles.com/packages/lf20_naa8hmmn.json" style={{ height: 400 }} background="transparent" speed="0.4" loop autoplay></lottie-player>

                        </div>
                    </div>
                    <div className='col-md-5'>
                        <div className='container shadow p-5'>
                            <h3 className='mb-3 text-success'>Signup now</h3>
                            <form onSubmit={onSubmit}>
                                <div className="mb-3">
                                    <label htmlFor="name" className="form-label">Name</label>
                                    <input type="text" required onChange={onChange} className="form-control" id="name" name="name" required />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
                                    <input type="email" onChange={onChange} className="form-control" id="email" name="email" aria-describedby="emailHelp" required />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="username" className="form-label">Username</label>
                                    <input type="text" onChange={onChange} className="form-control" id="username" name="username" required />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="about" className="form-label">About</label>
                                    <input type="text" onChange={onChange} className="form-control" id="about" name="about" required/>
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                                    <input type="password" onChange={onChange} className="form-control" id="password" name="password" required />
                                </div>
                                <button type="submit" className="btn btn-primary">Sign Up</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>

        </>
    )
}

export default Signup