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
import { Container, Grid } from '@mui/material';
import Loader from '../Common/Loader';
import { WidthFull } from '@mui/icons-material';

export default function AllCourses() {

    const [courses, setCourses] = useState([])
    const [courseImg, setCourseImg] = useState()
    const [auth, setAuth] = useAuth()
    const [load, setLoad] = useState(true) 

    const getCourses = async () => {
        try {
            const response = await axios.get(`https://restapinodejs.onrender.com/api/course`,
                {
                    headers: {
                        "x-access-token": auth?.token
                    }
                })
            console.log("COURSES.......", response)
            setCourses(response?.data?.Courses)
            if(response){
                setLoad(false)
            }
        } catch (error) {
            console.log(error)
            toast.error(error?.response?.data?.message)
        }
    }
    const getCourseImg = async () => {
        try {
            const response = await axios.get(`https://restapinodejs.onrender.com/api/course/photo/6581d67a8b1a2fc045abc53f`,
                {
                    headers: {
                        "x-access-token": auth?.token
                    },
                    responseType : "blob"
                })
            console.log("COURSES Image.......", response)
            setCourseImg(response?.data)

            if(response){
                setLoad(false)
            }
        } catch (error) {
            console.log(error)
            toast.error(error?.response?.data?.message)
        }
    }

    useEffect(() => {
        getCourses();
        getCourseImg()
    }, [])
    // console.log("iiiimmmmmggg",courseImg)

    return (
        <>
            <Layout>
                {/* <div className="container" style={{ marginTop: "70px" }}>

                    {
                        courses?.map((item) => {
                            return (
                                <>
                                    

                                    <div className="container">
                                        <div class="card" style={{ width: "20rem" }}>
                                            <img src={courseImg} class="card-img-top" alt="PHOTO" />
                                            <img src={`https://restapinodejs.onrender.com/api/course/photo/${item._id}`} class="card-img-top" alt="PHOTO" />
                                            <div class="card-body">
                                                <h5 class="card-title">ID : {item._id}  </h5>
                                                <h5 class="card-title">Name : {item.name}  </h5>
                                                <h5 class="card-title">Slug : {item.slug}  </h5>
                                                <h5 class="card-title">Requirement : {item.requirement}  </h5>
                                                <h5 class="card-title">Duration : {item.duration}  </h5>
                                                <h5 class="card-title">Fees : {item.fees}  </h5>
                                                <Link to={`/blogdetails/${item._id}`} class="btn btn-primary">Go somewhere</Link>
                                            </div>
                                        </div>
                                    </div>

                                </>
                            )
                        })
                    }
                </div> */}

{load? <div style={{height : "70vh"}}><h1 style={{position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)'}}> <Loader /></h1></div> : (
    <>
     <Container maxWidth="lg" sx={{ marginTop: "80px" }}>
                <Typography variant='h4' align='center' style={{ marginTop: "50px" }}>
                    Courses
                </Typography>
                <Grid container spacing={5} style={{ marginTop: "20px" }}>
                    {
                        courses.map((item, index) => {
                            return (
                                <>
                                    <Grid item xs={12} sm={6} md={4} key={index}>
                                        <Card sx={{ maxWidth: 600,height: "400px" }} style={{ padding: "10px", marginBottom: "30px"}} elevation={20} >
                                            {/* <CardMedia
                                                component="img"
                                                alt="Photo"
                                                height="500"
                                                 image={`https://restapinodejs.onrender.com/api/course/photo/${item._id}`}
                                            /> */}
                                            <img src={`https://restapinodejs.onrender.com/api/course/photo/${item._id}`} alt="" height="200px" style={{display : "block", margin : "0 auto"}}/>
                                            <CardContent>
                                                <Typography gutterBottom variant="h5" component="div" align='center'>
                                                {item.name} 
                                                </Typography>
                                                <Typography variant="h6" color="text.secondary"  >
                                                Requirement : {item.requirement}
                                                </Typography>
                                                <Typography variant="h6" color="text.secondary"  >
                                                Duration : {item.duration}
                                                </Typography>
                                                <Typography variant="h6" color="text.secondary"  >
                                                Fees : {item.fees}
                                                </Typography>
                                            </CardContent>
                                            
                                        </Card>
                                    </Grid>
                                </>
                            )
                        })
                    }


                </Grid>

            </Container>
    </>
) }

               
            </Layout>
        </>
    )
}
