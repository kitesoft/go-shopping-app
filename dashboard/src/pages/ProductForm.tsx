import { Button, TextareaAutosize, TextField } from "@material-ui/core";
import { Alert } from "@material-ui/lab";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import Layout from "../components/Layout";
import { Product } from "../models/product";
import history from "../components/history";

const ProductForm = (props: any) => {
  const [product, setData] = useState<Product>({
    title: "",
    description: "",
    image: "",
    price: "",
  });
  const [status, setStatus] = useState<string | null>(null);
  const productId = props.match.params.productId;

  useEffect(() => {
    if (productId) {
      (async () => {
        const { data } = await axios.get(`product/${productId}`, {
          withCredentials: true,
        });
        setData({
          id: data?.id,
          title: data?.title,
          description: data?.description,
          image: data?.image,
          price: data?.price,
        });
      })();
    }
  }, [productId]);

  const onChange = (e: any) => {
    setData({
      ...product,
      [e.target.name]: e.target.value,
    });
  };

  const onSubmit = async () => {
    const { data } = await (!productId ? axios.post : axios.put)(
      !productId ? "product" : `product/${productId}`,
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
      setStatus(data?.message || "success");
    }
    setTimeout(() => {
      setStatus(null);
      history.push("/products");
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
            required
            value={product.title || ""}
            onChange={onChange}
          />
        </div>
        <div className="mb-3">
          <TextareaAutosize
            minRows={4}
            placeholder="Description"
            name="description"
            required
            value={product.description || ""}
            onChange={onChange}
          />
        </div>
        <div className="mb-3">
          <TextField
            label="Image"
            name="image"
            required
            value={product.image || ""}
            onChange={onChange}
          />
        </div>
        <div className="mb-3">
          <TextField
            label="Price"
            type="number"
            required
            name="price"
            value={product.price || ""}
            onChange={onChange}
          />
        </div>
        <Button variant="contained" color="primary" type="submit">
          {!productId ? " Submit" : "update"}
        </Button>
      </form>
    </Layout>
  );
};

export default ProductForm;
