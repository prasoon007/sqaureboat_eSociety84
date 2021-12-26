import StatusContext from "./StatusContext";
import { useState } from "react";


const StatuState = (props) => {
  const host = 'https://esociety84back.herokuapp.com';
  const [frnd, setFrnd] = useState([]);
  const [loggedUser, setLoggedUser] = useState([]);
  const [status, setStatus] = useState([]);

  const fetchAllStatus = async () => {
    const response = await fetch(`${host}/fetchAllStatus`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'auth-token': localStorage.getItem('token')
      }
    });
    const json = await response.json();
    setStatus(json);
    console.log(status);
  };

  //add note  
  const addStatus = async (title, desc) => {
    //call api
    const response = await fetch(`${host}/addstatus`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'auth-token': localStorage.getItem('token')
      },
      body: JSON.stringify({ title, desc })
    });
    const json = await response.json();
    setStatus(status.concat(json));
  }



  const searchUser = async (username) => {
    let url = `${host}/searchUser/${username}`;
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'auth-token': localStorage.getItem('token')
      },
    })
    const json = await response.json();
    setFrnd(json);
  }

  const followCounter = async (id) => {
    let url = `${host}/followAdder/${id}`;
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'auth-token': localStorage.getItem('token')
      }
    })
    const json = await response.json();
    setFrnd(json);
  }

  const getLoggedUser = async () => {
    let url = `${host}/getUser`;
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'auth-token': localStorage.getItem('token')
      }
    })
    const json = await response.json();
    setLoggedUser(json);
  }

  return (
    <StatusContext.Provider value={{ status, loggedUser, frnd, setFrnd, addStatus, fetchAllStatus, searchUser, followCounter, getLoggedUser, setStatus }}>
      {props.children}
    </StatusContext.Provider>

  )
}

export default StatuState;