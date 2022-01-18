import express from 'express';
const router = express.Router();

import userRoute from './user.route';



/**
 * Function contains Application routes
 *
 * @returns router 
 */
const routes = () => {
  router.get('/', (req, res) => {
    res.send('Welcome');
  });
  
  router.use('/register', userRoute);
  



  return router;
};

export default routes;
