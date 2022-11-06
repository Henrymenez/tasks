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

app.post("/", body("x").isInt(), body("y").isInt(), (req, res) => {
  const x = req.body.x;
  const y = req.body.y;
  let operator = req.body.operation_type;
  const operatorEnum = ["addition", "subtraction", "multiplication"];
  let result = 0;
  let index;

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  // if (operatorEnum.includes(operator)) {
  if (operator === "addition") {
    index = 0;
    result = x + y;
  } else if (operator === "subtraction") {
    index = 1;
    result = x - y;
  } else if (operator === "multiplication") {
    result = x * y;
    index = 2;
  } else {
    let add = ["addition", "add", "plus"];
    let subtract = ["subtract", "minus"];
    let multiply = ["multiplication", "multiply", "multiple", "times"];
    let operands = operator.split(" ");
    let data = [];
    operands.forEach((element) => {
      if (add.includes(element.toLowerCase())) {
        operator = "addition";
      } else if (subtract.includes(element.toLowerCase())) {
        operator = "subtraction";
      } else if (multiply.includes(element.toLowerCase())) {
        operator = "multiplication";
      }
      if (!isNaN(element)) {
        data.push(parseInt(element));
      }
    });
    if (data.length > 0) {
  
      for (let i = 0; i < data.length; i++) {
        if (i == 0) {
          result = parseInt(data[i]);
    
        } else {
          if (operator == "addition") {
            index = 0;
            result += parseInt(data[i]);
    
          } else if (operator == "subtraction") {
            index = 1;
            result -= parseInt(data[i]);
          } else if (operator == "multiplication") {
            result *= parseInt(data[i]);
            index = 2;
          }
        }
      }
    } else {

      if (operator == "addition") {
        index = 0;
        result = x + y;
      } else if (operator == "subtraction") {
        index = 1;
        result = x - y;
      } else if (operator == "multiplication") {
        result = x * y;
        index = 2;
      }
    }
  }
  return res.status(200).json({
    slackUsername: "Menez",
    operation_type: operator,
    result,
  });
});
app.listen(PORT, () => {
  console.log(`Server is listening at here port ${PORT}`);
});
