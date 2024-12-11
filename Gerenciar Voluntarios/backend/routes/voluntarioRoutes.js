const express = require('express')
const VoluntarioController  = require('../controller/VoluntarioController.js')
const router = express.Router();

router.post('/',VoluntarioController.inserir);
router.get('/',VoluntarioController.buscarPorFiltro)
router.get('/:id',VoluntarioController.buscarPorId)
router.delete('/:id',VoluntarioController.deletar)
router.put('/:id',VoluntarioController.atualizar)

module.exports = router;