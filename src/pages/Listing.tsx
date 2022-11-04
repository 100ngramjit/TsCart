import {
  Box,
  Container,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Pagination,
  Select,
  SelectChangeEvent,
  Skeleton,
  Typography,
} from "@mui/material";
import ListingCard from "components/ListingCard";
import { ChangeEvent, useEffect, useState } from "react";
import { getProducts, getProductsInSortedOrder } from "services/apiService";

const Listing = () => {
  const [page, setPage] = useState(1);
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const sortProducts = async (order: string) => {
    try {
      setIsLoading(true);
      const response = await getProductsInSortedOrder(order, page);
      setProducts(response.data);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  const handleChange = (e: SelectChangeEvent) => {
    if (e.target.value === "asc") {
      sortProducts("asc");
    } else if (e.target.value === "desc") {
      sortProducts("desc");
    }
  };

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
        <FormControl
          variant="standard"
          sx={{ m: 2, minWidth: 150 }}
          size="small"
        >
          <InputLabel id="sort">Sort By</InputLabel>
          <Select
            labelId="sort"
            id="sortby"
            defaultValue=""
            onChange={handleChange}
          >
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            <MenuItem value={"asc"}>price low to high</MenuItem>
            <MenuItem value={"desc"}>price high to low</MenuItem>
          </Select>
        </FormControl>
      </Box>
      <Grid container justifyContent="space-evenly">
        {!isLoading ? (
          products.length === 0 ? (
            <div>no products found</div>
          ) : (
            products.map((product: any) => (
              <ListingCard product={product} key={product.id} />
            ))
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
