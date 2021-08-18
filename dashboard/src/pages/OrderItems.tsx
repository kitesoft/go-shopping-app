import {
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Button,
  Theme,
  Popover,
  createStyles,
  makeStyles,
  Divider,
} from "@material-ui/core";
import React from "react";
import { Link } from "react-router-dom";
import { OrderItems } from "../models/order";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    popover: {
      pointerEvents: "none",
    },
    paper: {
      padding: theme.spacing(1),
      backgroundColor: "#e3e1da",
    },
    total: {
      float: "right",
    },
  })
);

type Props = {
  total: string;
  active: number | null;
  orderId: number;
  data: OrderItems[];
  open: boolean;
  anchorEl: any;
  handlePopoverClose: () => void;
};
const OrderItem: React.FC<Props> = ({
  total,
  active,
  orderId,
  data,
  open,
  anchorEl,
  handlePopoverClose,
}: Props) => {
  const classes = useStyles();

  return (
    <Popover
      id="mouse-over-popover"
      className={classes.popover}
      classes={{
        paper: classes.paper,
      }}
      open={open && active !== null && active === orderId}
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "left",
      }}
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      onClose={handlePopoverClose}
      disableRestoreFocus
    >
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>#</TableCell>
            <TableCell>Order ID</TableCell>
            <TableCell>Admin Revenue</TableCell>
            <TableCell>Ambassandor Revenue</TableCell>
            <TableCell>Price</TableCell>
            <TableCell>Product</TableCell>
            <TableCell>Quantity</TableCell>
            <TableCell>Total</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data?.map((orderItem) => (
            <TableRow key={orderItem?.id}>
              <TableCell>#</TableCell>
              <TableCell>{orderItem?.order_id}</TableCell>
              <TableCell>{orderItem?.admin_revenue.toFixed(2)}</TableCell>
              <TableCell>{orderItem.ambassodar_revenue.toFixed(2)}</TableCell>
              <TableCell>{orderItem.price.toFixed(2)}</TableCell>
              <TableCell>{orderItem.product_title}</TableCell>
              <TableCell>{orderItem.quantity}</TableCell>
              <TableCell>
                {(orderItem.quantity * orderItem.price).toFixed(2)}
              </TableCell>
            </TableRow>
          ))}
          <Divider />
          <TableRow className={classes.total}>
            <TableCell colSpan={3}>Total</TableCell>
            <TableCell colSpan={4}>{total}</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </Popover>
  );
};
export default OrderItem;
