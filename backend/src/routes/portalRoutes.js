const express = require('express');
const router = express.Router();
const portalController = require('../controllers/portalController');
const uploadFile = require('../middlewares/upload');
const { authMiddleware } = require('../middlewares/authMiddleware');

router.post('/upload_resume', uploadFile.single('file'), portalController.uploadResume);
router.post('/fresher_registration', portalController.fresherRegistration);
router.post('/experienced_registration', portalController.experiencedRegistration);
router.get('/get_all_candidates', authMiddleware, portalController.getAllUnassignedCanditates);
router.patch('/assign_candidate_to_me/:candidateId', authMiddleware, portalController.assignedToMe)
router.get('/get_all_assigned_to_me', authMiddleware, portalController.getAssignedCanditatesToMe);
router.get('/get_all_assigned', authMiddleware, portalController.getAllAssignedCanditates);
router.patch('/change_candidate_status/:candidateId', authMiddleware, portalController.statusChange)
router.patch('/add_remark/:candidateId', authMiddleware, portalController.addRemark)

module.exports = router;
