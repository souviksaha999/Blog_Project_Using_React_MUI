import { AppBar, Container, Toolbar, Stack, Button, Typography, Box, MenuItem, Menu, Avatar, IconButton, Tooltip } from '@mui/material'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import React from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../Context/Auth'
import { toast } from 'react-toastify'
import PhonelinkSharpIcon from '@mui/icons-material/PhonelinkSharp';



export default function Nav() {

  const [auth, setAuth] = useAuth()
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const [anchorElAbout, setAnchorElAbout] = React.useState(null);

  // const settings = ['Profile', 'Account', 'Dashboard', 'Logout'];

  console.log("nav.........", auth)

  const handleLogout = () => {
    setAuth({ ...auth, user: null, token: "" })
    localStorage.removeItem("auth")
    toast.success("Logout Successfully")
  }

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };


  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };
  
  const handleOpenAboutMenu = (event) => {
    setAnchorElAbout(event.currentTarget);
  };
 

  const handleCloseAboutMenu = () => {
    setAnchorElAbout(null);
  };



  return (
    <>
      <Container sx={{ marginBottom: "0px" }} >
        <AppBar position='fixed' style={{backgroundColor : "#1bbd36"}} >
          <Toolbar>
            <PhonelinkSharpIcon fontSize='large' />
            <Typography varient="h1" component="div" sx={{ flexGrow: 1, fontSize: "25px",fontWeight:"bold", marginLeft:"10px" }}>BLOGS</Typography>
            <Stack direction='row' spacing={2}>
              <Button color='inherit' > <Link to='/' style={{ color: 'white' ,textDecoration : "none" }}>Home</Link> </Button>
              
              {
                !auth.user ? (
                  <>
                    <Button color='inherit'> <Link to='/login' style={{ color: 'inherit' ,textDecoration : "none"  }}>Login</Link></Button>
                    <Button color='inherit'> <Link to='/reg' style={{ color: 'inherit' ,textDecoration : "none"  }}>Register</Link></Button>
                  </>
                ) : (
                  <>
                    <Button color='inherit'> <Link to='/allblogs' style={{ color: 'white' ,textDecoration : "none"  }}>Blogs</Link></Button>
                    <Button color='inherit'> <Link to='/allservices' style={{ color: 'white' ,textDecoration : "none"  }}>Services</Link></Button>
                    <Button color='inherit'> <Link to='/allcourses' style={{ color: 'inherit' ,textDecoration : "none"  }}>Courses</Link></Button>

                    <Box sx={{ flexGrow: 0 }}>
                <Tooltip title="Open settings">
                  <IconButton onClick={handleOpenAboutMenu} sx={{ p: 0 ,color: "inherit"}}>
                  <Button color='inherit'> About</Button>
                    <ExpandMoreIcon  sx={{color:"white !important"}} size= 'large' />
                  </IconButton>
                </Tooltip>
                <Menu
                  sx={{ mt: '45px' }}
                  id="menu-appbar"
                  anchorEl={anchorElAbout}
                  anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                  open={Boolean(anchorElAbout)}
                  onClose={handleCloseAboutMenu}
                >
                  <MenuItem onClick={handleCloseAboutMenu}>
                    <Typography textAlign="center">

                    <Button color='inherit'> <Link to='/teams' style={{ color: 'inherit',fontSize:"12px" ,textDecoration : "none"  }}>Teams</Link></Button><br />
                    <Button color='inherit'> <Link to='/testimonials' style={{ color: 'inherit',fontSize:"12px" ,textDecoration : "none"  }}>Testimonials</Link></Button>


                    </Typography>

                    
                  </MenuItem>

                </Menu>
              </Box>

                    <Button color='inherit'> <Link to='/contact' style={{ color: 'inherit'  ,textDecoration : "none" }}>Contact Us</Link></Button>
                    {/* <Button color='inherit'> <Link to='' style={{ color: 'inherit' }}>{auth?.user?.name}</Link></Button>
                    <Button color='inherit'> <Link to='/updatepassword' style={{ color: 'inherit' }}>Update Password</Link></Button>
                    <Button color='inherit' onClick={handleLogout}> <Link to='/login' style={{ color: 'inherit' }}>Log_Out</Link></Button> */}
                    
                    <Box sx={{ flexGrow: 0 }}>
                <Tooltip title="Open settings">
                  <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                    {/* <Avatar alt={auth?.user?.name} src="/static/images/avatar/2.jpg" /> */}
                    <Avatar alt={auth?.user?.name} src={`https://restapinodejs.onrender.com/${auth?.user?.photo}`} />
                    <ExpandMoreIcon  sx={{color:"white !important"}} size= 'large' />
                  </IconButton>
                </Tooltip>
                <Menu
                  sx={{ mt: '45px' }}
                  id="menu-appbar"
                  anchorEl={anchorElUser}
                  anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                  open={Boolean(anchorElUser)}
                  onClose={handleCloseUserMenu}
                >
                  <MenuItem onClick={handleCloseUserMenu}>
                    <Typography textAlign="center">

                      <img src={`https://restapinodejs.onrender.com/${auth?.user?.photo}`} alt="Photo" height="150px"/><br />
                      <Button color='inherit'> <Link to='' style={{ color: 'inherit', fontSize:"12px" ,textDecoration : "none" }}>{auth?.user?.name}</Link></Button><br />
                      <Button color='inherit'> <Link to='/updatepassword' style={{ color: 'inherit', fontSize:"12px" ,textDecoration : "none"   }}>Update Password</Link></Button><br />
                      <Button color='inherit' onClick={handleLogout}> <Link to='/login' style={{ color: 'inherit', fontSize:"12px" ,textDecoration : "none"   }}>Log_Out</Link></Button>

                    </Typography>

                    
                  </MenuItem>

                </Menu>
              </Box>

                  </>
                )
              }

            </Stack>


          </Toolbar>
        </AppBar>
      </Container>
    </>
  )
}
