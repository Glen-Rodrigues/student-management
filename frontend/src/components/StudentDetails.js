import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import axios from 'axios';

const API_URL = 'http://localhost:5000/api/students';

const StudentDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [student, setStudent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [deleteConfirm, setDeleteConfirm] = useState(false);

  useEffect(() => {
    fetchStudent();
  }, [id]);

  const fetchStudent = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${API_URL}/${id}`);
      setStudent(response.data.data);
      setError(null);
    } catch (err) {
      if (err.response && err.response.status === 404) {
        setError('Student not found');
      } else {
        setError('Failed to load student details. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    try {
      await axios.delete(`${API_URL}/${id}`);
      navigate('/');
    } catch (err) {
      alert('Failed to delete student. Please try again.');
      console.error('Error deleting student:', err);
    }
  };

  if (loading) {
    return <div className="loading">Loading student details...</div>;
  }

  if (error || !student) {
    return (
      <div className="details-container">
        <div className="error-alert">
          <h3>{error || 'Student not found'}</h3>
          <button className="btn btn-primary" onClick={() => navigate('/')}>
            Back to List
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="details-container">
      <div className="page-header">
        <h1 className="page-title">Student Details</h1>
        <div>
          <Link to={`/edit/${id}`} className="btn btn-success me-2">
            Edit
          </Link>
          <button
            className="btn btn-danger"
            onClick={() => setDeleteConfirm(true)}
          >
            Delete
          </button>
        </div>
      </div>

      <div className="detail-item">
        <div className="detail-label">Name</div>
        <div className="detail-value">{student.name}</div>
      </div>

      <div className="detail-item">
        <div className="detail-label">Age</div>
        <div className="detail-value">{student.age}</div>
      </div>

      <div className="detail-item">
        <div className="detail-label">Course</div>
        <div className="detail-value">{student.course}</div>
      </div>

      <div className="detail-item">
        <div className="detail-label">Email</div>
        <div className="detail-value">{student.email}</div>
      </div>

      <div className="detail-item">
        <div className="detail-label">Created At</div>
        <div className="detail-value">
          {new Date(student.createdAt).toLocaleString()}
        </div>
      </div>

      <div className="action-buttons mt-4">
        <Link to="/" className="btn btn-secondary">
          Back to List
        </Link>
      </div>

      {deleteConfirm && (
        <div className="confirm-dialog">
          <div className="confirm-dialog-content">
            <h3>Confirm Delete</h3>
            <p>
              Are you sure you want to delete <strong>{student.name}</strong>?
            </p>
            <div className="confirm-dialog-buttons">
              <button
                className="btn btn-secondary"
                onClick={() => setDeleteConfirm(false)}
              >
                Cancel
              </button>
              <button className="btn btn-danger" onClick={handleDelete}>
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default StudentDetails;





