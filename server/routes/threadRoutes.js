const threadRouter = require('express').Router();
const threadController = require('../controllers/threadController');
const fileUpload = require('express-fileupload');

threadRouter.post('/thread', threadController.addThread);
threadRouter.get('/thread', threadController.getThreads); 
threadRouter.get('/thread/:id', threadController.getThread);
threadRouter.delete('/thread/:id', threadController.deleteThread);
threadRouter.patch('/thread/:id', threadController.updateThread);
threadRouter.post('/thread/:id/announcement', threadController.addAnnouncement);
threadRouter.delete('/thread/:threadId/announcement/:announcementId', threadController.deleteAnnouncement);
threadRouter.patch('/thread/:threadId/announcement/:announcementId', threadController.updateAnnouncement);
threadRouter.get('/thread/:threadId/announcement', threadController.viewAnnouncements);
threadRouter.post('/upload', threadController.uploadFile);
threadRouter.get('/download/:fileName', threadController.downloadFile);

module.exports = threadRouter;