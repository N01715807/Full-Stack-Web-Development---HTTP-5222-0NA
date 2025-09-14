import express from "express";
import path from "path";
import { title } from "process";

const app = express();
const __dirname = import.meta.dirname
const port = process.env.PORT || 8888;

app.set("views", path.join(__dirname,"templates"));
app.set("view engine","pug")

app.use(express.static(path.join(__dirname,"public")))

app.get("/",(req,res)=>{
    res.status(200).render("index",{title:"Home|E-commerce Store"})
});
app.get("/about",(req,res)=>{
    res.status(200).render("about",{title:"AboutUS|E-commerce Store"})
});
app.listen(port, () => {
  console.log(`Listening on http://localhost:${port}`);
});