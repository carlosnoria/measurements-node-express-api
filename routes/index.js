'use strict'

const express = require('express')
const measurementsCtrl = require('../controllers/measurements')
const api = express.Router()

api.get('/measure', measurementsCtrl.getMeasurements)
api.get('/measure/:measureId', measurementsCtrl.getMeasurement)
api.post('/measure', measurementsCtrl.saveMeasurement)
api.put('/measure/:measureId', measurementsCtrl.updateMeasurement)
api.delete('/measure/:measureId', measurementsCtrl.deleteMeasurement)

module.exports = api