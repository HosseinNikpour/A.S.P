export const columns = [
   {
    Header: "شناسه",
    accessor: "id",
    notInGrid:true,
    notInForm:true,
    type:"serial",
},

{
   Header: "تاریخ فراخوان",
   accessor: "call_date",
   type:"date",
   req:true,
   notInGrid:true,

},


{
  Header: "تاریخ فراخوان",
  accessor: "call_datedisplay",
  type:"date",
  notInForm:true,
 
}, 
{
   Header: "نام پروژه ",
   accessor: "project_name",
   type:"lookup", 
   entity:'projects', 
  // notInGrid:true,
   req:true,
}, 

{
    Header: "شماره فراخوان",
    accessor: "call_number",
    type:"text",
     req:true,
  },



 
{
    Header: "مرجع انتشار",
    accessor: "reference",
    type:"lookup", 
    entity:'baseInfo', 
    notInGrid:true,
    //req:true,
 },  
     

{
    Header: "تاریخ بازگشایی پاکات",
    accessor: "date_open",
     type:"date",
    notInGrid:true,
 },  
 
{
    Header: "آخرین تاریخ تجدید",
    accessor: "last_date",
    type:"date",
    notInGrid:true,
 },  
 
 

{
    Header: "موضوع فراخوان",
    accessor: "title",
    type:"text",
    req:true,
  },	


 {
    Header: "متن فراخوان",
    accessor: "call_text",
    type:"text",
    req:true,
    notInGrid:true,
  },		

  {
   Header: "شرکت کننده برنده",
   accessor: "winning_company",
   type:"lookup", 
   entity:'organizational', 
  // notInGrid:true,
   req:true,
},  
{
    Header: "قیمت برنده",
    accessor: "winning_price",
    type:"number",
   // notInGrid:true,
    req:true,
 },   

 

    {
    Header: "تضمین شرکت در فراخوان",
    accessor: "guarantee_association",
    type:"lookup", 
    entity:'baseInfo', 
    notInGrid:true,
 },  
  
  
    {
    Header: "تضمین انجام تعهدات",
    accessor: "guarantee_do",
    type:"lookup", 
    entity:'baseInfo', 
    notInGrid:true,
 },  
  
  
{
    Header: "هزینه آگهی",
    accessor: "advertising_fee",
    type:"number",
    notInGrid:true,
 }, 
 
 {
    Header: "تامین کننده هزینه آگهی",
    accessor: "provider",
    type:"lookup", 
    entity:'organizational', 
    notInGrid:true,
 }, 

     {
    Header: "نام پروژه ",
    accessor: "project_name",
    type:"lookup", 
    entity:'projects', 
    notInGrid:true,
    req:true,
 }, 
 

 /*{
    Header: "کدپروژه ",
    accessor: "project_code",
    type:"text",
    notInGrid:true,
 }, */
 

{
    Header: "کمیسیون منصوب",
    accessor: "commission_members",
    type:"lookup", 
    entity:'trading_commission', 
    notInGrid:true,
    req:true,
 }, 
];
export const entityName='call';
export const pageHeader='فراخوان';	 
 