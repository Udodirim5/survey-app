const Nav = ({dispatch, amountWithdrawn}) => {
  return (
    <nav>
      <button onClick={() => dispatch({type: 'openAside'})}>
        <i className="bi bi-list"></i>
      </button>
      <button onClick={() => dispatch({type: 'openNotification'})}>
        <i className="bi bi-bell">
          {amountWithdrawn.length > 0 && <span className="badge">{amountWithdrawn.length}</span>}
          </i>
      </button>
    </nav>
  );
};

export default Nav;
