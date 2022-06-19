var express = require('express');
var firebaseAuth = require('firebase/auth');
var firebaseApp = require('firebase/app');
const { browserSessionPersistence } = require('firebase/auth');
var router = express.Router();

/* GET home page.
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});*/

router.get('/', function(req, res, next) {
  res.render('index');
});
router.get('/menu-usuario', function(req, res, next) {
  res.render('menu-usuario');
});
router.get('/menu-admin', function(req, res, next) {
  res.render('menu-admin')
 // if(usuario !== null) next(res.render('menu-admin'))
 // else next(res.render('index'))
});
router.get('/formulario-dti', function(req, res, next) {
  res.render('formulario-dti');
});
router.get('/formulario-predial', function(req, res, next) {
  res.render('formulario-predial');
});
router.get('/formulario-ocorrencias', function(req, res, next) {
  res.render('formulario-ocorrencias');
});
router.get('/caixa-entrada-dti', function(req, res, next) {
  res.render('caixa-entrada-dti');
});
router.get('/caixa-entrada-predial', function(req, res, next) {
  res.render('caixa-entrada-predial');
});
router.get('/caixa-entrada-ocorrencias', function(req, res, next) {
  res.render('caixa-entrada-ocorrencias');
});
router.get('/meus-chamados', function(req, res, next) {
  res.render('meus-chamados');
});
router.get('/minha-conta', function(req, res, next) {
  res.render('minha-conta');
});
router.get('/chamado/:docId', function(req, res, next) {
  res.render('chat');
});
router.get('/chat', function(req, res, next) {
  res.render('chat');
});

module.exports = router;
