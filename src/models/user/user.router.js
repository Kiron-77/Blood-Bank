const express = require('express');
const userCtrl = require('./user.controller');
const { USER_ROLES } = require('../../config/constant.config');
const authCheck = require('../../middlewares/auth.middleware');
const permissionCheck = require('../../middlewares/rbac.middleware');
const inventoryCtrl = require('../inventory/inventory.controller');
const { validator } = require('../../middlewares/validator.middliware');
const userSchema = require('./user.request');
const router = express.Router();

router.route('/')
    .get(authCheck,
        permissionCheck(USER_ROLES.admin),
        userCtrl.getAlluser
    )
router.route("/:id")
    .get(authCheck,
        permissionCheck(USER_ROLES.admin),
        userCtrl.getUserDetail
    )
    .put(authCheck,
        permissionCheck(USER_ROLES.admin, USER_ROLES.user),
        validator(userSchema),
        userCtrl.updateUserById
    )
    .delete(
        authCheck,
        permissionCheck(USER_ROLES.admin),
        userCtrl.deleteById
    )
module.exports = router;