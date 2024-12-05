const Confirmation = ({dispatch}) => {
  return (
    <div className="confirm-modal">
      <div className="confirm">
      <div className="confirm-inner">
        <h3>Withdraw?</h3>
      <i className="bi bi-x-lg" onClick={()=> dispatch({type: "closeConfirmation"})} ></i>
      </div>
        <p>Are you sure you want to withdraw?</p>
        <div className="confirm-button">
          <button onClick={()=> dispatch({type: "closeConfirmation"})}>Cancel</button>
          <button onClick={()=> dispatch({type: "completeWithdrawal"})}>Confirm</button>
        </div>
      </div>
    </div>
  );
};

export default Confirmation;
