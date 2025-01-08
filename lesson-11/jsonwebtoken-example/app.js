import jwt from "jsonwebtoken";
import "dotenv/config";

const {JWT_SECRET} = process.env;

const payload = {
    email: "xocir12840@fenxz.com"
};

const token = jwt.sign(payload, JWT_SECRET, {expiresIn: "1h"});
// console.log(token);
const decodeToken = jwt.decode(token);
// console.log(decodeToken);

try {
    const {email} = jwt.verify(token, JWT_SECRET);
    console.log(email);
    const invalidToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InhvY2lyMTI4NDBAZmVueHouY29tIiwiaWF0IjoxNzM2MzYzMjg1fQ.O0w7dZGYyxCCn9rMidLXNLlK5v9lo__wmHO5nHnFrO7";
    jwt.verify(invalidToken, JWT_SECRET);
}
catch(error) {
    console.log(error.message);
}