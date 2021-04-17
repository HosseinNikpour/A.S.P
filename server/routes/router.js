const express = require('express');
const router = express.Router();

/* API routes */
router.use('/baseInfo', require('./baseInfoRoutes'));
//router.use('/company', require('./companyRoutes'));
router.use('/user', require('./userRoutes'));
router.use('/permission', require('./permissionRoutes'));
router.use('/organizational', require('./organizationalRoutes'));
router.use('/keyword', require('./keywordRoutes'));
router.use('/colleague', require('./colleagueRoutes'));
router.use('/projects', require('./projectsRoutes'));
router.use('/trading_commission', require('./trading_commissionRoutes'));
router.use('/contract', require('./contractRoutes'));
router.use('/call', require('./callRoutes'));
router.use('/supplement', require('./supplementRoutes'));
module.exports = router;
