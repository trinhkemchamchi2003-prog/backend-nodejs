const { notFount } = require('../utils/handleResponse.util');
const commonRoutes = require('./common/index.route');
const adminRoutes = require('./admin/index.route');

const initRoutes = (app) => {
    app.use('/api/v1/common', commonRoutes);
    app.use('/api/v1/admin', adminRoutes);
    return app.use('/', notFount);
};

module.exports = initRoutes;
