import express from 'express';
const router = express.Router();

import userRoute from './user.route';
import notesRoute from './notes.route';



/**
 * Function contains Application routes
 *
 * @returns router 
 */
const routes = () => {
  router.get('/', (req, res) => {res.send('Welcome');});
  
  router.use('/notes', notesRoute);
  router.use('/users', userRoute);
  
  return router;
};

export default routes;
