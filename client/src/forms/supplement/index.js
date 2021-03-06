import React, { useState, useEffect, useRef } from 'react';
import { getItems, insertItem, deleteItem, updateItem, getItem } from '../../api/index';
import TableContainer from "../../components/TableContainer";
import { columns, entityName, pageHeader } from './statics';
import { message, Select } from 'antd';
import DatePicker from 'react-datepicker2';
import Static, { checkPermission } from '../static';
import moment from 'moment-jalaali';
import NumberFormat from 'react-number-format';

const Supplement = (props) => {
    const BoxRef = useRef(null), GridRef = useRef(null);;

    const [data, setData] = useState([]);
    const [errors, setErrors] = useState({});
    const [obj, setObj] = useState({});
    const [per, setPer] = useState({});
    const [mode, setMode] = useState('');
    const [contract_number_options, setContract_number_options] = useState([]);
    const [calc, setCalc] = useState({});

    const getData = () => {
        setMode('');
        GridRef.current.scrollIntoView({ behavior: 'smooth' });
        Promise.all([getItems(entityName), getItems("contract"), getItem(7, "permission")]).then((response) => {
            let cp = checkPermission(response[2].data);
            if (cp.canRead) {
                setPer(cp);

                let dt = response[0].data;
                dt.forEach(e => {
                    e.end_date = e.end_date ? moment(e.end_date) : undefined;
                    e.end_datedisplay = e.end_date && moment.isMoment(e.end_date) ? e.end_date.format('jYYYY/jMM/jDD') : '';

                });
                setData(dt);
                setContract_number_options(response[1].data.map(a => { return { key: a.id, label: a.title + "_" + a.contract_number, value: a.id, contractor: a.contractor } }));
            }

        })
        setObj({});
        setErrors({});
    }
    useEffect(() => {
        getData();
    }, [])


    const btnNewClick = () => {
        setMode('new');
        BoxRef.current.scrollIntoView({ behavior: 'smooth' });
    }
    const saveBtnClick = () => {


        let err = {};
        columns.filter(a => a.req).forEach(a => {
            if (a.type === 'lookup')
                err[a.accessor + "_id"] = obj[a.accessor + "_id"] ? false : true;
            else
                err[a.accessor] = obj[a.accessor] ? false : true;
        })




        if (Object.values(err).filter(a => a).length > 0) {
            setErrors(err);
            BoxRef.current.scrollIntoView({ behavior: 'smooth' });
            alert("???????? ?????????? ???????????? ???? ???????? ????????");
        }
        else {
            delete obj.end_datedisplay;


            if (mode === 'new') {
                insertItem(obj, entityName).then(response => {
                    if (response.data.type !== "Error") {
                        message.success('???????? ???? ???????????? ?????????? ????');
                        //alert('???????? ???? ???????????? ?????????? ????');
                        getData();
                    }
                    else {


                        if (response.data.message.indexOf('duplicate key value violates unique constraint') > -1)
                            message.error(Static.errorMesesagDuplicate, Static.errorDuration);
                        else {
                            //alert('?????? ???? ?????????? ???????? ??????????????');
                            message.error('?????? ???? ?????????? ???????? ??????????????', 3000);
                            console.log(response.data.message);
                        }
                    }

                }).catch((error) => {
                    message.error('???????? ?????? ???? ??????????', 3000);
                    console.log(error)
                });
            }
            else if (mode === 'edit') {
                updateItem(obj, entityName).then(response => {
                    if (response.data.type !== "Error") {
                        message.success('???????? ???? ???????????? ?????????? ????');
                        //alert('???????? ???? ???????????? ?????????? ????');
                        getData();
                    }
                    else {

                        if (response.data.message.indexOf('duplicate key value violates unique constraint') > -1)
                            message.error(Static.errorMesesagDuplicate, Static.errorDuration);
                        else {
                            // alert('?????? ???? ?????????? ???????? ??????????????');
                            message.error('?????? ???? ?????????? ???????? ??????????????', 3000);
                            console.log(response.data.message);
                        }
                    }
                }).catch((error) => {
                    message.error('???????? ?????? ???? ??????????', 3000);
                    console.log(error)
                });
            }
        }
    }
    const deleteBtnClick = (item) => {

        deleteItem(item.id, entityName).then(a => {
            getData();
        });

    }
    const displayBtnClick = (item) => {
        setMode('display');
        BoxRef.current.scrollIntoView({ behavior: 'smooth' });
        setObj(item);
    }
    const editBtnClick = (item) => {
        setMode('edit');
        BoxRef.current.scrollIntoView({ behavior: 'smooth' });
        setObj(item);
    }
    const cancelBtnClick = () => {
        setMode('');
        GridRef.current.scrollIntoView({ behavior: 'smooth' });

    }
    return (<div className="container-fluid">
        <div className="row" style={{ paddingTop: '15px' }}>
            <div className="col">
                <div className="card ">
                    <div className="card-header border-0">
                        <div className="row align-items-center" ref={GridRef}>
                            <div className="col">
                                <h3 className="mb-0">?????????????? ???? </h3>
                            </div>
                            {per.canAdd && <div className="col text-right">
                                <button className="btn btn-icon btn-primary" type="button" onClick={btnNewClick}>
                                    <span className="btn-inner--icon"><i className="fas fa-plus"></i></span>
                                    <span className="btn-inner--text">???????? ????????</span>
                                </button>

                            </div>}
                        </div>
                    </div>
                    <div className='table-responsive'>
                        <TableContainer columns={columns.filter(a => !a.notInGrid)} data={data} downloadName={pageHeader}
                            deleteClick={per.canEdit ? deleteBtnClick : undefined}
                            displayClick={displayBtnClick}
                            editClick={per.canEdit ? editBtnClick : undefined} />
                    </div>
                </div>
            </div>
        </div>

        <div className="row" style={{ paddingTop: '15px' }} ref={BoxRef}>
            {mode !== '' && <div className="col">
                <div className="card ">
                    <div className="card-header border-0">
                        <div className="row align-items-center">
                            <div className="col">
                                <h3 className="mb-0">  {mode === 'new' ? '?????????? ???????? ???????? ????????' : mode === 'edit' ? '???????????? ????????' : '???????????? ????????'}</h3>
                                <hr></hr>
                            </div>
                        </div>
                    </div>
                    <div className='card-body' style={{ marginTop: '-50px' }}>
                        <form>
                            <div className="row"><div className="col">
                                <div className="form-group">
                                    <label className="form-control-label">?????????? ??????????????</label>
                                    <label className="req-label"> *</label>
                                    <input className={errors.title ? "form-control error-control" : "form-control"} type="text" value={obj.title}
                                        onChange={(e) => setObj({ ...obj, title: e.target.value })} disabled={mode === 'display'} />
                                </div>
                            </div><div className="col">
                                    <div className="form-group">
                                        <label className="form-control-label">?????? ?? ?????????? ??????????????</label>
                                        <label className="req-label"> *</label>
                                        <Select className={errors.contract_number_id ? "form-control error-control" : "form-control"} {...Static.selectDefaultProp} disabled={mode === 'display'} options={contract_number_options}
                                            value={obj.contract_number_id} onSelect={(values) => { setObj({ ...obj, contract_number_id: values }); setCalc({ contractor: contract_number_options.find(a => a.key === values).contractor }) }}
                                        />
                                    </div>
                                </div>
                                <div className="col">
                                    <div className="form-group">
                                        <label className="form-control-label">????????????????</label>
                                        <label className="form-control">{calc.contractor}</label>

                                    </div>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-4">
                                    <div className="form-group">
                                        <label className="form-control-label">???????? ???????? (????????????)</label>
                                        <label className="req-label"> *</label>
                                        {/* <input className={errors.new_amount ? "form-control error-control" : "form-control"} type="number" value={obj.new_amount}
                                            onChange={(e) => setObj({ ...obj, new_amount: e.target.value })} disabled={mode === 'display'} />
                                             */}
                                                <NumberFormat onValueChange={(e) => setObj({ ...obj, new_amount: e.value })}
                                            {...Static.numberDefaultProp} disabled={mode === 'display'} value={obj.new_amount}
                                            className={errors.new_amount ? "form-control error-control" : "form-control"}/>
                                    </div>
                                </div>
                                <div className="col-4">
                                    <div className="form-group">
                                    <label className="form-control-label">???????? ???????? (????????)</label>
                                        {/* <label className="req-label"> *</label> */}
                                        {/* <input className={errors.new_amount_net ? "form-control error-control" : "form-control"} type="number" value={obj.new_amount_net}
                                            onChange={(e) => setObj({ ...obj, new_amount_net: e.target.value })} disabled={mode === 'display'} /> */}

                                            <NumberFormat onValueChange={(e) => setObj({ ...obj, new_amount_net: e.value })}
                                            {...Static.numberDefaultProp} disabled={mode === 'display'} value={obj.new_amount_net}
                                            className={errors.new_amount_net ? "form-control error-control" : "form-control"}/>
                                    </div>
                                </div>
                                <div className="col">
                                    <div className="form-group">
                                        <label className="form-control-label">?????????? ?????????? ????????</label>
                                        <DatePicker onChange={value => setObj({ ...obj, end_date: value })}
                                            value={obj.end_date} disabled={mode === 'display'} {...Static.datePickerDefaultProp}
                                            className={errors.end_date ? "form-control error-control" : 'form-control'} />
                                    </div>
                                </div>
                            </div>
                            <div className="row">
                            <div className="col-4">
                                    <div className="form-group">
                                        <label className="form-control-label">???????????? ????????</label>
                                        <input className={errors.new_commitments ? "form-control error-control" : "form-control"} type="text" value={obj.new_commitments}
                                            onChange={(e) => setObj({ ...obj, new_commitments: e.target.value })} disabled={mode === 'display'} />
                                    </div>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col">
                                    {mode !== "display" && <button type="button" className="btn btn-outline-primary" onClick={saveBtnClick}>??????????</button>}
                                    <button type="button" className="btn btn-outline-warning" onClick={cancelBtnClick}>????????????</button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
            }
        </div>

    </div>)
}

export default Supplement;