import { columns, entityName, pageHeader } from './statics'

String.prototype.toPascalCase = function () {
    return this.match(/[a-z]+/gi)
        .map(function (word) {
            return word.charAt(0).toUpperCase() + word.substr(1).toLowerCase()
        })
        .join('')
}

const createIndexFile = () => {



    const colPerRow = 3;
    const header = `import React, { useState, useEffect, useRef } from 'react';
import { getItems, insertItem, deleteItem, updateItem } from '../../api/index';
import TableContainer from "../../components/TableContainer";
import {columns,entityName} from './statics';
import { message,Select } from 'antd';
//import DatePicker from 'react-datepicker2';
//import moment from 'moment-jalaali';
//import Static from '../static' ;`;

    let cols = '', str = '';

    columns.filter(a => !a.notInForm).forEach((a, i) => {

        var ctrl = ``;
        switch (a.type) {
            case "text":
            case "note":
                ctrl += `  <input className={errors.${a.accessor}?"form-control error-control":"form-control"} type="text" value={obj.${a.accessor}} 
                onChange={(e) => setObj({ ...obj, ${a.accessor}: e.target.value })} disabled={mode === 'display'} />`;
                break;
            case "number":
                ctrl += `  <input className={errors.${a.accessor}?"form-control error-control":"form-control"} type="number" value={obj.${a.accessor}} 
                onChange={(e) => setObj({ ...obj, ${a.accessor}: e.target.value })} disabled={mode === 'display'}/>`;
                break;
            case "lookup":
                ctrl += `<Select className={errors.${a.accessor}_id?"form-control error-control":"form-control"} {...Static.selectDefaultProp} disabled={mode === 'display'} options={${a.accessor}_options}
                value={obj.${a.accessor}_id} onSelect={(values) =>  setObj({ ...obj, ${a.accessor}_id: values})}
            />`;
                break;

            case "bool":
                ctrl += `<input className="form-control1" type="checkbox" checked={obj.${a.accessor}} 
                onChange={(e) => setObj({ ...obj, ${a.accessor}: !obj.${a.accessor} })} disabled={mode === 'display'}/>`;
                break;
            case "date":
                ctrl += `<DatePicker onChange={value =>  setObj({ ...obj, ${a.accessor}: value})}
                value={obj.${a.accessor}} disabled={mode === 'display'} {...Static.datePickerDefaultProp}
                className={errors.${a.accessor} ? "form-control error-control" : 'form-control'} />`;
                break;
            default:
                ctrl += ` ${a.accessor} ------------,`;
                break;
        }
        str += `<div className="col">
                <div className="form-group">
                    <label className="form-control-label">${a.Header}</label>
                    ${ctrl}
                </div>
            </div>`;

        if ((i + 1) % colPerRow === 0) {

            cols += `<div className="row">${str}</div>`;
            str = '';
        }

    });

    let bodyHtml = `<div className="container-fluid">
<div className="row" style={{ paddingTop: '15px' }}>
    <div className="col">
        <div className="card ">
            <div className="card-header border-0">
                <div className="row align-items-center" ref={GridRef}>
                    <div className="col">
                        <h3 className="mb-0">${pageHeader}</h3>
                    </div>
                    <div className="col text-right">
                        <button className="btn btn-icon btn-primary" type="button" onClick={btnNewClick}>
                            <span className="btn-inner--icon"><i className="fas fa-plus"></i></span>
                            <span className="btn-inner--text">مورد جدید</span>
                        </button>

                    </div>
                </div>
            </div>
            <div className='table-responsive'>
                <TableContainer columns={columns.filter(a=>!a.notInGrid)} data={data} 
                    deleteClick={deleteBtnClick} 
                    displayClick={displayBtnClick} 
                    editClick={editBtnClick} />             
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
                    ${cols}
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

</div>`



    let body = `const ${entityName.toPascalCase()} = (props) => {
    const BoxRef = useRef(null), GridRef = useRef(null);;

    const [data, setData] = useState([]);
    const [errors, setErrors] = useState({});
    const [obj, setObj] = useState({});
    const [mode, setMode] = useState('');
    
    const getData = () => {
        setMode('');
        GridRef.current.scrollIntoView({ behavior: 'smooth' });
        Promise.all([ getItems(entityName),getItems("baseInfo")]).then((response) => {
            setData(response[0].data);
        })
        setObj({});;
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
                    //alert('خطا در ذخیره سازی اطلاعات');
                    message.error('خطا در ذخیره سازی اطلاعات', 3000);
                    console.log(response.data.message);
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
                   // alert('خطا در ذخیره سازی اطلاعات');
                    message.error('خطا در ذخیره سازی اطلاعات', 3000);
                    console.log(response.data.message);
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
    return (${bodyHtml})
}

export default ${entityName.toPascalCase()};`;

    return `${header} \n \n ${body}`;
}

const createDatabaseFile = () => {
    var str = `CREATE TABLE public."${entityName}"
    (`;
    columns.forEach((a, i) => {
        switch (a.type) {
            case "text":
                str += `\n ${a.accessor} character varying(100) COLLATE pg_catalog."default" ,`;
                break;
            case "serial":
                str += `\n ${a.accessor} serial,`;
                break;
            case "lookup":
                str += `\n ${a.accessor}_id int,`;
                break;
            case "note":
                str += `\n ${a.accessor} text ,`;
                break;
            case "bool":
                str += `\n ${a.accessor} boolean DEFAULT true,`;
                break;
            case "datetime":
                str += `\n ${a.accessor} timestamp with time zone,`;
                break;
            case "date":
                str += `\n ${a.accessor} date,`;
                break;
            default:
                str += `\n ${a.accessor} ------------,`;
                break;
        }

    });
    str += `\n   CONSTRAINT ${entityName}s_pkey PRIMARY KEY (id)
    )
    INHERITS (public.tbl_base)`;
    return str;
}
const fs = require('fs');
fs.mkdir(`./tmp/${entityName}`, { recursive: true }, (err) => {
    if (err) throw err;

    fs.writeFileSync(`./tmp/${entityName}/index.js`, createIndexFile());
    fs.writeFileSync(`./tmp/${entityName}/db.txt`, createDatabaseFile());
    console.log('done');
});
