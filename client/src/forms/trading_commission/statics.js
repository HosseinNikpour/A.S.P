
export const columns = [
    {
        Header: "شناسه",
        accessor: "id",
        notInGrid:true,
        notInForm:true,
        type:"serial",
    },
    {
        Header: "کمیسیون منصوب",
        accessor: "title",
        type:"text",
		req:true,
    },

    {
        Header: "تاریخ ابلاغ احکام",
        accessor: "rule_date",
        type: "date",
        notInGrid: true,
        req: true,
      },
      
		 {
        Header: "عضو",
        accessor: "member_position", 
        type:"lookup", 
        entity:'colleague', 
        notInGrid:true,
        req: true,
	 		
    },

    {
        Header: "سمت",
        accessor: "role", 
        type:"lookup", 
        entity:'baseInfo', 
        notInGrid:true,
        req: true,
	 		
    },



];


export const entityName='trading_commission';
export const pageHeader=' کمیسیون  معاملات';