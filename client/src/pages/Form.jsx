import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import Axios from "axios";
import * as yup from "yup";
import React from "react";
import { useNavigate } from "react-router-dom";

function Form() {
  const navigate = useNavigate()
  const schema = yup.object().shape({
    firstname: yup.string().max(25).required("Required field"),
    initial: yup.string().max(2).required("Required field"),
    lastname: yup.string().max(25).required("Required field"),
    position: yup.string().max(25).required("Required field"),
    department: yup.string().max(25).required("Required field"),
    email: yup
      .string()
      .email("Invalid Email ex:username@gmail.com")
      .max(50)
      .required("Required field"),
    contact: yup
      .string()
      .matches(/^\d{11}$/, "Contact number must consist of 11 digits")
      .required("Required field"),
  });

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const addData = async (data) => {
    try {
      await Axios.post("http://localhost:3001/create", { ...data });
      console.log(data);
      alert("Data added successsfully");

    } catch (err) {
      console.log(err);
    }
    reset();
  };

  const back = () => {
    navigate("/")
  }


  return (
    <div className="container mt-5">
      <h3>Employee form</h3>
      <form action="" className="mt-4" onSubmit={handleSubmit(addData)}>
        <div className="mb-3">
          <label htmlFor="" className="form-label">
            First name
          </label>
          <input
            type="text"
            className="form-control"
            name=""
            id=""
            {...register("firstname")}
          />
          {errors.firstname?.message && (
            <small className="text-danger">{errors.firstname.message}</small>
          )}
        </div>
        <div className="mb-3">
          <label htmlFor="" className="form-label">
            Initial
          </label>
          <input
            type="text"
            className="form-control"
            name=""
            id=""
            {...register("initial")}
          />
          {errors.initial?.message && (
            <small className="text-danger">{errors.initial.message}</small>
          )}
        </div>
        <div className="mb-3">
          <label htmlFor="" className="form-label">
            Last name
          </label>
          <input
            type="text"
            className="form-control"
            name=""
            id=""
            {...register("lastname")}
          />
          {errors.lastname?.message && (
            <small className="text-danger">{errors.lastname.message}</small>
          )}
        </div>
        <div className="mb-3">
          <label htmlFor="" className="form-label">
            Position
          </label>
          <input
            type="text"
            className="form-control"
            name=""
            id=""
            {...register("position")}
          />
          {errors.position?.message && (
            <small className="text-danger">{errors.position.message}</small>
          )}
        </div>
        <div className="mb-3">
          <label htmlFor="" className="form-label">
            Department
          </label>
          <input
            type="text"
            className="form-control"
            name=""
            id=""
            {...register("department")}
          />
          {errors.department?.message && (
            <small className="text-danger">{errors.department.message}</small>
          )}
        </div>
        <div className="mb-3">
          <label htmlFor="" className="form-label">
            Email
          </label>
          <input
            type="email"
            className="form-control"
            name=""
            id=""
            {...register("email")}
          />
          {errors.email?.message && (
            <small className="text-danger">{errors.email.message}</small>
          )}
        </div>

        <div className="mb-3">
          <label htmlFor="" className="form-label">
            Contact
          </label>
          <input
            type="text"
            className="form-control"
            name="contact"
            id="contact"
            {...register("contact")}
            // defaultValue={employeeData?.Contact}
          />
          {errors.contact?.message && (
            <small className="text-danger">{errors.contact.message}</small>
          )}
        </div>

        <div className="d-grid gap-3 col-md-2">
        <button type="submit" className="btn btn-dark">
          Add
        </button>
        <button type="submit" className="btn btn-dark" onClick={back}>
          Back
        </button>
        </div>

      </form>
    </div>
  );
}

export default Form;
