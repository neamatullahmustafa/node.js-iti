const exp =require("express");
const app = exp();

app.get("/index.html",function (req,res) {
    res.send("express done");

})
app.listen(8081,function () {
})