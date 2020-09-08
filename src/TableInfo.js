function TableInfo(seatAmount, posX, posY, width, height, rotation, type) {
  this.id = Date.now();
  this.seatAmount = seatAmount;
  this.posX = posX;
  this.posY = posY;
  this.width = width;
  this.height = height;
  this.rotation = rotation;
  this.type = type;
}

export default TableInfo;
