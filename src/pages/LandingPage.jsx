import React from 'react'
import { useNavigate } from 'react-router-dom'
const LandingPage = () => {
  const navigate = useNavigate();
  return (
    <div className="bg-dark bg-gradient text-white min-vh-100 d-flex align-items-center">
      <div className="container py-5">
        <div className="row justify-content-center text-center">
          <div className="col-lg-8">

            

            <h1 className="display-3 fw-bold mb-3">TicketNest</h1>

            <p className="lead text-info mb-5 px-lg-5">
              Your one stop destination for ticket booking. Concerts, sports,
              theatre, and more — all in one place.
            </p>

            <div className="d-flex flex-column flex-sm-row justify-content-center gap-3">
              <button  onClick={() => navigate("/login")} className="btn btn-info btn-lg rounded px-5 fw-semibold text-dark">
                Login
              </button>
              <button onClick={() => navigate("/register")} className="btn btn-outline-light btn-lg rounded px-5 fw-semibold">
                Register
              </button>
            </div>

          </div>
        </div>
      </div>
    </div>
  )
}

export default LandingPage