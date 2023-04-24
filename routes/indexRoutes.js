const express = require('express');
const indexController = require('../controllers/indexController');
const router = express.Router();

router.get('/', indexController.loadMain);
router.post('/search', indexController.searchEvent);
router.post('/add', indexController.addEvent);
router.get('/edit/:eventId', indexController.editEvent)
// router.post('/edit', indexController.editEvent);

module.exports = router;
