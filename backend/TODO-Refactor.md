# Backend Refactor TODO (MVC)

### Middleware
- [ ] validation.js (express-validator helpers)
- [ ] errorHandler.js (global)

### Controllers (extract from routes)
- [ ] controllers/roomController.js
- [ ] controllers/bookingController.js
- [ ] controllers/userController.js
- [ ] controllers/diningController.js
- [ ] controllers/eventController.js
- [ ] controllers/offerController.js
- [ ] controllers/spaController.js
- [ ] controllers/galleryController.js
- [ ] controllers/dashboardController.js

### Routes (slim)
- [ ] Update all routes/*.js → router.method('/path', validate?, protect?, controller.func)

### Server
- [ ] Add global error handler
- [ ] Response utils

Start: roomController + rooms routes
