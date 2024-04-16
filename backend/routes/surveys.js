const express = require('express')
const {createSurvey, getSurvey, getSurveys, deleteSurvey, updateSurvey} = require('../controllers/surveyController')
const router = express.Router()

// get all surveys
router.get('/', getSurveys)

// GET a singl survey
router.get('/:id', getSurvey)
// POST a new survey
router.post('/', createSurvey)

// DELETE a survey
router.delete('/:id', deleteSurvey)

// UPDATE a survey
router.patch('/:id', updateSurvey)




module.exports = router