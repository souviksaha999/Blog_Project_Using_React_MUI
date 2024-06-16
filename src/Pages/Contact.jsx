import React, { useState } from 'react'
import Layout from '../Common/Layout'
import { Avatar, Box, Button, Grid, Paper, TextField, Typography } from '@mui/material'
import SubmitLoader from '../Common/SubmitLoader'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import axios from 'axios'
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';


export default function Contact() {
    const data = { name: "", email: "", phone: "", message: "", }

    const [user, setuser] = useState(data)
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
        const response = await axios.post('https://restapinodejs.onrender.com/api/contact/create', user)
        console.log("CONTACT.....",response)
        if (response?.data && response?.data?.success === true){
          toast.success(response?.data?.message)
        //   navigate("/")
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
                    <Paper elevation={20} style={{ padding: '30px 20px', width: 600, margin: "20px auto" }}>
                        <Grid align='center'>
                            <Avatar style={{ backgroundColor: '#1bbd7e' }}>

                                <AddCircleOutlineIcon />
                            </Avatar>
                            <h2 style={{ margin: 10 }}>Contact Us</h2>
                            <Typography variant='caption' gutterBottom>Feel free to contact us!</Typography>
                        </Grid>
                        <form action='' method='POST' onSubmit={handleSubmit}>

                            <TextField fullWidth label='Name' placeholder="Enter your name" margin="normal" color="secondary" type='text' name='name' value={user.name} onChange={onChange} />
                            <TextField fullWidth label='Email' placeholder="Enter your email" margin="normal" color="secondary" type='email' name='email' value={user.email} onChange={onChange} />

                            <TextField fullWidth label='Phone' placeholder="Enter your Phone No" margin="normal" color="secondary" type='number' name='phone' value={user.phone} onChange={onChange} />
                            <TextField fullWidth label='Message' placeholder="Send Your Message" margin="normal" color="secondary" type='text' name='message' value={user.message} onChange={onChange} />


                            <Box variant='div' sx={{ display: "flex", justifyContent: "center", margin: "10px 0px" }}>
                                <Button type='submit' variant='contained' color='secondary' > {load ? <SubmitLoader /> : 'Submit'} </Button>
                            </Box>
                        </form>
                    </Paper>
                </Grid>
            </Layout>

        </>
    )
}
