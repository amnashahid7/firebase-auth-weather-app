import React from "react";
import { useUserAuth } from "../context/AuthContext";
import WeatherComp from "./weatherComp";
import Navbar from "./Navbar";
import '../App.css';

const Home = () => {
    const { user } = useUserAuth();


    return (
        <>
            {user && (
                console.log(user)
            )}
            <Navbar />
            <WeatherComp />

        </>
    );
};

export default Home;