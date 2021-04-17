import React, { useState, useEffect, useRef } from 'react';
//import { getItems, insertItem, deleteItem, updateItem } from '../../api/index';
import { message, Select  } from 'antd';
import Static from '../static';


import '../../assets/css/fileMNG.css';
const FileMNG = (props) => {
    const [step, setStep] = useState(1);
    const [st, setSt] = useState(0);
    const [obj, setObj] = useState({});
    const [type_options, setType_options] = useState([]);
    const [project_options, setProject_options] = useState([]);
    const [employee_options, setEmployee_options] = useState([]);
    const [company_options, setCompany_options] = useState([]);
    const [tender_options, setTender_options] = useState([]);
   
    const [tags, setTags] = React.useState([]);
    const [suggestions, setSuggestions] = React.useState([
    { value: 3, title: "صورت وضعیت" },
    { value: 4, title: "صورت جلسه" },
    { value: 5, title: "اداره تدارکات" },
    { value: 6, title: "دستور مدیرعامل" }].map(a => { return { key: a.value, label: a.title, value: a.value } }));
    const getData = () => {
        setType_options([{ title: 'اسناد همکاران', value: 1 },
        { title: 'اسناد پروژه', value: 2 },
        { title: 'اسناد شرکت ها', value: 3 },
        { title: 'اسناد مناقصه', value: 4 },
        { title: 'متفرقه', value: 5 },

        ].map(a => { return { key: a.value, label: a.title, value: a.value } }));
        setProject_options([{ title: 'پروژه11', value: 1 },
        { title: 'پروژه1', value: 2 },
        { title: 'پروژه2', value: 3 },
        { title: 'پروژه3', value: 4 },
        { title: 'پروژه4', value: 5 },
        ].map(a => { return { key: a.value, label: a.title, value: a.value } }));
        setEmployee_options([{ title: 'همکار 1', value: 1 },
        { title: 'همکار 2', value: 2 },
        { title: 'همکار 3', value: 3 },
        { title: 'همکار 4', value: 4 },
        { title: 'همکار 5', value: 5 },
        ].map(a => { return { key: a.value, label: a.title, value: a.value } }));
        setCompany_options([
        { title: 'شرکت 1', value: 1 },
        { title: 'شرکت 2', value: 2 },
        { title: 'شرکت 3', value: 3 },
        { title: 'شرکت 4', value: 4 },
        { title: 'شرکت 5', value: 5 },
        ].map(a => { return { key: a.value, label: a.title, value: a.value } }));
        setTender_options([
        { title: 'مناقصه 1', value: 1 },
        { title: 'مناقصه 2', value: 2 },
        { title: 'مناقصه 3', value: 3 },
        { title: 'مناقصه 4', value: 4 },
        { title: 'مناقصه 5', value: 5 },
        ].map(a => { return { key: a.value, label: a.title, value: a.value } }));
    }
    useEffect(() => {
        getData();
    }, [])

    const saveFile=()=>{
        message.success('فایل با موفقیت بارگذاری شد . کد سند : 552-15952-12',4);
        setStep(1);
    }
    return (

        <section class="multi_step_form">
            <form id="msform">

                <div class="tittle">
                    <h2>سیستم آرشیو اسناد</h2>
                    <p>لطفا فایل مورد نظر را بارگذاری کنید</p>
                </div>

                <ul id="progressbar">
                    <li class={step > 0 ? "active" : ''}>اطلاعات</li>
                    <li class={step > 1 ? "active" : ''}>بارگذاری فایل</li>
                    <li class={step > 2 ? "active" : ''}>برچسب گذاری</li>
                </ul>

                {step === 1 && <fieldset>
                    <div className="row">
                        <div className="col">
                            <div className="form-group">
                                <label className="form-control-label">نوع فایل</label>
                                <Select className="form-control" {...Static.selectDefaultProp} options={type_options}
                                    value={obj.type_id} onSelect={(values) =>{ setObj({ ...obj, type_id: values });setSt(values)}} />
                            </div>
                        </div>
                      {st===2&&  <div className="col">
                            <div className="form-group">
                                <label className="form-control-label">پروژه</label>
                                <Select className="form-control" {...Static.selectDefaultProp} options={project_options}
                                    value={obj.project_id} onSelect={(values) => setObj({ ...obj, project_id: values })} />
                            </div>
                        </div> }
                        {st===1&&   <div className="col">
                            <div className="form-group">
                                <label className="form-control-label">همکاران</label>
                                <Select className="form-control" {...Static.selectDefaultProp} options={employee_options}
                                    value={obj.employee_id} onSelect={(values) => setObj({ ...obj, employee_id: values })} />
                            </div>
                        </div>}
                        {st===3&&     <div className="col">
                            <div className="form-group">
                                <label className="form-control-label">شرکت ها</label>
                                <Select className="form-control" {...Static.selectDefaultProp} options={company_options}
                                    value={obj.company_id} onSelect={(values) => setObj({ ...obj, company_id: values })} />
                            </div>
                        </div>}
                        {st===4&&   <div className="col">
                            <div className="form-group">
                                <label className="form-control-label">مناقصه</label>
                                <Select className="form-control" {...Static.selectDefaultProp} options={tender_options}
                                    value={obj.tender_id} onSelect={(values) => setObj({ ...obj,tender_id: values })} />
                            </div>
                        </div>}
                    </div>
                    <input type="button" class="next action-button" value='ادامه' onClick={() => setStep(2)} />
                    {/* <input type="button" class="action-button previous_button" value='بازگشت' /> */}

                </fieldset>}

                {step === 2 && <fieldset>
                    <div className="row">
                        <div className="col">
                            <div className="form-group">
                                <label className="form-control-label">بارگذاری</label>
                                <input type="file" class="custom-file-input"></input>
                            </div>
                        </div>
                    </div>
                    <input type="button" class="next action-button" value='ادامه' onClick={() => setStep(3)} />
                    <input type="button" class="action-button previous previous_button" value='بازگشت' onClick={() => setStep(1)}/>

                </fieldset>}

                {step === 3 && <fieldset>
                    <h3>برچسب گدازی</h3>
                    <h6>مواردی که به فایل ارتباط دارند رو تایپ کنید تا بتوان از انها در جستجو استفاده کرد</h6>
                    
                    <Select className="form-control" {...Static.selectDefaultProp} options={suggestions} mode="tags"
                                    value={tags} onChange={(values) => setTags(values )} />
                    <br/>  <br/>  <br/>
                    <input type="button" class="next action-button" value='اتمام' onClick={() => saveFile()} />
                    <input type="button" class="action-button previous previous_button" value='بازگشت' onClick={() => setStep(2)}/>
                </fieldset>}
            </form>
        </section>
    )
}

export default FileMNG;