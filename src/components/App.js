import { useEffect, useReducer } from "react";
import surveyListsData from "../data/Survey";

// import { useLocalStorageState } from "../hooks/useLocalStorageState";

import Nav from "./Nav";
import Main from "./Main";
import Aside from "./Aside";
import Header from "./Header";
import Footer from "./Footer";
import Sidebar from "./Sidebar";
import Progress from "./Progress";
import Questions from "./Questions";
import Withdrawal from "./Withdrawal";
import NextButton from "./NextButton";
import SurveyLists from "./SurveyLists";
import FinishScreen from "./FinishScreen";
import Confirmation from "./Confirmation";
import Notification from "./Notification";

const calculateTotalAccountBalance = (totalAccountBalance) => {
  return totalAccountBalance.reduce((sum, score) => sum + score, 0);
};

const initialState = {
  surveys: [],
  questions: [],
  amountWithdrawn: [],
  completedSurveys: [],
  totalAccountBalance: [],

  message: "",
  status: "loading",

  index: 0,
  score: 0,
  inputValue: 0,

  answer: null,
  selectedSurvey: null,

  completed: false,
  asideOpen: false,
  withdrawalOpen: false,
  confirmationOpen: false,
  isNotificationOpen: false,
};

const reducerFunction = (state, action) => {
  switch (action.type) {
    case "loadedSurvey":
      return { ...state, questions: action.payload, status: "ready" };
    case "selectSurvey":
      return {
        ...state,
        selectedSurvey: action.payload,
        questions: action.payload.questions,
        status: "active",
        index: 0,
        answer: null,
        score: 0,
        asideOpen: false,
        isNotificationOpen: false,
      };
    case "nweAnswer":
      const question = state.questions.at(state.index);
      return {
        ...state,
        answer: action.payload,
        score:
          action.payload === question.correctOption
            ? state.score + question.points
            : state.score,
      };
    case "nextQuestion":
      return { ...state, index: state.index + 1, answer: null };
    case "terminateSurvey":
      return { ...state, completed: false, status: "ready" };
    case "finish":
      return {
        ...state,
        status: "finished",
        totalAccountBalance: [...state.totalAccountBalance, state.score],
      };
    case "completeSurveyAndMarkCompleted":
      return {
        ...state,
        completedSurveys: [
          ...state.completedSurveys,
          action.payload.surveyName,
        ],
        status: "ready",
        completed: true,
        selectedSurvey: null,
      };
    case "loadPersistedData":
      return {
        ...state,
        completedSurveys: action.payload.completedSurveys || [],
        score: action.payload.score || 0,
        completed: action.payload.completed || false,
      };
    case "openAside":
      return { ...state, asideOpen: true, isNotificationOpen: false };
    case "closeAside":
      return { ...state, asideOpen: false };
    case "openWithdrawal":
      return { ...state, withdrawalOpen: true, asideOpen: false };
    case "closeWithdrawal":
      return { ...state, withdrawalOpen: false, inputValue: 0 };
    case "setInputValue":
      return { ...state, inputValue: action.payload };
    case "completeWithdrawal":
      const totalPoints = calculateTotalAccountBalance(
        state.totalAccountBalance
      );
      if (state.inputValue > totalPoints) {
        return {
          ...state,
          message: "withdrawal-error",
          confirmationOpen: false,
        };
      }

      let remainingPoints = state.inputValue;
      const updatedBalance = state.totalAccountBalance.filter((score) => {
        if (remainingPoints <= 0) return true;
        if (remainingPoints >= score) {
          remainingPoints -= score;
          return false;
        }
        state.totalAccountBalance[state.totalAccountBalance.indexOf(score)] -=
          remainingPoints;
        remainingPoints = 0;
        return true;
      });

      return {
        ...state,
        confirmationOpen: false,
        totalAccountBalance: updatedBalance,
        message: "withdrawal-success",
        inputValue: 0,
        amountWithdrawn: [...state.amountWithdrawn, state.inputValue],
      };
    case "openConfirmation":
      return { ...state, confirmationOpen: true };
    case "closeConfirmation":
      return { ...state, confirmationOpen: false };
    case "openNotification":
      return { ...state, isNotificationOpen: true, asideOpen: false };
    case "closeNotification":
      return { ...state, isNotificationOpen: false };
    case "updateAmountWithdrawn":
      return { ...state, amountWithdrawn: action.payload };
    case "clearMessage":
      return { ...state, message: "" };
    default:
      throw new Error("Action is not recognized");
  }
};

