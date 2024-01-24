import { useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import { yupResolver } from "@hookform/resolvers/yup";
import Axios from "axios";
import * as yup from "yup";
import { useState, useEffect } from "react";

function UpdatePage() {
  const { id } = useParams();
  console.log("Update id", id);

  const [employeeData, setEmployeeData] = useState(null);

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
    trigger,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await Axios.get(`http://localhost:3001/read/${id}`);
        setEmployeeData(response.data[0]);

        reset(response.data[0]);

        // Trigger validation after setting default values
        Object.keys(response.data[0]).forEach((key) => {
          trigger(key);
        });
      } catch (err) {
        console.log(err);
      }
    };

    fetchData();
  }, [id, reset, trigger]);

  const updateData = async (data) => {
    try {
      const updatedData = {
        firstname: data.firstname,
        initial: data.initial,
        lastname: data.lastname,
        position: data.position,
        department: data.department,
        email: data.email,
        contact: data.contact,
      };

      await Axios.put(`http://localhost:3001/update/${id}`, updatedData);
      alert("Data updated successfully");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="container mt-5">
      <h3>Employee form</h3>
      <form action="" className="mt-4" onSubmit={handleSubmit(updateData)}>
        <div className="mb-3">
          <label htmlFor="" className="form-label">
            First name
          </label>
          <input
            type="text"
            className="form-control"
            name="firstname"
            id="firstname"
            {...register("firstname", { value: employeeData?.FirstName })}
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
            name="initial"
            id="initial"
            {...register("initial", { value: employeeData?.Initial })}
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
            name="lastname"
            id="lastname"
            {...register("lastname", { value: employeeData?.LastName })}
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
            name="position"
            id="position"
            {...register("position", { value: employeeData?.Position })}
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
            name="department"
            id="department"
            {...register("department", { value: employeeData?.Department })}
          />
          {errors.department?.message && (
            <small className="text-danger">{errors.department?.message}</small>
          )}
        </div>
        <div className="mb-3">
          <label htmlFor="" className="form-label">
            Email
          </label>
          <input
            type="email"
            className="form-control"
            name="email"
            id="email"
            {...register("email", { value: employeeData?.Email })}
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
            {...register("contact", { value: employeeData?.Contact })}
          />
          {errors.contact?.message && (
            <small className="text-danger">{errors.contact.message}</small>
          )}
        </div>

        <button type="submit" className="btn btn-dark">
          Update
        </button>
      </form>
    </div>
  );
}

export default UpdatePage;
