import React from 'react'
import Logout from '../components/Logout'

const Dashboard = (props) => {
  return (
    <>
      <div className='bg-zinc-800 text-zinc-200 p-6 flex flex-col gap-6 rounded-2xl shadow-lg items-start'>
        <h1 className='text-2xl text-zinc-300 font-bold'>Welcome to the Dashboard</h1>
        <img src={props.user.avatar} alt="picture" className='w-24 h-24 rounded-full'/>
        <ul className='text-left flex flex-col gap-2'>
          <li className='font-bold text-zinc-600'>Name: <span className='text-zinc-300'>{props.user.name}</span></li>
          <li className='font-bold text-zinc-600'>Email: <span className='text-zinc-300'>{props.user.email}</span></li>
        </ul>
        <Logout />
      </div>
    </>
  )
}

export default Dashboard