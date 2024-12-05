const FinishScreen = ({ score, dispatch, survey }) => {
  return (
    <div className="result">
      <p>
        You've Earned <strong>{score}</strong> points
      </p>
      <button
        onClick={() =>
          dispatch({
            type: "completeSurveyAndMarkCompleted",
            payload: { surveyName: survey.surveyName },
          })
        }
        className="okay-done"
      >
        OKAY!
      </button>
    </div>
  );
};

export default FinishScreen;
