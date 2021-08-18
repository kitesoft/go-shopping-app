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
  Theme,
  Typography,
} from "@material-ui/core";
import Paper from "@material-ui/core/Paper";
import TableContainer from "@material-ui/core/TableContainer";
import axios from "axios";
import React, { useEffect, useMemo, useState } from "react";
import Layout from "../components/Layout";
import { Order } from "../models/order";
import { Link } from "react-router-dom";
import Alert from "../utils/Alert";
import OrderItem from "./OrderItems";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    footer: {
      width: "100%",
      textAlign: "center",
    },
    link: {
      textDecoration: "none",
    },
    view: {
      cursor: "pointer",
      padding: theme.spacing(1),
      "&:hover": {
        backgroundColor: "#e3e1da",
      },
    },
  })
);

const Orders = () => {
  const classes = useStyles();
  const [orders, setOrders] = useState<Order[] | null>(null);
  const [query, setQuery] = useState<string | null>(null);
  const [page, setPage] = useState<number>(1);
  const [status, setStatus] = useState<string | null>(null);
  const [activeOrder, setActiveOrder] = useState<number | null>(null);
  const [rowsPerPage, setRowsPerPage] = useState<number>(10);
  useEffect(() => {
    (async () => {
      const { data } = await axios.get("orders", {
        withCredentials: true,
      });
      setOrders(data);
    })();
  }, []);

  const filteredData = useMemo(() => {
    if (query) {
      return orders?.filter(
        (item) =>
          item.name.toLowerCase().includes(query.toLowerCase()) ||
          item.email.toLowerCase().includes(query.toLowerCase())
      );
    } else {
      return orders;
    }
  }, [query, orders]);

  const [anchorEl, setAnchorEl] = React.useState<HTMLElement | null>(null);
  const open = Boolean(anchorEl);

  const handlePopoverOpen = (
    event: React.MouseEvent<HTMLElement, MouseEvent>,
    id: any
  ) => {
    setAnchorEl(event.currentTarget);
    setActiveOrder(id);
  };

  const handlePopoverClose = () => {
    setAnchorEl(null);
    setActiveOrder(null);
  };

  return (
    <Layout>
      <h2>Orders</h2>
      <div className="form-group mt-2 mb-2 col-sm-9 col-lg-3 col-md-4 ">
        <input
          type="text"
          className="form-control"
          value={query || ""}
          placeholder="Search order"
          onChange={(e: any) => setQuery(e.target.value)}
        />
      </div>
      {status && <Alert severity="success">{status}</Alert>}
      <Link to="/orders/new" className={classes.link}>
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
              <TableCell>Transaction ID</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Ambassandor Email</TableCell>
              <TableCell>Country</TableCell>
              <TableCell>City</TableCell>
              <TableCell>Total</TableCell>
              <TableCell>Order Items</TableCell>
              <TableCell>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredData
              ?.slice(page * rowsPerPage, (page + 1) * rowsPerPage)
              .map((order) => (
                <TableRow key={order?.id}>
                  <TableCell>#</TableCell>
                  <TableCell>{order?.id}</TableCell>
                  <TableCell>{order?.transaction_id}</TableCell>
                  <TableCell>{order.name}</TableCell>
                  <TableCell>{order.email}</TableCell>
                  <TableCell>{order.ambassador_email}</TableCell>
                  <TableCell>{order.country}</TableCell>
                  <TableCell>{order.city}</TableCell>
                  <TableCell>{order.total.toFixed(2)}</TableCell>
                  <TableCell>
                    <Typography
                      aria-owns={open ? "mouse-over-popover" : undefined}
                      aria-haspopup="true"
                      className={classes.view}
                      onMouseEnter={(
                        e: React.MouseEvent<HTMLElement, MouseEvent>
                      ) => handlePopoverOpen(e, order?.id)}
                      onMouseLeave={handlePopoverClose}
                    >
                      View
                    </Typography>
                    <OrderItem
                      total={order.total.toFixed(2)}
                      orderId={order?.id}
                      active={activeOrder}
                      data={order?.order_item}
                      open={open}
                      anchorEl={anchorEl}
                      handlePopoverClose={handlePopoverClose}
                    />
                  </TableCell>
                  <TableCell>
                    <Link to={`/orders/update/${order?.id}`}>
                      <Button color="primary" variant="contained">
                        Update
                      </Button>
                    </Link>
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

export default Orders;
