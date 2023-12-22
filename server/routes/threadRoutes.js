const threadRouter = require('express').Router();
const threadController = require('../controllers/threadController');
const fileUpload = require('express-fileupload');

threadRouter.post('/', threadController.addThread);
threadRouter.get('/', threadController.getThreads); 
threadRouter.get('/:id', threadController.getThread);
threadRouter.delete('/:id', threadController.deleteThread);
threadRouter.patch('/:id', threadController.updateThread);
threadRouter.post('/:id/announcement', threadController.addAnnouncement);
threadRouter.delete('/:threadId/announcement/:announcementId', threadController.deleteAnnouncement);
threadRouter.patch('/:threadId/announcement/:announcementId', threadController.updateAnnouncement);
threadRouter.get('/:threadId/announcement', threadController.viewAnnouncements);
threadRouter.post('/upload', threadController.uploadFile);
threadRouter.get('/download/:fileName', threadController.downloadFile);

module.exports = threadRouter;