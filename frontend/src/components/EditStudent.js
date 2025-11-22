import React, { Component } from 'react';
import { withRouter } from '../utils/withRouter';
import axios from 'axios';

const API_URL = 'http://localhost:5000/api/students';

class EditStudent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      formData: {
        name: '',
        age: '',
        course: '',
        email: ''
      },
      errors: {},
      loading: true,
      submitting: false,
      submitError: '',
      notFound: false
    };
  }

  componentDidMount() {
    this.fetchStudent();
  }

  fetchStudent = async () => {
    try {
      const { id } = this.props.params;
      const response = await axios.get(`${API_URL}/${id}`);
      const student = response.data.data;
      this.setState({
        formData: {
          name: student.name,
          age: student.age.toString(),
          course: student.course,
          email: student.email
        },
        loading: false
      });
    } catch (err) {
      if (err.response && err.response.status === 404) {
        this.setState({ notFound: true, loading: false });
      } else {
        this.setState({
          submitError: 'Failed to load student data. Please try again.',
          loading: false
        });
      }
    }
  };

  handleChange = (e) => {
    const { name, value } = e.target;
    this.setState({
      formData: {
        ...this.state.formData,
        [name]: value
      },
      errors: {
        ...this.state.errors,
        [name]: ''
      }
    });
  };

  validate = () => {
    const { formData } = this.state;
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }

    if (!formData.age) {
      newErrors.age = 'Age is required';
    } else if (isNaN(formData.age) || parseInt(formData.age) < 1) {
      newErrors.age = 'Age must be a positive number';
    }

    if (!formData.course.trim()) {
      newErrors.course = 'Course is required';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    this.setState({ errors: newErrors });
    return Object.keys(newErrors).length === 0;
  };

  handleSubmit = async (e) => {
    e.preventDefault();
    this.setState({ submitError: '' });

    if (!this.validate()) {
      return;
    }

    this.setState({ submitting: true });

    try {
      const { id } = this.props.params;
      await axios.put(`${API_URL}/${id}`, this.state.formData);
      this.props.navigate('/');
    } catch (err) {
      if (err.response && err.response.data && err.response.data.errors) {
        const serverErrors = {};
        err.response.data.errors.forEach((error) => {
          if (error.includes('name')) serverErrors.name = error;
          if (error.includes('age')) serverErrors.age = error;
          if (error.includes('course')) serverErrors.course = error;
          if (error.includes('email')) serverErrors.email = error;
        });
        this.setState({ errors: serverErrors });
      } else {
        this.setState({
          submitError:
            err.response?.data?.message || 'Failed to update student. Please try again.'
        });
      }
    } finally {
      this.setState({ submitting: false });
    }
  };

  render() {
    const { formData, errors, loading, submitting, submitError, notFound } = this.state;

    if (loading) {
      return <div className="loading">Loading student data...</div>;
    }

    if (notFound) {
      return (
        <div className="form-container">
          <div className="error-alert">
            <h3>Student not found</h3>
            <p>The student you're looking for doesn't exist.</p>
            <button
              className="btn btn-primary"
              onClick={() => this.props.navigate('/')}
            >
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

        <form onSubmit={this.handleSubmit}>
          <div className="form-group">
            <label htmlFor="name">Name *</label>
            <input
              type="text"
              id="name"
              name="name"
              className="form-control"
              value={formData.name}
              onChange={this.handleChange}
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
              onChange={this.handleChange}
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
              onChange={this.handleChange}
              placeholder="Enter course name"
            />
            {errors.course && <div className="error-message">{errors.course}</div>}
          </div>

          <div className="form-group">
            <label htmlFor="email">Email *</label>
            <input
              type="email"
              id="email"
              name="email"
              className="form-control"
              value={formData.email}
              onChange={this.handleChange}
              placeholder="Enter email address"
            />
            {errors.email && <div className="error-message">{errors.email}</div>}
          </div>

          <div className="action-buttons">
            <button
              type="button"
              className="btn btn-secondary"
              onClick={() => this.props.navigate('/')}
              disabled={submitting}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="btn btn-primary"
              disabled={submitting}
            >
              {submitting ? 'Updating...' : 'Update Student'}
            </button>
          </div>
        </form>
      </div>
    );
  }
}

export default withRouter(EditStudent);





