const router = new Router()
const controllers = require('./controllers')

router
  .get('/user', controllers.getUsersList)
  .get('/user/:id', controllers.getUsersById)
  .post('/user', controllers.addUsers)
  .put('/user/:id', controllers.updateUsers)
  .delete('/user/:id', controllers.delUsers)
  
module.exports = router