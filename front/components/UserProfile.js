import React, { useCallback } from "react";
import { Card, Avatar, Button } from "antd";

const UserProfile = ({ setIsLoggedIn }) => {
  const onLogout = useCallback(() => {
    setIsLoggedIn(false);
  }, []);
  return (
    <Card
      actions={[
        <div key="twit">
          zaczac
          <br />0
        </div>,
        <div key="followings">
          followings
          <br />1
        </div>,
        <div key="followers">
          followers
          <br />2
        </div>,
      ]}
    >
      <Card.Meta avatar={<Avatar>ZC</Avatar>} title={"Zerocho"} />
      <Button onClick={onLogout}>로그아웃</Button>
    </Card>
  );
};

export default UserProfile;
