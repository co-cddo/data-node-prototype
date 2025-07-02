import express from "express";
import { Auth } from "../middleware/setupAuth";
import { cookieRouter } from "./cookieRoutes";
const router = express.Router();

/* GET coockie page. */
router.use("/cookie-settings", cookieRouter);
/* GET home page. */
router.get("/", (req, res) => {
  res.render("main/index");
});
/* GET home page. */
router.get("/record/add", (req, res) => {
  res.render("main/add_record");
});

router.post("/record/add", Auth, (req, res) => {
  const {
    addressLine1 = "",
    addressLine2 = "",
    addressTown = "",
    addressPostcode = "",
  } = req.body;
  const errorList = [];
  errorList.push({
    text: "Please enter your address",
    href: "#address-line-1",
  });
  errorList.push({
    text: "Please enter your town or city",
    href: "#address-town",
  });
  if ([addressLine1, addressTown, addressPostcode].includes("")) {
    res.locals.error = {
      title: "There are some errors",
      errorList,
    };
  }
  res.render("main/add_record");
});

// Make an API call with `Axios` and `middleware-axios`
// GET users from external API
router.get("/users", async (req, res, next) => {
  try {
    // Use the Axios instance attached to the request object
    const response = await req.axiosMiddleware.get(
      "https://jsonplaceholder.typicode.com/users"
    );
    res.json(response.data);
  } catch (error) {
    next(error);
  }
});

export default router;
