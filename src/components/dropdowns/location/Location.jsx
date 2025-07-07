import React from "react";
import "./Location.scss";
import { nigeria } from "../../../data/States";
import { Icons } from "../../../data/Assets";

const Location = () => {
  const handleSelectChange = (key, value) => {
    setFormData((prev) => ({
      ...prev,
      [key]: value,
      ...(key === "state" ? { lga: "" } : {}),
    }));
  };

  const isValidState =
    formData.state && formData.state !== "State" && nigeria[formData.state];
  const lgaOptions = isValidState ? nigeria[formData.state] : [];

  const fields = [
    {
      id: "state",
      label: "State",
      icon: Icons.Country,
      options: Object.keys(nigeria),
    },
    {
      id: "lga",
      label: "LGA",
      icon: Icons.Location,
      options: lgaOptions,
    },
  ];

  return (
    <div>
      <Icon className="createIcon" />

      <select
        className={`formInput ${formData[id] ? "hasValue" : ""} ${
          isLgaDisabled ? "isDisabled" : "isEnabled"
        }`}
        value={formData[id] || ""}
        onChange={(e) => handleSelectChange(id, e.target.value)}
        disabled={isLgaDisabled}
      >
        {/* Initial blank display */}
        <option value="" hidden disabled={!formData[id]}>
          {/* empty space to show blank initially */}
        </option>

        {/* Label (e.g., "State", "LGA") as a selectable but invalid option */}
        <option
          value={label}
          className="formOption labelOption"
          style={{
            color: "var(--whiteColor)",
            fontStyle: "italic",
            fontSize: "13.5px",
            backgroundColor: "var(--secondaryColor)",
          }}
        >
          {label}
        </option>

        {/* Actual valid options */}
        {options.map((opt) => (
          <option
            className="formOption"
            key={opt}
            value={opt}
            style={{
              color: "var(--primaryColor)",
              fontSize: "13.5px",
              backgroundColor: "var(--secondaryColor)",
            }}
          >
            {opt}
          </option>
        ))}
      </select>

      <label className="formLabel">
        {label}
        {error[id] && <span className="error">{error[id]}</span>}
      </label>
    </div>
  );
};

export default Location;
