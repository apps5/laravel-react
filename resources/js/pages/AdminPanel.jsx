import React, { useState, useEffect } from 'react';
import Navbar from '../Navbar';
import {
  fetchNotifications,
  addNotification,
  updateNotification,
  deleteNotification,
} from '../axiosService';

const AdminPanel = ({ onLogout }) => {
  const [data, setData] = useState([]);
  const [meta, setMeta] = useState(null);
  const [selectedItem, setSelectedItem] = useState(null);
  const [isEditMode, setIsEditMode] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    loadNotifications(currentPage);
  }, [currentPage]);

  const loadNotifications = (page = 1) => {
    fetchNotifications(page)
      .then((response) => {   
        setData(response.data.data);
        setMeta(response.data.meta);
      })
      .catch((error) => console.error('Error fetching notifications:', error));
  };

  const handleAddNotification = () => {
    setSelectedItem({
      id: null,
      title: '',
      text: '',
      views: 0,
      dateAdded: new Date().toLocaleDateString(),
    });
    setIsEditMode(true);
  };

  const handleSaveChanges = () => {
    if (selectedItem.id === null) {
      addNotification(selectedItem)
        .then(() => {
          loadNotifications(currentPage);
          closeModal();
        })
        .catch((error) => console.error('Error adding notification:', error));
    } else {
      updateNotification(selectedItem.id, selectedItem)
        .then(() => {
          loadNotifications(currentPage);
          closeModal();
        })
        .catch((error) => console.error('Error updating notification:', error));
    }
  };

  const handleDeleteNotification = (id) => {
    deleteNotification(id)
      .then(() => {
        loadNotifications(currentPage);
      })
      .catch((error) => console.error('Error deleting notification:', error));
  };

  const handleViewItem = (item) => {
    setSelectedItem(item);
    setIsEditMode(false);
  };

  const handleEditItem = (item) => {
    setSelectedItem(item);
    setIsEditMode(true);
  };

  const closeModal = () => {
    setSelectedItem(null);
    setIsEditMode(false);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <>
      <Navbar onLogout={onLogout} />
      <div className="container mt-5">
        <h5 className="mb-3">Notifications</h5>
       
        <div className="d-flex justify-content-end mb-3">
          <button className="btn btn-success" onClick={handleAddNotification}>
            Add
          </button>
        </div>

        <div className="table-responsive">
          {data.length === 0 ? (
            <p className="text-center mt-5">No notifications available.</p>
          ) : (
            <table className="table caption-top table-hover">
              <thead>
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">Title</th>
                  <th scope="col">Text</th>
                  <th scope="col">Views</th>
                  <th scope="col">Date Added</th>
                  <th scope="col">Actions</th>
                </tr>
              </thead>
              <tbody>
                {data.map((item) => (
                  <tr key={item.id}>
                    <th scope="row">{item.id}</th>
                    <td>{item.title}</td>
                    <td>{item.text}</td>
                    <td>{item.views}</td>
                    <td>{new Date(item.date_added).toLocaleDateString()}</td>
                    <td>
                      <button
                        className="btn btn-primary btn-sm me-2"
                        onClick={() => handleViewItem(item)}
                      >
                        View
                      </button>
                      <button
                        className="btn btn-warning btn-sm me-2"
                        onClick={() => handleEditItem(item)}
                      >
                        Edit
                      </button>
                      <button
                        className="btn btn-danger btn-sm"
                        onClick={() => handleDeleteNotification(item.id)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>

        {/* Pagination */}
        {meta && meta.total > meta.per_page && (
          <nav>
            <ul className="pagination justify-content-center mt-4">
              <li className={`page-item ${meta.current_page === 1 ? 'disabled' : ''}`}>
                <button
                  className="page-link"
                  onClick={() => handlePageChange(meta.current_page - 1)}
                >
                  Previous
                </button>
              </li>
              {[...Array(meta.last_page)].map((_, index) => (
                <li
                  key={index}
                  className={`page-item ${
                    meta.current_page === index + 1 ? 'active' : ''
                  }`}
                >
                  <button
                    className="page-link"
                    onClick={() => handlePageChange(index + 1)}
                  >
                    {index + 1}
                  </button>
                </li>
              ))}
              <li
                className={`page-item ${
                  meta.current_page === meta.last_page ? 'disabled' : ''
                }`}
              >
                <button
                  className="page-link"
                  onClick={() => handlePageChange(meta.current_page + 1)}
                >
                  Next
                </button>
              </li>
            </ul>
          </nav>
        )}
      </div>

      {/* Modal */}
      {selectedItem && (
        <div className="modal show d-block" tabIndex="-1">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">
                  {isEditMode ? 'Edit Notification' : 'View Notification'}
                </h5>
                <button type="button" className="btn-close" onClick={closeModal}></button>
              </div>
              <div className="modal-body">
                {isEditMode ? (
                  <>
                    <div className="mb-3">
                      <label htmlFor="title" className="form-label">
                        Title
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="title"
                        value={selectedItem.title}
                        onChange={(e) =>
                          setSelectedItem({
                            ...selectedItem,
                            title: e.target.value,
                          })
                        }
                      />
                    </div>
                    <div className="mb-3">
                      <label htmlFor="text" className="form-label">
                        Text
                      </label>
                      <textarea
                        className="form-control"
                        id="text"
                        rows="3"
                        value={selectedItem.text}
                        onChange={(e) =>
                          setSelectedItem({
                            ...selectedItem,
                            text: e.target.value,
                          })
                        }
                      ></textarea>
                    </div>
                  </>
                ) : (
                  <>
                    <p>
                      <strong>Title:</strong> {selectedItem.title}
                    </p>
                    <p>
                      <strong>Text:</strong> {selectedItem.text}
                    </p>
                    <p>
                      <strong>Views:</strong> {selectedItem.views}
                    </p>
                    <p>
                      <strong>Date Added:</strong> {' '}
                      {new Date(selectedItem.date_added).toLocaleDateString()}
                    </p>
                  </>
                )}
              </div>
              <div className="modal-footer">
                {isEditMode ? (
                  <button
                    type="button"
                    className="btn btn-success"
                    onClick={handleSaveChanges}
                  >
                    Save Changes
                  </button>
                ) : null}
                <button type="button" className="btn btn-secondary" onClick={closeModal}>
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default AdminPanel;
