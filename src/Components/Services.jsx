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
import { Container, Grid, Paper } from '@mui/material';
import Loader from '../Common/Loader';

export default function Services() {

    const [services, setServices] = useState([])
    const [load, setLoad] = useState(true)

    const getBlogs = async () => {
        try {
            const response = await axios.get(`https://restapinodejs.onrender.com/api/service`)

            console.log("SERVICES.......", response)
            setServices(response?.data?.data)
            if(response){
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
            {/* <h1 style={{ textAlign: "center", marginTop: "70px" }}>Our Services</h1>
            <div className="container" style={{ marginTop: "70px" }}>
                <div className="row">
                    {
                        services?.map((item, index) => {
                            return (
                                <div key={index}>
                                    <div className="col-md-4">
                                        <div class="card" style={{ width: "20rem" }}>
                                            <div class="card-body">
                                                <h5 class="card-title">ID : {item._id}  </h5>
                                                <h5 class="card-title">Name : {item.name}  </h5>
                                                <h5 class="card-title">Slug : {item.slug}  </h5>
                                                <h5>Details : </h5>
                                                <p class="card-text" dangerouslySetInnerHTML={{ __html: item?.details }}></p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )
                        })
                    }
                </div>
            </div> */}

                {load ?  <div style={{height : "100vh"}}><h1 style={{position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)'}}> <Loader /> </h1></div> : (
                    <> 
                    <Container maxWidth="lg" sx={{ marginTop: "80px" }}>
                <Typography variant='h4' align='center' style={{ marginTop: "50px",fontWeight:"bold"  }}>
                    Our Services
                </Typography>
                <Grid container spacing={5} style={{ marginTop: "20px" }}>
                    {
                        services.map((item, index) => {
                            return (
                                <>
                                    <Grid item xs={12} sm={6} md={4} key={index}>
                                        <Card sx={{ maxWidth: 345,height: "230px" }} style={{ padding: "10px", marginBottom: "30px"}} elevation={20} >
                                            {/* <CardMedia
                                                component="img"
                                                alt="green iguana"
                                                height="140"
                                                image="/static/images/cards/contemplative-reptile.jpg"
                                            /> */}
                                            <CardContent>
                                                <Typography gutterBottom variant="h5" component="div" align='center'>
                                                {item.name} 
                                                </Typography>
                                                <Typography variant="body2" color="text.secondary" dangerouslySetInnerHTML={{ __html: item?.details }} >
                                                    {/* Lizards are a widespread group of squamate reptiles, with over 6,000
                                                    species, ranging across all continents except Antarctica */}
                                                </Typography>
                                            </CardContent>
                                            {/* <CardActions>
                                                <Button size="small">Share</Button>
                                                <Button size="small">Learn More</Button>
                                            </CardActions> */}
                                        </Card>
                                    </Grid>
                                </>
                            )
                        })
                    }


                </Grid>

            </Container>
                    </>
                )}
            
        </>
    )
}
