import React, { createContext, useContext, useEffect, useState } from 'react'


const AuthContext = createContext()

export default function AuthProvider({children}) {

  const [auth,setAuth] = useState({user:null, token: ""})

  useEffect(()=>{
    const data = localStorage.getItem("auth")
    if (data){
      const parseData = JSON.parse(data)
      setAuth({...auth, user: parseData.user, token: parseData.token})
    }
  },[])

  // console.log("auth.....",auth)


  return (
    <AuthContext.Provider value={[auth,setAuth]}>
      {children}
    </AuthContext.Provider>
  )
}

const useAuth = ()=> useContext(AuthContext)

export {useAuth}
