const Withdrawal = ({
  message,
  dispatch,
  inputValue,
  totalAccountBalancePoints,
}) => {
  const safeNumber = (value) => {
    const num = parseFloat(value);
    return isNaN(num) ? 0 : num;
  };

  const handleChange = (e) => {
    dispatch({ type: "setInputValue", payload: Number(e.target.value) });
  };

  const value = safeNumber(inputValue);
  return (
    <div className="withdrawal">
      <div className="withdrawal-inner">
        <div className="confirm-inner">
          <h3>Withdrawal</h3>
          <i
            className="bi bi-x-lg"
            onClick={() => dispatch({ type: "closeWithdrawal" })}
          ></i>
        </div>

        <div className="withdrawal__form">
          <label
            style={
              totalAccountBalancePoints > 0
                ? { color: "#05062d" }
                : { color: "red" }
            }
          >
            Total Balance: {totalAccountBalancePoints}
          </label>
          <input
            type="text"
            value={safeNumber(inputValue)}
            onChange={handleChange}
            autoFocus
          />
        </div>

        <div className="withdrawal_action">
          <button
            className="withdrawal__button"
            onClick={() => dispatch({ type: "closeWithdrawal" })}
          >
            Cancel
          </button>
          <button
            disabled={value <= 0 || value > totalAccountBalancePoints}
            className="withdrawal__button"
            onClick={() => dispatch({ type: "openConfirmation" })}
          >
            Withdraw
          </button>
        </div>
      </div>

      {message === "withdrawal-success" && (
        <div className="msg msg_success">Withdrawal Successful!</div>
      )}
      {message === "withdrawal-error" && (
        <div className="msg msg_error">Invalid amount entered.</div>
      )}
    </div>
  );
};

export default Withdrawal;
