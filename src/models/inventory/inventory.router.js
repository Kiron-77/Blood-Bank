const { USER_ROLES } = require('../../config/constant.config')
const authCheck = require('../../middlewares/auth.middleware')
const permissionCheck = require('../../middlewares/rbac.middleware')
const uploader = require('../../middlewares/uploader.middleware')
const { validator } = require('../../middlewares/validator.middliware')
const inventoryCtrl = require('./inventory.controller')
const { inventorySchema } = require('./inventory.request')


const router = require('express').Router()
router.route('/')
    .post(
        authCheck,
        permissionCheck(USER_ROLES.admin),
        validator(inventorySchema),
        inventoryCtrl.createInventory
)
    .get(
        authCheck,
        permissionCheck(USER_ROLES.admin),
        inventoryCtrl.listAllInventory
)
    router.route("/:id")
        .get(
            authCheck,
            permissionCheck([USER_ROLES.admin, USER_ROLES.user]),
            inventoryCtrl.getInventoryDetail
)
        .put(
            authCheck,
            permissionCheck(USER_ROLES.admin),
            validator(inventorySchema),
            inventoryCtrl.updateById
)
        .delete(
            authCheck,
            permissionCheck(USER_ROLES.admin),
            inventoryCtrl.deleteById
        )




module.exports = router