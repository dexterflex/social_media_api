import app from "./app.js";

app.listen(3000, (err) => {
    if (err) {
        console.log(err.message)
    }
    else {
        console.log("server is started");
    }
})