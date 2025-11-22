import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './StudentList.css';

const API_URL = 'http://localhost:5000/api/students';

const StudentList = () => {
  const [students, setStudents] = useState([]);
  const [filteredStudents, setFilteredStudents] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [deleteConfirm, setDeleteConfirm] = useState(null);

  useEffect(() => {
    fetchStudents();
  }, []);

  useEffect(() => {
    if (searchTerm.trim() === '') {
      setFilteredStudents(students);
    } else {
      const filtered = students.filter(
        (student) =>
          student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          student.course.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredStudents(filtered);
    }
  }, [searchTerm, students]);

  const fetchStudents = async () => {
    try {
      setLoading(true);
      const response = await axios.get(API_URL);
      setStudents(response.data.data);
      setFilteredStudents(response.data.data);
      setError(null);
    } catch (err) {
      setError('Failed to fetch students. Please make sure the backend server is running.');
      console.error('Error fetching students:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${API_URL}/${id}`);
      fetchStudents();
      setDeleteConfirm(null);
    } catch (err) {
      alert('Failed to delete student. Please try again.');
      console.error('Error deleting student:', err);
    }
  };

  const confirmDelete = (student) => {
    setDeleteConfirm(student);
  };

  const cancelDelete = () => {
    setDeleteConfirm(null);
  };

  if (loading) {
    return <div className="loading">Loading students...</div>;
  }

  return (
    <div className="student-list-container">
      <div className="page-header">
        <h1 className="page-title">Student List</h1>
        <Link to="/add" className="btn btn-primary">
          Add New Student
        </Link>
      </div>

      {error && <div className="error-alert">{error}</div>}

      <div className="search-bar">
        <input
          type="text"
          className="form-control"
          placeholder="Search by name or course..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {filteredStudents.length === 0 ? (
        <div className="empty-state">
          <h3>No students found</h3>
          <p>
            {searchTerm
              ? 'Try adjusting your search terms'
              : 'Get started by adding a new student'}
          </p>
        </div>
      ) : (
        <div className="row">
          {filteredStudents.map((student) => (
            <div key={student._id} className="col-md-6 col-lg-4 mb-4">
              <div className="student-card">
                <div className="student-info">
                  <strong>Name:</strong> {student.name}
                </div>
                <div className="student-info">
                  <strong>Age:</strong> {student.age}
                </div>
                <div className="student-info">
                  <strong>Course:</strong> {student.course}
                </div>
                <div className="student-info">
                  <strong>Email:</strong> {student.email}
                </div>
                <div className="action-buttons">
                  <Link
                    to={`/student/${student._id}`}
                    className="btn btn-primary btn-sm"
                  >
                    View
                  </Link>
                  <Link
                    to={`/edit/${student._id}`}
                    className="btn btn-success btn-sm"
                  >
                    Edit
                  </Link>
                  <button
                    className="btn btn-danger btn-sm"
                    onClick={() => confirmDelete(student)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {deleteConfirm && (
        <div className="confirm-dialog">
          <div className="confirm-dialog-content">
            <h3>Confirm Delete</h3>
            <p>
              Are you sure you want to delete{' '}
              <strong>{deleteConfirm.name}</strong>?
            </p>
            <div className="confirm-dialog-buttons">
              <button
                className="btn btn-secondary"
                onClick={cancelDelete}
              >
                Cancel
              </button>
              <button
                className="btn btn-danger"
                onClick={() => handleDelete(deleteConfirm._id)}
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default StudentList;





