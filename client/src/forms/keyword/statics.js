
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
      
      },
      
	
];


export const entityName='keyword';
export const pageHeader='بانک کلید واژه';

export const groups=[{title:'سوابق',value:1},
{title:'تجربیات',value:2},
{title:'تخصص',value:3},

];