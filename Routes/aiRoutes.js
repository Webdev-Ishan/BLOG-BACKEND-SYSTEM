import express from 'express'
const aiRouter = express.Router()
import *as aiController from '../Controllers/ai.controllers.js'

aiRouter.get("/response",aiController.getresult)

export default aiRouter

