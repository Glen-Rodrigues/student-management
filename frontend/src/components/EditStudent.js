import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const API_URL = "http://localhost:5000/api/students";

const EditStudent = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    age: "",
    course: "",
    email: "",
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    fetchStudent();
  }, [id]);

  const fetchStudent = async () => {
    try {
      const response = await axios.get(`${API_URL}/${id}`);
      const student = response.data.data;
      setFormData({
        name: student.name,
        age: student.age.toString(),
        course: student.course,
        email: student.email,
      });
      setLoading(false);
    } catch (err) {
      if (err.response && err.response.status === 404) {
        setNotFound(true);
      } else {
        setSubmitError("Failed to load student data. Please try again.");
      }
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: "",
      });
    }
  };

  const validate = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
    }

    if (!formData.age) {
      newErrors.age = "Age is required";
    } else if (isNaN(formData.age) || parseInt(formData.age) < 1) {
      newErrors.age = "Age must be a positive number";
    }

    if (!formData.course.trim()) {
      newErrors.course = "Course is required";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitError("");

    if (!validate()) {
      return;
    }

    setSubmitting(true);

    try {
      await axios.put(`${API_URL}/${id}`, formData);
      navigate("/");
    } catch (err) {
      if (err.response && err.response.data && err.response.data.errors) {
        const serverErrors = {};
        err.response.data.errors.forEach((error) => {
          if (error.includes("name")) serverErrors.name = error;
          if (error.includes("age")) serverErrors.age = error;
          if (error.includes("course")) serverErrors.course = error;
          if (error.includes("email")) serverErrors.email = error;
        });
        setErrors(serverErrors);
      } else {
        setSubmitError(
          err.response?.data?.message ||
            "Failed to update student. Please try again."
        );
      }
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return <div className="loading">Loading student data...</div>;
  }

  if (notFound) {
    return (
      <div className="form-container">
        <div className="error-alert">
          <h3>Student not found</h3>
          <p>The student you're looking for doesn't exist.</p>
          <button className="btn btn-primary" onClick={() => navigate("/")}>
            Back to List
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="form-container">
      <div className="page-header">
        <h1 className="page-title">Edit Student</h1>
      </div>

      {submitError && <div className="error-alert">{submitError}</div>}

      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Name *</label>
          <input
            type="text"
            id="name"
            name="name"
            className="form-control"
            value={formData.name}
            onChange={handleChange}
            placeholder="Enter student name"
          />
          {errors.name && <div className="error-message">{errors.name}</div>}
        </div>

        <div className="form-group">
          <label htmlFor="age">Age *</label>
          <input
            type="number"
            id="age"
            name="age"
            className="form-control"
            value={formData.age}
            onChange={handleChange}
            placeholder="Enter age"
            min="1"
          />
          {errors.age && <div className="error-message">{errors.age}</div>}
        </div>

        <div className="form-group">
          <label htmlFor="course">Course *</label>
          <input
            type="text"
            id="course"
            name="course"
            className="form-control"
            value={formData.course}
            onChange={handleChange}
            placeholder="Enter course name"
          />
          {errors.course && (
            <div className="error-message">{errors.course}</div>
          )}
        </div>

        <div className="form-group">
          <label htmlFor="email">Email *</label>
          <input
            type="email"
            id="email"
            name="email"
            className="form-control"
            value={formData.email}
            onChange={handleChange}
            placeholder="Enter email address"
          />
          {errors.email && <div className="error-message">{errors.email}</div>}
        </div>

        <div className="action-buttons">
          <button
            type="button"
            className="btn btn-secondary"
            onClick={() => navigate("/")}
            disabled={submitting}
          >
            Cancel
          </button>
          <button
            type="submit"
            className="btn btn-primary"
            disabled={submitting}
          >
            {submitting ? "Updating..." : "Update Student"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditStudent;
