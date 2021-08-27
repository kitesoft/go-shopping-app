import { Button, Divider, TextField } from "@material-ui/core";
import axios from "axios";
import React, { useEffect, useState } from "react";
import Layout from "../components/Layout";
import { AuthUser, User } from "../models/user";
import Alert from "../utils/Alert";
import history from "../components/history";
import { useSelector } from "react-redux";
import { RootState } from "../redux/configureStore";

const Profile = () => {
  const [personalDetails, setPersonalDetails] = useState<User>({
    first_name: "",
    last_name: "",
    email: "",
  });
  const [infoSuccess, setInfoSuccess] = useState<string | null>(null);
  const [passwordSuccess, sePasswordSuccess] = useState<string | null>(null);
  const user = useSelector((state: RootState) => state.user);

  useEffect(() => {
    (async () => {
      if (user.isAuthenticated) {
        setPersonalDetails({
          first_name: user?.currentUser?.first_name || "",
          last_name: user?.currentUser?.last_name || "",
          email: user?.currentUser?.email||'',
        });
      }
    })();
  }, [user]);

  const [authKeys, setAuthKeys] = useState<AuthUser>({
    password: "",
    confirm_password: "",
  });

  const onChange = (e: any) => {
    setPersonalDetails({
      ...personalDetails,
      [e.target.name]: e.target.value,
    });
  };
  const onChangeAuthKeys = (e: any) => {
    setAuthKeys({
      ...authKeys,
      [e.target.name]: e.target.value,
    });
  };

  const onUpdateInfo = async (e: any) => {
    e.preventDefault();
    const { data } = await axios.put("update", personalDetails, {
      withCredentials: true,
    });
    if (data.StatusCode === 200) {
      setInfoSuccess("Successfully updated");
      setTimeout(() => {
        setInfoSuccess(null);
      }, 2000);
    }
  };

  const onUpdatePassword = async (e: any) => {
    e.preventDefault();
    const { data } = await axios.put("update-password", authKeys, {
      withCredentials: true,
    });
    if (data.StatusCode === 200) {
      setInfoSuccess("Successfully changed password");
      setTimeout(async () => {
        sePasswordSuccess(null);
        await axios.post("logout", {}, { withCredentials: true });
        history.push("/");
      }, 2000);
    }
  };

  return (
    <Layout>
      <div className="m-auto col-lg-6 col-md-6 col-sm-12">
        <h3>Personal Infromation</h3>
        {infoSuccess && <Alert severity="success">{infoSuccess}</Alert>}
        <form onSubmit={onUpdateInfo}>
          <div className="mb-3">
            <TextField
              label="first name"
              name="first_name"
              value={personalDetails.first_name}
              onChange={onChange}
            />
          </div>
          <div className="mb-3">
            <TextField
              label="last name"
              name="last_name"
              onChange={onChange}
              value={personalDetails.last_name}
            />
          </div>
          <div className="mb-3">
            <TextField
              label="email"
              name="email"
              onChange={onChange}
              value={personalDetails.email}
            />
          </div>
          <div className="mb-3">
            <Button variant="contained" color="primary" type="submit">
              Update Info
            </Button>
          </div>
        </form>
        <Divider />
        {passwordSuccess && <Alert severity="success">{passwordSuccess}</Alert>}
        <form onSubmit={onUpdatePassword}>
          <div className="mb-3">
            <TextField
              label="Password"
              type="password"
              name="password"
              onChange={onChangeAuthKeys}
            />
          </div>
          <div className="mb-3">
            <TextField
              label="Confirm Password"
              type="password"
              name="confirm_password"
              onChange={onChangeAuthKeys}
            />
          </div>
          <div className="mb-3">
            <Button variant="contained" color="primary" type="submit">
              Update Password
            </Button>
          </div>
        </form>
      </div>
    </Layout>
  );
};

export default Profile;
