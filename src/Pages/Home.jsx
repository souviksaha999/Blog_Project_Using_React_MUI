import React, { useEffect, useState } from 'react'
import Layout from '../Common/Layout'
import axios from 'axios'
import Services from '../Components/Services'
import Testimonials from '../Components/Testimonials'
import Teams from '../Components/Teams'
import Loader from '../Common/Loader'

export default function Home() {

  const [banner, setBanner] = useState([])
  const [banPic, setBanPic] = useState()
  const [load, setLoad] = useState(true)

  const getBanner = async () => {
    const response = await axios.get(`https://restapinodejs.onrender.com/api/banner`)
    console.log("Banner.........", response)
    setBanner(response?.data?.bannerdata)
    if (response) {
      setLoad(false)
    }
  }



  useEffect(() => {
    getBanner();
  }, [])

  // console.log(banner)
  return (
    <>
      <Layout>

      {load ?  <div style={{height : "70vh"}}><h1 style={{position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)'}}> <Loader /></h1></div> : (
        <>
        <div className="container-fluid" style={{ marginTop: "70px" }}>
          {/* <h1>Home................</h1> */}

          {/* {
            banner.map((item) => {
              return (
                <>
                  <img src={`https://restapinodejs.onrender.com/api/banner/photo/${item._id}`} alt="PHOTO" />
                  <h3>Title : </h3>
                  <p>{item.title}</p>
                </>
              )
            })
          } */}

          <div id="carouselExampleCaptions" class="carousel slide" data-ride="carousel">
            <ol class="carousel-indicators">
              <li data-target="#carouselExampleCaptions" data-slide-to="0" class="active"></li>
              <li data-target="#carouselExampleCaptions" data-slide-to="1"></li>
              <li data-target="#carouselExampleCaptions" data-slide-to="2"></li>
            </ol>
            <div class="carousel-inner">
              {
                banner.map((item, index) => {
                  return (
                    <>
                      <div key={index} class={`carousel-item ${index === 0 ? 'active' : '' }`}>
                        <img src={`https://restapinodejs.onrender.com/api/banner/photo/${item._id}`} class="d-block w-100" alt="..." height="800px" />
                        <div class="carousel-caption d-none d-md-block">
                          <h3 style={index===2 ? {color: "black"} : {color: "white"} }>Title</h3>
                          <h5 style={index===2 ? {color: "black"} : {color: "white"} }>{item.title}</h5>
                        </div>
                      </div>
                    </>
                  )
                })
              }



            </div>
            <button class="carousel-control-prev" type="button" data-target="#carouselExampleCaptions" data-slide="prev">
              <span class="carousel-control-prev-icon" aria-hidden="true"></span>
              <span class="sr-only">Previous</span>
            </button>
            <button class="carousel-control-next" type="button" data-target="#carouselExampleCaptions" data-slide="next">
              <span class="carousel-control-next-icon" aria-hidden="true"></span>
              <span class="sr-only">Next</span>
            </button>
          </div>
        </div>

        {/* ************ SERVICES ************ */}

        <Services />

        {/* ************ Teams ************ */}

        <Teams />

        {/* ************ Testimonials ************ */}

        <Testimonials />
        </>
      ) }
        

        
      </Layout>
    </>
  )
}
