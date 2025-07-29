import React from 'react'

const Logout = () => {

    const handleLogout = async () => {
       try {
            await fetch('http://localhost:5000/auth/logout',{
                method: 'GET',
                credentials: 'include'
            })

            window.location.reload();
       } catch(err) {
            console.error('Logout failed:', err);
       }
    }

  return (
    <>
        <button className='cursor-pointer border-1 text-zinc-400 hover:text-zinc-500 border-zinc-600 rounded-2xl p-3' onClick={handleLogout}><span className='hover:scale-110'>Logout</span></button>
    </>
  )
}

export default Logout