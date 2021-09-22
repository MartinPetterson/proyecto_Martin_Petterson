var express = require('express');
var router = express.Router();
var productosModel = require('../../modelos/productosModel');

// var usuariosModel = require('./../../modelos/usuariosModel');


router.get('/', async function (req, res, next) {
    var productos = await productosModel.getproductos();
    res.render('admin/productos', {
        layout: 'admin/layout',

        productos
    });
});


// Borrar producto

router.get('/eliminar/:id', async (req, res, next) => {
    var id = req.params.id;
    await productosModel.deleteproductosById(id);
    res.redirect('/admin/productos')
});

router.get('/agregar', (req, res, next) => {
    res.render('admin/agregar', {
        layout: 'admin/layout'
    });
});

router.post('/agregar', async (req, res, next) => {
    try {
        if (req.body.id != "" && req.body.titulo != "" && req.body.descripcion != "" &&
            req.body.precio != "" && req.body.estado != "") {
            await productosModel.insertproductos(req.body);
            res.redirect('/admin/productos')
        } else {
            res.render('admin/agregar', {
                layout: 'admin/layout',
                error: true, message: 'Es obligatorio completar todos los campos'
            })
        }
    } catch (error) {
        console.log(error)
        res.render('admin/agregar', {
            layout: 'admin/layout',
            error: true, message: 'El producto no pudo ser cargado, intente de nuevo'
        });
    }
});

router.get('/modificar/:id', async (req, res, next) => {

    let id = req.params.id;
    let productos = await productosModel.getproductosById(id);
    res.render('admin/modificar', {
        layout: 'admin/layout',
        productos
    });
});

router.post('/modificar', async (req, res, next) => {
    try {
        let obj = {
            titulo: req.body.titulo,
            descripcion: req.body.descripcion,
            precio: req.body.precio,
            estado: req.body.estado
        }

        await productosModel.modificarproductosByid( obj, req.body.id );
        res.redirect ('/admin/productos');
    }

    catch (error) {
        console.log (error)
        res.render('admin/modificar', {
            layout: 'admin/layout',
            error: true, message: 'No se pudo modificar la novedad. Intente de nuevo'
        })
    }
})

module.exports = router;