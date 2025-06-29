const express = require('express');
const router = express.Router();
const portalController = require('../controllers/portalController');
const uploadFile = require('../middlewares/upload');
const { authMiddleware } = require('../middlewares/authMiddleware');

router.post('/upload_resume', uploadFile.single('file'), portalController.uploadResume);
router.post('/fresher_registration', portalController.fresherRegistration);
router.post('/experienced_registration', portalController.experiencedRegistration);
router.get('/get_all_candidates', authMiddleware, portalController.getAllUnassignedCanditates);
router.patch('/assigned_to_me/:candidateId', authMiddleware, portalController.assignedToMe)
router.get('/get_all_assigned', authMiddleware, portalController.getAllAssignedCanditates)

module.exports = router;
