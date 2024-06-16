import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { toast } from 'react-toastify'
import Layout from '../Common/Layout'
import { useAuth } from '../Context/Auth'
import { Box, Card, CardActions, CardContent, CardMedia, Container, Grid, Typography } from '@mui/material'
import ThumbUpAltSharpIcon from '@mui/icons-material/ThumbUpAltSharp';
import ThumbDownSharpIcon from '@mui/icons-material/ThumbDownSharp';
import SmsSharpIcon from '@mui/icons-material/SmsSharp';
import Loader from '../Common/Loader'

export default function CategoryPost() {
    const { id } = useParams()

    const [catgpost, setCatgPost] = useState([])
    const [auth, setAuth] = useAuth()
    const [catg, setCatg] = useState([])
    const [latestPost, setLatestPost] = useState([])
    const [load,setLoad] = useState(true)

    const token = auth.token || JSON.parse(localStorage.getItem("auth")).token

    const getCatgPost = async () => {
        try {
            const response = await axios.get(`https://restapinodejs.onrender.com/api/category/post/${id}`,
                {
                    headers: {
                        // "x-access-token": auth?.token
                        "x-access-token": token
                    }
                }
            )
            console.log("Category Post......", response)
            setCatgPost(response?.data?.data)
            if (response){
                setLoad(false)
            }
        } catch (error) {
            console.log(error)
            toast.error(error?.message)
        }
    }
    const getCatg = async () => {
        try {
            const response = await axios.get(`https://restapinodejs.onrender.com/api/showallcategory`,
                {
                    headers: {
                        // "x-access-token": auth?.token
                        "x-access-token": token
                    }
                })
            console.log("CATEGORY.......", response)
            setCatg(response?.data?.data)
            if (response) {
                setLoad(false)
            }
        } catch (error) {
            console.log(error)
            toast.error(error?.response?.data?.message)
        }
    }

    const getLatestPost = async () => {
        try {
            const response = await axios.get(`https://restapinodejs.onrender.com/api/letest-post`,
                {
                    headers: {
                        // "x-access-token": auth?.token
                        "x-access-token": token
                    }
                })
            console.log("LATEST POST.......", response)
            setLatestPost(response?.data?.data)
            if (response) {
                setLoad(false)
            }
        } catch (error) {
            console.log(error)
            toast.error(error?.response?.data?.message)
            toast.error(error?.message)
        }
    }


    useEffect(() => {
        getCatgPost();
        getCatg();
        getLatestPost();
    },[id])


    return (
        <>
            <Layout>
            {load ? <div style={{height : "70vh"}}><h1 style={{position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)'}}> <Loader /></h1></div> : (
                    <>
                        <Container sx={{ marginTop: "80px" }}>
                            <Typography variant='h4' align='center' style={{ marginTop: "10px", fontWeight: "bold" }}>
                            Category Post
                            </Typography>
                            <Grid container spacing={2} style={{ marginTop: "20px" }} >
                                <Grid item md={8} >
                                    {
                                        catgpost.map((item, index) => {
                                            return (
                                                <>
                                                    <Card sx={{ maxWidth: 790, height: "auto" }} style={{ marginBottom: "10px" }} elevation={20} >
                                                        <CardMedia
                                                component="img"
                                                alt="green iguana"
                                                height="auto"
                                                image={`https://restapinodejs.onrender.com/api/blog/image/${item._id}`} 
                                            />
                                                                    {/* <img src={`https://restapinodejs.onrender.com/api/blog/image/${item._id}`} alt="" height="60px" width="100px"/> */}

                                                        <CardContent>
                                                            <Typography gutterBottom variant="h5" component="div" align='center' sx={{ fontWeight: "bold" }}>
                                                                {item.title}
                                                            </Typography>
                                                            <Typography variant="body2" sx={{fontSize : "16px"}} color="text.secondary" dangerouslySetInnerHTML={{ __html: item?.postText?.slice(0, 500) }} >

                                                            </Typography>
                                                            <span style={{ padding: "5px" }}><ThumbUpAltSharpIcon /> {item.likes} </span>

                                        <span style={{ padding: "5px" }}><ThumbDownSharpIcon /> {item.unlikes} </span>

                                        <span style={{ padding: "5px" }}><SmsSharpIcon /> {item.comments?.length} </span>
                                                        </CardContent>
                                                        
                                                    </Card>



                                                </>
                                            )
                                        })
                                    }
                                </Grid>
                                                {/* ********* Category ************ */}

                                <Grid item md={4} >

                                    <Card sx={{ maxWidth: 500, height: "auto" }} style={{ padding: "10px", marginBottom: "30px" }} elevation={20} >
                                        <Typography variant='h4' style={{ marginTop: "10px", marginBottom: "20px", fontWeight: "bold" }}>
                                            Categories :-
                                        </Typography>
                                        {
                                            catg.map((item, index) => {
                                                return (
                                                    <>
                                                        <CardContent>
                                                            <Typography sx={{ marginTop: "-18px" }}  >
                                                                <Link style={{ color: "black", fontSize: "18px", fontWeight: "bold" , textDecoration: "none"}} to={`/catgerorypost/${item._id}`}> {item.category} </Link>
                                                            </Typography>
                                                            <Typography variant="body2" color="text.secondary"  >

                                                            </Typography>
                                                            
                                                        </CardContent>
                                                    </>
                                                )
                                            })
                                        }
                                        <Typography variant='h4' style={{ marginTop: "10px", marginBottom: "20px", fontWeight: "bold" }}>
                                            Latest Posts :-
                                        </Typography>

                                                       {/* ********* Latest Post ************ */}

                                        {
                                            latestPost.map((item, index) => {
                                                return (
                                                    <>
                                                    
                                                    <span>
                                                    <CardContent>
                                                    <Box sx={{display : "inline"}}>
                                                    <span style={{ fontSize: "18px", fontWeight: "bold", paddingRight: "5px" }} >{index + 1}.</span>
                                                    <img src={`https://restapinodejs.onrender.com/api/blog/image/${item._id}`} alt="" height="60px" width="100px"/>
                                                    </Box>
                                                            <Box sx={{display : "inline", paddingLeft : "10px"}}>
                                                                
                                                                <span style={{ fontSize: "18px", fontWeight: "bold" }} dangerouslySetInnerHTML={{ __html: item.title }}>            
                                                                </span>
                                                            </Box>

                                                        </CardContent>
                                                    </span>
                                                    
                                                        
                                                    </>
                                                )
                                            })
                                        }
                                    </Card>

                                </Grid>
                            </Grid>
                        </Container>

                    </>)}
                
            </Layout>
        </>
    )
}
