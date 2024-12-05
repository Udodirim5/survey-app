const Sidebar = ({ dispatch, totalAccountBalancePoints }) => {
  return (
    <div className="sidebar">
      <div className="sidebar__header">
        <span className="logo">LOGO</span>
        <button
          className="closeAside"
          onClick={() => dispatch({ type: "closeAside" })}
        >
          <i className="bi bi-x-lg"></i>
        </button>
      </div>

      <div className="sidebar-content">
        <button onClick={() => dispatch({ type: "openWithdrawal" })}>
          withdraw points
        </button>
        <button>lorem ipson lorem ipson</button>
        <button>lorem ipson lorem ipson</button>
        <button>lorem ipson lorem ipson</button>
        <button>lorem ipson lorem ipson</button>
      </div>

      <div className="sidebar-point">
        <h4>
          Your current score is:{" "}
          {totalAccountBalancePoints > 0
            ? ` ${totalAccountBalancePoints}`
            : "0"}
        </h4>
      </div>
    </div>
  );
};

export default Sidebar;
