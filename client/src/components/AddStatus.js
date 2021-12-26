import React, { useContext, useState } from 'react'
import StatusContext from './context/status/StatusContext';
import { useHistory } from 'react-router-dom';

const AddNote = (props) => {
    let history = useHistory();
    const [status, setStatus] = useState({ title: "", desc: "" });
    const context = useContext(StatusContext);
    const { addStatus } = context;
    const onClickHandle = (e) => {
        e.preventDefault();
        addStatus(status.title, status.desc);
        props.updateAlert('Status Added', 'success')
        setStatus({ title: "", desc: "" });
        history.push('/');
    };
    const onChange = (e) => {
        setStatus({ ...status, [e.target.name]: e.target.value })
    };
    return (
        <>
            <form onSubmit={onClickHandle}>
                <div class="card">
                    <div class="card-header">Create Post</div>
                    <div class="card-body">
                        <input
                            type="text"
                            class="form-control mb-4"
                            placeholder="Write Post Title"
                            id="title"
                            name="title"
                            aria-describedby="basic-addon1"
                            required
                            onChange={onChange}
                        ></input>

                        <input
                            type="text"
                            class="form-control"
                            placeholder="Write post description"
                            aria-label="Username"
                            aria-describedby="basic-addon1"
                            id="desc"
                            name="desc"
                            required
                            onChange={onChange}
                        ></input>
                    </div>
                    <button className="btn btn-success m-3" disabled={status.title.length < 5 && status.desc.length < 5} >Create Post</button>
                </div>
            </form>
        </>)
}

export default AddNote