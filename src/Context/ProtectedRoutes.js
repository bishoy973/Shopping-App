import React, { createContext, useContext, useState } from 'react'
import { tokenContext } from './TokenContext'
import { Navigate } from 'react-router-dom'


export let protectedRoutes = createContext()

export default function ProtectedRoutes(props) {

let {token} = useContext(tokenContext)
if(localStorage.getItem("userToken")){
    return props.children
}
else{
return    <Navigate to={"/login"}/>
}


  return (
    <div>
      
    </div>
  )
}
