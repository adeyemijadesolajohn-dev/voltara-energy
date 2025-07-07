import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Login.scss";
import "../../App.scss";
import { Icons, Public } from "../../data/Assets";

const Login = () => {
  const [formData, setFormData] = useState({
    company: "",
    email: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // const res = await fetch("https://your-api-url.com/api/login", {
      //   method: "POST",
      //   headers: {
      //     "Content-Type": "application/json",
      //   },
      //   body: JSON.stringify(formData),
      // });

      // const data = await res.json();

      // if (!res.ok) {
      //   throw new Error(data.message || "Login failed");
      // }

      // localStorage.setItem("authToken", data.token);
      navigate("/SelectDashboard");
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <div className="flex loginPage">
      <div className="flex container">
        <div className="loginBGDiv">
          <img src={Public.BG} alt="Login Background" />
          <div className="loginBGText">
            <h2 className="loginBGHeading">Connecting you to the future</h2>
            <p>Create your Connection</p>
          </div>
        </div>

        <div className="flex formDiv">
          <div className="headerDiv">
            <Link to="/" className="logo">
              <img src={Public.Logo} alt="Voltara logo" />
              <h4>Voltara</h4>
              <p>Energy Solutions</p>
            </Link>
            <h3>Welcome Back</h3>
          </div>

          <form
            className="grid form"
            onSubmit={handleSubmit}
            encType="multipart/form-data"
          >
            <h2>Log In</h2>

            <div className="inputDiv">
              <div className="flex input">
                <Icons.CompanyUser className="icon" />

                <input
                  type="text"
                  name="company"
                  id="company"
                  placeholder="Company Ltd"
                  value={formData.company}
                  onChange={handleChange}
                  required
                />

                <label htmlFor="company">Company Name</label>
              </div>
            </div>

            <div className="inputDiv">
              <div className="flex input">
                <Icons.CompanyEmail className="icon" />
                <input
                  type="email"
                  name="email"
                  id="email"
                  placeholder="abc123@email.com"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
                <label htmlFor="email">Company Email</label>
              </div>
            </div>

            <div className="inputDiv">
              <div className="flex input">
                <Icons.Password className="icon" />
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  id="password"
                  placeholder="************"
                  value={formData.password}
                  onChange={handleChange}
                  required
                />
                <label htmlFor="password">Password</label>
                {showPassword ? (
                  <Icons.PasswordShow
                    className="eye"
                    onClick={() => setShowPassword(false)}
                    aria-label="Hide password"
                  />
                ) : (
                  <Icons.PasswordHide
                    className="eye"
                    onClick={() => setShowPassword(true)}
                    aria-label="Show password"
                  />
                )}
              </div>
            </div>

            <div className="flex rememberForgot">
              <label>
                <input type="checkbox" name="remember" />
                <span>Remember me</span>
              </label>
              <a href="#" className="forgot link">
                Forgot Password
              </a>
            </div>

            <button type="submit" className="btn">
              <span>Log In</span>
            </button>

            <div className="registerLinkDiv">
              <span className="text">Don't have an account? </span>
              <Link to="/Register" className="signUp link">
                Register
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
