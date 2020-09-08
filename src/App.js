import React, { useState } from "react";
import "./styles.css";
import styled from "styled-components";
import TableEditorRenderer from "./Components/TableEditorRenderer";
import TableAmountInputField from "./Components/TableAmountInputField";

const Heading = styled.div`
  width: 100%;
  height: 50px;
  background: palevioletred;
  color: white;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;

  h1 {
    font-family: sans-serif;
    width: 400px;
    font-size: 20px;
    font-weight: 100;
  }
`;

export default function App() {
  const [isInEditMode, toggleEditMode] = useState(true);

  return (
    <div className="App">
      <TableAmountInputField />
      <Heading>
        <h1>
          This is a test for drawing some stuff --- Click somehwere to see some
          options
        </h1>
        <EditButton onClick={() => toggleEditMode(!isInEditMode)}>
          Edit
        </EditButton>
      </Heading>
      <TableEditorRenderer isInEditMode={isInEditMode} />
    </div>
  );
}

const EditButton = styled.button`
  width: 120px;
  height: 40px;
  background-color: palevioletred;
  color: white;
  border: 1px white solid;
  border-radius: 20px;
  transition: all 0.1s ease-in-out;
  margin-right: 10px;

  &:hover {
    background-color: white;
    color: palevioletred;
  }
`;
