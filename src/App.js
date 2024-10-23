
import React from 'react'
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import Login from './components/Login';
import { Col, Container, Row } from 'react-bootstrap';
import { Route, Routes } from 'react-router-dom';
import Signup from './components/SingUp';
import { UserAuthContextProvider } from './context/AuthContext';
import ProtectedRoutes from './components/ProtectedRoutes';
import Home from './components/Home';
import FetchData from './components/FetchData';

const App = () => {
  return (
    <>

      <div>
        <UserAuthContextProvider>
          <Routes>
            <Route
              path="/home"
              element={
                <ProtectedRoutes>
                  <Home />
                </ProtectedRoutes>
              }
            />
            <Route path="/" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/fetch" element={<FetchData />} />
          </Routes>
        </UserAuthContextProvider>
      </div>

    </>
  )
}

export default App;
