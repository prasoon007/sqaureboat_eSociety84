import { React, useContext, useEffect } from 'react'
import { Link, useHistory, useLocation } from 'react-router-dom';
import StatusContext from './context/status/StatusContext';
import FeedItem from './FeedItem';
import Searcher from './Searcher';
import AddStatus from './AddStatus';

function Home(props) {
    let history = useHistory();
    let location = useLocation();
    const context = useContext(StatusContext);
    const { status, getLoggedUser, loggedUser, fetchAllStatus } = context;
    useEffect(() => {
        if (localStorage.getItem('token')) {
            fetchAllStatus();
            getLoggedUser();
        } else history.push('/login');
    }, [location])
    return (
        <>
            <div className="container my-3">
                <div className="row">
                    <div class="col-lg-3 shadow h-100 pt-5 pb-5">
                        <div className="text-center">
                            <img
                                class="rounded-circle"
                                src="../user1.png"
                                alt="Generic placeholder image"
                                width="50"
                                height="50"
                            ></img>
                            <h4 id="name">{loggedUser.name}</h4>
                            <p>{loggedUser.email}</p>
                        </div>

                        <div className="card mb-4">
                            <div className="card-body p-4">
                                <small className="mb-4">More information</small>
                                <hr></hr>
                                <ul className="list-unstyled list pl-5">
                                    <li className="mb-3 align-items-center">
                                        <i className="fa fa-user text-success p-2"></i>{loggedUser.username}
                                    </li>
                                    <li className=" mb-3 d-flex">
                                        <i className="fa fa-info-circle mr-3 text-success p-2"></i>
                                        <p>{loggedUser.about}</p>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div className="col-5 rounded mx-1">
                        <AddStatus />
                        {status.length === 0 ? <p>NoThing To Display</p> : status.slice(0).reverse().map((rem) => {
                            return <div className="card mb-3 mt-4 shadow" key={rem._id}>
                                <FeedItem rem={rem} updateAlert={props.updateAlert} />
                            </div>

                        })}
                    </div>
                    <Searcher />
                </div>
            </div>

        </>
    )
}

export default Home
