import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Register.scss";
import "../../App.scss";
import { Icons, Public } from "../../data/Assets";

const Register = () => {
  const [showPassword, setShowPassword] = useState({
    password: false,
    confirmPassword: false,
  });

  const [formData, setFormData] = useState({
    companyName: "",
    companyEmail: "",
    phoneNumber: "",
    password: "",
    confirmPassword: "",
    termsAccepted: false,
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  const togglePasswordType = (field) =>
    setShowPassword((prev) => ({ ...prev, [field]: !prev[field] }));

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  /**
   * Client‑side validation rules
   */
  const validate = () => {
    const newErrors = {};

    if (!formData.companyName.trim())
      newErrors.companyName = "Company name is required";

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.companyEmail))
      newErrors.companyEmail = "Invalid email format";

    if (!/^[0-9+\-\s()]{7,}$/.test(formData.phoneNumber))
      newErrors.phoneNumber = "Invalid phone number";

    if (formData.password.length < 8)
      newErrors.password = "Password must be at least 8 characters";

    if (formData.password !== formData.confirmPassword)
      newErrors.confirmPassword = "Passwords do not match";

    if (!formData.termsAccepted)
      newErrors.termsAccepted = "You must accept the terms";

    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate();
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length) return;

    setIsSubmitting(true);

    try {
      const res = await fetch("https://your-api-url.com/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          companyName: formData.companyName,
          email: formData.companyEmail,
          phone: formData.phoneNumber,
          password: formData.password,
        }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Registration failed");

      // Success → maybe store token & redirect
      localStorage.setItem("authToken", data.token);
      navigate("/SelectDashboard");
    } catch (err) {
      setErrors({ api: err.message });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex registerPage">
      <div className="flex container">
        {/* Background Section */}
        <div className="loginBGDiv">
          <img src={Public.BG} alt="Login Background" />
          <div className="loginBGText">
            <h2 className="loginBGHeading">Connecting you to the future</h2>
            <p>Create your Connection</p>
          </div>
        </div>

        {/* Form Section */}
        <div className="flex formDiv">
          <div className="headerDiv">
            <Link to="/" className="logo">
              <img src={Public.Logo} alt="Voltara logo" />
              <h4>Voltara</h4>
              <p>Energy Solutions</p>
            </Link>
            <h3>Join Us</h3>
          </div>

          <form className="grid form" onSubmit={handleSubmit} noValidate>
            <h2>Sign Up</h2>

            {errors.api && <p className="errorMsg">{errors.api}</p>}

            {/* Dynamic Inputs */}
            {[
              {
                icon: <Icons.CompanyUser className="icon" />,
                id: "companyName",
                type: "text",
                placeholder: "Company Ltd",
                label: "Company Name",
              },
              {
                icon: <Icons.CompanyEmail className="icon" />,
                id: "companyEmail",
                type: "email",
                placeholder: "abc123@email.com",
                label: "Company Email",
              },
              {
                icon: <Icons.PhoneNumber className="icon" />,
                id: "phoneNumber",
                type: "tel",
                placeholder: "0800 000 0000",
                label: "Phone Number",
              },
              {
                icon: <Icons.Password className="icon" />,
                id: "password",
                type: showPassword.password ? "text" : "password",
                placeholder: "************",
                label: "Password",
                toggle: true,
              },
              {
                icon: <Icons.ConfirmPassword className="icon" />,
                id: "confirmPassword",
                type: showPassword.confirmPassword ? "text" : "password",
                placeholder: "************",
                label: "Confirm Password",
                toggle: true,
              },
            ].map(({ icon, id, type, placeholder, label, toggle }) => (
              <div className="inputDiv" key={id}>
                <div className="flex input">
                  {icon}
                  <input
                    type={type}
                    id={id}
                    name={id}
                    placeholder={placeholder}
                    value={formData[id]}
                    onChange={handleInputChange}
                    required
                    aria-invalid={!!errors[id]}
                  />
                  <label htmlFor={id}>{label}</label>
                  {toggle &&
                    (showPassword[id] ? (
                      <Icons.PasswordShow
                        className="eye"
                        onClick={() => togglePasswordType(id)}
                      />
                    ) : (
                      <Icons.PasswordHide
                        className="eye"
                        onClick={() => togglePasswordType(id)}
                      />
                    ))}
                </div>
                {errors[id] && <span className="errorMsg">{errors[id]}</span>}
              </div>
            ))}

            {/* Remember Me row */}
            <div className="flex rememberForgot">
              <label>
                <input type="checkbox" />
                <span>Remember me</span>
              </label>
            </div>

            {/* Terms */}
            <div className="flex termsConditions">
              <label>
                <input
                  type="checkbox"
                  name="termsAccepted"
                  checked={formData.termsAccepted}
                  onChange={handleInputChange}
                  required
                />
                <span>
                  By creating your account, you agree to our{" "}
                  <a href="#" className="link">
                    Terms of Use
                  </a>{" "}
                  &{" "}
                  <a href="#" className="link">
                    Privacy Policy
                  </a>
                </span>
              </label>
            </div>
            {errors.termsAccepted && (
              <span className="errorMsg">{errors.termsAccepted}</span>
            )}

            {/* Submit */}
            <button type="submit" className="btn" disabled={isSubmitting}>
              {isSubmitting ? "Submitting..." : "Sign Up"}
            </button>

            <div className="registerLinkDiv">
              <span className="text">Already have an account? </span>
              <Link to="/Login" className="signUp link">
                Log In
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
