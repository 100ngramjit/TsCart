import {
  Box,
  Container,
  Grid,
  Pagination,
  Skeleton,
  Typography,
} from "@mui/material";
import { ChangeEvent, useEffect, useState } from "react";
import { getProducts } from "services/apiService";

const Listing = () => {
  const [page, setPage] = useState(1);
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const getProductsList = async () => {
      try {
        const response = await getProducts(page);
        setProducts(response.data);
        setIsLoading(false);
      } catch (error) {
        console.log(error);
      }
    };
    getProductsList();
  }, [page]);

  return (
    <Container>
      <Box display="flex" sx={{ justifyContent: "space-between" }}>
        <Typography variant="h3" sx={{ m: 2 }}>
          Products
        </Typography>
      </Box>
      <Grid container justifyContent="space-evenly">
        {!isLoading ? (
          products.length === 0 ? (
            <div>no products found</div>
          ) : (
            products.map((product: any) => <div />)
          )
        ) : (
          [...Array(3)].map((e, i) => (
            <Skeleton height={350} key={i} animation="wave" width={350} />
          ))
        )}
      </Grid>
      <Box display="flex" justifyContent="center">
        <Pagination
          count={3}
          color="primary"
          onChange={(event: ChangeEvent<unknown>, value) => setPage(value)}
          page={page}
          size="large"
          variant="outlined"
        />
      </Box>
    </Container>
  );
};

export default Listing;
