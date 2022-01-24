import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import swal from "sweetalert";
import Spinner from "./Spinner";

const ConfirmedPassword = (props) => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState({
    Otp: "",
    email: props.email,
    password: "",
    cpassword: "",
  });
  const History = useNavigate();
  const handleInputs = (e) => {
    let name = e.target.name;
    let value = e.target.value;
    setData({ ...data, [name]: value });
  };
  const changePassowrd = async (e) => {
    e.preventDefault();
    try {
      if (
        data.password !== data.cpassword ||
        !data.cpassword ||
        !data.password
      ) {
        swal("Password Not Matching");
      } else {
        setLoading(true);
        const response = await fetch("/changepassword", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            Otp: data.Otp,
            email: data.email,
            password: data.password,
          }),
        });

        if (response.status === 404 || !response) {
          setLoading(false);
          swal("Enter Valid Data Check All Fields");
        } else if (response.status === 401) {
          setLoading(false);
          swal("Your OTP Expired! Please Try Again");
        } else if (response.status === 200) {
          setLoading(false);
          swal("Your Password has been updated successfully");
          History("/login");
        }
      }
    } catch (error) {
      swal("something went wrong");
    }
  };
  return (
    <div>
      <div class="container padding-bottom-3x mb-2 mt-5">
        <div class="row justify-content-center">
          <div class="col-lg-8 col-md-10">
            {loading && <Spinner />}
            <form class="card mt-4">
              <div class="card-body">
                <div class="form-group">
                  {" "}
                  <label for="email-for-pass">Enter your OTP</label>{" "}
                  <input
                    class="form-control"
                    type="text"
                    name="Otp"
                    value={data.Otp}
                    onChange={handleInputs}
                    id="email-for-pass"
                    required=""
                  />
                  <br />
                  <label for="email-for-pass">Enter New Password</label>{" "}
                  <input
                    class="form-control"
                    type="password"
                    name="password"
                    value={data.password}
                    onChange={handleInputs}
                    id="email-for-pass"
                    required=""
                  />
                  <br />
                  <label for="email-for-pass">confirmed Password</label>{" "}
                  <input
                    class="form-control"
                    type="password"
                    name="cpassword"
                    value={data.cpassword}
                    onChange={handleInputs}
                    id="email-for-pass"
                    required=""
                  />
                </div>
              </div>
              <div class="card-footer">
                {" "}
                <button
                  class="btn btn-success"
                  type="submit"
                  onClick={changePassowrd}
                >
                  Get New Password
                </button>{" "}
                <button
                  class="btn btn-danger"
                  type="submit"
                  onClick={() => {
                    History("/");
                  }}
                >
                  Back to Login
                </button>{" "}
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};
export default ConfirmedPassword;
