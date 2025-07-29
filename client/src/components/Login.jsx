import React from 'react'

const Login = () => {
    const handleLogin = () => {
        window.open('http://localhost:5000/auth/google','_self');
    }
  return (
    <>
        <h1>Login via Google</h1>
        <button className='cursor-pointer border-1 border-zinc-600 rounded-2xl p-3' onClick={handleLogin}>Login with Google</button>
    </>
  )
}

export default Login