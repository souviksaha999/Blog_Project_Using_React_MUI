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
import Testimonials from '../Components/Testimonials';

export default function TestimonialsPage() {


    return (
        <>
            <Layout>
               <Testimonials/>
            </Layout>
        </>
    )
}
