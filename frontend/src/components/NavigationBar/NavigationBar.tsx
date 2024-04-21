import React, { useState } from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import Button from "@mui/material/Button";
import MenuIcon from "@mui/icons-material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import { useNavigate } from "react-router-dom";
import { styled } from '@mui/material/styles';
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";

const Offset = styled('div')(({ theme }) => theme.mixins.toolbar);

const SiteHeader = ({ }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  
  const navigate = useNavigate();

  let username = sessionStorage.getItem("username")

  const logout = () => {
    sessionStorage.removeItem("username")
    navigate("/", { replace: true })
  }

  const menuOptions = [
    { label: "Home", path: "/" },
    { label: "Upload", path: "/ImageUpload" },
    { label: "Webcam", path: "/webcamUpload" },
    { label: "Sign in", path: "/signin" },
  ];

  const menuOptionsUser = [
    { label: "Home", path: "/" },
    { label: "Upload", path: "/ImageUpload" },
    { label: "Webcam", path: "/webcamUpload" },
    { label: "History", path: "/history" },
  ]
 
  const handleMenuSelect = (pageURL: string) => {
    navigate(pageURL, { replace: true });
  };

  const handleMenu = (event: any) => {
    setAnchorEl(event.currentTarget);
  };

  return (
    <>
      <AppBar position="fixed" sx={{ background: "#f2f2f2", color: "#092d66"}}>
        <Toolbar>
          
            {isMobile ? (
              <>
              <Typography variant="h4" sx={{ paddingLeft: 1, paddingRight: 4 }}>DBI</Typography>
                <IconButton
                  aria-label="menu"
                  aria-controls="menu-appbar"
                  aria-haspopup="true"
                  onClick={handleMenu}
                  color="inherit"
                >
                  <MenuIcon />
                </IconButton>
                <Menu
                  id="menu-appbar"
                  anchorEl={anchorEl}
                  anchorOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                  open={open}
                  onClose={() => setAnchorEl(null)}
                >
                  {(username ? menuOptionsUser : menuOptions).map((opt) => (
                    <MenuItem
                      key={opt.label}
                      onClick={() => handleMenuSelect(opt.path)}
                    >
                      {opt.label}
                    </MenuItem>
                  ))}
                </Menu>
              </>
            ) : (
              <>
              <Typography variant="h4" sx={{ paddingLeft: '12.5%', paddingRight: 4 }}>DBI </Typography>
                {(username ? menuOptionsUser : menuOptions).map((opt) => (
                  <Button
                    sx={{
                      "&:hover": {
                        color: '#1183ed'
                      }
                    }}
                    key={opt.label}
                    color="inherit"
                    onClick={() => handleMenuSelect(opt.path)}
                  >
                    {opt.label}
                  </Button>
                ))}
                {username ? (<Button 
                sx={{
                  "&:hover": {
                    color: '#1183ed'
                  },
                  color: "#092d66"
                }}
                onClick={logout}>Log Out</Button>) : null}
              </>
            )}
            <Typography sx={{ ml: 'auto', paddingRight: '13.5%' }}>{username}</Typography>
        </Toolbar>
      </AppBar>
      <Offset />
    </>
  );
};

export default SiteHeader;