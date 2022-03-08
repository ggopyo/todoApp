const afs = (log, color = "blue", append = "", fontColor = "red") => {
  let time = new Date();
  let h = time.getHours();
  let m = time.getMinutes();
  let s = time.getSeconds();
  let newColor = "#";
  const randomHexArray = [
    0,
    1,
    2,
    3,
    4,
    5,
    6,
    7,
    8,
    9,
    "A",
    "B",
    "C",
    "D",
    "E",
    "F",
  ];

  if (color === "r") {
    for (var i = 0; i < 6; i++) {
      var randomNumber = parseInt(Math.random() * 16);
      newColor += randomHexArray[randomNumber];
    }
  } else newColor = color;
  console.log(
    "%c" +
      "↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓" +
      h +
      ":" +
      m +
      ":" +
      s +
      "↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓",
    "background:" + newColor + "; color: " + fontColor
  );
  console.log(append, log);

  console.log(
    "%c" +
      "↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑" +
      h +
      ":" +
      m +
      ":" +
      s +
      "↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑",
    "background:" + newColor + "; color: " + fontColor
  );
};
export { afs };
