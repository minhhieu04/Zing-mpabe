import actionTypes from "../actions/actionTypes";

const initState = {
  // homeData: ["We don't talk anymore", "see you again", "superman Can Tho"],
  // test: "hello",
  banner: [],
  section1: null,
  section2: null,
  section3: null,
  section4: null,
  section5: null,
  isLoading: false,
  newRelease: null,
  weekChart: null,
  top100: null,
  chart: null,
  rank: null,
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
          null,
        section2:
          action.homeData?.find((item) => item.sectionId === "hEditorTheme2") ||
          null,
        section3:
          action.homeData?.find((item) => item.sectionId === "hEditorTheme3") ||
          null,
        section4:
          action.homeData?.find((item) => item.sectionId === "hEditorTheme4") ||
          null,
        section5:
          action.homeData?.find((item) => item.sectionId === "hArtistTheme") ||
          null,
        newRelease:
          action.homeData?.find((item) => item.sectionType === "new-release") ||
          null,
        weekChart:
          action.homeData?.find((item) => item.sectionType === "weekChart")
            ?.items || null,
        top100:
          action.homeData?.find((item) => item.sectionId === "h100") || null,
        chart:
          action.homeData?.find((item) => item.sectionId === "hZC")?.chart ||
          null,
        rank:
          action.homeData?.find((item) => item.sectionId === "hZC")?.items ||
          null,
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
