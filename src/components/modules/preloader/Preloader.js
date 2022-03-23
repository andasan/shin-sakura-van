import React from "react";
import ReactDOM from "react-dom";
import styled from "styled-components";

const Preloader = () => {
  return ReactDOM.createPortal(
    <PreloaderContainer>
      <div className="sakura"></div>
    </PreloaderContainer>,
    document.body
  );
};

const PreloaderContainer = styled.div`
  background-color: rgba(227, 145, 194, 1);
  position: fixed;
  width: 100vw;
  height: 100vh;
  z-index: 1002;
  top: 0;
  left: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
`;

export default Preloader;
