import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/authContext';
import { getLocalStorageWithExpiry } from '../helpers/auth/authFn';

const Navbar = () => {
  const token = getLocalStorageWithExpiry('auth')?.token;
  const { auth, setAuth } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('auth');
    setAuth({
      ...auth,
      user: null,
      token: ''
    });
    navigate('/');
  };

  return (
    <>
      <nav className="navbar navbar-expand-lg bg-body-tertiary">
        <div className="container-fluid">
          <NavLink className="navbar-brand" to="/">
            <img
              src="https://yt3.ggpht.com/a/AATXAJyVS_jkXEH7kcBQsLZDjT_DEGIoFRzkzm7QBg=s900-c-k-c0xffffffff-no-rj-mo"
              alt="Logo"
              width={30}
              height={24}
              className="d-inline-block mx-2 align-text-top"
            />
            VCET ECOINS
          </NavLink>
          <button
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
            <ul className="navbar-nav ms-auto">
              {auth.user ? (
                <>
                  <li className="nav-item">
                    <NavLink
                      className="nav-link"
                      to="/student/dashboard"
                      activeClassName="active"
                    >
                      Dashboard
                    </NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink
                      className="nav-link"
                      to="/student/transfer/ecoins"
                      activeClassName="active"
                    >
                      Transfer Ecoins
                    </NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink
                      className="nav-link"
                      to="/student/transactions"
                      activeClassName="active"
                    >
                      Transactions
                    </NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink
                      className="nav-link"
                      to="/leaderboard"
                      activeClassName="active"
                    >
                      Leaderboard
                    </NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink
                      className="nav-link"
                      to="/profile"
                      activeClassName="active"
                    >
                      Profile
                    </NavLink>
                  </li>
                  <li className="nav-item">
                    <button
                      className="btn btn-danger"
                      onClick={handleLogout}
                    >
                      Logout
                    </button>
                  </li>
                </>
              ) : (
                <>
                  <li className="nav-item">
                    <NavLink
                      className="nav-link"
                      to="/"
                      activeClassName="active"
                    >
                      Login
                    </NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink
                      className="nav-link"
                      to="/register"
                      activeClassName="active"
                    >
                      Register
                    </NavLink>
                  </li>
                </>
              )}
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
