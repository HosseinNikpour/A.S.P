
import React, { useState, useEffect, useRef } from 'react';
import { getItems, insertItem, deleteItem, updateItem, getItem } from '../../api/index';
import TableContainer from "../../components/TableContainer";
import { columns, entityName } from './statics';
import { message, Select } from 'antd';
import Static, { checkPermission } from '../static';


const Organizational = (props) => {
    const BoxRef = useRef(null), GridRef = useRef(null);;
    const [tableData, setTableData] = useState([{}]);
    const [data, setData] = useState([]);
    const [errors, setErrors] = useState({});
    const [per, setPer] = useState({});
    const [obj, setObj] = useState({});
    const [mode, setMode] = useState('');
    const [relationship_options, setRelationship_options] = useState([]);
    const [areas_options, setAreas_options] = useState([]);
    const [rank_options, setRank_options] = useState([]);


    const getData = () => {
        setMode('');
        GridRef.current.scrollIntoView({ behavior: 'smooth' });
        Promise.all([getItems(entityName), getItems("baseInfo") , getItem(4, "permission")]).then((response) => {
           // setData(response[0].data);
           let cp = checkPermission(response[2].data);
                if (cp.canRead) {
                    setPer(cp);
          
           let dt = response[0].data;
            dt.forEach(e => {

                e.blackDisplay = e.black ? 'بلی' : 'خیر' ;
               
            });
            setData(dt);
             
            setRelationship_options(response[1].data.filter(a => a.groupid === 1).map(a => { return { key: a.id, label: a.title, value: a.id } }));
            setAreas_options(response[1].data.filter(a => a.groupid === 6).map(a => { return { key: a.id, label: a.title, value: a.id } }));
            setRank_options(response[1].data.filter(a => a.groupid === 7).map(a => { return { key: a.id, label: a.title, value: a.id } }));
               
        
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
            if(a.type==='lookup')
            err[a.accessor+"_id"] = obj[a.accessor+"_id"] ? false : true;
            else
            err[a.accessor] = obj[a.accessor] ? false : true;
        })


        if (Object.values(err).filter(a=>a).length > 0) {
            setErrors(err);
            BoxRef.current.scrollIntoView({ behavior: 'smooth' });
            alert("لطفا موارد الزامی را وارد کنید");
        }
        else {
       delete obj.blackDisplay;
       obj.details=tableData;
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
        item.relationship_id=item.relationship_id?item.relationship_id:[];
	    item.area_id=item.area_id?item.area_id:[];
		item.rank_id=item.rank_id?item.rank_id:[];
		;
        setMode('edit');
        BoxRef.current.scrollIntoView({ behavior: 'smooth' });
        setObj(item);
    }
    const cancelBtnClick = () => {
      
        setMode('');
        GridRef.current.scrollIntoView({ behavior: 'smooth' });
        setTableData({});
    }
    const handleChange = (e, i) => {
        let td = tableData;
        td[i][e.target.name] = e.target.value;
        setTableData(td);

    }
    const addRowToTable=()=>{
   
        setTableData([...tableData,{}]);
        console.log(tableData.length)
    }
    return (<div className="container-fluid">
        <div className="row" style={{ paddingTop: '15px' }}>
            <div className="col">
                <div className="card ">
                    <div className="card-header border-0">
                        <div className="row align-items-center" ref={GridRef}>
                            <div className="col">
                                <h3 className="mb-0">سازمانهای همکار</h3>
                            </div>
                            {per.canAdd &&  <div className="col text-right">
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
                            <div className="row"><div className="col">
                                <div className="form-group">
                                    <label className="form-control-label">شناسه ملی</label>
                                    <input className={errors.meli_code ? "form-control error-control" : "form-control"} type="text" value={obj.meli_code}
                                        onChange={(e) => setObj({ ...obj, meli_code: e.target.value })} disabled={mode === 'display'} />
                                </div>
                            </div><div className="col">
                                    <div className="form-group">
                                        <label className="form-control-label">کد اقتصادی</label>
                                        <input className={errors.economic_code ? "form-control error-control" : "form-control"} type="text" value={obj.economic_code}
                                            onChange={(e) => setObj({ ...obj, economic_code: e.target.value })} disabled={mode === 'display'} />
                                    </div>
                                </div><div className="col">
                                    <div className="form-group">
                                        <label className="form-control-label">شماره ثبت</label>
                                        <input className={errors.registration_number ? "form-control error-control" : "form-control"} type="text" value={obj.registration_number}
                                            onChange={(e) => setObj({ ...obj, registration_number: e.target.value })} disabled={mode === 'display'} />
                                    </div>
                                </div></div><div className="row"><div className="col">
                                    <div className="form-group">
                                        <label className="form-control-label">نام سازمان</label>
                                        <input className={errors.title ? "form-control error-control" : "form-control"} type="text" value={obj.title}
                                            onChange={(e) => setObj({ ...obj, title: e.target.value })} disabled={mode === 'display'} />
                                    </div>
                                </div><div className="col">
                                    <div className="form-group">
                                        <label className="form-control-label">نام دوم</label>
                                        <input className={errors.second_name ? "form-control error-control" : "form-control"} type="text" value={obj.second_name}
                                            onChange={(e) => setObj({ ...obj, second_name: e.target.value })} disabled={mode === 'display'} />
                                    </div>
                                </div><div className="col">
                                    <div className="form-group">
                                        <label className="form-control-label">آخرین شماره حساب</label>
                                        <input className={errors.account_number ? "form-control error-control" : "form-control"} type="text" value={obj.account_number}
                                            onChange={(e) => setObj({ ...obj, account_number: e.target.value })} disabled={mode === 'display'} />
                                    </div>
                                </div></div><div className="row"><div className="col-12">
                                    <div className="form-group">
                                        <label className="form-control-label">آدرس دفتر مرکزی</label>
                                        <input className={errors.address_central ? "form-control error-control" : "form-control"} type="text" value={obj.address_central}
                                            onChange={(e) => setObj({ ...obj, address_central: e.target.value })} disabled={mode === 'display'} />
                                    </div>
                                </div></div>
                            <div className="row">
                                <div className="col-12">
                                    <div className="form-group">
                                        <label className="form-control-label">آدرس سایر دفاتر</label>
                                        <input className={errors.address_other ? "form-control error-control" : "form-control"} type="text" value={obj.address_other}
                                            onChange={(e) => setObj({ ...obj, address_other: e.target.value })} disabled={mode === 'display'} />
                                    </div>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col">
                                    <div className="form-group">
                                        <label className="form-control-label">کد پستی</label>
                                        <input className={errors.postal_code ? "form-control error-control" : "form-control"} type="text" value={obj.postal_code}
                                            onChange={(e) => setObj({ ...obj, postal_code: e.target.value })} disabled={mode === 'display'} />
                                    </div>
                                </div>

                                <div className="col">
                                    <div className="form-group">
                                        <label className="form-control-label">آدرس سایت</label>
                                        <input className={errors.website ? "form-control error-control" : "form-control"} type="text" value={obj.website}
                                            onChange={(e) => setObj({ ...obj, website: e.target.value })} disabled={mode === 'display'} />
                                    </div>
                                </div>
                                <div className="col">
                                    <div className="form-group">
                                        <label className="form-control-label">تلفن</label>
                                        <input className={errors.tell ? "form-control error-control" : "form-control"} type="text" value={obj.tell}
                                            onChange={(e) => setObj({ ...obj, tell: e.target.value })} disabled={mode === 'display'} />
                                    </div>
                                </div>

                            </div>
                            <div className="row">

                                <div className="col">
                                    <div className="form-group">
                                        <label className="form-control-label">فکس</label>
                                        <input className={errors.fax ? "form-control error-control" : "form-control"} type="text" value={obj.fax}
                                            onChange={(e) => setObj({ ...obj, fax: e.target.value })} disabled={mode === 'display'} />
                                    </div>

                                </div>
                                <div className="col">
                                    <div className="form-group">
                                        <label className="form-control-label">نوع ارتباط با شرکت</label>
                                        <Select className={errors.relationship_id ? "form-control error-control" : "form-control"} {...Static.selectDefaultProp} disabled={mode === 'display'} options={relationship_options}
                                           mode="multiple" value={obj.relationship_id} onChange={(values) =>  setObj({ ...obj, relationship_id: values })}
                                        />
                                    </div>
                                </div>
                                <div className="col">
                                    <div className="form-group">
                                        <label className="form-control-label">حوزه های همکاری با شرکت</label>
                                        <Select className={errors.area_id ? "form-control error-control" : "form-control"} {...Static.selectDefaultProp} disabled={mode === 'display'} options={areas_options}
                                           mode="multiple" value={obj.area_id} onChange={(values) =>  setObj({ ...obj, area_id: values })}
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-4">
                                    <div className="form-group">
                                        <label className="form-control-label">رتبه اخذ شده</label>
                                        <Select className={errors.rank_id ? "form-control error-control" : "form-control"} {...Static.selectDefaultProp} disabled={mode === 'display'} options={rank_options}
                                            mode="multiple" value={obj.rank_id} onChange={(values) => setObj({ ...obj, rank_id: values })}
                                        />
                                    </div>
                                </div><div className="col">
                                    <div className="form-group">

                                        <label className="form-contro-label" style={{ marginTop: '42px', marginLeft: '10px' }}>بلک لیست</label>
                                        <input className="form-control1" type="checkbox" checked={obj.black}
                                            onChange={(e) => setObj({ ...obj, black: !obj.black })} disabled={mode === 'display'} />
                                    </div>
                                </div></div>
                            <div className="row">
                                <div className="col">
                                    <div className="form-group">
                                        <label className="form-control-label">افراد کلیدی</label>
                                        <div className='col-1  ml-auto'>
                                                    <i className="fa fa-plus-circle add-button" onClick={()=>addRowToTable()}></i>
                                                </div>
                                        <table className='table table-striped table-bordered'>
                                            <thead>
                                                <tr>
                                                <th>ردیف</th> <th>نام</th> <th>سمت</th> <th>موبایل</th> <th>تلفن</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                             
                                                {tableData.map((item, i) => {
                                                    return <tr key={i}>
                                                        <td><label className='tableSpan'>{i + 1}</label></td>
                                                        <td><input name="name" className="form-control" type="text" value={item.name} onChange={(e) => handleChange(e, i)} disabled={mode === 'display'} /></td>
                                                        <td><input name="position" className="form-control" type="text" value={item.position} onChange={(e) => handleChange(e, i)} disabled={mode === 'display'} /></td>
                                                        <td><input name="mobile" className="form-control" type="text" value={item.mobile} onChange={(e) => handleChange(e, i)} disabled={mode === 'display'} /></td>
                                                        <td><input name="tell" className="form-control" type="text" value={item.tell} onChange={(e) => handleChange(e, i)} disabled={mode === 'display'} /></td>
                                                    </tr>
                                                })}
                                            </tbody>
                                        </table>
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

export default Organizational;

