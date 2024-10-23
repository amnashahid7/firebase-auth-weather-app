import React, { useEffect } from 'react'
import '../App.css';
import { useState } from 'react';
import humidity from '../img/humidity.png';
import speed from '../img/storm.png'
import { useUserAuth } from '../context/AuthContext';
import { Button, Modal } from 'react-bootstrap';
import SearchHistoryModal from './searchHistoryModal';

const WeatherApp = ({ }) => {
    const API_key = '5a765d5e9641e0fe4855f478957c636f';
    const [city, setCity] = useState('');
    const [weatherData, setWeatherData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [searchHistory, setSearchHistory] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const { user } = useUserAuth();


    const getWeather = async (city) => {
        setLoading(true);
        setError('');
        setWeatherData(null);

        const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_key}&units=metric`;
        try {
            const response = await fetch(url);
            const data = await response.json();

            if (data.cod === '404') {
                setError('City Not Found');
                setLoading(false);
                return;
            }

            setWeatherData(data);


            // Store the search in the state and localStorage
            const newSearch = {
                id: user ? user.id : 'anonymous',
                email: user ? user.email : 'anonymous@example.com',
                city,

                weatherData: data,
            }

            const updatedHistory = [...searchHistory, newSearch];
            setSearchHistory(updatedHistory);
            localStorage.setItem('searchHistory', JSON.stringify(updatedHistory));
        } catch (err) {
            setError('Error fetching data');
        } finally {
            setLoading(false);
        }
    };
    useEffect(() => {
        // Load stored search history from localStorage
        const storedHistory = JSON.parse(localStorage.getItem('searchHistory'));
        if (storedHistory) {
            setSearchHistory(storedHistory);
        }
    }, []);



    const handleSubmit = (event) => {
        event.preventDefault();
        if (city) {
            getWeather(city);
        }
    };
    const handleShow = () => setShowModal(true);
    const handleHide = () => setShowModal(false);

    return (
        <>
            {/* <Button variant="primary" onClick={handleShow}>
                Show Search History
            </Button> */}

            <SearchHistoryModal
                show={showModal}
                onHide={handleHide}
                history={searchHistory}
                currentUser={user}
            />
            <div className="searchHistory">
                <h2>Search History</h2>
                {searchHistory.length > 0 ? (
                    <ul>
                        {searchHistory
                            .filter(search => search.email === (user ? user.email : ''))
                            .map((search, index) => (
                                <div className='' >
                                    <li key={index}>
                                        <h4>Data</h4>
                                        <p>City: {search.city}</p>
                                        <p>Temperature: {search.weatherData.main.temp} °C</p>
                                    </li>
                                </div>
                            ))}
                    </ul>
                ) : (
                    <p>No search history available</p>
                )}
            </div>


            <div className='section' >
                <div className="row">
                    <form onSubmit={handleSubmit}>
                        <input
                            type="text"
                            id="search"
                            value={city}
                            onChange={(e) => setCity(e.target.value)}
                            placeholder="Enter city name"
                        />
                        <button type="submit" className='getBtn'>Get Weather</button>
                    </form>
                </div>

                <div id="displayArea">
                    {loading && <h1>Loading....</h1>}
                    {error && <h2>{error}</h2>}
                    {weatherData && (
                        <div>
                            <div className="name_weather">
                                <img
                                    src={`https://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`}
                                    alt="Weather Icon"
                                    width="150px"
                                    height="150px"
                                />
                                <h2 className="temp">
                                    {weatherData.main.temp} <sup>o</sup>C
                                </h2>
                                <h3 className="city">{weatherData.name}</h3>
                                <h3 className="type">
                                    <span>{weatherData.weather[0].description}</span>
                                </h3>
                            </div>

                            <div className="quality">
                                <img
                                    className="imgQuality"
                                    src={humidity}
                                    alt="Humidity Icon"
                                />
                                <label className="hum">
                                    Humidity: {weatherData.main.humidity}%
                                </label>
                                <img
                                    className="imgQuality"
                                    src={speed}
                                    alt="Wind Speed Icon"
                                />
                                <label className="Speed">
                                    Wind Speed: {weatherData.wind.speed} km/h
                                </label>
                            </div>
                        </div>
                    )}
                </div>


            </div>
        </>
    );
};

export default WeatherApp;
