import React from "react";
import PropTypes from "prop-types";

const AppLayout = ({ children }) => {
  return (
    <div>
      <div>공통 메뉴</div>
      {children}
    </div>
  );
};

AppLayout.propTypes = {
  children: PropTypes.node.isRequired, // nodejs 의 node가 아니라 react의 node 타입 검사
};

export default AppLayout;
