import React, { useState, useEffect } from "react"
import { useTable,useSortBy } from "react-table"
import { Menu, Dropdown, Popconfirm } from 'antd';
import { CSVLink } from "react-csv";

const TableContainer = ({ data, columns, deleteClick, editClick, displayClick ,downloadName }) => {
  let [cRow, setCRow] = useState();




  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
  } = useTable({
    columns,
    data,
  },useSortBy)

  const menu = (
    <Menu>
      {editClick && <Menu.Item>

        <div  className="edit-item"  onClick={() => editClick(cRow)}>
          {/* <i className="fa fa-edit"  /> */}
          
        </div>
      </Menu.Item>}
      <Menu.Item>
        <div  className="view-item" onClick={() => displayClick(cRow)}>
          {/* <i className="far fa-eye"  /> */}
         
          
        </div>
      </Menu.Item>
      {deleteClick && <Menu.Item>

        <Popconfirm title="  آیا از حذف مطمئن هستید ؟" okText="تایید" cancelText="عدم تایید"
          onConfirm={() => deleteClick(cRow)}>
          {/* <i className="far fa-trash-alt" style={{ marginRight: '8px' }}></i> */}
          <div className="delet-item" >  </div>
            </Popconfirm>
        {/* <i className="far fa-trash-alt"  />  */}


      </Menu.Item>}

    </Menu>
  );


  return (
    <div >
     {downloadName&& <CSVLink data={data} headers={columns.map(a=>({label:a.Header,key:a.accessor}))} filename={downloadName+'.csv'} className="download-list" >  </CSVLink>}
      <table {...getTableProps()} className='table align-items-center table-flush'>
        <thead className='thead-light'>
          {headerGroups.map(headerGroup => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map(column => (
                <th {...column.getHeaderProps()}>{column.render("Header")}
                 <span>
                    {column.isSorted
                      ? column.isSortedDesc
                        ? ' 🔽'
                        : ' 🔼'
                      : ''}
                  </span></th>
              ))}
              <th></th>
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
                  <Dropdown overlay={menu} placement="bottomCenter" arrow>
                    <a className="ant-dropdown-link" onClick={e => { e.preventDefault(); setCRow(row.original) }}>
                      {/* عملیات  
                 <i className='fas fa-angle-down'></i> */}
                 ...
                 </a>
                  </Dropdown>
                  {/* <i className="fa fa-edit" onClick={() => editClick(row.original)} />
                <i className="far fa-trash-alt" style={{ marginRight: '8px' }} onClick={() => {  deleteClick(row.original) }}></i>
                <i className="far fa-eye" onClick={() => displayClick(row.original)} style={{ marginRight: '8px' }} ></i> */}
                </td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  )
}

export default TableContainer