import {
  Toolbar,
  Typography,
  IconButton,
  Badge,
  FormControlLabel,
} from "@mui/material";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { useNavigate } from "react-router-dom";
import { CartContext } from "context/CartContext";
import { useContext, useState, useEffect } from "react";
import { retrieveCart } from "services/apiService";
import GoogleAuth from "./GoogleAuth";
import { MaterialUISwitch } from "./MUIstyledSwitch";

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

      <FormControlLabel
        value="top"
        control={
          <MaterialUISwitch
            size="small"
            onChange={changeTheme}
            checked={mode !== "light"}
          />
        }
        label={mode === "light" ? "light mode" : "dark mode"}
        labelPlacement="top"
      />
      <GoogleAuth />
      <IconButton onClick={() => nav("cart")}>
        <Badge badgeContent={totalCount} color="secondary">
          <ShoppingCartIcon />
        </Badge>
      </IconButton>
    </Toolbar>
  );
};

export default Header;
