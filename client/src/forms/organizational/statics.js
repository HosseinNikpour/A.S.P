export const columns = [
   {
       Header: "شناسه",
       accessor: "id",
       notInGrid:true,
       notInForm:true,
       type:"serial",
   },

   {
    Header: "نام سازمان",
    accessor: "title",
    type:"text",
     req:true,
},
{
    Header: "تلفن",
    accessor: "tell",
    //notInGrid:true,
    type:"text",
    req:true,
},
{
    Header: "آدرس دفتر مرکزی",
    accessor: "address_central",
  //  notInGrid:true,
    type:"note",
     req:true,
},
{
    Header: "بلک لیست",
    accessor: "black", 
    type:"bool", 

   notInGrid:true, 
  
},
{
    Header: "بلک لیست",
    accessor: "blackDisplay", 
    type:"bool", 
    notInForm:true,
   // notInGrid:true, 
    
},
   {
       Header: "شناسه ملی",
       accessor: "meli_code",
       type:"text",
       notInGrid:true,
       req:true,
   },
   {
       Header: "کد اقتصادی",
       accessor: "economic_code",
       type:"text",
       //notInGrid:true,
     
   },
   {
       Header: "شماره ثبت",
       accessor: "registration_number",
       type:"text",
       notInGrid:true,
     // req:true,
   },

  {
       Header: "نام دوم",
       accessor: "second_name",
       type:"text",
       notInGrid:true,
   },
  {
       Header: "آخرین شماره حساب",
       accessor: "account_number",
       type:"text",
       notInGrid:true,
   },

   {
       Header: "آدرس سایر دفاتر",
       accessor: "address_other",
       notInGrid:true,
       type:"note",
   },
   {
       Header: "کد پستی",
       accessor: "postal_code",
       type:"text",
       notInGrid:true,
   },
   {
       Header: "آدرس سایت",
       accessor: "website",
       type:"text",
       notInGrid:true,
   },
  

   {
       Header: "فکس",
       accessor: "fax",   
       notInGrid:true, 
       type:"text",
   },
 
  {
       Header: "نوع ارتباط با شرکت",
       accessor: "relationship", 
       type:"lookup", 
       entity:'baseInfo', 
       notInGrid:true,
     // req:true,		
   },
 {
       Header: "حوزه های همکاری با شرکت",
       accessor: "area", 
       type:"lookup", 
       entity:'baseInfo', 
       notInGrid:true, 
        req:true,		
   
    },
  {
       Header: "رتبه اخذ شده",
       accessor: "rank", 
       type:"lookup", 
       entity:'baseInfo', 
       notInGrid:true,   
   },





];


export const entityName='organizational';
export const pageHeader='سازمانهای همکار';