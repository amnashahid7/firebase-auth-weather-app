import React, { useEffect, useState } from 'react'
import fetchStyle from '../fetchStyleModule.css';
const FetchData = () => {
    const [usersData, setUsersData] = useState([]);

    useEffect(() => {
        fetch('https://jsonplaceholder.typicode.com/users')
            .then(response => response.json())
            .then(data => setUsersData(data))
            .catch(err => console.log(err));
    }, []);

    return (
        <>
            <div className={fetchStyle.box1}>
                <div className={fetchStyle.box11}>
                    <h4>Name</h4>
                    <ul>
                        {usersData.map((user, index) => (

                            <li key={index}>{user.name}</li>
                        ))}
                    </ul>
                </div>
                <div className={fetchStyle.box11}>
                    <h4>Email</h4>
                    <ul>
                        {usersData.map((user, index) => (
                            <li key={index}>{user.email}</li>
                        ))}
                    </ul>
                </div>
                <div className={fetchStyle.box11}>
                    <h4>Address</h4>
                    <ul>
                        {usersData.map((user, index) => (
                            <li key={index}>{user.address.city}</li>
                        ))}
                    </ul>
                </div>
            </div>
        </>

    );
};

export default FetchData;