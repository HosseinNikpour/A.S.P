import React, { useState, useEffect, useRef } from 'react';
import { getItems, insertItem, deleteItem, updateItem } from '../../api/index';
import TableContainer from "../../components/TableContainer";
import { columns, entityName } from './statics';
import { message } from 'antd';

const User = (props) => {
    const BoxRef = useRef(null), GridRef = useRef(null);;

    const [data, setData] = useState([]);
    const [obj, setObj] = useState({});
    const [mode, setMode] = useState('');

    const getData = () => {
        setMode('');
        GridRef.current.scrollIntoView({ behavior: 'smooth' });
        getItems(entityName).then((response) => {
            setData(response.data);
            setObj({});
          //  setErrors({});
        })
    }
    useEffect(() => {
        getData();
    }, [])


    const btnNewClick = () => {
        setMode('new');
        BoxRef.current.scrollIntoView({ behavior: 'smooth' });
    }
    const saveBtnClick = () => {
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
                                <h3 className="mb-0">مدیریت کاربران</h3>
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
                                <h3 className="mb-0">
                                {mode === 'new' ? 'اضافه کردن آیتم جدید' : mode === 'edit' ? 'ویرایش آیتم' : 'مشاهده آیتم'}
                                </h3>
                                <hr></hr>
                            </div>
                        </div>
                    </div>
                    <div className='card-body' style={{ marginTop: '-50px' }}>
                        <form>
                            <div className="row">
                                <div className="col">
                                    <div className="form-group">
                                        <label className="form-control-label">نام و نام خانوادگی</label>
                                        <input className="form-control" type="text" value={obj.name} 
                                        onChange={(e) => setObj({ ...obj, name: e.target.value })} disabled={mode === 'display'} />
                                    </div>
                                </div>
                                <div className="col">
                                    <div className="form-group">
                                        <label className="form-control-label">نام کاربری</label>
                                        <input className="form-control" type="text" value={obj.username} 
                                        onChange={(e) => setObj({ ...obj, username: e.target.value })} disabled={mode === 'display'}/>
                                    </div>
                                </div>
                                <div className="col">
                                    <div className="form-group">
                                        <label className="form-control-label">شماره موبایل </label>
                                        <input className="form-control" type="text" value={obj.phone} 
                                        onChange={(e) => setObj({ ...obj, phone: e.target.value })} disabled={mode === 'display'}/>
                                    </div>
                                </div>

                            </div>
                            <div className="row">
                            {mode === 'new' && <div className="col-4">
                                 <div className="form-group">
                                        <label className="form-control-label">رمز عبور</label>
                                        <input className="form-control" type="text" value={obj.password} 
                                        onChange={(e) => setObj({ ...obj, password: e.target.value })} disabled={mode === 'display'}/>
                                    </div>
                                </div>}
                                <div className="col">
                                    {mode !== 'new' && <div className="form-group">
                                        <label className="form-control-label">فعال؟</label>
                                        <input className="form-control1" type="checkbox" checked={obj.enabled} 
                                        onChange={(e) => setObj({ ...obj, enabled: !obj.enabled })} disabled={mode === 'display'}/>
                                    </div>}
                                </div>
                            </div>
                            <div className="row">
                                <div className="col">
                                    {mode!=="display" &&<button type="button" className="btn btn-outline-primary" onClick={saveBtnClick}>ذخیره</button>}
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

export default User;