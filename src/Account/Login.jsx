import { Avatar, Box, Button, Grid, Paper, TextField, Typography } from '@mui/material'
import React, { useState } from 'react'
import Layout from '../Common/Layout'
import SubmitLoader from '../Common/SubmitLoader'
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { toast } from 'react-toastify'
import { useAuth } from '../Context/Auth';

export default function Login() {

  const data = {email:"",password:""}

    const [user,setuser] = useState(data)
    const [auth,setAuth] = useAuth()
    const [load,setLoad] = useState(false)

    const onChange = (e)=>{
      setuser({...user, [e.target.name] : e.target.value})
      console.log(user)
    }
    

    const navigate = useNavigate()
    const handleSubmit = async(e)=>{
      e.preventDefault()
      setLoad(true)
      
      try {
        const response = await axios.post('https://restapinodejs.onrender.com/api/login', user)
        console.log("login.....",response)
        if (response?.data && response?.data?.status === 200){
          toast.success(response?.data?.message)
          setAuth({...auth, user: response?.data?.user, token: response?.data?.token})
          navigate("/")
          setLoad(false)
          localStorage.setItem("auth", JSON.stringify(response?.data))
        }
      } catch (error) {
        console.log(error)
        toast.error(error?.message)
        toast.error(error?.response?.data)
        toast.error(error?.response?.data?.message)
        setLoad(false)
      }
    }




  return (
    <>
    <Layout>
       
        <Grid sx={{marginTop: "100px"}}>
            <Paper elevation={20} style={{ padding: '30px 20px', width: 500, margin: "20px auto" }}>
                <Grid align='center'>
                    <Avatar style={{ backgroundColor: '#1bbd7e' }}>
                       
                        <AddCircleOutlineIcon />
                    </Avatar>
                    <h2 style={{ margin: 10 }}>Log In</h2>
                    <Typography variant='caption' gutterBottom>Please fill this form to Log into your Account !</Typography>
                </Grid>
                
                <form action='' method='POST' onSubmit={handleSubmit}>

                    <TextField fullWidth label='Email' placeholder="Enter your email" margin="normal" color="secondary" type='email' name='email' value={user.email} onChange={onChange} />
                    
                    <TextField fullWidth label='Password' placeholder="Enter your password" margin="normal" color="secondary" type='password' name='password' value={user.password} onChange={onChange}/>


                    <Box variant='div' sx={{display : "flex" , justifyContent:"center", margin: "10px 0px"}}>
                    <Button type='submit' variant='contained' color='secondary'  >{load? <SubmitLoader/> : 'Log In' }</Button>
                    </Box>
                    <Link to='/reg' style={{display : "flex" , justifyContent:"center"}}>Don't have an Account?  Register</Link>
                </form>
            </Paper>
        </Grid> 
       
        
    </Layout>
    </>
  )
}
