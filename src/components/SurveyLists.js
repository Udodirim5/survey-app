import SurveyCard from "./SurveyCard";

const SurveyLists = ({ surveys, completedSurveys, dispatch }) => {
  // Filter the surveys to exclude completed ones
  const uncompletedSurveys = surveys.filter(
    (survey) => !completedSurveys.includes(survey.surveyName)
  );

  return (
    <>
      {uncompletedSurveys.length === 0 && (
        <div className="result">
          <p>No surveys available</p>
        </div>
      )}
      <div className="survey-lists">
        {uncompletedSurveys.map((survey, index) => (
          <SurveyCard key={index} survey={survey} dispatch={dispatch} />
        ))}
      </div>
    </>
  );
};

export default SurveyLists;
