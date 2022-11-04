import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  Button,
} from "@mui/material";
import { CartContext } from "context/CartContext";
import { useContext, useState } from "react";
import { addToCart } from "services/apiService";

const ListingCard = ({ product }: any) => {
  const cartContext = useContext(CartContext);
  const [isLoading, setIsLoading] = useState(false);

  const addToCartHandler = async (id: any, qty: any) => {
    try {
      setIsLoading(true);
      await addToCart(id, qty);
      setIsLoading(false);
      cartContext?.toggleTrigger?.();
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Card key={product.id} elevation={20} sx={{ width: 350, mb: 3 }}>
      <CardMedia
        component="img"
        image={product.image.url}
        alt={product.title}
        sx={{ height: 140 }}
      />
      <CardContent>
        <Typography variant="h5">{product.name}</Typography>
        <Typography variant="subtitle2" color="text.secondary">
          5⭐
        </Typography>
        <Typography gutterBottom>Rs {product.price.raw} (10% off)</Typography>
        <Button
          size="small"
          variant="contained"
          disabled={isLoading}
          onClick={() => addToCartHandler(product.id, 1)}
        >
          Add To Cart
        </Button>
      </CardContent>
    </Card>
  );
};

export default ListingCard;
