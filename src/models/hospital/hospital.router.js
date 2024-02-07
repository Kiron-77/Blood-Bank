const { USER_ROLES } = require('../../config/constant.config')
const authCheck = require('../../middlewares/auth.middleware')
const permissionCheck = require('../../middlewares/rbac.middleware')
const uploader = require('../../middlewares/uploader.middleware')
const { validator } = require('../../middlewares/validator.middliware')
const hospitalCtrl = require('./hospital.controller')
const { hospitalSchema } = require('./hospital.request')


const router = require('express').Router()
router.route('/')
    .post(
        authCheck,
        permissionCheck(USER_ROLES.admin,USER_ROLES.hospital),
        validator(hospitalSchema),
        hospitalCtrl.createHospital
)
    .get(
        authCheck,
        permissionCheck(USER_ROLES.admin),
        hospitalCtrl.listAllHospital
)
    router.route("/:id")
        .get(
            authCheck,
            permissionCheck([USER_ROLES.admin, USER_ROLES.user]),
            hospitalCtrl.getHospitalDetail
)
        .put(
            authCheck,
            permissionCheck(USER_ROLES.admin),
            validator(hospitalSchema),
            hospitalCtrl.updateById
)
        .delete(
            authCheck,
            permissionCheck(USER_ROLES.admin),
            hospitalCtrl.deleteById
        )




module.exports = router