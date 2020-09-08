import React, { useState } from "react";
import "../styles.css";
import tableType from "../TableTypes";
//import styled from "styled-components";
import { Line, Circle, Wedge, Rect } from "react-konva";
import TableInfo from "../TableInfo";

const CIRCLE_RADIUS = 175;

const SelectionCircle = ({
  addTable,
  currentX,
  currentY,
  visible,
  setOptionWheelVisibility
}) => {
  const sectionProps = {
    currentX: currentX,
    currentY: currentY,
    visible: visible,
    addTable: addTable,
    setOptionWheelVisibility: setOptionWheelVisibility
  };

  return (
    <>
      <Circle
        x={currentX}
        y={currentY}
        width={CIRCLE_RADIUS * 2}
        height={CIRCLE_RADIUS * 2}
        fill="white"
        stroke="black"
        strokeWidth={1}
        shadowBlur={10}
        visible={visible}
      />

      {/* Right */}
      <Section
        tableType={new tableType(200, 100, 0)}
        rotation={-45}
        previewRotation={-90}
        {...sectionProps}
      />
      {/* Up */}
      <Section
        tableType={new tableType(100, 100, 0)}
        rotation={-135}
        previewRotation={0}
        {...sectionProps}
      />
      {/* down */}
      <Section
        tableType={new tableType(100, 200, 0)}
        rotation={45}
        previewRotation={-180}
        {...sectionProps}
      />
      {/* left */}
      <Section
        tableType={new tableType(150, 150, 1)}
        rotation={135}
        previewRotation={90}
        {...sectionProps}
      />

      <Line
        x={currentX}
        y={currentY}
        points={[
          Number(getPolarCoordinateX(CIRCLE_RADIUS, 45, 0)),
          Number(calculateLineEndPostionY(CIRCLE_RADIUS, 45, 0)),
          Number(getPolarCoordinateX(CIRCLE_RADIUS, 225, 0)),
          Number(calculateLineEndPostionY(CIRCLE_RADIUS, 225, 0))
        ]}
        stroke="black"
        strokeWidth={1}
        tension={1}
        visible={visible}
      />

      <Line
        x={currentX}
        y={currentY}
        points={[
          Number(getPolarCoordinateX(CIRCLE_RADIUS, -45, 0)),
          Number(calculateLineEndPostionY(CIRCLE_RADIUS, -45, 0)),
          Number(getPolarCoordinateX(CIRCLE_RADIUS, -225, 0)),
          Number(calculateLineEndPostionY(CIRCLE_RADIUS, -225, 0))
        ]}
        stroke="black"
        strokeWidth={1}
        tension={1}
        visible={visible}
      />
    </>
  );
};

const Section = ({
  addTable,
  currentX,
  currentY,
  rotation,
  previewRotation,
  visible,
  tableType,
  setOptionWheelVisibility
}) => {
  const [currentFillColor, setFillColor] = useState("white");

  return (
    <>
      <Wedge
        x={currentX}
        y={currentY}
        onMouseEnter={() => setFillColor("lightblue")}
        onMouseLeave={() => setFillColor("white")}
        onMouseUp={() =>
          handleWedgeOnMouseUp(
            () =>
              addTable(
                new TableInfo(
                  2,
                  currentX,
                  currentY,
                  tableType.width,
                  tableType.height,
                  0,
                  tableType
                )
              ),
            setOptionWheelVisibility,
            () => setFillColor("white")
          )
        }
        radius={CIRCLE_RADIUS}
        rotation={rotation}
        angle={90}
        fill={currentFillColor}
        stroke="black"
        strokeWidth={1}
        visible={visible}
      />
      <ObjectPreview
        currentX={currentX}
        currentY={currentY}
        tableType={tableType}
        radius={CIRCLE_RADIUS}
        previewRotation={previewRotation}
        visible={visible}
        mouseEnterBehaviour={() => setFillColor("lightblue")}
        mouseLeaveBehaviour={() => setFillColor("white")}
        handleWedgeOnMouseUp={() =>
          handleWedgeOnMouseUp(
            () =>
              addTable(
                new TableInfo(
                  2,
                  currentX,
                  currentY,
                  tableType.width,
                  tableType.height,
                  0,
                  tableType
                )
              ),
            setOptionWheelVisibility,
            () => setFillColor("white")
          )
        }
      />
    </>
  );
};

const ObjectPreview = (props) => {
  return (
    <>
      {props.tableType.type === 0 && (
        <Rect
          x={
            props.currentX -
            getTablePreviewPosX(
              props.tableType.width,
              props.radius / 2,
              props.previewRotation
            )
          }
          y={
            props.currentY -
            getTablePreviewPosY(
              props.tableType.height,
              props.radius / 2,
              props.previewRotation
            )
          }
          onMouseEnter={() => props.mouseEnterBehaviour()}
          onMouseLeave={() => props.mouseLeaveBehaviour()}
          onMouseUp={() => props.handleWedgeOnMouseUp()}
          onTouchStart={() => props.handleWedgeOnMouseDown()}
          width={props.tableType.width / 2}
          height={props.tableType.height / 2}
          visible={props.visible}
          fill="white"
          stroke="black"
          strokeWidth={1}
          shadowBlur={10}
        />
      )}
      {props.tableType.type === 1 && (
        <Circle
          x={
            props.currentX -
            getTablePreviewPosX(0, props.radius / 2, props.previewRotation)
          }
          y={
            props.currentY -
            getTablePreviewPosY(0, props.radius / 2, props.previewRotation)
          }
          onMouseEnter={() => props.mouseEnterBehaviour()}
          onMouseLeave={() => props.mouseLeaveBehaviour()}
          onMouseUp={() => props.handleWedgeOnMouseUp()}
          onTouchStart={() => props.handleWedgeOnMouseDown()}
          width={props.tableType.width / 2}
          height={props.tableType.height / 2}
          visible={props.visible}
          fill="white"
          stroke="black"
          strokeWidth={1}
          shadowBlur={10}
        />
      )}
    </>
  );
};

//==== Section Events ====
const handleWedgeOnMouseUp = (
  addNewTableEvent,
  hideOptionWheelCallback,
  setFillColor
) => {
  addNewTableEvent();
  hideOptionWheelCallback(false);
  setFillColor();
};

//==== Calculations ====

const degToRad = 3.141 / 180;

const getTablePreviewPosX = (width, radius, angle) => {
  return width / 4 + getPolarCoordinateX(radius, angle, 0);
};

const getTablePreviewPosY = (height, radius, angle) => {
  return height / 4 + calculateLineEndPostionY(radius, angle, 0);
};

const getPolarCoordinateX = (radius, angle, x) => {
  return x + radius * Math.sin(angle * degToRad);
};

const calculateLineEndPostionY = (radius, angle, y) => {
  return y + radius * Math.cos(angle * degToRad);
};

export default SelectionCircle;
