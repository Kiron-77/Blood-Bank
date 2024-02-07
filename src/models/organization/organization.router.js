const { USER_ROLES } = require('../../config/constant.config')
const authCheck = require('../../middlewares/auth.middleware')
const permissionCheck = require('../../middlewares/rbac.middleware')
const uploader = require('../../middlewares/uploader.middleware')
const { validator } = require('../../middlewares/validator.middliware')
const organizationCtrl = require('./organization.controller')
const { organizationSchema } = require('./organization.request')


const router = require('express').Router()
router.route('/')
    .post(
        authCheck,
        permissionCheck(USER_ROLES.admin,USER_ROLES.organization),
        validator(organizationSchema),
        organizationCtrl.createOrganization
)
    .get(
        authCheck,
        permissionCheck(USER_ROLES.admin),
        organizationCtrl.listAllOrganization
)
    router.route("/:id")
        .get(
            authCheck,
            permissionCheck([USER_ROLES.admin, USER_ROLES.user]),
            organizationCtrl.getOrganizationDetail
)
        .put(
            authCheck,
            permissionCheck(USER_ROLES.admin),
            validator(organizationSchema),
            organizationCtrl.updateById
)
        .delete(
            authCheck,
            permissionCheck(USER_ROLES.admin),
            organizationCtrl.deleteById
        )




module.exports = router