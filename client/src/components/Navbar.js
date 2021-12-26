import React, { useEffect, useContext } from 'react';
import { Link, useLocation, useHistory } from 'react-router-dom';
import StatusContext from './context/status/StatusContext';
function Navbar() {
    const context = useContext(StatusContext);
    const { loggedUser } = context;
    let history = useHistory();
    let location = useLocation();
    useEffect(() => {

    }, [location]);
    let onClickHandle = () => {
        localStorage.removeItem('token');
        history.push('/login');
    }
    return (
        <>
            <nav className="navbar navbar-expand-lg navbar-light bg-primary">
                <div className="container-fluid">
                    <Link className="navbar-brand text-white" to='/'>Chatzap</Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="/navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                            </li>
                            <li className="nav-item" >
                            </li>
                        </ul>
                        <form className="d-flex">
                            {!localStorage.getItem('token') ?
                                <>
                                    <Link className="btn btn-primary mx-1" to="/login" role="button">Sign In</Link>
                                    <Link className="btn btn-primary mx-1" to="/signup" role="button">Sign Up</Link></> : <container>
                                    <a className='d-inline p-2" mx-3 text-white'>@{loggedUser.username}</a>
                                    <button className="btn btn-primary" onClick={onClickHandle}>Logout</button>
                                </container>
                            }
                        </form>
                    </div>
                </div>
            </nav>
        </>
    )
}

export default Navbar