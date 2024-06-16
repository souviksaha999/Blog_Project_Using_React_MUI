import React, { useState } from 'react'
import Layout from '../Common/Layout'
import TextField from '@mui/material/TextField';
import { Avatar, Box, Button, Grid, Paper, Typography } from '@mui/material';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import axios from 'axios';
import { toast } from 'react-toastify';
import { Link, useNavigate } from 'react-router-dom';
import SubmitLoader from '../Common/SubmitLoader';



export default function Reg() {

    const data = {name:"",email:"",mobile:"",password:""}

    const [user,setuser] = useState(data)
    const [photo,setPhoto] = useState()
    const [load,setLoad] = useState(false)

    const onChange = (e)=>{
      setuser({...user, [e.target.name] : e.target.value})
      console.log(user)
    }
    const changeImage = (e)=>{
      setPhoto(e.target.files[0])
      console.log(e.target.files)
    }

    const navigate = useNavigate()
    const handleSubmit = async(e)=>{
      e.preventDefault()
      setLoad(true)
      const formData = new FormData()
      formData.append("name",user.name)
      formData.append("email",user.email)
      formData.append("mobile",user.mobile)
      formData.append("password",user.password)
      formData.append("photo",photo)
      try {
        const response = await axios.post('https://restapinodejs.onrender.com/api/register', formData)
        console.log("reg.....",response)
        if (response?.data && response?.data?.success === true){
          toast.success(response?.data?.message)
          navigate("/login")
          setLoad(false)
        }
      } catch (error) {
        console.log(error)
        toast.error(error?.response?.data)
        toast.error(error?.response?.data?.msg)
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
                    <h2 style={{ margin: 10 }}>Sign Up</h2>
                    <Typography variant='caption' gutterBottom>Please fill this form to create an account !</Typography>
                </Grid>
                <form action='' method='POST' onSubmit={handleSubmit}>
                  <TextField fullWidth label='Name' placeholder="Enter your name" margin="normal" color="secondary" type='text' name='name' value={user.name} onChange={onChange}/>

                    <TextField fullWidth label='Email' placeholder="Enter your email" margin="normal" color="secondary" type='email' name='email' value={user.email} onChange={onChange} />
                    
                    <TextField fullWidth label='Phone Number' placeholder="Enter your phone number" margin="normal" color="secondary" type='number' name='mobile' value={user.mobile} onChange={onChange} />

                    <TextField fullWidth label='Password' placeholder="Enter your password" margin="normal" color="secondary" type='password' name='password' value={user.password} onChange={onChange}/>

                    <TextField fullWidth   margin="normal" color="secondary" type='file' name='photo' accept='image/*' onChange={changeImage}/>
                    {
                      photo!=="" && photo!==null && photo !==undefined? (
                        <>
                        <img src={URL.createObjectURL(photo)} alt="PHOTO" height="180px"/>
                        </>
                      ) : (<>{ photo === "" && <p> Drag and Drop Image </p>}</>)
                    }

                    <Box variant='div' sx={{display : "flex" , justifyContent:"center", margin: "10px 0px"}}>
                    <Button type='submit' variant='contained' color='secondary'  >{load? <SubmitLoader/> : 'Register' }</Button>
                    </Box>
                    
                </form>
                <Link to='/login' style={{display : "flex" , justifyContent:"center"}}>Already have an Account?  Login</Link>
            </Paper>
        </Grid> 
       
        
    </Layout>
    </>
  )
}
