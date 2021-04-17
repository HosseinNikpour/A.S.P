
export const columns = [
    {
        Header: "شناسه",
        accessor: "id",
        notInGrid:true,
        notInForm:true,
        type:"serial",
    },
    {
        Header: "عنوان",
        accessor: "title",
        type:"text",
		req:true,
    },

    {
        Header: "گروه",
        accessor: "group",
        type: "lookup",
        req: true,
        notInGrid: true,
      },
      
	
];


export const entityName='keyword';
export const pageHeader='بانک کلید واژه';