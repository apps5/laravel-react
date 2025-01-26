import React, { useState, useEffect } from 'react';
import Navbar from '../Navbar';
import { fetchNotifications, incrementNotificationViews } from '../axiosService';

const Home = () => {
  const [notifications, setNotifications] = useState([]);
  const [currentNotification, setCurrentNotification] = useState(null);
  const [isVisible, setIsVisible] = useState(false);


  useEffect(() => {
    const getNotifications = async () => {
      try {
        const response = await fetchNotifications();
        setNotifications(response.data.data);
      } catch (error) {
        console.error('Error fetching notifications:', error);
      }
    };

    getNotifications();
  }, []);


  useEffect(() => {
    if (!currentNotification && notifications.length > 0) {

      const nextNotification = notifications[0];
      setCurrentNotification(nextNotification);
      setNotifications((prev) => prev.slice(1));
      setIsVisible(true);

      incrementNotificationViews(nextNotification.id)
        .then(() => {
          console.log(`Incremented views for notification ID: ${nextNotification.id}`);
        })
        .catch((error) => console.error('Error incrementing views:', error));

      setTimeout(() => {
        setIsVisible(false);
        setTimeout(() => {
          setCurrentNotification(null);
        }, 500);
      }, 5000);
    }
  }, [notifications, currentNotification]);

  return (
    <div>
      <Navbar />
      <div className="container mt-5">
        <h1 className="text-center">Welcome to AppNotifications!</h1>
        <p className="text-center">This is a public page accessible to everyone.</p>
      </div>

      {/* Notification */}
      {currentNotification && (
        <div
          className={`notification ${isVisible ? 'show' : 'hide'}`}
          style={styles.notification}
        >
          <h6>{currentNotification.title}</h6>
          <div>{currentNotification.text}</div>
        </div>
      )}

      <style>{`
        .notification {
          position: fixed;
          bottom: 20px;
          left: 50%;
          transform: translateX(-50%);
          background-color: #333;
          color: white;
          padding: 10px 20px;
          border-radius: 5px;
          box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
          opacity: 0;
          transition: opacity 0.5s ease, transform 0.5s ease;
        }
        .notification.show {
          opacity: 1;
          transform: translateX(-50%) translateY(0);
        }
        .notification.hide {
          opacity: 0;
          transform: translateX(-50%) translateY(20px);
        }
      `}</style>
    </div>
  );
};

const styles = {
  notification: {
    width: '300px',
    maxHeight: '90px',
    fontSize: '13px',
    zIndex: 1000,
  },
};

export default Home;

