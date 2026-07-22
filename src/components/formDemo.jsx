import React, { useState } from 'react'

export const FormDemo = () => {
    const [Data, setData] = useState({
        name: "",
        email: "",
        password: ""
    })

    const HandelButton = () => {
        console.log(Data)
    }
  return (
    <>
        <form className='flex flex-col w-[20%] pl-5 mt-5' onSubmit={HandelButton}>
            <input className='border mb-5' type="text" placeholder='enter name' onChange={(e) => setData({
                ...Data,
                name: e.target.value
            })} />
            <input className='border mb-5' type="text" placeholder='enter email' onChange={(e) => setData({
                ...Data,
                email: e.target.value
            })} />
            <input className='border mb-5' type="text"  placeholder="enter password" onChange={(e) => setData({
                ...Data,
                password: e.target.value
            })} />
            <button type='submit'>Submit</button>
        </form>

        {/* <button onClick={HandelButton}>Submit</button> */}
        <p>name:{Data.name}</p>
        <p>Email:{Data.email}</p>
        <p>password:{Data.password}</p>
    </>
  )
}
