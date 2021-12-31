import React, { useEffect } from "react";
import { useState, useContext } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import swal from "sweetalert";
import { UserContext } from "../App";
import "./signup.css";
import Spinner from "./Spinner";
const Login = () => {
  const History = useNavigate();
  const { dispatch } = useContext(UserContext);
  const [userData, setData] = useState({
    email: "",
    password: "",
  });
  useEffect(() => {
    document.title = "Notes-login";
  });
  const [Loading, setLoading] = useState(false);
  let name, value;
  const handleChange = (e) => {
    name = e.target.name;
    value = e.target.value;
    setData({ ...userData, [name]: value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const result = await fetch("/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: userData.email,
          password: userData.password,
        }),
      });

      if (result.status !== 200) {
        setLoading(false);
        swal("LogIn Failed");
      } else {
        setLoading(false);
        swal("Log in successfully");
        dispatch({ type: "USER", payload: true });
        History("/notes");
      }
    } catch (error) {
      setLoading(false);
      swal("LogIn Failed", error.message);
    }
  };
  return (
    <div>
      <section
        class="vh-100 bg-image"
        style={{
          backgroundImage:
            "url('https://mdbcdn.b-cdn.net/img/Photos/new-templates/search-box/img4.webp')",
        }}
      >
        <div class="mask d-flex align-items-center h-100 gradient-custom-3">
          <div class="container h-100">
            <div class="row d-flex justify-content-center align-items-center h-100">
              <div class="col-12 col-md-9 col-lg-7 col-xl-6">
                <div class="card" style={{ borderRadius: "15px" }}>
                  <div class="card-body p-5">
                    <h2 class="text-uppercase text-center mb-5">
                      LOG IN {Loading && <Spinner />}
                    </h2>

                    <h6 className="text-center"> Log in to view your notes</h6>

                    <form>
                      <div class="form-outline mb-4">
                        <label class="form-label" for="form3Example3cg">
                          Your Email
                        </label>
                        <input
                          type="email"
                          id="form3Example3cg"
                          name="email"
                          value={userData.email}
                          onChange={handleChange}
                          class="form-control form-control-lg"
                          style={{ border: "1px solid black" }}
                        />
                      </div>

                      <div class="form-outline mb-4">
                        <label class="form-label" for="form3Example4cg">
                          Password
                        </label>
                        <input
                          type="password"
                          name="password"
                          value={userData.password}
                          onChange={handleChange}
                          id="form3Example4cg"
                          class="form-control form-control-lg"
                          style={{ border: "1px solid black" }}
                        />
                      </div>

                      <div class="d-flex justify-content-center">
                        <button
                          type="button"
                          class="btn btn-success btn-block btn-lg gradient-custom-4 text-body"
                          onClick={handleSubmit}
                        >
                          LOGIN
                        </button>
                      </div>

                      <p class="text-center text-muted mt-3 mb-0">
                        Don't have an account?
                        <NavLink class="fw-bold text-body" to="/signup">
                          <u>Register</u>
                        </NavLink>
                      </p>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Login;
