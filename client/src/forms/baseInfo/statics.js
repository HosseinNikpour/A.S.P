//import moment from 'moment-jalaali'
export const columns = [
    {
        Header: "شناسه",
        accessor: "id",
      //  notInGrid:true,
        notInForm:true,
    },
    {
        Header: "عنوان",
        accessor: "title",
       // req:true,
    },
    {
        Header: "ترتیب",
        accessor: "sort",
    },
    {
        Header: "گروه",
        accessor: "group",
        notInGrid:true,
        notInForm:true,
    },
   
    
   
];
export const groups=[{title:'نوع ارتباط با شرکت',value:1},
{title:'سمت سازمانی',value:2},
/*{title:'نوع کمیسیون',value:3},*/
{title:'نوع تضمین',value:4},
{title:'نوع قرارداد',value:5},
{title:'رسته فعالیت',value:6},
{title:'رتبه بندی ها',value:7},
{title:'نوع فراخوان ',value:8},
{title:'استانها',value:9},
{title:'مرجع انتشار',value:10},
{title:'مدارک تحصیلی',value:11},
{title:'محل خدمت',value:12},
{title:'گروه بندی کلید واژه',value:13},
];
export const entityName='baseInfo';
export const pageHeader='اطلاعات پایه';