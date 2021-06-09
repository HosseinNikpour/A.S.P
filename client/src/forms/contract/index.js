import React, { useState, useEffect, useRef } from 'react';
import { getItems, insertItem, deleteItem, updateItem, getItem } from '../../api/index';
import TableContainer from "../../components/TableContainer";
import { columns, entityName, pageHeader } from './statics';
import { message, Select } from 'antd';
import DatePicker from 'react-datepicker2';
import Static, { checkPermission } from '../static';
import moment from 'moment-jalaali'
import NumberFormat from 'react-number-format';

const Contract = (props) => {
    const BoxRef = useRef(null), GridRef = useRef(null);;

    const [data, setData] = useState([]);
    const [errors, setErrors] = useState({});
    const [per, setPer] = useState({});
    const [obj, setObj] = useState({});
    const [mode, setMode] = useState('');
    const [projects_options, setProjects_options] = useState([]);
    const [calc, setCalc] = useState({});
    const [contracting_party_options, setContracting_party_options] = useState([]);
    const [type_tender_options, setType_tender_options] = useState([]);
    const [commission_members_options, setCommission_members_options] = useState([]);
    const [contract_type_options, setContract_type_options] = useState([]);
    const [project_manager_options, setProject_manager_options] = useState([]);
    const [contractor_options, setContractor_options] = useState([]);
    const [consultant_options, setConsultant_options] = useState([]);
    const [employer_options, setEmployer_options] = useState([]);
    const [province_options, setProvince_options] = useState([]);
    const [type_guarantee_options, setType_guarantee_options] = useState([]);
    const [type_payment_options, setType_payment_options] = useState([]);
    const getData = () => {
        setMode('');
        GridRef.current.scrollIntoView({ behavior: 'smooth' });
        Promise.all([getItems(entityName), getItems("baseInfo"), getItems("organizational"), getItems("colleague"), getItems("projects")
            , getItems("trading_commission"), getItem(1, "permission")]).then((response) => {
                let cp = checkPermission(response[6].data);
                if (cp.canRead) {
                    setPer(cp);

                    let dt = response[0].data;
                    dt.forEach(e => {

                        e.date_ratifcation = e.date_ratifcation ? moment(e.date_ratifcation) : undefined;
                        e.date_signiification = e.date_signiification ? moment(e.date_signiification) : undefined;
                        e.date_commission = e.date_commission ? moment(e.date_commission) : undefined;
                        e.start_date = e.start_date ? moment(e.start_date) : undefined;
                        e.end_date = e.end_date ? moment(e.end_date) : undefined;
                        e.end_dategrid = e.end_date && moment.isMoment(e.end_date) ? e.end_date.format('jYYYY/jMM/jDD') : '';
                        e.date_signiificationgrid = e.date_signiification && moment.isMoment(e.date_signiification) ? e.date_signiification.format('jYYYY/jMM/jDD') : '';
                    });
                    setData(dt);

                    setProjects_options(response[4].data.map(a => { return { key: a.id, label: a.title, value: a.id, code: a.project_code } }));
                    setContracting_party_options(response[2].data.map(a => { return { key: a.id, label: a.title, value: a.id } }));
                    setType_tender_options(response[1].data.filter(a => a.groupid === 8).map(a => { return { key: a.id, label: a.title, value: a.id } }));
                    setCommission_members_options(response[5].data.map(a => { return { key: a.id, label: a.title, value: a.id } }));
                    setContract_type_options(response[1].data.filter(a => a.groupid === 5).map(a => { return { key: a.id, label: a.title, value: a.id } }));
                    setProject_manager_options(response[3].data.map(a => { return { key: a.id, label: a.name + ' ' + a.last_name, value: a.id, pmanager: a.phone_number } }));
                    setEmployer_options(response[2].data.map(a => { return { key: a.id, label: a.title, value: a.id } }));
                    setContractor_options(response[2].data.map(a => { return { key: a.id, label: a.title, value: a.id } }));
                    setConsultant_options(response[2].data.map(a => { return { key: a.id, label: a.title, value: a.id } }));
                    setProvince_options(response[1].data.filter(a => a.groupid === 9).map(a => { return { key: a.id, label: a.title, value: a.id } }));
                    setType_guarantee_options(response[1].data.filter(a => a.groupid === 4).map(a => { return { key: a.id, label: a.title, value: a.id } }));
                    setType_payment_options(response[1].data.filter(a => a.groupid === 4).map(a => { return { key: a.id, label: a.title, value: a.id } }));

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
            alert("لطفا موارد الزامی را وارد کنید");
        }

        else {
            delete obj.end_dategrid;
            delete obj.date_signiificationgrid;

            if (mode === 'new') {
                insertItem(obj, entityName).then(response => {
                    if (response.data.type !== "Error") {
                        message.success('آیتم با موفقیت ذخیره شد');
                        //alert('آیتم با موفقیت ذخیره شد');
                        getData();
                    }
                    else {
                        if (response.data.message.indexOf('duplicate key value violates unique constraint') > -1)
                            message.error(Static.errorMesesagDuplicate, Static.errorDuration);
                        else {
                            message.error('خطا در ذخیره سازی اطلاعات', 3000);
                            console.log(response.data.message);
                        }
                    }

                }).catch((error) => {
                    message.error('بروز خطا در سیستم', 3000);
                    console.log(error)
                });
            }
            else if (mode === 'edit') {
                delete obj.project_name;
                updateItem(obj, entityName).then(response => {
                    if (response.data.type !== "Error") {
                        message.success('آیتم با موفقیت ذخیره شد');
                        //alert('آیتم با موفقیت ذخیره شد');
                        getData();
                    }
                    else {
                        if (response.data.message.indexOf('duplicate key value violates unique constraint') > -1)
                            message.error(Static.errorMesesagDuplicate, Static.errorDuration);
                        else {
                            message.error('خطا در ذخیره سازی اطلاعات', 3000);
                            console.log(response.data.message);
                        }
                    }
                }).catch((error) => {
                    message.error('بروز خطا در سیستم', 3000);
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
        item.commission_members_id = item.commission_members_id ? item.commission_members_id : [];
        ;
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
                                <h3 className="mb-0">اطلاعات قراردادها</h3>
                            </div>
                            {per.canAdd && <div className="col text-right">
                                <button className="btn btn-icon btn-primary" type="button" onClick={btnNewClick}>
                                    <span className="btn-inner--icon"><i className="fas fa-plus"></i></span>
                                    <span className="btn-inner--text">مورد جدید</span>
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
                                <h3 className="mb-0">  {mode === 'new' ? 'اضافه کردن آیتم جدید' : mode === 'edit' ? 'ویرایش آیتم' : 'مشاهده آیتم'}</h3>
                                <hr></hr>
                            </div>
                        </div>
                    </div>
                    <div className='card-body' style={{ marginTop: '-50px' }}>
                        <form>
                            <div className="row">
                                <div className="col">
                                    <div className="form-group">
                                        <label className="form-control-label">شماره قرارداد</label>
                                        <label className="req-label"> *</label>
                                        <input className={errors.contract_number ? "form-control error-control" : "form-control"} type="text" value={obj.contract_number}
                                            onChange={(e) => setObj({ ...obj, contract_number: e.target.value })} disabled={mode === 'display'} />
                                    </div>
                                </div>
                                <div className="col">
                                    <div className="form-group">
                                        <label className="form-control-label">نام قرارداد</label>
                                        <label className="req-label"> *</label>
                                        <input className={errors.title ? "form-control error-control" : "form-control"} type="text" value={obj.title}
                                            onChange={(e) => setObj({ ...obj, title: e.target.value })} disabled={mode === 'display'} />
                                    </div>
                                </div>
                                <div className="col">
                                    <div className="form-group">
                                        <label className="form-control-label">موضوع قرارداد</label>
                                        <label className="req-label"> *</label>
                                        <input className={errors.contract_subject ? "form-control error-control" : "form-control"} type="text" value={obj.contract_subject}
                                            onChange={(e) => setObj({ ...obj, contract_subject: e.target.value })} disabled={mode === 'display'} />
                                    </div>
                                </div>
                            </div>

                            <div className="row">
                                <div className="col">
                                    <div className="form-group">
                                        <label className="form-control-label">نام پروژه</label>
                                        <label className="req-label"> *</label>
                                        <Select className={errors.project_id ? "form-control error-control" : "form-control"} {...Static.selectDefaultProp} disabled={mode === 'display'} options={projects_options}
                                            value={obj.project_id} onSelect={(values) => { setObj({ ...obj, project_id: values }); setCalc({ projectCode: projects_options.find(a => a.key === values).code }) }}
                                        />
                                    </div>
                                </div><div className="col">
                                    <div className="form-group">
                                        <label className="form-control-label">کدپروژه</label>
                                        <label className="form-control">{calc.projectCode}</label>

                                    </div>
                                </div>
                                <div className="col">
                                    <div className="form-group">
                                        <label className="form-control-label">نوع قرارداد</label>
                                        <Select className={errors.contract_type_id ? "form-control error-control" : "form-control"} {...Static.selectDefaultProp} disabled={mode === 'display'} options={contract_type_options}
                                            value={obj.contract_type_id} onSelect={(values) => setObj({ ...obj, contract_type_id: values })}
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col">
                                    <div className="form-group">
                                        <label className="form-control-label">تاریخ انعقاد قرارداد</label>
                                        <DatePicker onChange={value => setObj({ ...obj, date_ratifcation: value })}
                                            value={obj.date_ratifcation} disabled={mode === 'display'} {...Static.datePickerDefaultProp}
                                            className={errors.date_ratifcation ? "form-control error-control" : 'form-control'} />
                                    </div>
                                </div><div className="col">
                                    <div className="form-group">
                                        <label className="form-control-label">تاریخ ابلاغ قرارداد</label>
                                        <label className="req-label"> *</label>
                                        <DatePicker onChange={value => setObj({ ...obj, date_signiification: value })}
                                            value={obj.date_signiification} disabled={mode === 'display'} {...Static.datePickerDefaultProp}
                                            className={errors.date_signiification ? "form-control error-control" : 'form-control'} />
                                    </div>
                                </div>

                                <div className="col">
                                    <div className="form-group">
                                        <label className="form-control-label">استان</label>
                                        <Select className={errors.province_id ? "form-control error-control" : "form-control"} {...Static.selectDefaultProp} disabled={mode === 'display'} options={province_options}
                                            value={obj.province_id} onSelect={(values) => setObj({ ...obj, province_id: values })}
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className="row">

                                <div className="col">
                                    <div className="form-group">
                                        <label className="form-control-label">تاریخ شروع</label>
                                        <label className="req-label"> *</label>
                                        <DatePicker onChange={value => setObj({ ...obj, start_date: value })}
                                            value={obj.start_date} disabled={mode === 'display'} {...Static.datePickerDefaultProp}
                                            className={errors.start_date ? "form-control error-control" : 'form-control'} />
                                    </div>
                                </div><div className="col">
                                    <div className="form-group">
                                        <label className="form-control-label">تاریخ خاتمه</label>
                                        <label className="req-label"> *</label>
                                        <DatePicker onChange={value => setObj({ ...obj, end_date: value })}
                                            value={obj.end_date} disabled={mode === 'display'} {...Static.datePickerDefaultProp}
                                            className={errors.end_date ? "form-control error-control" : 'form-control'} />
                                    </div>
                                </div>
                                <div className="col">
                                    <div className="form-group">
                                        <label className="form-control-label">شهر</label>
                                        <input className={errors.city ? "form-control error-control" : "form-control"} type="text" value={obj.city}
                                            onChange={(e) => setObj({ ...obj, city: e.target.value })} disabled={mode === 'display'} />
                                    </div>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col">
                                    <div className="form-group">
                                        <label className="form-control-label">مبلغ اولیه قرارداد</label>
                                        <label className="req-label"> *</label>
                                        {/* <input className={errors.initial_amount ? "form-control error-control" : "form-control"} type="number" value={obj.initial_amount}
                                            onChange={(e) => setObj({ ...obj, initial_amount: e.target.value })} disabled={mode === 'display'} /> */}
                                        <NumberFormat onValueChange={(e) => setObj({ ...obj, initial_amount: e.value })}
                                            {...Static.numberDefaultProp} disabled={mode === 'display'} value={obj.initial_amount}
                                            className={errors.initial_amount ? "form-control error-control" : "form-control"}/>
                                    </div>
                                </div>
                                <div className="col">
                                    <div className="form-group">
                                        <label className="form-control-label">مبلغ پیش پرداخت</label>
                                        <label className="req-label"> *</label>
                                        <NumberFormat onValueChange={(e) => setObj({ ...obj, prepayment_amount: e.value })}
                                            {...Static.numberDefaultProp} disabled={mode === 'display'} value={obj.prepayment_amount}
                                            className={errors.prepayment_amount ? "form-control error-control" : "form-control"}/>
                                        {/* <input className={errors.prepayment_amount ? "form-control error-control" : "form-control"} type="number" value={obj.prepayment_amount}
                                            onChange={(e) => setObj({ ...obj, prepayment_amount: e.target.value })} disabled={mode === 'display'} /> */}
                                    </div>
                                </div>
                                <div className="col">
                                    <div className="form-group">
                                        <label className="form-control-label">مبلغ تضمین تعهدات</label>
                                        {/* <input className={errors.amount_guarantee ? "form-control error-control" : "form-control"} type="number" value={obj.amount_guarantee}
                                            onChange={(e) => setObj({ ...obj, amount_guarantee: e.target.value })} disabled={mode === 'display'} /> */}
                                             <NumberFormat onValueChange={(e) => setObj({ ...obj, amount_guarantee: e.value })}
                                            {...Static.numberDefaultProp} disabled={mode === 'display'} value={obj.amount_guarantee}
                                            className={errors.amount_guarantee ? "form-control error-control" : "form-control"}/>
                                    </div>
                                </div>

                            </div>
                            <div className="row">
                                <div className="col">
                                    <div className="form-group">
                                        <label className="form-control-label">طرف قرارداد</label>
                                        <label className="req-label"> *</label>
                                        <Select className={errors.contracting_party_id ? "form-control error-control" : "form-control"} {...Static.selectDefaultProp} disabled={mode === 'display'} options={contracting_party_options}
                                            value={obj.contracting_party_id} onSelect={(values) => setObj({ ...obj, contracting_party_id: values })}
                                        />
                                    </div>
                                </div>
                                <div className="col">
                                    <div className="form-group">
                                        <label className="form-control-label">نوع تضمین پیش پرداخت</label>
                                        <Select className={errors.type_payment_id ? "form-control error-control" : "form-control"} {...Static.selectDefaultProp} disabled={mode === 'display'} options={type_payment_options}
                                            value={obj.type_payment_id} onSelect={(values) => setObj({ ...obj, type_payment_id: values })}
                                        />
                                    </div>
                                </div><div className="col">
                                    <div className="form-group">
                                        <label className="form-control-label">نوع تضمین تعهدات</label>
                                        <Select className={errors.type_guarantee_id ? "form-control error-control" : "form-control"} {...Static.selectDefaultProp} disabled={mode === 'display'} options={type_guarantee_options}
                                            value={obj.type_guarantee_id} onSelect={(values) => setObj({ ...obj, type_guarantee_id: values })}
                                        />
                                    </div>
                                </div></div>

                            <div className="row">
                                <div className="col">
                                    <div className="form-group">
                                        <label className="form-control-label">نوع فراخوان</label>
                                        <Select className={errors.type_tender_id ? "form-control error-control" : "form-control"} {...Static.selectDefaultProp} disabled={mode === 'display'} options={type_tender_options}
                                            value={obj.type_tender_id} onSelect={(values) => setObj({ ...obj, type_tender_id: values })}
                                        />
                                    </div>
                                </div>
                                <div className="col">
                                    <div className="form-group">
                                        <label className="form-control-label">کمیسیون منصوب</label>
                                        <Select className={errors.commission_members_id ? "form-control error-control" : "form-control"} {...Static.selectDefaultProp} disabled={mode === 'display'} options={commission_members_options}
                                            mode="multiple" value={obj.commission_members_id} onChange={(values) => setObj({ ...obj, commission_members_id: values })}
                                        />
                                    </div>
                                </div>
                                <div className="col">
                                    <div className="form-group">
                                        <label className="form-control-label">تاریخ کمیسیون</label>
                                        <DatePicker onChange={value => setObj({ ...obj, date_commission: value })}
                                            value={obj.date_commission} disabled={mode === 'display'} {...Static.datePickerDefaultProp}
                                            className={errors.date_commission ? "form-control error-control" : 'form-control'} />
                                    </div>
                                </div>
                            </div>
                            <div className="row"> <div className="col">
                                <div className="form-group">
                                    <label className="form-control-label">مدیر پروژه</label>
                                    <Select className={errors.project_manager_id ? "form-control error-control" : "form-control"} {...Static.selectDefaultProp} disabled={mode === 'display'} options={project_manager_options}
                                        value={obj.project_manager_id} onSelect={(values) => { setObj({ ...obj, project_manager_id: values }); setCalc({ phonemanager: project_manager_options.find(a => a.key === values).pmanager }) }}


                                    />
                                </div>
                            </div>
                                <div className="col">
                                    <div className="form-group">
                                        <label className="form-control-label">شماره تماس</label>
                                        <label className="form-control">{calc.phonemanager}</label>

                                    </div>
                                </div>
                                <div className="col">
                                    <div className="form-group">
                                        <label className="form-control-label">توضیحات تکمیلی</label>
                                        <input className={errors.commission_number ? "form-control error-control" : "form-control"} type="text" value={obj.commission_number}
                                            onChange={(e) => setObj({ ...obj, commission_number: e.target.value })} disabled={mode === 'display'} />
                                    </div>
                                </div>
                            </div>
                            <div className="row"><div className="col">
                                <div className="form-group">
                                    <label className="form-control-label">پیمانکار</label>
                                    <Select className={errors.contractor_id ? "form-control error-control" : "form-control"} {...Static.selectDefaultProp} disabled={mode === 'display'} options={contractor_options}
                                        value={obj.contractor_id} onSelect={(values) => setObj({ ...obj, contractor_id: values })}
                                    />
                                </div>
                            </div><div className="col">
                                    <div className="form-group">
                                        <label className="form-control-label">مشاور</label>
                                        <Select className={errors.consultant_id ? "form-control error-control" : "form-control"} {...Static.selectDefaultProp} disabled={mode === 'display'} options={consultant_options}
                                            value={obj.consultant_id} onSelect={(values) => setObj({ ...obj, consultant_id: values })}
                                        />
                                    </div>
                                </div><div className="col">
                                    <div className="form-group">
                                        <label className="form-control-label">کارفرما</label>
                                        <Select className={errors.employer_id ? "form-control error-control" : "form-control"} {...Static.selectDefaultProp} disabled={mode === 'display'} options={employer_options}
                                            value={obj.employer_id} onSelect={(values) => setObj({ ...obj, employer_id: values })}
                                        />
                                    </div>
                                </div></div>
                            <div className="row">
                                <div className="col">
                                    {mode !== "display" && <button type="button" className="btn btn-outline-primary" onClick={saveBtnClick}>ذخیره</button>}
                                    <button type="button" className="btn btn-outline-warning" onClick={cancelBtnClick}>انصراف</button>
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

export default Contract;