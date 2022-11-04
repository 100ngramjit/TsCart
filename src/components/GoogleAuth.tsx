import { Logout } from "@mui/icons-material";
import {
  Box,
  Avatar,
  Button,
  IconButton,
  Menu,
  MenuItem,
  ListItemIcon,
} from "@mui/material";
import { AuthContext } from "context/AuthContext";
import { gapi } from "gapi-script";
import { useContext, useEffect, useState } from "react";
import {
  GoogleLoginResponseOffline,
  GoogleLoginResponse,
  GoogleLogout,
  GoogleLogin,
} from "react-google-login";

const GoogleAuth = () => {
  const authContext = useContext(AuthContext);
  const clientId = process.env.REACT_APP_GOOGLE_AUTH_CLIENT_ID as string;
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const onSuccess = (res: GoogleLoginResponseOffline | GoogleLoginResponse) => {
    if ("profileObj" in res) {
      authContext?.setProfile?.(res.profileObj);
    }
  };

  const onFailure = (err: any) => {
    console.log("failed", err);
  };

  const logOut = () => {
    authContext?.setProfile?.({ givenName: "", imageUrl: "" });
  };

  useEffect(() => {
    const initClient = () => {
      try {
        gapi.auth2.init({
          clientId: clientId,
          scope: "",
        });
      } catch (err: any) {
        console.log(err);
      }
    };
    gapi.load("client:auth2", initClient);
  });

  return <></>;
};

export default GoogleAuth;
