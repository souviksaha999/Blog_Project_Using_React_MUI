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

export default function Teams() {

    const [teams, setTeams] = useState([])
    const [load, setLoad] = useState(true)

    const getBlogs = async () => {
        try {
            const response = await axios.get(`https://restapinodejs.onrender.com/api/team`)

            console.log("TEAM...........", response)
            setTeams(response?.data?.TeamMember)
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

            {/* <h1 style={{ textAlign: "center", marginTop: "20px" }}>Our Teams</h1>
            <div className="container" style={{ marginTop: "70px" }}>
                <div className="row">
                    {
                        teams?.map((item, index) => {
                            return (
                                <div key={index}>
                                    <div className="col-md-4">
                                        <div className="container"><div class="card" style={{ width: "20rem" }}>
                                            <div class="card-body">
                                                <img src={`https://restapinodejs.onrender.com/api/team/photo/${item._id}`} alt="Photo" height="180px" />
                                                <h5 class="card-title">ID : {item._id}  </h5>
                                                <h5 class="card-title">Name : {item.name}  </h5>
                                                <h5 class="card-title">Slug : {item.slug}  </h5>
                                                <h5 class="card-title">Possession : {item.possession}  </h5>

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

{load ?  <div style={{height : "70vh"}}><h1 style={{position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)'}}> <Loader /></h1> </div>: (
    <>
<Container maxWidth="lg" sx={{ marginTop: "80px" }}>
                <Typography variant='h4' align='center' style={{ marginTop: "50px",fontWeight:"bold"  }}>
                    Our Team
                </Typography>
                <Grid container spacing={2} style={{ marginTop: "20px" }}>
                    {
                        teams.map((item, index) => {
                            return (
                                <>
                                    <Grid item xs={12} sm={6} md={4} key={index}>
                                        <Card sx={{ maxWidth: 345,height: "auto" }} style={{ padding: "0px", marginBottom: "30px"}} elevation={20} >
                                            <CardMedia
                                                component="img"
                                                alt="PHOTO"
                                                height="auto"
                                                image={`https://restapinodejs.onrender.com/api/team/photo/${item._id}`}
                                                style={{borderRadius:"12px"}}
                                            />
                                            <CardContent>
                                                <Typography gutterBottom variant="h5" component="div" align='center'>
                                                {item.name} 
                                                </Typography>
                                                <Typography variant="body2" color="text.secondary" align='center' >
                                                   
                                                     {item.possession}
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
