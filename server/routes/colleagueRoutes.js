const pool = require('../db/pool');
const express = require('express');
const router = express.Router();
const func = require('../functions/index');
const name = "colleague";

router.get(`/`, function (req, res) {
    // let query = `SELECT c.* ,b1.title as type,b2.title as rank
    //             FROM public.${name} as c left join baseinfo as b1 on c.type_id=b1.id 
    //                                      left join baseinfo as b2 on c.rank_id=b2.id
    //             order by c.id desc  `;
    let query = `SELECT c.* 
                FROM public.${name} as c 
                order by c.id desc  `;
    pool.query(query).then((results) => {
        return res.send(results.rows);
    })
        .catch((err) => {
            return res.send({ type: "Error", message: err.message })
        });
});
router.get(`/:key`, function (req, res) {
    let query = `SELECT * FROM ${name} where id = ${req.params.key} `;

    pool.query(query).then((results) => {
        return res.send(results.rows);
    })
        .catch((err) => {
            return res.send({ type: "Error", message: err.message })
        });
});
router.post('/', function (req, res) {
   // let data = JSON.parse(req.body.data);

    let query = func.queryGen(name, 'insert', req.body);
    pool.query(query).then((results) => {
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