import React from 'react'

const Login = () => {
    const handleGoogleLogin = () => {
        window.open('http://localhost:5000/auth/google','_self');
    }
    const handleGithubLogin = () => {
        window.open('http://localhost:5000/auth/github','_self');
    }
  return (
    <>
        <h1>Login via Google</h1>
        <button className='cursor-pointer border-1 border-zinc-600 rounded-2xl p-3' onClick={handleGoogleLogin}>Login with Google</button>
        <button className='cursor-pointer border-1 border-zinc-600 rounded-2xl p-3' onClick={handleGithubLogin}>Login with Github</button>
    </>
  )
}

export default Login