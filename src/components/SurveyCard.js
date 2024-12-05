const SurveyCard = ({ survey, dispatch }) => {
  return (
    <div
      className="survey-card"
      onClick={() => dispatch({ type: "selectSurvey", payload: survey })}
    >
      <h3>{survey.surveyName}</h3>
    </div>
  );
};

export default SurveyCard;
