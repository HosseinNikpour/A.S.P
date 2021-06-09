import React, { useState, useEffect, useRef } from 'react';
import { getItems, insertItem, deleteItem, updateItem, getItem } from '../../api/index';
import TableContainer from "../../components/TableContainer";
import {columns,entityName,pageHeader} from './statics';
import { message,Select } from 'antd';
//import DatePicker from 'react-datepicker2';
import Static, { checkPermission } from '../static';
 
 const Colleague = (props) => {
    const BoxRef = useRef(null), GridRef = useRef(null);;

    const [data, setData] = useState([]);
    const [errors, setErrors] = useState({});
    const [obj, setObj] = useState({});
    const [mode, setMode] = useState('');
    const [per, setPer] = useState({});
    const [record_options, setRecord_options] = useState([]);
    const [experience_options, setExperience_options] = useState([]);
    const [specialty_options, setSpecialty_options] = useState([]);
    const [organization_level_options, setOrganization_level_options] = useState([]);
    const [last_educational_options, setLast_educational_options] = useState([]);
    const [service_location_options, setService_location_options] = useState([]);

    const getData = () => {
        setMode('');
        GridRef.current.scrollIntoView({ behavior: 'smooth' });
        Promise.all([ getItems(entityName),getItems("keyword") ,getItems("baseInfo")  ,getItem(5, "permission")]).then((response) => {
          
            let cp = checkPermission(response[3].data);
            if (cp.canRead) {
                setPer(cp);

            setData(response[0].data);
            setRecord_options(response[1].data.filter(a=>a.group_id===1).map(a => { return { key: a.id, label: a.title, value: a.id } }));
            setExperience_options(response[1].data.filter(a=>a.group_id===2).map(a => { return { key: a.id, label: a.title, value: a.id } }));
            setSpecialty_options(response[1].data.filter(a=>a.group_id===3).map(a => { return { key: a.id, label: a.title, value: a.id } }));
            setOrganization_level_options(response[2].data.filter(a => a.groupid === 2).map(a => { return { key: a.id, label: a.title, value: a.id } }));      
            setLast_educational_options(response[2].data.filter(a => a.groupid === 11).map(a => { return { key: a.id, label: a.title, value: a.id } }));  
      
           setService_location_options(response[2].data.filter(a => a.groupid === 12).map(a => { return { key: a.id, label: a.title, value: a.id } }));          
       
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

        if (mode === 'new') {
            insertItem(obj, entityName).then(response => {
                if (response.data.type !== "Error") {
                     message.success('آیتم با موفقیت ذخیره شد');
                    //alert('آیتم با موفقیت ذخیره شد');
                    getData();
                }
                else{
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
        item.record_id=item.record_id?item.record_id:[];
        item.specialty_id=item.specialty_id?item.specialty_id:[];
        item.experience_id=item.experience_id?item.experience_id:[];
        item.organization_level_id=item.organization_level_id?item.organization_level_id:[];
        item.last_educational_id=item.last_educational_id?item.organization_level_id:[];
        item.service_location_id=item.service_location_id?item.service_location_id:[];
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
                        <h3 className="mb-0">اطلاعات همکاران</h3>
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
                    <div className="row"><div className="col">
                <div className="form-group">
                    <label className="form-control-label">کد ملی</label>
                    <label className="req-label"> *</label>
                      <input className={errors.title?"form-control error-control":"form-control"} type="text" value={obj.title} 
                onChange={(e) => setObj({ ...obj, title: e.target.value })} disabled={mode === 'display'} maxlength="10" />
                </div>
            </div><div className="col">
                <div className="form-group">
                    <label className="form-control-label">شماره بیمه</label>
                      <input className={errors.insurance_number?"form-control error-control":"form-control"} type="text" value={obj.insurance_number} 
                onChange={(e) => setObj({ ...obj, insurance_number: e.target.value })} disabled={mode === 'display'} />
                </div>
            </div><div className="col">
                <div className="form-group">
                    <label className="form-control-label">کد پرسنلی</label>
                      <input className={errors.personnel_code?"form-control error-control":"form-control"} type="text" value={obj.personnel_code} 
                onChange={(e) => setObj({ ...obj, personnel_code: e.target.value })} disabled={mode === 'display'} />
                </div>
            </div></div><div className="row"><div className="col">
                <div className="form-group">
                    <label className="form-control-label">نام</label>
                    <label className="req-label"> *</label>
                      <input className={errors.name?"form-control error-control":"form-control"} type="text" value={obj.name} 
                onChange={(e) => setObj({ ...obj, name: e.target.value })} disabled={mode === 'display'} />
                </div>
            </div><div className="col">
                <div className="form-group">
                    <label className="form-control-label">نام خانوادگی</label>
                    <label className="req-label"> *</label>
                      <input className={errors.last_name?"form-control error-control":"form-control"} type="text" value={obj.last_name} 
                onChange={(e) => setObj({ ...obj, last_name: e.target.value })} disabled={mode === 'display'} />
                </div>
            </div><div className="col">
                <div className="form-group">
                    <label className="form-control-label">شماره حساب </label>
                      <input className={errors.account_number?"form-control error-control":"form-control"} type="text" value={obj.account_number} 
                onChange={(e) => setObj({ ...obj, account_number: e.target.value })} disabled={mode === 'display'} />
                </div>
            </div></div><div className="row"><div className="col">
                <div className="form-group">
                    <label className="form-control-label">شماره کارت</label>
                      <input className={errors.card_number?"form-control error-control":"form-control"} type="text" value={obj.card_number} 
                onChange={(e) => setObj({ ...obj, card_number: e.target.value })} disabled={mode === 'display'} />
                </div>
            </div><div className="col">
                <div className="form-group">
                    <label className="form-control-label">شماره موبایل</label>
                    <label className="req-label"> *</label>
                      <input className={errors.phone_number?"form-control error-control":"form-control"} type="text" value={obj.phone_number} 
                onChange={(e) => setObj({ ...obj, phone_number: e.target.value })} disabled={mode === 'display'} maxlength="10"/>
                </div>
            </div><div className="col">
                <div className="form-group">
                    <label className="form-control-label">شماره دسترسی ضروری</label>
                      <input className={errors.required_number?"form-control error-control":"form-control"} type="text" value={obj.required_number} 
                onChange={(e) => setObj({ ...obj, required_number: e.target.value })} disabled={mode === 'display'} />
                </div>
            </div></div><div className="row"><div className="col">
                <div className="form-group">
                    <label className="form-control-label">آدرس</label>
                      <input className={errors.address?"form-control error-control":"form-control"} type="text" value={obj.address} 
                onChange={(e) => setObj({ ...obj, address: e.target.value })} disabled={mode === 'display'} />
                </div>
            </div></div>
			<div className="row">
			<div className="col">
                <div className="form-group">
                    <label className="form-control-label">کدپستی</label>
                      <input className={errors.postal_code?"form-control error-control":"form-control"} type="text" value={obj.postal_code} 
                onChange={(e) => setObj({ ...obj, postal_code: e.target.value })} disabled={mode === 'display'} />
                </div>
            </div>
           	  
<div className="col">
                <div className="form-group">
                    <label className="form-control-label">آخرین مدرک تحصیلی</label>
                    <Select className={errors.last_educational_id?"form-control error-control":"form-control"} {...Static.selectDefaultProp} disabled={mode === 'display'} options={last_educational_options}
                 mode="multiple" value={obj.last_educational_id} onChange={(values) =>  setObj({ ...obj, last_educational_id: values})}
            />
                </div>
            </div>
			
            <div className="col">
                <div className="form-group">
                    <label className="form-control-label">محل خدمت</label>
                    <label className="req-label"> *</label>
                    <Select className={errors.service_location_id?"form-control error-control":"form-control"} {...Static.selectDefaultProp} disabled={mode === 'display'} options={service_location_options}
             mode="multiple" value={obj.service_location_id} onChange={(values) =>   setObj({ ...obj, service_location_id: values})}
            />
                </div>
            </div>
			</div>
			            <div className="row">
			<div className="col">
                <div className="form-group">
                    <label className="form-control-label">سوابق</label>
                    <Select  className={errors.record_id?"form-control error-control":"form-control"} {...Static.selectDefaultProp} disabled={mode === 'display'} options={record_options}
                  mode="multiple" value={obj.record_id} onChange={(values) =>  setObj({ ...obj, record_id: values})}
            />
                </div>
            </div><div className="col">
                <div className="form-group">
                    <label className="form-control-label">تجربیات</label>
                    <Select className={errors.experience_id?"form-control error-control":"form-control"} {...Static.selectDefaultProp} disabled={mode === 'display'} options={experience_options}
                  mode="multiple" value={obj.experience_id} onChange={(values) =>  setObj({ ...obj, experience_id: values})}
            />
                </div>
            </div>


			<div className="col">
                <div className="form-group">
                    <label className="form-control-label">تخصص</label>
                    <Select className={errors.specialty_id?"form-control error-control":"form-control"} {...Static.selectDefaultProp} disabled={mode === 'display'} options={specialty_options}
                mode="multiple" value={obj.specialty_id} onChange={(values) =>    setObj({ ...obj, specialty_id: values})}
            />
                </div>
            </div>
			 </div>
             <div className="row">
			<div className="col-4">
                <div className="form-group">
                    <label className="form-control-label">سمت سازمانی</label>
                    <Select className={errors.organization_level_id?"form-control error-control":"form-control"} {...Static.selectDefaultProp} disabled={mode === 'display'} options={organization_level_options}
              mode="multiple" value={obj.organization_level_id} onChange={(values) => setObj({ ...obj, organization_level_id: values})}/>
                </div>
            </div></div>
                    <div className="row">
                        <div className="col">
                        {mode !== "display" &&<button type="button" className="btn btn-outline-primary" onClick={saveBtnClick}>ذخیره</button>}
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

export default Colleague;