const App = () => {
  const [state, dispatch] = useReducer(reducerFunction, initialState);
  const {
    amountWithdrawn,
    questions,
    status,
    message,
    index,
    answer,
    score,
    // surveys,
    inputValue,
    asideOpen,
    withdrawalOpen,
    confirmationOpen,
    isNotificationOpen,
    totalAccountBalance,
  } = state;

  const numQuestions = questions.length;

  const totalAccountBalancePoints =
    calculateTotalAccountBalance(totalAccountBalance);

  useEffect(() => {
    dispatch({ type: "loadedSurvey", payload: surveyListsData });
  }, []);

  useEffect(() => {
    if (message === "withdrawal-success" || message === "withdrawal-error") {
      setTimeout(() => {
        dispatch({ type: "clearMessage" });
      }, 3000);
    }
  }, [message]);

  /**
   * TODO: Things that needs to be stored in the local storage includes:
   * 1. completedSurveys
   * 2. totalAccountBalance
   * 3. completed
   **/

  /**  
    Use the hook for localStorage management
      const [completionStatus, setCompletionStatus] = useLocalStorageState(
        {
          completedSurveys: [],
          completed: false,
        },
        "completionStatus"
      );
  
      // Avoid dispatching unnecessarily during initialization
      const isInitialLoad = useRef(true);
  
      // Save completed surveys and score to localStorage when state.completedSurveys or state.score changes
    useEffect(() => {
      if (isInitialLoad.current) {
        isInitialLoad.current = false;
        return;
      }
  
      const dataToPersist = {
        completedSurveys: state.completedSurveys,
        score: state.score,
        completed: state.completed,
        timestamp: new Date().toISOString(),
      };
  
      // Avoid unnecessary updates
      if (JSON.stringify(completionStatus) !== JSON.stringify(dataToPersist)) {
        setCompletionStatus(dataToPersist);
      }
    }, [
      state.completedSurveys,
      state.score,
      state.completed,
      completionStatus, // This should remain to check changes
    ]);
  
    useEffect(() => {
      if (completionStatus) {
        dispatch({
          type: "loadPersistedData",
          payload: completionStatus,
        });
      }
    }, []); // Removed dependencies to ensure this runs only on initial mount
  
    // Ensure the completion status doesn't trigger unnecessary re-renders
    useEffect(() => {
      if (completionStatus?.completed && surveys.length > 0) {
        dispatch({
          type: "completeSurveyAndMarkCompleted",
          payload: { surveyName: surveys[0]?.surveyName || "Unknown" },
        });
      }
    }, [completionStatus?.completed, surveys]);
   **/

  return (
    <div className="app">
      {confirmationOpen && <Confirmation dispatch={dispatch} />}
      <Header>
        {status === "active" && (
          <Progress
            dispatch={dispatch}
            numQuestions={numQuestions}
            index={index}
            answer={answer}
          />
        )}
        {(status === "ready" || status === "finished") && (
          <Nav dispatch={dispatch} amountWithdrawn={amountWithdrawn} />
        )}
      </Header>
      {asideOpen && (
        <Aside>
          <Sidebar
            dispatch={dispatch}
            totalAccountBalancePoints={totalAccountBalancePoints}
          />
        </Aside>
      )}
      <Main>
        {status === "ready" && (
          <SurveyLists
            surveys={surveyListsData}
            dispatch={dispatch}
            completedSurveys={state.completedSurveys}
          />
        )}
        {status === "active" && (
          <>
            <Questions
              answer={answer}
              dispatch={dispatch}
              question={questions[index]}
            />

            <Footer>
              <NextButton
                index={index}
                answer={answer}
                dispatch={dispatch}
                numQuestions={numQuestions}
              />
            </Footer>
          </>
        )}
        {status === "finished" && (
          <FinishScreen
            score={score}
            dispatch={dispatch}
            survey={state.selectedSurvey}
          />
        )}
        {withdrawalOpen && (
          <Withdrawal
            dispatch={dispatch}
            totalAccountBalancePoints={totalAccountBalancePoints}
            inputValue={inputValue}
            message={message}
          />
        )}
      </Main>
      {isNotificationOpen && (
        <Notification dispatch={dispatch} amountWithdrawn={amountWithdrawn} />
      )}
    </div>
  );
};

export default App;
