import actionTypes from "../actions/actionTypes";

const initState = {
  // homeData: ["We don't talk anymore", "see you again", "superman Can Tho"],
  // test: "hello",
  banner: [],
  section: {},
};

const appReducer = (state = initState, action) => {
  switch (action.type) {
    case actionTypes.GET_HOME:
      return {
        ...state,
        banner:
          action.homeData?.find((item) => item.sectionId === "hSlider")
            ?.items || null,
        section:
          action.homeData?.find((item) => item.sectionId === "hEditorTheme") ||
          {},
      };

    default:
      return state;
  }
};

export default appReducer;
