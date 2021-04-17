export const columns = [
    {
        Header: "شناسه",
        accessor: "id",
        notInGrid:true,
        notInForm:true,
        type:"serial",
    },
    {
        Header: "نام",
        accessor: "name",
        type:"text",
		req:true,
    },
	
	{
        Header: "نام خانوادگی",
        accessor: "last_name",
        type:"text",
		req:true,
    },
	{
        Header: "شماره بیمه",
        accessor: "insurance_number",
        type:"text",
		//req:true,
    },

	{
        Header: "کد ملی",
        accessor: "title",
        type:"text",
		req:true,
    },
	
	{
        Header: "شماره موبایل",
        accessor: "phone_number",
        type:"text",
		req:true,
    },
			
	{
        Header: "آدرس",
        accessor: "address",
  
        type:"note",
    },
	
	{
        Header: "کد پرسنلی",
        accessor: "personnel_code",
        type:"text",
        notInGrid:true,
    },
	
	{
        Header: "شماره حساب ",
        accessor: "account_number",
        notInGrid:true,
        type:"text",
    },
	
	{
        Header: "شماره کارت",
        accessor: "card_number",
        notInGrid:true,
        type:"text",
    },
	
	
	{
        Header: "شماره دسترسی ضروری",
        accessor: "required_number",
        notInGrid:true,
        type:"text",
    },

	
	{
        Header: "کدپستی",
        accessor: "postal_code",
        notInGrid:true,
        type:"text",
    },
	
    {
        Header: "آخرین مدرک تحصیلی",
        accessor: "last_educational",
        notInGrid:true,
       type: "lookup",
       entity: 'baseInfo',
    },
		{
        Header: "محل خدمت",
        accessor: "service_location",
        notInGrid:true,
        type: "lookup",
        entity: 'baseInfo',
		req:true,
    },
	 {
        Header: "سوابق",
        accessor: "record", 
        type:"lookup", 
        entity:'keyword', 
        notInGrid:true,   
    },


    {
        Header: "تجربیات",
        accessor: "experience", 
        type:"lookup", 
        entity:'keyword', 
        notInGrid:true,   
    },
	
    {
        Header: "تخصص",
        accessor: "specialty", 
        type:"lookup", 
        entity:'keyword', 
        notInGrid:true,   
    },
	
    {
        Header: "سمت سازمانی",
        accessor: "organization_level", 
        type:"lookup", 
        entity:'organizational', 
        notInGrid:true,   
    },
	
];


export const entityName='colleague';
export const pageHeader='اطلاعات همکاران';

