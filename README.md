# node-bird
### 개요

nextjs 버전: 9 이상 (나는 12 사용)

ant 버전: 4



#### app.js: 모든 페이지 컴포넌트 공통 적용 가능

```react
import React from "react";
import PropTypes from "prop-types";
import Head from "next/head";
import "antd/dist/antd.css";

const App = ({ Component }) => {
  return (
    <>
      <Head>
        <meta charSet="utf-8" />
        <title>NodeBird hey</title>
      </Head>
      <Component />
    </>
  );
};

App.propTypes = {
  Component: PropTypes.elementType.isRequired,
};

export default App;
```



#### proptypes : 타입 검사 위해 사용

- element와 node의 차이는 무엇인가?: 아마 자식 컴포넌트 개수의 차이가 아닐까~, element는 자식 컴포넌트 딱 하나만 들어갈 때, node는 여러개 들어갈 때?

```react
import PropTypes from 'prop-types';

MyComponent.propTypes = {
  // prop가 특정 JS 형식임을 선언할 수 있습니다.
  // 이것들은 기본적으로 모두 선택 사항입니다.
  optionalArray: PropTypes.array,
  optionalBool: PropTypes.bool,
  optionalFunc: PropTypes.func,
  optionalNumber: PropTypes.number,
  optionalObject: PropTypes.object,
  optionalString: PropTypes.string,
  optionalSymbol: PropTypes.symbol,

  // 랜더링 될 수 있는 것들은 다음과 같습니다.
  // 숫자(numbers), 문자(strings), 엘리먼트(elements), 또는 이러한 타입들(types)을 포함하고 있는 배열(array) (혹은 배열의 fragment)
  optionalNode: PropTypes.node,

  // React 엘리먼트.
  optionalElement: PropTypes.element,

  // React 엘리먼트 타입 (ie. MyComponent)
  optionalElementType: PropTypes.elementType,

  // prop가 클래스의 인스턴스임을 선언할 수 있습니다.
  // 이 경우 JavaScript의 instanceof 연산자를 사용합니다.
  optionalMessage: PropTypes.instanceOf(Message),

  // 열거형(enum)으로 처리하여 prop가 특정 값들로 제한되도록 할 수 있습니다.
  optionalEnum: PropTypes.oneOf(['News', 'Photos']),

  // 여러 종류중 하나의 종류가 될 수 있는 객체
  optionalUnion: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
    PropTypes.instanceOf(Message)
  ]),

  // 특정 타입의 행렬
  optionalArrayOf: PropTypes.arrayOf(PropTypes.number),

  // 특정 타입의 프로퍼티 값들을 갖는 객체
  optionalObjectOf: PropTypes.objectOf(PropTypes.number),

  // 특정 형태를 갖는 객체
  optionalObjectWithShape: PropTypes.shape({
    color: PropTypes.string,
    fontSize: PropTypes.number
  }),

  // 추가 프로퍼티에 대한 경고가 있는 객체
  optionalObjectWithStrictShape: PropTypes.exact({
    name: PropTypes.string,
    quantity: PropTypes.number
  }),

  // 위에 있는 것 모두 `isRequired`와 연결하여 prop가 제공되지 않았을 때
  // 경고가 보이도록 할 수 있습니다.
  requiredFunc: PropTypes.func.isRequired,

  // 모든 데이터 타입이 가능한 필수값
  requiredAny: PropTypes.any.isRequired,

  // 사용자 정의 유효성 검사기를 지정할 수도 있습니다.
  // 검사 실패 시에는 에러(Error) 객체를 반환해야 합니다.
  // `oneOfType`안에서는 작동하지 않으므로 `console.warn` 혹은 throw 하지 마세요.
  customProp: function(props, propName, componentName) {
    if (!/matchme/.test(props[propName])) {
      return new Error(
        'Invalid prop `' + propName + '` supplied to' +
        ' `' + componentName + '`. Validation failed.'
      );
    }
  },

  // `arrayOf` 와 `objectOf 에 사용자 정의 유효성 검사기를 적용할 수 있습니다.
  // 검사 실패 시에는 에러(Error) 객체를 반환해야 합니다.
  // 유효성 검사기는 배열(array) 혹은 객체의 각 키(key)에 대하여 호출될 것입니다.
  // 유효성 검사기의 첫 두 개의 변수는 배열 혹은 객체 자신과 현재 아이템의 키입니다.

  customArrayProp: PropTypes.arrayOf(function(propValue, key, componentName, location, propFullName) {
    if (!/matchme/.test(propValue[key])) {
      return new Error(
        'Invalid prop `' + propFullName + '` supplied to' +
        ' `' + componentName + '`. Validation failed.'
      );
    }
  })
};
```



#### usecallback: 컴포넌트에 props로 넘겨주는 함수들 최적화

```react
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");
  const onChangeId = useCallback((e) => {
    setId(e.target.value);
  }, []);
  const onChangePassword = useCallback((e) => {
    setPassword(e.target.value);
  }, []);
