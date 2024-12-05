import React from "react";

const Notification = ({ dispatch, amountWithdrawn }) => {
  // Function to remove a specific notification
  const removeNotification = (indexToRemove) => {
    const updatedAmounts = amountWithdrawn.filter((_, index) => index !== indexToRemove);
    dispatch({ type: "updateAmountWithdrawn", payload: updatedAmounts });
  };

  return (
    <div className="notification">
      <div className="sidebar__header">
        <button
          className="closeAside"
          onClick={() => dispatch({ type: "closeNotification" })}
        >
          <i className="bi bi-x-lg"></i>
        </button>
      </div>

      <div className="notification-box">
        {amountWithdrawn.map((amount, index) => (
          <NotificationCard
            amount={amount}
            key={index}
            index={index}
            onRemove={removeNotification} // Pass the handler to remove the notification
          />
        ))}
        {amountWithdrawn.length===0 && <p className="result">No notifications</p>}
      </div>
    </div>
  );
};

const NotificationCard = ({ amount, index, onRemove }) => {
  return (
    <div className="notification-card">
      <p>
        {amount} points Withdrawn Successfully!
        <button onClick={() => onRemove(index)}> {/* Call onRemove when clicked */}
          <i className="bi bi-x"></i>
        </button>
      </p>
    </div>
  );
};

export default Notification;
