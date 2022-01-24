import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import swal from 'sweetalert';
import ConfirmedPassword from "./Confirmedpassword";
import Spinner from "./Spinner";
const Changepassword = () => {
  const [email, setEmail] = useState();
  const [loading, setLoading] = useState(false);
  const [form, setform] = useState(true);
  const History = useNavigate();
  const checkUser = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const res = await fetch("/reset", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
        }),
      });

      if (res.status !== 200 || !res) {
        setLoading(false);
        swal("User not found");
        setEmail();
      } else {
        setLoading(false);
        swal("OTP Send to Your Mail Id");
        setform(false);
      }
    } catch (error) {
      setLoading(false);
      swal("User not found");
      setEmail();
    }
  };
  return (
    <>
      <div class="container padding-bottom-3x mb-2 mt-5">
        <div class="row justify-content-center">
          {form ? (
            <div class="col-lg-8 col-md-10">
              <div class="forgot">
                <h2>Forgot your password?</h2>

                <ol class="list-unstyled">
                  <li>
                    <span class="text-primary text-medium">1. </span>Enter your
                    email address below.
                  </li>
                  <li>
                    <span class="text-primary text-medium">2. </span>Our system
                    will send you a OTP
                  </li>
                  <li>
                    <span class="text-primary text-medium">3. </span>Use the OTP
                    to reset your password
                  </li>
                </ol>
              </div>
              {loading && <Spinner />}
              <form class="card mt-4">
                <div class="card-body">
                  <div class="form-group">
                    {" "}
                    <label for="email-for-pass">
                      Enter your email address
                    </label>{" "}
                    <input
                      class="form-control"
                      type="email"
                      id="email-for-pass"
                      value={email}
                      onChange={(e) => {
                        setEmail(e.target.value);
                      }}
                    />
                    <small class="form-text text-muted">
                      Enter the email address you used during the registration
                    </small>{" "}
                    <br />
                  </div>
                </div>
                <div class="card-footer">
                  {" "}
                  <button class="btn btn-success" onClick={checkUser}>
                    Send OTP
                  </button>{" "}
                  <button class="btn btn-danger" type="submit">
                    <NavLink
                      to="/"
                      style={{ textDecoration: "none", color: "white" }}
                      onClick={() => {
                        History("/");
                      }}
                    >
                      Back to Login
                    </NavLink>
                  </button>{" "}
                </div>
              </form>
            </div>
          ) : (
            <ConfirmedPassword email={email} />
          )}
        </div>
      </div>
    </>
  );
};

export default Changepassword;