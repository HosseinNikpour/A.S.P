import moment from 'moment-jalaali';

export const columns = [

  {
    Header: "شناسه",
    accessor: "id",
    notInGrid:true,
    notInForm:true,
    type:"serial",
},
 
{
  Header: "نام و شماره قرارداد ",
  accessor: "contract_number",
  type:"lookup", 
  entity:'contract',
   req:true,

}, 
 
  {
      Header: "شماره الحاقیه",
      accessor: "title",
      type:"text",
      req:true,
      notInGrid:true,
   
    },

   
    {
      Header: "مبلغ جدید ",
      accessor: "new_amount",
      type:"number",
      req:true,
   }, 


   {
      Header: "تاریخ خاتمه جدید",
      accessor: "end_date",
      type:"date",
      notInGrid:true,
     // req:true,
   },

   {
    Header: "تاریخ خاتمه جدید",
    accessor: "end_datedisplay",
    type:"date",

    notInForm:true,
 },
   
    {
      Header: "تعهدات جدید",
      accessor: "new_commitments",
      type:"text",
    // req:true,
    },
   
  ];
 
 
 export const entityName='supplement';
 export const pageHeader='الحاقیه ها';
 
 
 
  
   
   