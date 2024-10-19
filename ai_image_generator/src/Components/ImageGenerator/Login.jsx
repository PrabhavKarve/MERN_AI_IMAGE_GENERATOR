import React, { useEffect, useState } from "react"
import axios from "axios"
import "./form.css"
import { useNavigate, Link } from "react-router-dom"
import api_url from "../endpoint"


function Login() {
    const navigate = useNavigate();

    const [email,setEmail]=useState('')
    const [password,setPassword]=useState('')

    async function submit(e){
        e.preventDefault();

        try {
            await axios.post(api_url, {
                email, password
            })
            .then(res => {
                console.log("login req sent")
                if (res.data === "exist") {
                    console.log("login response received + " + email)
                    localStorage.setItem('userEmail', email);
                    navigate("/home", { state: { id: email } });
                    console.log("home")
                } else if (res.data === "notexist") {
                    alert("User has not signed up");
                } else if (res.data === "invalidpassword") {
                    alert("Incorrect password");
                }
            })
            .catch(e => {
                alert("Wrong details");
                console.log(e);
            });
        }
        catch(e){
            console.log(e);

        }

    }


    return (
        <div className="login_container">

            <h1 className="header2">Login</h1>

            <form action="POST" className='login_box'>
                <input className='search_input2' type="email" onChange={(e) => { setEmail(e.target.value) }} placeholder="Email"  />
                <input className='search_input2' type="password" onChange={(e) => { setPassword(e.target.value) }} placeholder="Password"  />
                <input className="generate_btn2" type="submit" onClick={submit} />

            </form>

            <br />
            <p>OR</p>
            <br />

            <Link to="/signup">Signup Page</Link>

        </div>
    )
}

export default Login