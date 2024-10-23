import React from 'react';
import { useUserAuth } from "../context/AuthContext";
import { Button } from "react-bootstrap";
import { Link, useNavigate } from 'react-router-dom';

import "../App.css";

const Navbar = () => {
    const { user, logOut } = useUserAuth();
    let navigate = useNavigate();
    const handleLogout = async () => {
        try {
            await logOut();
            navigate("/");
        } catch (error) {
            console.log(error.message);
        }
    };

    return (
        <div className="d-flex justify-content-between align-items-center w-100  mb-3">
            <div className=" text-center">
                Hello Welcome <br />
                {user && user.email}

            </div>
            <div >
                <Button onClick={handleLogout}>
                    Log out
                </Button>

                <Link to={"/fetch"}>Fetch Data from API</Link>

            </div>
        </div>
    )
}

export default Navbar;