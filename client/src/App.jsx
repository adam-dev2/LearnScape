import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Login from './components/Login'
import Dashboard from './pages/Dashboard'

const App = () => {
  const [user,setUser] = useState(null);
  const [loading,setLoading] = useState(true);

  useEffect(()=> {
    const fetchUSer = async() => {
      try {
        const response = await axios.get('http://localhost:5000/auth/me',{
          withCredentials: true,
          headers: {
            'Content-Type': 'application/json'
          }
        })
        if(response.data.user){
          setUser(response.data.user);
        }
      } catch(err){
        console.error('Error while fetching user: ',err);
      } finally {
        setLoading(false);
      }
    }
    fetchUSer();
  },[])

  return (
    <>
      <div className='bg-zinc-900 text-zinc-400 text-center flex flex-col gap-4 justify-center items-center p-10 h-screen w-screen '>
        {loading? <h1>Loading....</h1> : user? <Dashboard user={user} /> : <Login />}
      </div>
    </>
  )
}

export default App