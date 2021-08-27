import {
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
import { User } from "../models/user";
import MuiAlert, { AlertProps } from "@material-ui/lab/Alert";
import { Link } from "react-router-dom";

function Alert(props: AlertProps) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const Users = () => {
  const [users, setUsers] = useState<User[] | null>(null);
  const [query, setQuery] = useState<string | null>(null);
  const [page, setPage] = useState<number>(1);
  const [rowsPerPage, setRowsPerPage] = useState<number>(10);

  useEffect(() => {
    (async () => {
      const { data } = await axios.get("ambassadors", {
        withCredentials: true,
      });
      setUsers(data);
    })();
  }, []);

  const filteredData = useMemo(() => {
    if (query) {
      return users?.filter(
        (item) =>
          item.first_name.toLowerCase().includes(query.toLowerCase()) ||
          item.last_name.toLowerCase().includes(query.toLowerCase()) ||
          item.email.toLowerCase().includes(query.toLowerCase()) ||
          null
      );
    } else {
      return users;
    }
  }, [query, users]);

  return (
    <Layout>
      <h2>Users</h2>
      <div className="form-group mt-2 mb-2 col-sm-9 col-lg-3 col-md-4 ">
        <input
          type="text"
          className="form-control"
          value={query || ""}
          placeholder="Search user"
          onChange={(e: any) => setQuery(e.target.value)}
        />
      </div>

      {filteredData && filteredData.length === 0 ? (
        <TableContainer component={Paper}>
          <Table size="small">
            <TableHead>
              <TableRow>
                <TableCell>#</TableCell>
                <TableCell>ID</TableCell>
                <TableCell>Name</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredData
                ?.slice(page * rowsPerPage, (page + 1) * rowsPerPage)
                .map((user) => (
                  <TableRow key={user?.id}>
                    <TableCell>#</TableCell>
                    <TableCell>{user?.id}</TableCell>
                    <TableCell>
                      {user.first_name} {user.last_name}
                    </TableCell>
                    <TableCell>{user.email}</TableCell>
                    <TableCell>
                      <Link to={`users/${user.id}/links`}>view</Link>
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
            <TableFooter>
              <TablePagination
                component="div"
                count={filteredData?.length || 0}
                page={page}
                onPageChange={(e: any, newPage: number) => setPage(newPage)}
                rowsPerPage={rowsPerPage}
                onRowsPerPageChange={(e: any) => {
                  setRowsPerPage(e.target.value);
                  setPage(1);
                }}
                rowsPerPageOptions={[]}
              />
            </TableFooter>
          </Table>
        </TableContainer>
      ) : (
        <Alert severity="info">No records found</Alert>
      )}
    </Layout>
  );
};

export default Users;
