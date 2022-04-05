import React, { useState, useCallback } from "react";
import AppLayout from "../components/AppLayout";
import Head from "next/head";
import Link from "next/link";
import styled from "styled-components";
import useInput from "../hooks/useInput";
import { Form, Input, Checkbox, Button } from "antd";

const ErrorMessage = styled.div`
  color: red;
`;

const ButtonWrapper = styled.div`
  margin-top: 10px;
`;

const Signup = () => {
  const [id, onChangeId] = useInput("");
  const [nickname, onChangeNickname] = useInput("");
  const [password, onChangePassword] = useInput("");
  const [passwordCheck, setPasswordCheck] = useState("");
  const [passwordError, setPasswordError] = useState(false);

  const onChangePasswordCheck = useCallback(
    (e) => {
      setPasswordCheck(e.target.value);
      setPasswordError(e.target.value !== password);
    },
    [password]
  );

  const [term, setTerm] = useState("");
  const [termError, setTermError] = useState(false);
  const onChangeTerm = useCallback((e) => {
    setTerm(e.target.checked);
    setTermError(false);
  }, []);

  const onSubmit = useCallback(() => {
    if (password !== passwordCheck) {
      return setPasswordError(true);
    }
    if (!term) {
      return setTermError(true);
    }
  }, [password, passwordCheck, term]);

  return (
    <AppLayout>
      <Head>
        <title>Signup | NodeBird</title>
      </Head>

      <Form onFinish={onSubmit}>
        <div>
          <label htmlFor="user-id">아이디</label>
          <br />
          <Input name="user-id" value={id} onChange={onChangeId} required />
        </div>
        <div>
          <label htmlFor="user-nickname">nickname</label>
          <br />
          <Input name="user-nickname" value={nickname} onChange={onChangeNickname} required />
        </div>
        <div>
          <label htmlFor="user-password">비밀번호</label>
          <br />
          <Input name="user-password" type="password" value={password} onChange={onChangePassword} required />
        </div>
        <div>
          <label htmlFor="user-password-check">비밀번호 확인</label>
          <br />
          <Input name="user-password-check" type="password" value={passwordCheck} onChange={onChangePasswordCheck} required />
          {passwordError && <ErrorMessage>비밀번호가 일치하지 않습니다.</ErrorMessage>}
        </div>
        <div>
          <Checkbox name="user-term" checked={term} onChange={onChangeTerm}>
            동의? 동의보감?
          </Checkbox>
          {termError && <div style={{ color: "red" }}>약관에 동의하셔야 합니다.</div>}
        </div>
        <ButtonWrapper>
          <Button type="primary" htmlType="submit" loading={false}>
            회원가입
          </Button>
        </ButtonWrapper>
      </Form>
    </AppLayout>
  );
};

export default Signup;
