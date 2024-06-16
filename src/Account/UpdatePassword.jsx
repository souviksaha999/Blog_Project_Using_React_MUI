import { Avatar, Box, Button, Grid, Paper, TextField, Typography } from '@mui/material'
import React, { useState } from 'react'
import Layout from '../Common/Layout'
import SubmitLoader from '../Common/SubmitLoader'
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { toast } from 'react-toastify'
import { useAuth } from '../Context/Auth';

export default function UpdatePassword() {

  const data = {user_id:"",password:""}

    const [user,setuser] = useState(data)
    const [auth,setAuth] = useAuth()
    const [load,setLoad] = useState(false)

    console.log(auth?.user?._id)

    const onChange = (e)=>{
      setuser({...user, [e.target.name] : e.target.value})
      console.log(user)
    }
    

    const navigate = useNavigate()
    const handleSubmit = async(e)=>{
      e.preventDefault()
      setLoad(true)
      
      try {
        const response = await axios.post('https://restapinodejs.onrender.com/api/update-password', user,
        {
            headers: {
                "x-access-token": auth?.token
            }
        }
    )
        
        console.log("UPDATE.....",response)
        if (response?.data && response?.data?.success === true){
          toast.success(response?.data?.msg)
          setAuth({...auth, user:null, token: ""})
          localStorage.removeItem("auth")
          navigate("/login")
          setLoad(false)
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
       
        <Grid sx={{marginTop : "100px"}}>
            <Paper elevation={20} style={{ padding: '30px 20px', width: 500, margin: "20px auto" }}>
                <Grid align='center'>
                    <Avatar style={{ backgroundColor: '#1bbd7e' }}>
                       
                        <AddCircleOutlineIcon />
                    </Avatar>
                    <h2 style={{ margin: 10 }}>Update Password</h2>
                    <Typography variant='caption' gutterBottom>Please fill this form to Log into your Account !</Typography>
                </Grid>
                <form action='' method='POST' onSubmit={handleSubmit}>

                    <TextField fullWidth label='User_Id' placeholder="Enter your Id" margin="normal" color="secondary" type='text' name='user_id' value={user.user_id} onChange={onChange} />
                    
                    <TextField fullWidth label='Password' placeholder="Enter your password" margin="normal" color="secondary" type='password' name='password' value={user.password} onChange={onChange}/>


                    <Box variant='div' sx={{display : "flex" , justifyContent:"center", margin: "10px 0px"}}>
                    <Button type='submit' variant='contained' color='secondary'  >{load? <SubmitLoader/> : 'Update' }</Button>
                    </Box>
                    <Link to='/reg' style={{display : "flex" , justifyContent:"center"}}>Don't have an Account?  Register</Link>
                </form>
            </Paper>
        </Grid> 
       
        
    </Layout>
    </>
  )
}
