const Progress = ({ numQuestions, index, answer, dispatch }) => {
  return (
    <>
      <div className="progress">
        <button onClick={() => dispatch({ type: "terminateSurvey" })}>
          <i className="bi bi-chevron-left"></i>
        </button>
        <p>
          <strong>{index + 1}</strong> of {numQuestions}
        </p>
      </div>
      <progress
        className="progress-bar"
        max={numQuestions}
        value={index + Number(answer !== null)}
      />
    </>
  );
};

export default Progress;
