import React from "react";
import { useState,useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import swal from "sweetalert";
import "./signup.css";
import Spinner from "./Spinner";
const Signup = () => {
  const History = useNavigate();
  const [userData, setData] = useState({
    name: "",
    email: "",
    password: "",
    cpassword: "",
  });
  useEffect(() => {
    document.title = "Notes-Signup";
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
      if (userData.password === userData.cpassword) {
        setLoading(true);
        const result = await fetch("/register", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: userData.name,
            email: userData.email,
            password: userData.password,
            cpassword: userData.cpassword,
          }),
        });
  

        if (result.status !== 201) {
          setLoading(false);
          swal("Please Enter Valid data");
        } else {
          setLoading(false);
          swal("Your account create succssfully");
          History("/");
        }
      } else {
        setLoading(false);
        swal("Check Password fields");
      }
    } catch (error) {
      setLoading(false);
      swal(error.message);
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
                      Create an account
                      {Loading && <Spinner />}
                    </h2>

                    <form>
                      <div class="form-outline mb-4">
                        <label class="form-label" for="form3Example1cg">
                          Your Name
                        </label>
                        <input
                          type="text"
                          id="form3Example1cg"
                          name="name"
                          value={userData.name}
                          onChange={handleChange}
                          class="form-control form-control-lg"
                          style={{ border: "1px solid black" }}
                        />
                      </div>

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
                          type="text"
                          name="password"
                          value={userData.password}
                          onChange={handleChange}
                          id="form3Example4cg"
                          class="form-control form-control-lg"
                          style={{ border: "1px solid black" }}
                        />
                      </div>

                      <div class="form-outline mb-4">
                        <label class="form-label" for="form3Example4cdg">
                          Repeat your password
                        </label>
                        <input
                          type="password"
                          id="form3Example4cdg"
                          name="cpassword"
                          value={userData.cpassword}
                          onChange={handleChange}
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
                          Register
                        </button>
                      </div>

                      <p class="text-center text-muted mt-3 mb-0">
                        Have already an account?{" "}
                        <NavLink class="fw-bold text-body" to="/">
                          <u>Login here</u>
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

export default Signup;
