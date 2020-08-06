import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from 'react-router-dom'
import axios from 'axios';

const Home = props => {
    const [userCount, setUserCount] = useState(0);

    useEffect(() => {
        axios.get("http://localhost:8181/")
            .then((res) => setUserCount(res.data.count))
            .catch(err => console.log(err));
        
    })

    return(
        <div>
        <div>
        <nav className = "navbar navbar-dark bg-dark" >
            <Link to = "/" style = {{color: 'white'}} ><h2>Auth App</h2></Link>
            <div className= "btn-group" >
                <button className= "btb btn-primary" >
                    <Link to = "/signup" style = {{color: 'white'}}>Sign Up</Link>
                </button>
            </div>
        </nav>
        </div>
        <div className = "m-4" >
            <h1>Authentication App</h1>
            <h3>We have {userCount} users!</h3>
        </div>
        </div>
    );
}

export default Home;