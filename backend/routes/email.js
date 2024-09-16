// Import the required modules
const express = require("express");
const router = express.Router();

const {createEmail, deleteEmail, getAllEmailById} = require("../controllers/Email")
const {isAuthenticated} = require("../middleware/isAuthenticated")
router.post("/create",isAuthenticated,createEmail);
router.delete("/:id",isAuthenticated,deleteEmail);
router.get("/getallemails", isAuthenticated, getAllEmailById);
module.exports = router;