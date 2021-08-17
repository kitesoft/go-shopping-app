import {
  Button,
  createStyles,
  makeStyles,
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TablePagination,
  TableRow,
} from "@material-ui/core";
import Paper from "@material-ui/core/Paper";
import TableContainer from "@material-ui/core/TableContainer";
import axios from "axios";
import React, { useEffect, useMemo, useState } from "react";
import Layout from "../components/Layout";
import { Product } from "../models/product";
import { Link } from "react-router-dom";
import Alert from "../utils/Alert";

const useStyles = makeStyles(() =>
  createStyles({
    footer: {
      width: "100%",
      textAlign: "center",
    },
    link: {
      textDecoration: "none",
    },
  })
);

const Products = () => {
  const classes = useStyles();
  const [products, setProducts] = useState<Product[] | null>(null);
  const [query, setQuery] = useState<string | null>(null);
  const [page, setPage] = useState<number>(1);
  const [status, setStatus] = useState<string | null>(null);
  const [rowsPerPage, setRowsPerPage] = useState<number>(10);
  useEffect(() => {
    (async () => {
      const { data } = await axios.get("products", {
        withCredentials: true,
      });
      setProducts(data);
    })();
  }, []);

  const filteredData = useMemo(() => {
    if (query) {
      return products?.filter(
        (item) =>
          item.title.toLowerCase().includes(query.toLowerCase()) ||
          item.description.toLowerCase().includes(query.toLowerCase())
      );
    } else {
      return products;
    }
  }, [query, products]);

  const deleteProduct = async (id: number) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      const { data } = await axios.delete(`product/${id}`, {
        withCredentials: true,
      });
      if (data?.StatusCode === 200) {
        setStatus(data?.message);
      }
      setTimeout(() => {
        setStatus(null);
      }, 2000);
      setProducts(products?.filter((p) => p.id !== id) || products);
    }
  };
  return (
    <Layout>
      <h2>Users</h2>
      <div className="form-group mt-2 mb-2 col-sm-9 col-lg-3 col-md-4 ">
        <input
          type="text"
          className="form-control"
          value={query || ""}
          placeholder="Search product"
          onChange={(e: any) => setQuery(e.target.value)}
        />
      </div>
      {status && <Alert severity="success">{status}</Alert>}
      <Link to="/products/new" className={classes.link}>
        {" "}
        <Button color="primary" variant="contained">
          Add New
        </Button>
      </Link>
      <TableContainer component={Paper}>
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell>#</TableCell>
              <TableCell>ID</TableCell>
              <TableCell>Image</TableCell>
              <TableCell>Title</TableCell>
              <TableCell>Description</TableCell>
              <TableCell>Price</TableCell>
              <TableCell>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredData
              ?.slice(page * rowsPerPage, (page + 1) * rowsPerPage)
              .map((product) => (
                <TableRow key={product?.id}>
                  <TableCell>#</TableCell>
                  <TableCell>{product?.id}</TableCell>
                  <TableCell>
                    <img
                      src={product?.image}
                      alt={product?.title}
                      width={50}
                      height={50}
                    />
                  </TableCell>
                  <TableCell>
                    {product.title} {product.title}
                  </TableCell>
                  <TableCell>{product.description}</TableCell>
                  <TableCell>{product.price}</TableCell>
                  <TableCell>
                    <Button
                      onClick={() =>
                        deleteProduct(product?.id ? product?.id : 0)
                      }
                      color="secondary"
                      variant="contained"
                    >
                      Delete
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
          <TableFooter className={classes.footer}>
            <TablePagination
              count={filteredData?.length || 0}
              page={page}
              onPageChange={(e: any, newPage: number) => setPage(newPage)}
              rowsPerPage={rowsPerPage}
              onRowsPerPageChange={(e: any) => {
                setRowsPerPage(e.target.value);
                setPage(1);
              }}
              className={classes.footer}
              rowsPerPageOptions={[]}
            />
          </TableFooter>
        </Table>
      </TableContainer>
      {filteredData && filteredData.length === 0 && (
        <Alert severity="info">No records found</Alert>
      )}
    </Layout>
  );
};

export default Products;
