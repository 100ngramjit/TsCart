import { Toolbar, Typography, Switch, IconButton, Badge } from "@mui/material";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { CartContext } from "context/CartContext";
import { useContext, useState, useEffect } from "react";
import { retrieveCart } from "services/apiService";

const Header = (props: { changeTheme: any; mode: any }) => {
  const cartContext = useContext(CartContext);
  const [totalCount, setTotalCount] = useState(0);
  const { changeTheme, mode } = props;

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
      <Typography variant="h4" sx={{ flexGrow: 1 }}>
        Header
      </Typography>

      <Switch
        onChange={changeTheme}
        checked={mode === "light" ? false : true}
        color="secondary"
      />
      <Typography variant="h6" sx={{ mr: 1 }}>
        {mode === "light" ? "light" : "dark"} mode enabled
      </Typography>

      <Badge badgeContent={totalCount} color="secondary">
        <ShoppingCartIcon />
      </Badge>
    </Toolbar>
  );
};

export default Header;
