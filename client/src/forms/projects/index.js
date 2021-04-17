import React, { useState, useEffect, useRef } from 'react';
import { getItems, insertItem, deleteItem, updateItem, getItem } from '../../api/index';
import TableContainer from "../../components/TableContainer";
import { columns, entityName } from './statics';
import { message, Select } from 'antd';
import DatePicker from 'react-datepicker2';
import Static, { checkPermission } from '../static';



const Projects = (props) => {
    const BoxRef = useRef(null), GridRef = useRef(null);;
    const [per, setPer] = useState({});
    const [data, setData] = useState([]);
    const [errors, setErrors] = useState({});
    const [calc, setCalc] = useState({});
    const [obj, setObj] = useState({});
    const [mode, setMode] = useState('');
    const [site_manager_options, setSite_manager_options] = useState([]);
    const [project_manager_options, setProject_manager_options] = useState([]);
    const [contractor_options, setContractor_options] = useState([]);
    const [consultant_options, setConsultant_options] = useState([]);
    const [employer_options, setEmployer_options] = useState([]);

    const getData = () => {
        setMode('');
        GridRef.current.scrollIntoView({ behavior: 'smooth' });
        Promise.all([getItems(entityName), getItems("organizational"), getItems("colleague") , getItem(3, "permission")]).then((response) => {
            let cp = checkPermission(response[3].data);
            if (cp.canRead) {
                setPer(cp);
            

            setData(response[0].data);
            setSite_manager_options(response[2].data.map(a => { return { key: a.id, label: a.name +' '+a.last_name, value: a.id, psite: a.phone_number  } }));
            setProject_manager_options(response[2].data.map(a => { return { key: a.id, label: a.name +' '+a.last_name, value: a.id, pmanager: a.phone_number  } }));
            setContractor_options(response[1].data.map(a => { return { key: a.id, label: a.title, value: a.id } }));
            setConsultant_options(response[1].data.map(a => { return { key: a.id, label: a.title, value: a.id } }));
            setEmployer_options(response[1].data.map(a => { return { key: a.id, label: a.title, value: a.id } }));
      
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
                        //alert('خطا در ذخیره سازی اطلاعات');
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
                        // alert('خطا در ذخیره سازی اطلاعات');
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
                                <h3 className="mb-0">اطلاعات پروژه ها</h3>
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
                        <TableContainer columns={columns.filter(a => !a.notInGrid)} data={data}
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
                                        <label className="form-control-label">نام پروژه</label>
                                        <input className={errors.title ? "form-control error-control" : "form-control"} type="text" value={obj.title}
                                            onChange={(e) => setObj({ ...obj, title: e.target.value })} disabled={mode === 'display'} />
                                    </div>
                                </div>
                                <div className="col">
                                    <div className="form-group">
                                        <label className="form-control-label">کد پروژه</label>
                                        <input className={errors.project_code ? "form-control error-control" : "form-control"} type="text" value={obj.project_code}
                                            onChange={(e) => setObj({ ...obj, project_code: e.target.value })} disabled={mode === 'display'} />
                                    </div>
                                </div>
                            </div>
                            <div className="row">
                            <div className="col">
                                    <div className="form-group">
                                        <label className="form-control-label">سرپرست کارگاه</label>
                                        <Select className={errors.site_manager_id ? "form-control error-control" : "form-control"} {...Static.selectDefaultProp} disabled={mode === 'display'} options={site_manager_options}
                                            value={obj.site_manager_id} onSelect={(values) => { setObj({ ...obj, site_manager_id: values }); setCalc({ phonesite: site_manager_options.find(a => a.key === values).psite }) }}
											
											
                                        />
                                    </div>
                                </div>
                                <div className="col">
                                    <div className="form-group">
                                        <label className="form-control-label">شماره تماس</label>
                                        <label className="form-control">{calc.phonesite}</label>

                                    </div>
                                </div>
                            </div>
                            <div className="row">
                            <div className="col">
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
                            </div>
                            <div className="row">
                                <div className="col">
                                    <div className="form-group">
                                        <label className="form-control-label">آدرس پروژه</label>
                                        <input className={errors.project_address ? "form-control error-control" : "form-control"} type="text" value={obj.project_address}
                                            onChange={(e) => setObj({ ...obj, project_address: e.target.value })} disabled={mode === 'display'} />
                                    </div>
                                </div><div className="col">
                                    <div className="form-group">
                                        <label className="form-control-label">شماره دسترسی ضروری</label>
                                        <input className={errors.required_number ? "form-control error-control" : "form-control"} type="text" value={obj.required_number}
                                            onChange={(e) => setObj({ ...obj, required_number: e.target.value })} disabled={mode === 'display'} />
                                    </div>
                                </div></div><div className="row"><div className="col">
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
                                </div></div>
                            <div className="row">
                                <div className="col-4">
                                    <div className="form-group">
                                        <label className="form-control-label">کارفرما</label>
                                        <Select className={errors.employer_id ? "form-control error-control" : "form-control"} {...Static.selectDefaultProp} disabled={mode === 'display'} options={employer_options}
                                            value={obj.employer_id} onSelect={(values) => setObj({ ...obj, employer_id: values })}
                                        />
                                    </div>
                                </div>

                            </div>

                            <div className="row">
                                <div className="col">
                                    <button type="button" className="btn btn-outline-primary" onClick={saveBtnClick}>ذخیره</button>
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

export default Projects;