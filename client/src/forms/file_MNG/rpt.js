import React, { useState, useEffect, useRef } from 'react';
//import { getItems, insertItem, deleteItem, updateItem } from '../../api/index';
import { message, Select } from 'antd';
import Static from '../static';
import { useTable } from "react-table"

//import '../../assets/css/fileMNG.css';
const FileMNG_rpt = (props) => {
    const [data, setData] = useState([]);
    const [columns,setColumns]=useState([{
        Header: "کد سند",
        accessor: "code",
    },
    {
        Header: "نوع",
        accessor: "type",
    }, {
        Header: "عنوان",
        accessor: "title",
    }, {
        Header: "برچسب",
        accessor: "tag",
    }]);
    const orgData = [{id:1, code: 'PRJ-1258-25-01', type: 'اسناد پروژه', title: 'پروژه1', tag: 'فایل قرارداد' },
    {id:2, code: 'PRJ-1258-25-01', type: 'اسناد پروژه', title: 'پروژه1', tag: 'صورت وضعیت شماره1' },
    {id:3, code: 'PRJ-1258-25-02', type: 'اسناد پروژه', title: 'پروژه1', tag: 'صورت وضعیت شماره2' },
    {id:4, code: 'PRJ-1258-25-04', type: 'اسناد پروژه', title: 'پروژه1', tag: 'صورت وضعیت شماره4' },
    {id:5, code: 'PRJ-1258-26-01', type: 'اسناد پروژه', title: 'پروژه1', tag: 'تعدیل قرارداد' },
    {id:6, code: 'PRJ-1258-18-01', type: 'اسناد پروژه', title: 'پروژه1', tag: 'صورت جلسه تحویل زمین' },
    {id:7, code: 'EPM-15321-11-01', type: 'اسناد همکاران', title: '1همکار', tag: 'فایل قرارداد' },
    {id:8, code: 'EPM-15327-8-01', type: 'اسناد همکاران', title: '2همکار', tag: 'مدارک تحصیلی' },
    {id:9, code: 'EPM-15327-11-01', type: 'اسناد همکاران', title: 'همکار2', tag: 'فایل قرارداد' },
    {id:10, code: 'PRJ-1800-25-01', type: 'اسناد پروژه', title: 'پروژه2', tag: 'صورت وضعیت شماره1' },
    {id:11, code: 'PRJ-2541-25-01', type: 'اسناد پروژه', title: 'پروژه3', tag: 'صورت وضعیت شماره1' },
    {id:12, code: 'PRJ-1800-25-01', type: 'اسناد پروژه', title: 'پروژه2', tag: 'صورت وضعیت شماره2' }];
    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        rows,
        prepareRow,
    } = useTable({
        columns,
        data,
    })
    const onSearch = (searchText) => {
        //debugger;
       // console.log(searchText);
        if (searchText === '')
          setData([])
        else {
    
          let matched = [];
          orgData.forEach(record => {
            columns.filter(a => a.dataIndex !== 'operation').forEach(c => {
              //    console.log(record[c.dataIndex]);
              if (record[c.accessor] && record[c.accessor].toString().indexOf(searchText) >= 0 
                  &&!matched.find(a=>a.id===record.id)) {
               
                matched.push(record);
                
              }
            })
          })
          console.log(matched)
          setData(matched);
    
        }
    }    
    return (

        <section className="multi_step_form">
            <form id="msform">

                <div className="tittle">
                    <h2>سیستم آرشیو اسناد</h2>

                </div>
                جستجو : <input className='form-control' onChange={e => onSearch(e.target.value)}
        style={{ width: '200px', display: 'inline', marginBottom: '20px' }} />
        <br/>
                <table {...getTableProps()} className='table align-items-center table-flush'>
                    <thead className='thead-light'>
                        {headerGroups.map(headerGroup => (
                            <tr {...headerGroup.getHeaderGroupProps()}>
                                {headerGroup.headers.map(column => (
                                    <th {...column.getHeaderProps()}>{column.render("Header")}</th>
                                ))}
                                <th> فایل</th>
                            </tr>
                        ))}
                    </thead>

                    <tbody {...getTableBodyProps()}>
                        {rows.map(row => {
                            prepareRow(row)
                            return (
                                <tr {...row.getRowProps()}>
                                    {row.cells.map(cell => {
                                        return <td {...cell.getCellProps()}>{cell.render("Cell")}</td>
                                    })}
                                    <td>
                                        <a href='http://www.google.com'>دانلود</a>
                                    </td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>


            </form>
        </section>
    )
}

export default FileMNG_rpt;