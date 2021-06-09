import React, { useState, useEffect, useRef } from 'react';
import { getItems, insertItem, deleteItem, updateItem, getItem } from '../../api/index';
import TableContainer from "../../components/TableContainer";
import {columns,entityName,pageHeader} from './statics';
import { message,Select } from 'antd';
import DatePicker from 'react-datepicker2';
import Static, { checkPermission } from '../static';

import moment from 'moment-jalaali'
 
 const TradingCommission = (props) => {
    const BoxRef = useRef(null), GridRef = useRef(null);;

    const [data, setData] = useState([]);
    const [errors, setErrors] = useState({});
    const [per, setPer] = useState({});
    const [obj, setObj] = useState({});
    const [mode, setMode] = useState('');
    const [member_position_options, setMember_position_options] = useState([]);
    const [role_options, setRole_options] = useState([]);
    
    const getData = () => {
        setMode('');
        GridRef.current.scrollIntoView({ behavior: 'smooth' });
        Promise.all([ getItems(entityName),getItems("colleague") ,getItems("baseInfo"), getItem(8, "permission")]).then((response) => {
            let cp = checkPermission(response[3].data);
            if (cp.canRead) {
                setPer(cp);

            let dt= response[0].data;
            dt.forEach(e => {
      
                e.rule_date = e.rule_date ? moment(e.rule_date) : undefined;
          });  

            setData(response[0].data);
            setMember_position_options(response[1].data.map(a => { return { key: a.id, label: a.name +' '+a.last_name, value: a.id } }));
            setRole_options(response[2].data.filter(a => a.groupid === 2).map(a => { return { key: a.id, label: a.title, value: a.id } }));

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
                else{  if (response.data.message.indexOf('duplicate key value violates unique constraint') > -1)
                message.error(Static.errorMesesagDuplicate, Static.errorDuration);
           else {
                    //alert('خطا در ذخیره سازی اطلاعات');
                    message.error('خطا در ذخیره سازی اطلاعات', 3000);
                    console.log(response.data.message);
                }
            }
            }).catch((error) => {
                message.error('بروز خطا در سیستم', 3000);
                console.log(error)});
        }
        else if (mode === 'edit') {
            updateItem(obj, entityName).then(response => {
                if (response.data.type !== "Error") {
                    message.success('آیتم با موفقیت ذخیره شد');
                    //alert('آیتم با موفقیت ذخیره شد');
                    getData();
                }
                else{
                    if (response.data.message.indexOf('duplicate key value violates unique constraint') > -1)
                    message.error(Static.errorMesesagDuplicate, Static.errorDuration);
               else {
                   // alert('خطا در ذخیره سازی اطلاعات');
                    message.error('خطا در ذخیره سازی اطلاعات', 3000);
                    console.log(response.data.message);
                }
            }
            }).catch((error) =>{
                message.error('بروز خطا در سیستم', 3000);
                console.log(error)});
        }
    }
    }
    const deleteBtnClick = (item) => {

        deleteItem(item.id,entityName).then(a => {
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
                        <h3 className="mb-0"> کمیسیون  معاملات</h3>
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
                <TableContainer columns={columns.filter(a=>!a.notInGrid)} data={data} downloadName={pageHeader}
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
                               <label className="form-control-label">عنوان کمیسیون منصوب</label>
                               <label className="req-label"> *</label>
                                 <input className={errors.title?"form-control error-control":"form-control"} type="text" value={obj.title} 
                           onChange={(e) => setObj({ ...obj, title: e.target.value })} disabled={mode === 'display'} />
                           </div>
                       </div>

                       <div className="col">
                      <div className="form-group">
                    <label className="form-control-label">تاریخ ابلاغ احکام</label>
                    <label className="req-label"> *</label>
                    <DatePicker onChange={value =>  setObj({ ...obj, rule_date: value})}
                       value={obj.rule_date} disabled={mode === 'display'} {...Static.datePickerDefaultProp}
                           className={errors.rule_date ? "form-control error-control" : 'form-control'} />
                      </div>
                       </div>
                        <div className="col">
                           <div className="form-group">
                               <label className="form-control-label">عضو</label>
                               <label className="req-label"> *</label>
                               <Select className={errors.member_position_id?"form-control error-control":"form-control"} {...Static.selectDefaultProp} disabled={mode === 'display'} options={member_position_options}
                           value={obj.member_position_id} mode="multiple" onChange={(values) =>  setObj({ ...obj, member_position_id: values})}/>
                           </div>
                       </div>
                        </div>
                        <div className="col-4">
                           <div className="form-group">
                               <label className="form-control-label">سمت</label>
                               <label className="req-label"> *</label>
                               <Select className={errors.role_id ?"form-control error-control":"form-control"} {...Static.selectDefaultProp} disabled={mode === 'display'} options={role_options}
                           value={obj.role_id} mode="multiple" onChange={(values) =>  setObj({ ...obj, role_id: values})}/>
                           </div>
                       </div>
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

export default TradingCommission;