const initialState = {
  user: {
    isLoggedIn: false,
    user: null,
    signUpdata: {},
    loginData: {},
  },
  post: {
    mainPosts: [],
  },
};

// action creator
const login = (data) => {
  return {
    type: "LOG_IN",
    data,
  };
};

// 이전 상태와, 액션을 통해서 다음 상태를 만들어 내는 함수
const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case "LOG_IN":
      return {
        ...state,
        user: {
          ...state.user,
          isLoggedIn: true,
          user: action.data,
        },
      };
  }
};

export default rootReducer;
