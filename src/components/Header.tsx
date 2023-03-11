import { Toolbar, Typography, Switch, IconButton, Badge } from "@mui/material";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { useNavigate } from "react-router-dom";
import { CartContext } from "context/CartContext";
import { useContext, useState, useEffect } from "react";
import { retrieveCart } from "services/apiService";
import GoogleAuth from "./GoogleAuth";

const Header = (props: { changeTheme: any; mode: any }) => {
  const cartContext = useContext(CartContext);
  const [totalCount, setTotalCount] = useState(0);
  const { changeTheme, mode } = props;
  const nav = useNavigate();

  useEffect(() => {
    const getCart = async () => {
      try {
        const response = await retrieveCart();
        setTotalCount(response.total_items);
      } catch (error) {
        console.log(error);
      }
    };
    getCart();
  }, [cartContext.trigger]);

  return (
    <Toolbar>
      <Typography variant="h4" onClick={() => nav("/")} sx={{ flexGrow: 1 }}>
        TsCart
      </Typography>

      <GoogleAuth />
      <Switch
        onChange={changeTheme}
        checked={mode === "light" ? false : true}
        color="secondary"
      />
      <Typography variant="h6" sx={{ mr: 1 }}>
        {mode === "light" ? "light" : "dark"} mode enabled
      </Typography>
      <IconButton onClick={() => nav("cart")}>
        <Badge badgeContent={totalCount} color="secondary">
          <ShoppingCartIcon />
        </Badge>
      </IconButton>
    </Toolbar>
  );
};

export default Header;
