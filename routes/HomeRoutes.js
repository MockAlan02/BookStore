const express = require('express');
const router = express.Router();

const {
filter,
index,
detailsbyid
} = require('../controllers/HomeController');


router.get("/", index);
router.get("/filter", filter);
router.get("/details/:id", detailsbyid);
module.exports = router;