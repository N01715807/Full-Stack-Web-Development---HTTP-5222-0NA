import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import dotenv from "dotenv";
import { MongoClient, ObjectId } from "mongodb";

const __filename = fileURLToPath(import.meta.url);
const __dirname  = path.dirname(__filename);

dotenv.config();

const client = new MongoClient(process.env.MONGO_URL);
await client.connect();
const db = client.db("testdb");

const app = express();
const port = process.env.PORT || 8888;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");

app.use(express.static(path.join(__dirname, "public")));

async function getLinks() {
    return await db.collection("menuLinks").find({}).toArray();
}

async function addLink(link) {
  return await db.collection("menuLinks").insertOne(link);
}

async function getSingleLink(id) {
  return await db.collection("menuLinks").findOne({ _id: new ObjectId(String(id)) });
}

async function editLink(filter, linkData) {
  return await db.collection("menuLinks").updateOne(filter, { $set: linkData });
}

async function deleteLink(id) {
  const deleteQuery = { _id: new ObjectId(String(id)) };
  return await db.collection("menuLinks").deleteOne(deleteQuery);
}

app.get("/", async (req, res) => {
  const links = await getLinks();
  res.render("index", { title: "Home", menu: links });
});

app.get("/about", async (req, res) => {
  const links = await getLinks();
  res.render("about", { title: "About", menu: links });
});

app.get("/admin/menu", async (req, res) => {
  const links = await getLinks();
  res.render("menu-list", { title: "Administer menu links", menu: links });
});

app.get("/admin/menu/add",async(req,res)=>{
    res.render("menu-add", { title: "Add menu link" });
});

app.post("/admin/menu/add/submit", async (req, res) => {
  try {
    console.log("req.body =", req.body);

    let { name, path: href, weight } = req.body;
    if (!name || !href) return res.status(400).send("name and path are required");

    if (!href.startsWith("/")) href = `/${href}`;

    const w = parseInt(weight, 10);
    const safeWeight = Number.isFinite(w) && w >= 0 ? w : 0;

    const newLink = { name, path: href, weight: safeWeight, createdAt: new Date() };

    const result = await addLink(newLink);
    console.log("insertedId =", result.insertedId);

    res.redirect("/admin/menu");
  } catch (err) {
    console.error("Add link failed:", err);
    res.status(500).send("Failed to add link");
  }
});

app.get("/admin/menu/edit", async (req, res) => {
  try {
    const id = req.query.linkId;
    if (!id) return res.status(400).send("missing linkId");

    const link = await getSingleLink(id);
    if (!link) return res.status(404).send("link not found");

    res.render("menu-edit", { title: "Edit menu link", link });
  } catch (e) {
    console.error(e);
    res.status(500).send("Failed to load edit page");
  }
});

app.post("/admin/menu/edit/submit", async (req, res) => {
  try {
    const { linkId, name, path: hrefRaw, weight } = req.body;
    if (!linkId || !name || !hrefRaw) {
      return res.status(400).send("linkId, name and path are required");
    }

    let href = hrefRaw;
    if (!href.startsWith("/")) href = `/${href}`;

    const w = parseInt(weight, 10);
    const safeWeight = Number.isFinite(w) && w >= 0 ? w : 0;

    const filter = { _id: new ObjectId(String(linkId)) };
    const patch  = { name, path: href, weight: safeWeight, updatedAt: new Date() };

    const result = await editLink(filter, patch);

    res.redirect("/admin/menu");
  } catch (e) {
    console.error(e);
    res.status(500).send("Failed to edit link");
  }
});

app.get("/admin/menu/delete", async (req, res) => {
  try {
    const id = req.query.linkId;
    if (!id) return res.status(400).send("linkId is required");

    const result = await deleteLink(id);
    console.log("Deleted count =", result.deletedCount);

    res.redirect("/admin/menu");
  } catch (err) {
    console.error("Delete failed:", err);
    res.status(500).send("Failed to delete link");
  }
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});