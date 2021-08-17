import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
} from "@material-ui/core";
import Paper from "@material-ui/core/Paper";
import TableContainer from "@material-ui/core/TableContainer";
import axios from "axios";
import React, { useEffect, useMemo, useState } from "react";
import Layout from "../components/Layout";
import { Link } from "../models/link";
import MuiAlert, { AlertProps } from "@material-ui/lab/Alert";

function Alert(props: AlertProps) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const Links = (props: any) => {
  const [links, setUsers] = useState<Link[] | null>(null);
  const [query, setQuery] = useState<string | null>(null);
  const [page, setPage] = useState<number>(1);
  const [rowsPerPage, setRowsPerPage] = useState<number>(10);
  useEffect(() => {
    (async () => {
      const { data } = await axios.get(`users/${props.match.params.id}/links`, {
        withCredentials: true,
      });
      setUsers(data);
    })();
  }, [props.match.params.id]);

  const filteredData = useMemo(() => {
    if (query) {
      return links?.filter(
        (item) => item.id === parseInt(query) || item.code === parseInt(query)
      );
    } else {
      return links;
    }
  }, [query, links]);

  return (
    <Layout>
      <h2>Links</h2>
      <div className="form-group mt-2 mb-2 col-sm-9 col-lg-3 col-md-4 ">
        <input
          type="text"
          className="form-control"
          value={query || ""}
          placeholder="Search link"
          onChange={(e: any) => setQuery(e.target.value)}
        />
      </div>
      <TableContainer component={Paper}>
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell>#</TableCell>
              <TableCell>ID</TableCell>
              <TableCell>Code</TableCell>
              <TableCell>Orders</TableCell>
              <TableCell>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredData
              ?.slice(page * rowsPerPage, (page + 1) * rowsPerPage)
              .map((link) => (
                <TableRow key={link?.id}>
                  <TableCell>#</TableCell>
                  <TableCell>{link?.id}</TableCell>
                  <TableCell>{link.code}</TableCell>
                  <TableCell>{link?.orders?.length}</TableCell>
                  <TableCell></TableCell>
                </TableRow>
              ))}
          </TableBody>
          <TablePagination
            component="div"
            count={filteredData?.length || 0}
            page={1}
            onPageChange={(e: any, newPage: number) => setPage(newPage)}
            rowsPerPage={rowsPerPage}
            onRowsPerPageChange={(e: any) => {
              setRowsPerPage(e.target.value);
              setPage(1);
            }}
            rowsPerPageOptions={[1, 2]}
          />
        </Table>
      </TableContainer>
      {filteredData && filteredData.length === 0 && (
        <Alert severity="info">No records found</Alert>
      )}
    </Layout>
  );
};

export default Links;
