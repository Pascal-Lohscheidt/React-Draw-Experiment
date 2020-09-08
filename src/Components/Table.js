import React, { useState } from "react";
import "../styles.css";
import { Rect, Circle, Image, Text } from "react-konva";
import useImage from "use-image";

const TABLE_AMOUNT_FONT_SIZE = 25;

const Table = ({
  x,
  y,
  width,
  height,
  tableInfo,
  isInEditMode,
  toggleVisibilityOfOptionWheel,
  removeTable
}) => {
  const [showsOptions, setOptionVisible] = useState(false);
  const [[currentPosX, currentPosY], setCurrentPos] = useState([x, y]);

  const [[optionBasePosX, optionBasePosY], setOptionBasePos] = useState([x, y]);

  return (
    <>
      {tableInfo.type.type === 0 && (
        <Rect
          x={currentPosX}
          y={currentPosY}
          width={width}
          height={height}
          fill="white"
          stroke="black"
          strokeWidth={1}
          shadowBlur={10}
          onDragMove={(event) =>
            setOptionBasePos([event.target.x(), event.target.y()])
          }
          onDragStart={() =>
            handleTableDragStart(() => toggleVisibilityOfOptionWheel(false))
          }
          onDragEnd={(event) => handleTableDragEnd(event, setCurrentPos)}
          draggable={isInEditMode}
          onClick={() => setOptionVisible(!showsOptions)}
        />
      )}

      {tableInfo.type.type === 1 && (
        <Circle
          x={currentPosX}
          y={currentPosY}
          width={width}
          height={height}
          fill="white"
          stroke="black"
          strokeWidth={1}
          shadowBlur={10}
          onDragMove={(event) =>
            setOptionBasePos([event.target.x(), event.target.y()])
          }
          onDragEnd={(event) => handleTableDragEnd(event, setCurrentPos)}
          onDragStart={() =>
            handleTableDragStart(() => toggleVisibilityOfOptionWheel(false))
          }
          draggable={isInEditMode}
          onClick={() => setOptionVisible(!showsOptions)}
        />
      )}

      <TrashIcon
        x={calculateTrashIconPosX(
          optionBasePosX,
          10,
          tableInfo.width,
          tableInfo.type.type
        )}
        y={calculateTrashIconPosY(
          optionBasePosY,
          10,
          tableInfo.height,
          tableInfo.type.type
        )}
        width={30}
        height={30}
        //stroke="darkred"
        //strokeWidth={1}
        onMouseUp={() => removeTable(tableInfo)}
      />

      <AmountText
        x={calculateAmountTextPosX(optionBasePosX, width, tableInfo.type.type)}
        y={calculateAmountTextPosY(optionBasePosY, height, tableInfo.type.type)}
        amount={tableInfo.seatAmount}
        fontSize={TABLE_AMOUNT_FONT_SIZE}
      />
    </>
  );
};

export default Table;

//==== Components ====

const TrashIcon = ({ x, y, onMouseUp }) => {
  const [image] = useImage("./imgs/delete_red.png");

  return (
    <Image
      image={image}
      x={x}
      y={y}
      width={30}
      height={30}
      color={"red"}
      strokeWidth={1}
      onMouseUp={() => onMouseUp()}
    />
  );
};

const AmountText = ({ x, y, amount, fontSize }) => {
  return (
    <Text
      x={x}
      y={y}
      text={amount.toString()}
      fontSize={fontSize}
      color={"red"}
    />
  );
};

//=== Handler Methods ===

const handleTableDragStart = (setVisibility) => {
  setVisibility();
};

const handleTableDragEnd = (event, setPos) => {
  setPos([event.target.x(), event.target.y()]);
};

const calculateAmountTextPosX = (optionBasePosX, width, tableType) => {
  if (tableType === 0)
    return optionBasePosX + width / 2 - TABLE_AMOUNT_FONT_SIZE / 4;
  else if (tableType === 1) return optionBasePosX - TABLE_AMOUNT_FONT_SIZE / 4;
  else return optionBasePosX + width / 2 - TABLE_AMOUNT_FONT_SIZE / 4;
};

const calculateAmountTextPosY = (optionBasePosY, height, tableType) => {
  if (tableType === 0)
    return optionBasePosY + height / 2 - TABLE_AMOUNT_FONT_SIZE / 2;
  else if (tableType === 1) return optionBasePosY - TABLE_AMOUNT_FONT_SIZE / 2;
  else return optionBasePosY + height / 2 - TABLE_AMOUNT_FONT_SIZE / 2;
};

const calculateTrashIconPosX = (optionPosX, offset, width, tableType) => {
  if (tableType === 0) return optionPosX + width + offset;
  else if (tableType === 1) return optionPosX + width / 2 + offset;
  else return optionPosX + width + offset;
};

const calculateTrashIconPosY = (optionPosY, offset, height, tableType) => {
  if (tableType === 0) return optionPosY - offset;
  else if (tableType === 1) return optionPosY - height / 2 - offset;
  else return optionPosY + height + offset;
};

//const degToRad = 3.141 / 180;

// const calculatePolarPostionX = (radius, angle, x) => {
//   return x + radius * Math.sin(angle * degToRad);
// };

// const calculatePolarPostionY = (radius, angle, y) => {
//   return y + radius * Math.cos(angle * degToRad);
// };