```



#### style 때문에 re-render 되는 경우

```react
// 객체는 {} === {} 가 false로, 밑의 코드 새로 부를때마다 style 내부 객체 때문에 re-render 됨
<div style={{ marginTop: "10px" }}>
    <Button type="primary" htmlType="submit" loading={false}>
        로그인
    </Button>
    <Link href="/signup">
        <Button>회원가입</Button>
    </Link>
</div>
```

- 대체 하는 방법

```react
import styled from "styled-components";

const ButtonWrapper = styled.div`
  margin-top: 10px;
`;

      <ButtonWrapper>
        <Button type="primary" htmlType="submit" loading={false}>
          로그인
        </Button>
        <Link href="/signup">
          <Button>회원가입</Button>
        </Link>
      </ButtonWrapper>
```

- 혹은 useMemo 에다가 style 넣어 놓고 사용

```react
// 혹은 useMemo 사용
const style = useMemo(() => ({ marginTop: 10 }));
```



#### 커스텀 훅

```react
import { useState, useCallback } from "react";

export default (initialValue = null) => {
  const [value, setValue] = useState(initialValue);
  const handler = useCallback((e) => {
    setValue(e.target.value);
  }, []);
  return [value, handler];
};
```



#### redux

: 중앙저장소 만들어 놓고, 데이터를 수정도 하고 추가 삭제하면서 모든 컴포넌트에서 사용 가능

- store: state & reducer

- reducer: dispatch 한다고 해서 값이 다 알아서 바뀌는게 아님, 그래서 reducer에서 어떻게 바꿀지도 다 정의해줘야

- 좀 귀찮을 수 있는데 이런 액션 하나하나가 다 기록이 됨, 히스토리 추적 가능, 디버깅 시 뒤로감기 앞으로 감기까지도 가능

- ```react
  {
      ...state,
      name: action.data,
  }
  // 이런식으로 처리하는 이유는, 각각 다 새로운 데이터 배정하면 그전 데이터의 주소를 참고하는게 아니라 정말 새로 배정됨, 재사용성 떨어짐
  // 비구조화 할당은 객체 내부가 새로 생성된 게 아님
  ```

- ```react
  // rootReducer: 이전 상태와, 액션을 통해서 다음 상태를 만들어 내는 함수
  const rootReducer = (state = initialState, action) => {
    switch (action.type) {
      case 'CHANGE_NICKNAME':
        return {
          ...state,
          name: action.data,
        }
    }
  };
  ```

- ```react
  // dispatch 사용
  
  // action creator 선언
  const changeNickname = (data) => {
    return {
      type: "CHANGE_NICKNAME",
      data,
    };
  };
  
  // 사용
  store.dispatch(changeNickname('mighty tac'))
  ```

- 

