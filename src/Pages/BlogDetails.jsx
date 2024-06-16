import React, { useEffect, useState } from 'react'
import Layout from '../Common/Layout'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { useAuth } from '../Context/Auth'
import axios from 'axios'
import { toast } from 'react-toastify'
import { Box, Button, Card, CardActions, CardContent, CardMedia, Container, Grid, Paper, TextField, Typography } from '@mui/material'
import ReplyIcon from '@mui/icons-material/Reply';
import ThumbUpAltSharpIcon from '@mui/icons-material/ThumbUpAltSharp';
import ThumbDownSharpIcon from '@mui/icons-material/ThumbDownSharp';
import SmsSharpIcon from '@mui/icons-material/SmsSharp';
import ThumbUpOutlinedIcon from '@mui/icons-material/ThumbUpOutlined';
import ThumbDownOffAltOutlinedIcon from '@mui/icons-material/ThumbDownOffAltOutlined';
import SubmitLoader from '../Common/SubmitLoader'
import Loader from '../Common/Loader'

export default function BlogDetails() {
    const data = { name: "", email: "", comment: "" }
    
    const { id } = useParams()
    const [blog, setBlog] = useState([])
    const [showComments, setShowComments] = useState([])
    const [auth, setAuth] = useAuth()
    const [initalload, setinitialLoad] = useState(4)
    const [load, setLoad] = useState(true)
    const [user, setUser] = useState(data)
    const [like, setLike] = useState({})
    const [unlike, setUnLike] = useState({})
    const [catg, setCatg] = useState([])
    const [latestPost, setLatestPost] = useState([])

    const loadMore = () => {
        setinitialLoad(initalload + 2)
    }


    const token = auth.token || JSON.parse(localStorage.getItem("auth")).token
    const getBlogs = async () => {
        try {
            const response = await axios.get(`https://restapinodejs.onrender.com/api/blogdetails/${id}`,
                {
                    headers: {
                        // "x-access-token": auth?.token
                        "x-access-token": token
                    }
                })
            console.log("BLOG Details.......", response)
            setBlog(response?.data?.data)
            if (response) {
                setLoad(false)
            }
        } catch (error) {
            console.log(error)
            toast.error(error?.response?.data?.message)
        }
    }

    const getComents = async () => {
        try {
            const response = await axios.get(`https://restapinodejs.onrender.com/api/comment/${id}`,
                {
                    headers: {
                        // "x-access-token": auth?.token
                        "x-access-token": token
                    }
                })
            console.log("SHOW COMMENTS .......", response)
            setShowComments(response?.data?.post?.comment?.comments)
            if (response) {
                setLoad(false)
            }
        } catch (error) {
            console.log(error)
            toast.error(error?.response?.data?.message)
        }
    }

    const onChange = (e) => {
        setUser({ ...user, [e.target.name]: e.target.value })
        console.log(user)
    }


    const handleSubmit = async (e) => {
        e.preventDefault()
        setLoad(true)

        try {
            const response = await axios.post(`https://restapinodejs.onrender.com/api/blog/${id}/comment/create`, user,

                {
                    headers: {
                        // "x-access-token": auth?.token
                        "x-access-token": token
                    }
                })
            console.log("CREATE COMMENTS........", response)
            if (response?.data) {
                toast.success(response?.data?.message)
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

    const LIKE = async (e) => {
        e.preventDefault()
        try {
            const response = await axios.put(`https://restapinodejs.onrender.com/api/blog/like/${id}`, like,
                {
                    headers: {
                        // "x-access-token": auth?.token
                        "x-access-token": token
                    }
                }
            )
            console.log("LIKES ...........", response)
            console.log("LIKES Data ...........", response?.data)
            if (response?.data && response?.data?.status === false) {
                // console.log('ubuugyyu');
                getBlogs()
                setLoad(false)
            }
        } catch (error) {
            console.log(error)
            toast.error(error?.message)
        }
    }

    const UNLIKE = async (e) => {
        e.preventDefault()
        try {
            const response = await axios.put(`https://restapinodejs.onrender.com/api/blog/unlike/${id}`, unlike,
                {
                    headers: {
                        // "x-access-token": auth?.token
                        "x-access-token": token
                    }
                }
            )
            console.log("UNLIKES ...........", response)
            if (response?.data && response?.data?.status === false) {
                console.log('ubuugyyu');
                getBlogs()
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
        getBlogs();
        getComents();
        getCatg();
        getLatestPost();

    }, [])


    return (
        <>
            <Layout>
                {/* <div className="container mb-3" style={{ border: "2px dashed", marginTop: "85px" }}>
                    <img src={`http://localhost:2000/api/blog/image/${blog._id}`} alt="PHOTO" />
                    <h2>Title : {blog.title}  </h2>
                    <h2>Id : {blog._id}  </h2>
                    <h2>Category : {blog.category}  </h2>
                    <h2>likes : {blog.likes}  </h2>
                    <h2>Unlikes : {blog.unlikes}  </h2>
                    <h2>PostText : </h2>  <p dangerouslySetInnerHTML={{ __html: blog.postText }}></p>

                    ******* LIKES && UNLIKES *********

                    <div className="container">
                        <button className='btn btn-success' onClick={LIKE}> Like </button>

                        <button className='btn btn-warning' onClick={UNLIKE}> Unlike </button>
                    </div>

                </div> */}

                {/* ******* Show Comments ********* */}
                {/* <div className="container mt-3" style={{ border: "2px dashed" }}>
                    <h2> {showComments.length} Comments :</h2>  
                    {

                        showComments?.slice(0, initalload)?.map((item, index) => {
                            return (

                                <div class="card" style={{ width: "700px" }}>
                                    <div class="card-body">
                                        <h5 class="card-title">Name : {item.name} </h5>
                                        <p class="card-text"> Comment :{item.comment}</p>
                                    </div>
                                </div>
                                


                            )
                        })
                    }
                    <button className='btn btn-success' onClick={loadMore}>Load More</button>
                </div> */}

                {/* ******* Creating Comment ********* */}

                {/* <Grid sx={{ display: "flex", justifyContent: "center" }}>
                    <Paper elevation={20} style={{ padding: '30px 20px', width: 700, margin: "20px 210px" }}>
                        <Grid align='left'>

                            <h2 style={{ margin: 10 }}>Leave your Comment </h2>
                            <Typography variant='caption' gutterBottom>Your reply is valuable for us !</Typography>
                        </Grid>
                        <form action='' method='POST' onSubmit={handleSubmit}>

                            <TextField fullWidth label='Name' placeholder="Enter your name" margin="normal" color="secondary" type='text' name='name' value={user.name} onChange={onChange} />
                            <TextField fullWidth label='Email' placeholder="Enter your email" margin="normal" color="secondary" type='email' name='email' value={user.email} onChange={onChange} />

                            <TextField fullWidth label='Comment' placeholder="Write your comment" margin="normal" color="secondary" type='text' name='comment' value={user.comment} onChange={onChange} />


                            <Box variant='div' sx={{ display: "flex", justifyContent: "center", margin: "10px 0px" }}>
                                <Button type='submit' variant='contained' color='secondary'  >{load ? <SubmitLoader /> : 'Post Comment'}</Button>
                            </Box>
                        </form>
                    </Paper>
                </Grid> */}


                {load ? <div style={{ height: "70vh" }}><h1 style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}> <Loader /></h1></div> : (
                    <>
                        <Container maxWidth='xl'>
                            <Container sx={{ marginTop: "80px" }}>
                                <Typography variant='h4' align='center' style={{ marginTop: "10px", fontWeight: "bold" }}>
                                    Detailed Blog
                                </Typography>
                                <Grid container spacing={2} style={{ marginTop: "20px" }} >
                                    <Grid item md={8} >
                                        {
                                            <Card sx={{ maxWidth: 790, height: "auto" }} style={{ padding: "10px", marginBottom: "10px" }} elevation={20} >
                                                <CardMedia
                                                    component="img"
                                                    alt="Photo"
                                                    height="auto"
                                                    image={`https://restapinodejs.onrender.com/api/blog/image/${blog._id}`}
                                                    style={{ borderRadius: "12px" }}
                                                />

                                                <CardContent>
                                                    <div style={{display : "flex" , justifyContent : "flex-end"}}>
                                                        {/* <span style={{ padding: "5px" }}><ThumbUpAltSharpIcon /> {blog.likes} </span> */}
                                                        <Button fontSize="large" color='success' onClick={LIKE} > <ThumbUpOutlinedIcon />  <span style={{paddingLeft : "5px"}}>{blog.likes}</span></Button>
                                                        <Button fontSize="large" color='warning' onClick={UNLIKE} > <ThumbDownOffAltOutlinedIcon />  <span style={{paddingLeft : "5px"}}>{blog.unlikes}</span></Button>

                                                        {/* <span style={{ padding: "5px" }}><ThumbDownSharpIcon /> {blog.unlikes} </span> */}

                                                        <span style={{ padding: "5px" }}><SmsSharpIcon /> {blog.comments?.length} </span>
                                                    </div>



                                                    <Typography gutterBottom variant="h5" component="div" align='center' sx={{ fontWeight: "bold" }}>
                                                        {blog.title}
                                                    </Typography>
                                                    <Typography variant="body2" color="text.secondary" dangerouslySetInnerHTML={{ __html: blog.postText }} >
                                                    </Typography>

                                                    {/* ******* LIKES && UNLIKES ********* */}

                                                    {/* <Button fontSize="large" color='success' onClick={LIKE}> <ThumbUpOutlinedIcon /> </Button>
                                                    <Button fontSize="large" color='warning' onClick={UNLIKE}> <ThumbDownOffAltOutlinedIcon /> </Button> */}

                                                    {/* ******************************** */}


                                                </CardContent>
                                                <CardActions>
                                                    <Link to={`/allblogs`} class="btn btn-primary" style={{ marginLeft: "auto", marginTop: "-10px" }}>Back</Link>
                                                </CardActions>
                                            </Card>

                                        }
                                    </Grid>

                                    {/* *********** Category ************* */}

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

                                             {/* ********* Latest Post ************ */}

                                            <Typography variant='h4' style={{ marginTop: "10px", marginBottom: "20px", fontWeight: "bold" }}>
                                                Latest Posts :-
                                            </Typography>                                       

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

                            {/* ******* Show Comments ********* */}

                            <Container sx={{ marginTop: "20px" }}>
                                <Typography variant='h4' style={{ marginTop: "10px", fontWeight: "bold", paddingBottom: "15px" }}>
                                    {showComments.length} Comments :
                                </Typography>
                                <Grid container >
                                    <Grid item md={8.5} >                    
                                        {
                                            showComments?.slice(0, initalload)?.map((item, index) => {
                                                return (
                                                    <>

                                                        {/* <Card sx={{ maxWidth: 790, height: "100px" }} style={{ padding: "10px" }}  > */}

                                                        {/* <CardContent> */}
                                                        <Typography variant="h5" component="div" sx={{ fontWeight: "bold", paddingLeft: "30px" }}>
                                                            {item.name} <ReplyIcon />
                                                        </Typography>
                                                        <Typography gutterBottom variant="body1" color="text.secondary" sx={{ fontWeight: "bold", paddingLeft: "55px", paddingBottom: "10px" }} >
                                                            {item.comment}
                                                        </Typography>
                                                        {/* </CardContent> */}

                                                        {/* </Card> */}



                                                    </>
                                                )
                                            })
                                        }

                                        <Box variant='div' sx={{ display: "flex", justifyContent: "flex-start", margin: "10px 0px" }}>
                                            <button className='btn btn-success ' onClick={loadMore}>Load More</button>

                                        </Box>

                                    </Grid>
                                </Grid>

                            </Container>

                            {/* ******* Creating Comment ********* */}

                            <Container maxWidth="lg" sx={{ marginTop: "20px" }}>
                                <Grid sx={{ display: "flex", justifyContent: "flex-start" }}>
                                    <Paper elevation={20} style={{ padding: '30px 20px', width: 700, }}>
                                        <Grid align='left'>

                                            <h2 style={{ margin: 10 }}>Leave your Comment </h2>
                                            <Typography variant='caption' gutterBottom>Your reply is valuable for us !</Typography>
                                        </Grid>
                                        <form action='' method='POST' onSubmit={handleSubmit}>

                                            <TextField fullWidth label='Name' placeholder="Enter your name" margin="normal" color="secondary" type='text' name='name' value={user.name} onChange={onChange} />
                                            <TextField fullWidth label='Email' placeholder="Enter your email" margin="normal" color="secondary" type='email' name='email' value={user.email} onChange={onChange} />

                                            <TextField fullWidth label='Comment' placeholder="Write your comment" margin="normal" color="secondary" type='text' name='comment' value={user.comment} onChange={onChange} />


                                            <Box variant='div' sx={{ display: "flex", justifyContent: "center", margin: "10px 0px" }}>
                                                <Button type='submit' variant='contained' color='secondary'  >{load ? <SubmitLoader /> : 'Post Comment'}</Button>
                                            </Box>
                                        </form>
                                    </Paper>
                                </Grid>
                            </Container>

                        </Container>

                    </>
                )}

            </Layout>
        </>
    )
}
