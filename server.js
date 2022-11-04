const express = require("express");
const { body, validationResult } = require("express-validator");
const cors = require("cors");
const app = express();

const PORT = process.env.PORT || 3001;
app.use(express.json());
app.use(cors());
app.get("/", (req, res) => {
  res.status(200).json({
    status: "success",
    data: {
      slackUsername: "Menez",
      backend: true,
      age: 25,
      bio: "Hi my name is Henry Ugochukwu Agu, i am a backend developer with one year experience and desire to network, learn more and become a pro developer",
    },
  });
});

app.post("/", (req, res) => {
  //operation_type: enum (addition | subtraction | multiplication)
  //“x”: Integer, “y”: Integer
  // body('x').isNumeric(),
  // body('y').isNumeric(),
  // body('operation_type').isNumeric()
  const operatorEnum = ["addition", "subtraction", "multiplication"];
  const x = req.body.x;
  const y = req.body.y;
  const operator = req.body.operation_type;
  let result;
  let index;
  if (operatorEnum.includes(operator)) {
    if (operator === "addition") {
        index = 0;
      result = x + y;
    } else if (operator === "subtraction") {
        index = 1;
      result = x - y;
    } else if (operator === "multiplication") {
        index = 2;
      result = x - y;
    }
 return  res.status(200).json({
        status: "success",
        data: {
          slackUsername: "Menez",
          result,
          operation_type: operatorEnum[index]
        },
      });
  } else {
   return res.status(400).json({
        status: "fail"});
  }
 
});

app.listen(PORT, () => {
  console.log(`Server is listening at port ${PORT}`);
});
