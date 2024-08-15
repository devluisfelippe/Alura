const { Router } = require('express')
const SegurancaController = require('../controllers/segurancaController')

const router = Router()

router
    .post('/seguranca/acl', SegurancaController.cadastrarAcl) // ACL -> access control list
    .post('/seguranca/permissoes-roles', SegurancaController.cadastrarPermissoesRoles)
module.exports = router