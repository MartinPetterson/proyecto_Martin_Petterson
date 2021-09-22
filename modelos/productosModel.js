var pool = require('./bd');

async function getproductos() {
    var query = "select * from productos order by id ";
    var rows = await pool.query(query);
    return rows;
}

async function deleteproductosById(id) {
    var query = "delete from productos where id = ? ";
    var rows = await pool.query(query, [id]);
    return rows;
}


async function insertproductos(obj) {
    try {
    var query = "insert into productos set ? ";
    var rows = await pool.query(query, [obj]);
    return rows;
} catch (error) {
    console.log(error);
    throw error;
}
}

async function getproductosById(id) {
    var query = "select * from productos where id = ? ";
    var rows = await pool.query(query, [id]);
    return rows [0];
}

async function modificarproductosByid(obj, id) {
    try {
        var query = "update productos set ? where id=?";
        var rows = await pool.query(query, [obj, id]);
        return rows;
    } catch (error) {
        throw error;
    }
}



module.exports = { getproductos, deleteproductosById, insertproductos, getproductosById, modificarproductosByid };

