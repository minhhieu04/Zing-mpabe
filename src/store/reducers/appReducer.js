import actionTypes from "../actions/actionTypes";

const initState = {
  homeData: ["We don't talk anymore", "see you again", "superman Can Tho"],
  test: "hello",
};

const appReducer = (state = initState, action) => {
  switch (action.type) {
    case actionTypes.GET_HOME:
      return state;

    default:
      return state;
  }
};

export default appReducer;
