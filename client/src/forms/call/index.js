import React, { useState, useEffect, useRef } from 'react';
import { getItems, insertItem, deleteItem, updateItem, getItem } from '../../api/index';
import TableContainer from "../../components/TableContainer";
import {columns,entityName} from './statics';
import { message,Select } from 'antd';
import DatePicker from 'react-datepicker2';
import Static, { checkPermission } from '../static';
import moment from 'moment-jalaali'
 const Call = (props) => {
    const BoxRef = useRef(null), GridRef = useRef(null);;

    const [data, setData] = useState([]);
    const [errors, setErrors] = useState({});
    const [obj, setObj] = useState({});
    const [mode, setMode] = useState('');
    const [per, setPer] = useState({});
    const [reference_options, setReference_options] = useState([]);	 
    const [calc, setCalc] = useState({});
    const [winning_company_options, setWinning_company_options] = useState([]);	 
    const [guarantee_association_options, setGuarantee_association_options] = useState([]);	 
    const [guarantee_do_options, setGuarantee_do_options] = useState([]);	 
    const [provider_options, setProvider_options] = useState([]);
    const [project_name_options, setProject_name_options] = useState([]);	
    const [commission_members_options, setCommission_members_options] = useState([]);
        
    const getData = () => {
        setMode('');

        GridRef.current.scrollIntoView({ behavior: 'smooth' });
        Promise.all([ getItems(entityName),getItems("baseInfo"),getItems("trading_commission") ,getItems("projects") ,
        getItems("organizational"), getItem(6, "permission")]).then((response) => {
         
            let cp = checkPermission(response[5].data);
            if (cp.canRead) {
             setPer(cp);

            let dt= response[0].data;
            dt.forEach(e => {
      
             e.call_date = e.call_date ? moment(e.call_date) : undefined;
             e.date_open = e.date_open ? moment(e.date_open) : undefined;
             e.last_date = e.last_date ? moment(e.last_date) : undefined;
             e.call_datedisplay = e.call_date && moment.isMoment(e.call_date) ? e.call_date.format('jYYYY/jMM/jDD') : '';
         
          });

            setData(response[0].data);
            setReference_options(response[1].data.filter(a => a.groupid === 10).map(a => { return { key: a.id, label: a.title, value: a.id } }));
            setWinning_company_options(response[4].data.map(a => { return { key: a.id, label: a.title, value: a.id } }));
            setGuarantee_association_options(response[1].data.filter(a => a.groupid === 4).map(a => { return { key: a.id, label: a.title, value: a.id } }));
            setGuarantee_do_options(response[1].data.filter(a => a.groupid === 4).map(a => { return { key: a.id, label: a.title, value: a.id } }));
            setProvider_options(response[4].data.map(a => { return { key: a.id, label: a.title, value: a.id } }));
            setProject_name_options(response[3].data.map(a => { return { key: a.id, label: a.title +'_'+ a.project_code, value: a.id,code:a.project_code } }));
            setCommission_members_options(response[2].data.map(a => { return { key: a.id, label: a.title, value: a.id } }));    

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
            delete obj.call_datedisplay;

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
        item.commission_members_id=item.commission_members_id?item.commission_members_id:[];
        ;
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
                        <h3 className="mb-0">فراخوان ها</h3>
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
                <TableContainer columns={columns.filter(a=>!a.notInGrid)} data={data} 
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
                    <label className="form-control-label">شماره فراخوان</label>
                      <input className={errors.call_number?"form-control error-control":"form-control"} type="text" value={obj.call_number} 
                onChange={(e) => setObj({ ...obj, call_number: e.target.value })} disabled={mode === 'display'} />
                </div>
            </div>
			<div className="col">
                <div className="form-group">
                    <label className="form-control-label">نام پروژه </label>
                    <Select className={errors.project_name_id?"form-control error-control":"form-control"} {...Static.selectDefaultProp} disabled={mode === 'display'} options={project_name_options}
                               value={obj.project_name_id} onSelect={(values) =>  {setObj({ ...obj, project_name_id: values});setCalc({projectCode:project_name_options.find(a=>a.key===values).code})}}
            />
                </div>
            </div>
	       {/* <div className="col">
                <div className="form-group">
                    <label className="form-control-label">کدپروژه</label>
                    <label className="form-control">{calc.projectCode}</label>
                   
                </div>
            </div> */}
			   <div className="col">
                <div className="form-group">
                    <label className="form-control-label">موضوع فراخوان</label>
                      <input className={errors.title?"form-control error-control":"form-control"} type="text" value={obj.title} 
                onChange={(e) => setObj({ ...obj, title: e.target.value })} disabled={mode === 'display'} />
                </div>
            </div>
            </div>
     <div className="row">

              <div className="col">
                <div className="form-group">
                    <label className="form-control-label">تاریخ فراخوان</label>
                    <DatePicker onChange={value =>  setObj({ ...obj, call_date: value})}
                value={obj.call_date} disabled={mode === 'display'} {...Static.datePickerDefaultProp}
                className={errors.call_date ? "form-control error-control" : 'form-control'} />
                </div>
            </div>
			<div className="col">
                <div className="form-group">
                    <label className="form-control-label">آخرین تاریخ تجدید</label>
                    <DatePicker onChange={value =>  setObj({ ...obj, last_date: value})}
                value={obj.last_date} disabled={mode === 'display'} {...Static.datePickerDefaultProp}
                className={errors.last_date ? "form-control error-control" : 'form-control'} />
                </div>
            </div>
			 <div className="col">
                <div className="form-group">
                    <label className="form-control-label">تاریخ بازگشایی پاکات</label>
                    <DatePicker onChange={value =>  setObj({ ...obj, date_open: value})}
                value={obj.date_open} disabled={mode === 'display'} {...Static.datePickerDefaultProp}
                className={errors.date_open ? "form-control error-control" : 'form-control'} />
                </div>
            </div>
		    </div>
		
	 
	   <div className="row">
		  <div className="col">
                <div className="form-group">
                    <label className="form-control-label">متن فراخوان</label>
                      <input className={errors.call_text?"form-control error-control":"form-control"} type="text" value={obj.call_text} 
                onChange={(e) => setObj({ ...obj, call_text: e.target.value })} disabled={mode === 'display'} />
                </div>
            </div>
			 <div className="col">
	      <div className="form-group">
                    <label className="form-control-label">شرکت کننده برنده</label>
                    <Select className={errors.winning_company_id?"form-control error-control":"form-control"} {...Static.selectDefaultProp} disabled={mode === 'display'} options={winning_company_options}
                value={obj.winning_company_id} onSelect={(values) =>  setObj({ ...obj, winning_company_id: values})}
            />
           </div>
		   	 </div>
        <div className="col">
                <div className="form-group">
                    <label className="form-control-label">قیمت برنده</label>
                      <input className={errors.winning_price?"form-control error-control":"form-control"} type="number" value={obj.winning_price} 
                onChange={(e) => setObj({ ...obj, winning_price: e.target.value })} disabled={mode === 'display'}/>
                </div>
            </div>
	    </div>
	    <div className="row">
		 <div className="col-4">
                <div className="form-group">
                    <label className="form-control-label">کمیسیون منصوب </label>
                    <Select className={errors.commission_members_id?"form-control error-control":"form-control"} {...Static.selectDefaultProp} disabled={mode === 'display'} options={commission_members_options}
                  mode="multiple"   value={obj.commission_members_id} onChange={(values) => setObj({ ...obj, commission_members_id: values})}
            />
                </div>
            </div>
			<div className="col">
                <div className="form-group">
                    <label className="form-control-label">تضمین شرکت در فراخوان</label>
                    <Select className={errors.guarantee_association_id?"form-control error-control":"form-control"} {...Static.selectDefaultProp} disabled={mode === 'display'} options={guarantee_association_options}
                value={obj.guarantee_association_id} onSelect={(values) =>  setObj({ ...obj, guarantee_association_id: values})}
            />
                </div>
            </div><div className="col">
                <div className="form-group">
                    <label className="form-control-label">تضمین انجام تعهدات</label>
                    <Select className={errors.guarantee_do_id?"form-control error-control":"form-control"} {...Static.selectDefaultProp} disabled={mode === 'display'} options={guarantee_do_options}
                value={obj.guarantee_do_id} onSelect={(values) =>  setObj({ ...obj, guarantee_do_id: values})}
            />
                </div>
            </div>
			
		</div>
		 <div className="row">
             <div className="col">
                <div className="form-group">
                    <label className="form-control-label">مرجع انتشار</label>
                    <Select className={errors.reference_id?"form-control error-control":"form-control"} {...Static.selectDefaultProp} disabled={mode === 'display'} options={reference_options}
                value={obj.reference_id} onSelect={(values) =>  setObj({ ...obj, reference_id: values})}
            />
                </div>
            </div>
			
		<div className="col">
                <div className="form-group">
                    <label className="form-control-label">هزینه آگهی</label>
                      <input className={errors.advertising_fee?"form-control error-control":"form-control"} type="number" value={obj.advertising_fee} 
                onChange={(e) => setObj({ ...obj, advertising_fee: e.target.value })} disabled={mode === 'display'}/>
                </div>
            </div>
			<div className="col">
                <div className="form-group">
                    <label className="form-control-label">تامین کننده هزینه آگهی</label>
                    <Select className={errors.provider_id?"form-control error-control":"form-control"} {...Static.selectDefaultProp} disabled={mode === 'display'} options={provider_options}
                value={obj.provider_id} onSelect={(values) =>  setObj({ ...obj, provider_id: values})}
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

export default Call;