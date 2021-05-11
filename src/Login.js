import React, {useState} from 'react'
import {auth} from './firebase.js'
import {useHistory} from 'react-router-dom'

function Login() {
    const history = useHistory()
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const login = (e) => {
        e.preventDefault()
        auth.signInWithEmailAndPassword(email, password)
            .then((auth) => {
                history.push('/')
            })
            .catch(e => alert(e.message))
    }
    const register = (e) => {
        e.preventDefault()
        auth.createUserWithEmailAndPassword(email,password)
            .then((auth) => {
                history.push('/')
            })
            .catch(e => alert(e.message))
    }
    return (
        <div className = "login">
            <h1>Sign in</h1>
            <form>
                <h5>Email</h5>
                <input type = "text" value = {email} onChange = {e => setEmail(e.target.value)}></input>
                <h5>Password</h5>
                <input type = "password" value = {password} onChange = {e => setPassword(e.target.value)}></input>
                <button type = "submit" onClick = {login}>Sign in</button>
                <h6>If you do not have an account, then</h6>
                <button type = "submit" onClick = {register}>Register</button> 
            </form>
        </div>
    )
}

export default Login
