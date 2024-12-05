const surveys = [
  {
    surveyName: "JavaScript Basics",
    questions: [
      {
        question: "Which is the most popular JavaScript framework?",
        options: ["Angular", "React", "Svelte", "Vue"],
        correctOption: 1,
        points: 10,
      },
      {
        question: "Which company invented React?",
        options: ["Google", "Apple", "Netflix", "Facebook"],
        correctOption: 3,
        points: 10,
      },
    ],
  },
  {
    surveyName: "React Concepts",
    questions: [
      {
        question: "What's the fundamental building block of React apps?",
        options: ["Components", "Blocks", "Elements", "Effects"],
        correctOption: 0,
        points: 10,
      },
      {
        question: "What's the name of the syntax we use to describe the UI in React components?",
        options: ["FBJ", "Babel", "JSX", "ES2015"],
        correctOption: 2,
        points: 10,
      },
    ],
  },
  {
    surveyName: "Advanced React",
    questions: [
      {
        question: "Which hook to use for an API request on the component's initial render?",
        options: ["useState", "useEffect", "useRef", "useReducer"],
        correctOption: 1,
        points: 10,
      },
      {
        question: "Which variables should go into the useEffect dependency array?",
        options: [
          "Usually none",
          "All our state variables",
          "All state and props referenced in the effect",
          "All variables needed for clean up",
        ],
        correctOption: 2,
        points: 30,
      },
    ],
  },
];

export default surveys;
