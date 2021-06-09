export const columns = [
    {
     Header: "شناسه",
     accessor: "id",
     notInGrid:true,
     notInForm:true,
     type:"serial",
 },
 
 {
     Header: "نام پروژه",
     accessor: "title",
     type:"text",
  
     req:true,
 },
 {
     Header: "کد پروژه",
     accessor: "project_code",
     type:"text",
     notInGrid:true,
     req:true,
 },
 {
     Header: "آدرس پروژه",
     accessor: "project_address",
     notInGrid:true,
     type:"note",
 },

 {
     Header: "سرپرست کارگاه",
     accessor: "site_manager", 
     type:"lookup", 
     entity:'organizational', 
     notInGrid:true,
   		
 },
 

 {
     Header: "شماره تماس",
     accessor: "phone_site",
     notInGrid:true,
     type:"calc",
    
 },

{
     Header: "مدیر پروژه",
     accessor: "project_manager", 
     type:"lookup", 
     entity:'organizational',
     req:true, 

           
 },
 
 {
     Header: "شماره تماس",
     accessor: "phone_manager",
     
     type:"calc",
 
 },
  {
     Header: "شماره دسترسی ضروری",
     accessor: "required_number",
     notInGrid:true,
     type:"text",
    // req:true,
 },
 
 { Header: "پیمانکار",
     accessor: "contractor", 
     type:"lookup", 
     entity:'organizational', 
     req:true,
    
       
 },
 
  {
     Header: "مشاور",
     accessor: "consultant", 
     type:"lookup", 
     entity:'organizational', 
     req:true,
    
          
 },
 
  {
     Header: "کارفرما",
     accessor: "employer", 
     type:"lookup", 
     entity:'organizational', 
     req:true,
 
            
 },
 
];


export const entityName='projects';
export const pageHeader='اطلاعات پروژه ها';	