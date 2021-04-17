const pool = require('../db/pool');
const express = require('express');
const router = express.Router();
const func = require('../functions/index');
const name = "permission_structure";

router.get(`/`, function (req, res) {
    // let query = `SELECT c.* ,b1.title as type,b2.title as rank
    //             FROM public.${name} as c left join baseinfo as b1 on c.type_id=b1.id 
    //                                      left join baseinfo as b2 on c.rank_id=b2.id
    //             order by c.id desc  `;
    let query = `SELECT c.* ,b1.title as permission ,u.name as user
                FROM public.${name} as c left join baseinfo as b1 on c.permission_id=b1.id 
                                         left join public.user as u on c.user_id=u.id
                order by c.id desc  `;
    pool.query(query).then((results) => {
        return res.send(results.rows);
    })
        .catch((err) => {
            return res.send({ type: "Error", message: err.message })
        });
});
router.get(`/:key`, function (req, res) {
    const userId = req.query.userId;
    let query = `SELECT * FROM ${name} where entity_id = ${req.params.key}  and user_id =${userId} `;
//console.log(query);
    pool.query(query).then((results) => {
        return res.send(results.rows);
    })
        .catch((err) => {
            return res.send({ type: "Error", message: err.message })
        });
});
router.post('/', function (req, res) {
    let details = req.body.users;
    delete req.body.users;

    let query = func.queryGen(name, 'insert', req.body);
    pool.query(query).then((results) => {
        let parent_id = results.rows[0].id;
        // let query2=`INSERT INTO public.${name}_detail(
        //     machine_type_id,active, deactive, parent_id )
        //     VALUES `
        return res.send(results.rows);
    }).catch((err) => {
        return res.send({ type: "Error", message: err.message })
    });
});


router.put('/:id', function (req, res) {
    //  let data = JSON.parse(req.body.data);

    let query = func.queryGen(name, 'update', req.body);
    pool.query(query).then((results) => {
        return res.send(results.rows);
    }).catch((err) => {
        return res.send({ type: "Error", message: err.message })
    });
});
router.delete('/:id', function (req, res) {
    let query = `delete from public.${name} WHERE  id=${req.params.id};    `;
    //    console.log(query);
    pool.query(query)
        .then((results) => {
            return res.send(results.rows);
        })
        .catch((err) => {
            return res.send({ type: "Error", message: err.message })
        });
});
module.exports = router;