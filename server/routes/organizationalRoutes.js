const pool = require('../db/pool');
const express = require('express');
const router = express.Router();
const func = require('../functions/index');
const name = "organizational";

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
router.get(`/details/:key`, function (req, res) {
    let query = `SELECT * FROM ${name} where id = ${req.params.key} `;

    pool.query(query).then((results) => {
        return res.send(results.rows);
    })
        .catch((err) => {
            return res.send({ type: "Error", message: err.message })
        });
});
router.post('/', function (req, res) {
    let details = req.body.details;
    delete req.body.details;

    let query = func.queryGen(name, 'insert', req.body);
    pool.query(query).then((results) => {
        let parent_id = results.rows[0].id;
        let query_d = `INSERT INTO public.${name}_detail(
            parent_id, name, "position", mobile, tell)
            VALUES `;
        details.forEach(e => {
            query_d += `(${parent_id},'${e.name}','${e.position}','${e.mobile}','${e.tell}'),`
        });
        query_d = query_d.slice(0, -1);
        console.log(query_d);
        pool.query(query_d).then((results_d) => {
            return res.send(results.rows);
        });


    }).catch((err) => {
        return res.send({ type: "Error", message: err.message })
    });
});


router.put('/:id', function (req, res) {
    let details = req.body.details;
    delete req.body.details;

    let parent_id = req.params.id;

    let query = func.queryGen(name, 'update', req.body);
    pool.query(query).then((results) => {
        pool.query(`delete from public.${name}_detail WHERE parent_id=${parent_id}`).then((results) => {

            let query_d = `INSERT INTO public.${name}_detail(
                parent_id, name, "position", mobile, tell)
                VALUES `;
            details.forEach(e => {
                query_d += `(${parent_id},'${e.name}','${e.position}','${e.mobile}','${e.tell}'),`
            });
            query_d = query_d.slice(0, -1);
            console.log(query_d);
            pool.query(query_d).then((results_d) => {
                return res.send(results.rows);
            });
        });
    }).catch((err) => {
        return res.send({ type: "Error", message: err.message })
    });
});
router.delete('/:id', function (req, res) {
    let parent_id = req.params.id;
    let query = `delete from public.${name} WHERE  id=${parent_id};    `;
    //    console.log(query);
    pool.query(query).then((results) => {
        pool.query(`delete from public.${name}_detail WHERE parent_id=${parent_id}`).then((results) => {
            return res.send(results.rows);
        });
    })
        .catch((err) => {
            return res.send({ type: "Error", message: err.message })
        });
});
module.exports = router;