// import app from backend/app.js
const app = require("./backend/app");

// server listen to reqrs on port 3001 (http://localhost:3001)
app.listen(3001, ()=> {
    console.log("server is listening on port 3001 ....");
})