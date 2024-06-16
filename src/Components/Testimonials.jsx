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
import { Avatar, Container, Grid } from '@mui/material';
import Loader from '../Common/Loader';

export default function Testimonials() {

    const [testimonials, setTestimonials] = useState([])
    const [load, setLoad] = useState(true)

    const getBlogs = async () => {
        try {
            const response = await axios.get(`https://restapinodejs.onrender.com/api/testimonial`)

            console.log("TESTIMONIALS...........", response)
            setTestimonials(response?.data?.testimonials )
            if (response){
                setLoad(false)
            }
        } catch (error) {
            console.log(error)
            toast.error(error?.response?.data?.message)
        }
    }

    useEffect(() => {
        getBlogs();
    }, [])
    // console.log(blogs)

    return (
        <>
            {/* <h1 style={{ textAlign: "center", marginTop: "20px" }}>Testimonials</h1>
            <div className="container" style={{ marginTop: "70px" }}>
                <div className="row">
                    {
                        testimonials?.map((item, index) => {
                            return (
                                <div key={index}>
                                    <div className="col-md-4">
                                        <div className="container"><div class="card" style={{ width: "20rem" }}>
                                            <div class="card-body">
                                                <img src={`https://restapinodejs.onrender.com/api/testimonials/photo/${item._id}`} alt="Photo" height="180px" />
                                                <h5 class="card-title">ID : {item._id}  </h5>
                                                <h5 class="card-title">Name : {item.name}  </h5>
                                                <h5 class="card-title">Slug : {item.slug}  </h5>
                                                <h5 class="card-title">Position : {item.position}  </h5>
                                                <h5>Talk : </h5>
                                                <p class="card-text" >{item.talk}</p>
                                            </div>
                                        </div>
                                        </div>
                                    </div>
                                </div>
                            )
                        })
                    }
                </div>
            </div> */}

{load ? <div style={{height: "70vh"}}><h1 style={{position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)'}}> <Loader /></h1></div> : (
    <>
<Container maxWidth="lg" sx={{ marginTop: "80px" }}>
                <Typography variant='h4' align='center' style={{ marginTop: "50px",fontWeight:"bold" }}>
                    Testimonials
                </Typography>
                <Grid container spacing={2} style={{ marginTop: "20px" }}>
                    {
                        testimonials.map((item, index) => {
                            return (
                                <>
                                    <Grid item xs={12} sm={6} md={6} key={index}>
                                        <Card sx={{ maxWidth: 560 ,height: "280px" }} style={{ padding: "30px", marginBottom: "30px"}} elevation={20} >
                                            
                                            <Avatar 
                                                src={`https://restapinodejs.onrender.com/api/testimonials/photo/${item._id}`}
                                                alt='PHOTO'
                                                sx={{width : 90, height : 90, textAlign: "center" }}
                                                
                                            />
                                            <CardContent sx={{marginTop: "-70px"}}>
                                                <Typography gutterBottom variant="h5" component="div" align='center'>
                                                {item.name} 
                                                </Typography>
                                                <Typography gutterBottom variant="body1" color="text.secondary" align='center' >
                                                   
                                                     {item.position}
                                                </Typography>
                                                <Typography variant="body2" color="text.secondary" align='center' >
                                
                                                     {item.talk}
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

            



        </>



    )
}
