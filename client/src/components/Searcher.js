import { React, useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import StatusContext from './context/status/StatusContext';

function Searcher() {
    const context = useContext(StatusContext);
    const { frnd, setFrnd, searchUser, followCounter } = context;
    const [username, setUsername] = useState('');
    const onClickHandle = async (e) => {
        e.preventDefault();
        searchUser(username);
        setUsername('');
    };
    const onChange = (e) => {
        setFrnd('');
        setUsername(e.target.value);
    };

    const followCount = async (e) => {
        e.preventDefault();
        const id = frnd.username;
        followCounter(id);
        window.location.reload(false);
    }
    return (
        <>
            <div className="col-3 shadow p-3" style={{ height: '400px' }}>
                <h6 className="mt-3">Enter username to search</h6>
                <hr></hr>
                <form className="d-flex my-100">
                    <input className="form-control me-2" vltype="text" placeholder="@username" aria-label="Search" onChange={onChange} name="username" value={username} />
                    <button className="btn btn-outline-success" type="submit" onClick={onClickHandle}>Search</button>
                </form>
                <hr></hr>
                {frnd.name && <div className="card my-3" style={{ width: '100%' }}>
                    <div className="card-body">
                        <h5 className="card-title text-center">{frnd.name.toUpperCase()}</h5>
                        <Link to='/profiler'>{frnd.username}</Link>
                        <p className="card-text">{frnd.about}.</p>
                        <button className="btn btn-primary text-center" onClick={followCount}
                        >FOLLOW</button>
                    </div>
                </div>}
            </div>
        </>
    )
}

export default Searcher
