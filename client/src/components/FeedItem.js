import React from 'react'
import { Link } from 'react-router-dom';
import moment from 'moment'

function FeedItem(props) {
    return (
        <>
            <img
                src="https://images.unsplash.com/photo-1593642533144-3d62aa4783ec?ixlib=rb-1.2.1&ixid=MnwxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2069&q=80"
                class="card-img-top"
                alt="..."
            ></img>
            <div class="card-body">
                <h5 class="card-title">{props.rem.title}</h5>
                <p class="card-text">

                    {props.rem.desc}
                </p>
                <p class="card-text">
                    <div class="d-flex justify-content-between">
                        <small class="text-muted">{moment(props.rem.updated_at).format('MMMM Do YYYY')}</small>
                        <small class="text-muted">{props.rem.author}</small>
                    </div>
                </p>
            </div>
        </>
    )
}

export default FeedItem
