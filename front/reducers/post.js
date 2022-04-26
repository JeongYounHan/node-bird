const initialState = {
  mainPosts: [
    {
      id: 1,
      User: {
        id: 1,
        nickname: "hahah",
      },
      content: "첫 번째 게시글 #해시태그 #익스프레스",
      Images: [
        {
          src: "",
        },
      ],
      Comments: [
        {
          User: {
            nickname: "nero",
          },
          content: "얼른 사고싶어요~",
        },
      ],
    },
  ],
  imagePaths: [],
  postAdded: false,
};

const dummyPost = {
  id: 2,
  User: {
    id: 2,
    nickname: "더미더미~",
  },
  content: "더미데이터 입니다!",
  Images: [
    {
      src: "",
    },
  ],
  Comments: [
    {
      User: {
        nickname: "nero22",
      },
      content: "얼른 사고싶지 않아요~",
    },
  ],
},

const ADD_POST = 'ADD_POST';
export const addPost = {
  type: ADD_POST
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_POST:
      return {
        ...state,
        mainPosts: [dummyPost, ...state.mainPosts],
      }
    default:
      return state;
  }
};

export default reducer;
