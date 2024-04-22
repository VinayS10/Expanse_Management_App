import React, {useState, useEffect} from "react";
import { Link, useNavigate } from "react-router-dom";
import {message} from 'antd'

const Header = () => {
  const [loginUser, setLoginUser]=useState('')
  const navigate = useNavigate()
  useEffect(() => {
    const user= JSON.parse(localStorage.getItem('user')) 
    if(user) {
      setLoginUser(user)
    }
  },[])

  const LogoutHandler = () => {
    localStorage.removeItem('user')
    message.success("Logout Successfully")
    navigate('/login')   
  }
  return (
    <>
      <nav className="navbar navbar-expand-lg bg-body-tertiary">
        <div className="container-fluid">
          <Link to="/" className="navbar-brand">
            Navbar
          </Link>
          {/* <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon" />
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav">
              <li className="nav-item">
                <a className="nav-link active" aria-current="page" href="#">
                  Home
                </a>
              </li>
            </ul>
          </div> */}
          <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
            <li className="nav-item">          
              <p className="nav-link">{loginUser && loginUser.name}</p>{" "}               
            </li>
            <li className="nav-item">
            <button onClick={LogoutHandler} type="button" class="btn btn-primary">Logout</button>
            </li>
          </ul>
        </div>
      </nav>
    </>
  );
};

export default Header;
