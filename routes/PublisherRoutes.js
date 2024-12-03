const express = require('express');
const router = express.Router();
const {
  getAllPublishers,
  getPublisherById,
  createPublisher,
  updatePublisher,
  index,
  deletePublisher,
  getCreatePublisher,
} = require('../controllers/PublisherController');

router.get("/", index)
router.get('/create', getCreatePublisher);
router.post('/create', createPublisher);
router.get("/update/:id", getCreatePublisher);
router.post("/update/:id", updatePublisher);
router.post("/delete/:id", deletePublisher);

module.exports = router;