import React, { useState } from 'react'
import { useHistory } from 'react-router-dom';

function Login(props) {
    let history = useHistory();
    const [credentials, setCredentials] = useState({ email: '', password: '' });
    const onChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value })
    };

    const onSubmit = async (e) => {
        e.preventDefault();
        const response = await fetch('https://esociety84back.herokuapp.com/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email: credentials.email, password: credentials.password })
        });
        const json = await response.json();
        if (json.success) {
            localStorage.setItem('token', json.authToken);
            history.push('/');
            props.updateAlert('Logged In successfully', 'success');
        }
        else {
            props.updateAlert('Invalid credentials', 'danger');
        }
    }
    
    return (
        <>
            <div className="container my-3 mt-5">
                <div className='row'>
                    <div className='col-md-6'>
                    <lottie-player src="https://assets3.lottiefiles.com/packages/lf20_naa8hmmn.json" style={{ height: 400 }} background="transparent" speed="0.4"  loop autoplay></lottie-player>
                    </div>
                    <div className='col-md-5'>
                    <div className='container shadow p-5'>
                    <h3 className='mb-5 text-success'>Please Sign in to Get Started</h3>
                    <form onSubmit={onSubmit}>
                    <div className="mb-3">
                        <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
                        <input type="email" onChange={onChange} className="form-control" id="email" name="email" aria-describedby="emailHelp" />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                        <input type="password" onChange={onChange} className="form-control" id="password" name="password" />
                    </div>
                    <button type="submit" className="btn btn-primary">Submit</button>
                </form>
                </div>
                    </div>
                </div>
              
            </div>
        </>
    )
}

export default Login