import express from 'express'
import { createAssistant, deleteAssistant, searchAssistant, updateAssistant } from '../controllers/assistantController.js';

const assistantRouter = express.Router();

// assistantRouter.get('/', (req,res) => {
//     res.send('assistant route is working!')
// })

assistantRouter.post('/create', createAssistant)
assistantRouter.get('/:id', searchAssistant);
assistantRouter.put('/:id', updateAssistant);
assistantRouter.delete('/:id', deleteAssistant);

export default assistantRouter;