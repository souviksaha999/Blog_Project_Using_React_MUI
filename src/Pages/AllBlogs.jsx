import axios from 'axios'
import { useEffect, useState } from 'react'
import { useAuth } from '../Context/Auth'
import Layout from '../Common/Layout'
import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';
import { Box, Container, Grid } from '@mui/material';
import Loader from '../Common/Loader';
import SmsSharpIcon from '@mui/icons-material/SmsSharp';


export default function AllBlogs() {

    const [blogs, setBlogs] = useState([])
    const [blogImg, setBlogImg] = useState()
    const [catg, setCatg] = useState([])
    const [latestPost, setLatestPost] = useState([])
    const [auth, setAuth] = useAuth()
    const [load, setLoad] = useState(true)

    const token = auth.token || JSON.parse(localStorage.getItem("auth")).token
    const getBlogs = async () => {
        try {
            const response = await axios.get(`https://restapinodejs.onrender.com/api/allBlog`,
                {
                    headers: {
                        // "x-access-token": auth?.token
                        "x-access-token": token
                    }
                })
            console.log("BLOGS.......", response)
            setBlogs(response?.data?.data)
            if (response) {
                setLoad(false)
            }
        } catch (error) {
            console.log(error)
            toast.error(error?.response?.data?.message)
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
            // if (response) {
            //     setLoad(false)
            // }

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
            // if (response) {
            //     setLoad(false)
            // }

        } catch (error) {
            console.log(error)
            toast.error(error?.response?.data?.message)
            toast.error(error?.message)
        }
    }

    useEffect(() => {
        getBlogs();
        getCatg();
        getLatestPost()

    }, [])
    // console.log(blogs)

    return (
        <>
            <Layout>

                {/* <div className="container" style={{ marginTop: "80px" }} >
                    <div className="row">

                        <div className="col-md-8">
                            <h2>Blogs</h2>
                            <div className="container" style={{ marginTop: "20px" }}>
                                <div className="row">


                                    {
                                        blogs?.map((item) => {
                                            return (
                                                <>
                                                   

                                                    <div className="col-md-6">
                                                        <div class="card" style={{ width: "18rem" }}>
                                                            <img src={`http://localhost:2000/api/blog/image/${item?._id}`} class="card-img-top" alt="..." />
                                                            <div class="card-body">
                                                                <h5 class="card-title">Card title : {item.title}  </h5>
                                                                <p class="card-text" dangerouslySetInnerHTML={{ __html: item?.postText?.slice(0, 100) }}></p>
                                                                <Link to={`/blogdetails/${item._id}`} class="btn btn-primary">Read More</Link>
                                                            </div>
                                                        </div>
                                                    </div>


                                                </>
                                            )
                                        })
                                    }
                                </div>
                            </div>
                        </div>

                        <div className="col-md-4">
                            <h2>Categories</h2>
                            {
                                catg.map((item, index) => {
                                    return (
                                        <div key={index}>
                                            <h4 style={{ margin: "10px 0px" }}>{item.category}</h4>
                                        </div>
                                    )
                                })
                            }
                        </div>
                    </div>
                </div> */}

                {load ? <div style={{ height: "70vh" }}> <h1 style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}> <Loader /> </h1></div> : (
                    <>
                        <Container sx={{ marginTop: "80px" }}>
                            <Typography variant='h4' align='center' style={{ marginTop: "10px", fontWeight: "bold" }}>
                                Blogs
                            </Typography>
                            <Grid container spacing={2} style={{ marginTop: "20px" }} >
                                <Grid item md={8} >
                                    {
                                        blogs.map((item, index) => {
                                            return (
                                                <>

                                                    <Card sx={{ maxWidth: 790, height: "auto" }} style={{ padding: "0px", marginBottom: "10px", borderRadius: "12px" }} elevation={20} >
                                                        <CardMedia
                                                            component="img"
                                                            alt="green iguana"
                                                            height="470"
                                                            image={`https://restapinodejs.onrender.com/api/blog/image/${item._id}`}
                                                            style={{ borderRadius: "12px" }}

                                                        />
                                                        <CardContent sx={{ padding: "10px" }}>
                                                            <Typography gutterBottom variant="h5" component="div" align='center' sx={{ fontWeight: "bold" }}>
                                                                {item.title}
                                                            </Typography>
                                                            <Typography variant="body2" sx={{ fontSize: "16px" }} color="text.secondary" dangerouslySetInnerHTML={{ __html: item?.postText?.slice(0, 500) }} >

                                                            </Typography>
                                                            <span style={{ padding: "5px" }}><SmsSharpIcon /> {item.comment_count} </span>
                                                        </CardContent>
                                                        <CardActions>
                                                            {/* <Button size="small">Share</Button> */}
                                                            <Link to={`/blogdetails/${item._id}`} class="btn btn-success" style={{ marginLeft: "auto", marginTop: "-10px" }}>Read More</Link>
                                                        </CardActions>
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
                                                                <Link style={{ color: "black", fontSize: "18px", fontWeight: "bold", textDecoration: "none" }} to={`/catgerorypost/${item._id}`}> {item.category} </Link>
                                                                {/* <Link style={{ color: "black", fontSize: "18px", fontWeight: "bold" , textDecoration: "none"}}> {item._id} </Link> */}
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
                                                                <Box sx={{ display: "inline" }}>
                                                                    <span style={{ fontSize: "18px", fontWeight: "bold", paddingRight: "5px" }} >{index + 1}.</span>
                                                                    <img src={`https://restapinodejs.onrender.com/api/blog/image/${item._id}`} alt="" height="60px" width="100px" />
                                                                </Box>
                                                                <Box sx={{ display: "inline", paddingLeft: "10px" }}>

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
