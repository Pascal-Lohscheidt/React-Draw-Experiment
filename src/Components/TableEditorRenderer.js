import React, { useState, useCallback, useReducer } from "react";
import "../styles.css";
import styled from "styled-components";
import { Stage, Layer, Rect } from "react-konva";
import SelectionCircle from "./SelectionCircle";
import Table from "./Table";

//==== Table drawing component ====

//==== Variables ====

const ADD_TABLE = "add_table";
const REMOVE_TABLE = "remove_table";

function tableReducer(state, action) {
  switch (action.type) {
    case ADD_TABLE:
      return [...state, action.data];
    case REMOVE_TABLE: {
      return state.filter((table) => table.id !== action.data.id);
    }
    default:
      return state;
  }
}

const TableEditorRenderer = ({ isInEditMode }) => {
  const [tables, dispatch] = useReducer(tableReducer, []);

  const [optionWheelVisible, setOptionWheelVisibility] = useState(false);
  const [[optionWheelPosX, optionWheelPosY], setOptionWheelPos] = useState([
    200,
    200
  ]);

  const addTable = useCallback((table) => {
    dispatch({
      type: ADD_TABLE,
      data: table
    });
  }, []);

  const removeTable = useCallback((table) => {
    dispatch({
      type: REMOVE_TABLE,
      data: table
    });
  }, []);

  const handleMouseClickEvent = useCallback(
    (event) => {
      if (event.evt.button === 0) {
        if (!optionWheelVisible) {
          setOptionWheelVisibility(true);
          setOptionWheelPos([event.evt.clientX, event.evt.clientY]);
        } else {
          setOptionWheelVisibility(false);
        }
      }
    },
    [optionWheelVisible]
  );

  return (
    <TableDrawingParent>
      <Stage width={window.innerWidth} height={window.innerHeight - 40}>
        <Layer>
          <>
            <Rect
              x={0}
              y={0}
              width={window.innerWidth}
              height={window.innerHeight - 40}
              fill="lightblue"
              onMouseUp={handleMouseClickEvent}
            />
            {tables.map((item) => {
              return (
                <Table
                  key={item.id.toString()}
                  toggleVisibilityOfOptionWheel={setOptionWheelVisibility}
                  tableInfo={item}
                  isInEditMode={isInEditMode}
                  x={item.posX}
                  y={item.posY}
                  width={item.width}
                  height={item.height}
                  removeTable={removeTable}
                />
              );
            })}
          </>

          <SelectionCircle
            currentX={optionWheelPosX}
            currentY={optionWheelPosY}
            visible={optionWheelVisible}
            addTable={addTable}
            setOptionWheelVisibility={setOptionWheelVisibility}
          />
        </Layer>
      </Stage>
    </TableDrawingParent>
  );
};

const TableDrawingParent = styled.div`
  width: 100%;
  height: 100%;
  background-color: white;
`;

export default TableEditorRenderer;
