import axios from "axios";
import React, { useEffect, useMemo, useState } from "react";
import Layout from "../components/Layout";
import { User } from "../models/user";

const Users = () => {
  const [users, setUsers] = useState<User[] | null>(null);
  const [query, setQuery] = useState<string | null>(null);
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
      <div className="table-responsive">
        <div className="form-group mt-2 mb-2 col-sm-9 col-lg-3 col-md-4 ">
          <input
            type="text"
            className="form-control"
            value={query || ""}
            placeholder="Search user"
            onChange={(e: any) => setQuery(e.target.value)}
          />
        </div>

        <table className="table table-striped table-sm">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">ID</th>
              <th scope="col">Name</th>
              <th scope="col">Email</th>
              <th scope="col">Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredData?.map((user) => (
              <tr key={user?.id}>
                <td>#</td>
                <td>{user?.id}</td>
                <td>
                  {user.first_name} {user.last_name}
                </td>
                <td>{user.email}</td>
                <td>
                  <button className="btn btn-sm btn-primary">Update</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {filteredData && filteredData.length === 0 && (
          <div className="alert alert-primary w-100" role="alert">
            No records found
          </div>
        )}
      </div>
    </Layout>
  );
};

export default Users;
