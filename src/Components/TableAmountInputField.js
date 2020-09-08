import React from "react";
//import "./styles.css";
import styled from "styled-components";

const InputFieldParent = styled.div`
  width: 120px;
  height: 40px;

  position: absolute;
  left: ${(props) => props.x || 1000};
  top: ${(props) => props.y || 1000};
`;

const InputField = styled.input`
  float: left;
  height: 100%;
  width: 70%;
  background-color: white;
  border: "black" 1px solid;
`;

const ConfirmButton = styled.button`
  float: left;
  height: 100%;
  width: 26%;
  background-color: "green";
  border: "darkgreen" 1px solid;
`;

const TableAmountInputField = ({ x, y }) => {
  return (
    <InputFieldParent x={x} y={y}>
      <InputField />
      <ConfirmButton />
    </InputFieldParent>
  );
};

export default TableAmountInputField;
