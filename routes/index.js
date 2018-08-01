'use strict'

const express = require('express')
const measurementsCtrl = require('../controllers/measurements')
const api = express.Router()

api.get('/product', measurementsCtrl.getMeasurements)
api.get('/product/:productId', measurementsCtrl.getMeasurement)
api.post('/product', measurementsCtrl.saveMeasurement)
api.put('/product/:productId', measurementsCtrl.updateMeasurement)
api.delete('/product/:productId', measurementsCtrl.deleteMeasurement)

module.exports = api