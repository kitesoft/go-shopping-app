import { Button, TextField } from "@material-ui/core";
import { Alert } from "@material-ui/lab";
import axios from "axios";
import React, { useState } from "react";
import Layout from "../components/Layout";
import { Product } from "../models/product";

const ProductForm = () => {
  const [product, setData] = useState<Product>({
    title: "",
    description: "",
    image: "",
    price: "",
  });
  const [status, setStatus] = useState<string | null>(null);

  const onChange = (e: any) => {
    setData({
      ...product,
      [e.target.name]: e.target.value,
    });
  };

  const onSubmit = async () => {
    const { data } = await axios.post(
      "product",
      {
        title: product.title,
        description: product.description,
        image: product.image,
        price: parseFloat(product.price),
      },
      {
        withCredentials: true,
      }
    );
    if (data?.StatusCode === 200) {
      setStatus(data?.message);
    }
    setTimeout(() => {
      setStatus(null);
    }, 2000);
  };

  return (
    <Layout>
      <form
        className="mt-3"
        onSubmit={(event) => {
          onSubmit();
          event?.preventDefault();
        }}
      >
        {status && <Alert severity="success">{status}</Alert>}
        <div className="mb-3">
          <TextField
            label="Title"
            name="title"
            value={product.title || ""}
            onChange={onChange}
          />
        </div>
        <div className="mb-3">
          <TextField
            label="Description"
            name="description"
            value={product.description || ""}
            onChange={onChange}
          />
        </div>
        <div className="mb-3">
          <TextField
            label="Image"
            name="image"
            value={product.image || ""}
            onChange={onChange}
          />
        </div>
        <div className="mb-3">
          <TextField
            label="Price"
            type="number"
            name="price"
            value={product.price || ""}
            onChange={onChange}
          />
        </div>
        <Button variant="contained" color="primary" type="submit">
          Submit
        </Button>
      </form>
    </Layout>
  );
};

export default ProductForm;
