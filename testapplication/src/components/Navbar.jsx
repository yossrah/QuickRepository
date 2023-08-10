import React from 'react'
import { Link } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { Logout } from '../redux/actions/authActions'
function Navbar({user}) {
  const dispatch=useDispatch()
  const LogoutHandler=()=>{
    dispatch(Logout())
  }
  return (
    <nav className="navbar navbar-expand-lg" style={{backgroundColor:'#1e81b0'}} >
                <div className="container-fluid">
                  <Link className="navbar-brand" to="#">QuickTest</Link>
                  <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                  </button>
                  <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                    {user.role==="Admin" ? 
                    (<li className="nav-item">
                            <Link className="nav-link active" aria-current="page" to="/admin">Admin</Link>
                      </li>) : ""}
                      </ul>
                    <div className="d-flex">
                        <div className="mx-4">
                        {!user.isConnected? (<Link className="btn btn-outline-primary" to="/login">Login</Link>):(
                              <React.Fragment>
                             <Link className="btn btn-outline-primary" to="/register">Register member</Link>
                             <Link className="btn btn-outline-primary" onClick={LogoutHandler} >Logout</Link>
                              </React.Fragment>
                            )
                      }
                          
                        </div>
                      </div>
                  </div>
                </div>
              </nav>
  )
}

export default Navbar
