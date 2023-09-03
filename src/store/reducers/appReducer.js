import actionTypes from "../actions/actionTypes";

const initState = {
  // homeData: ["We don't talk anymore", "see you again", "superman Can Tho"],
  // test: "hello",
  banner: [],
  section1: {},
  section2: {},
  section3: {},
  section4: {},
  section5: {},
  isLoading: false,
  newRelease: {},
  weekChart: [],
  top100: {},
};

const appReducer = (state = initState, action) => {
  switch (action.type) {
    case actionTypes.GET_HOME:
      return {
        ...state,
        banner:
          action.homeData?.find((item) => item.sectionId === "hSlider")
            ?.items || null,
        section1:
          action.homeData?.find((item) => item.sectionId === "hEditorTheme") ||
          {},
        section2:
          action.homeData?.find((item) => item.sectionId === "hEditorTheme2") ||
          {},
        section3:
          action.homeData?.find((item) => item.sectionId === "hEditorTheme3") ||
          {},
        section4:
          action.homeData?.find((item) => item.sectionId === "hEditorTheme4") ||
          {},
        section5:
          action.homeData?.find((item) => item.sectionId === "hArtistTheme") ||
          {},
        newRelease:
          action.homeData?.find((item) => item.sectionType === "new-release") ||
          [],
        weekChart:
          action.homeData?.find((item) => item.sectionType === "weekChart")
            ?.items || [],
        top100:
          action.homeData?.find((item) => item.sectionId === "h100") || {},
      };
    case actionTypes.LOADING:
      return {
        ...state,
        isLoading: action.flag,
      };

    default:
      return state;
  }
};

export default appReducer;
