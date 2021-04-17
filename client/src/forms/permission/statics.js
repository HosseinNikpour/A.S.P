export const entity_options=[{title:'اطلاعات قراردادها',value:1},
{title:'اطلاعات شرکت ها',value:2},{title:'اطلاعات پروژه ها',value:3},
{title:'سازمانهای همکار',value:4},{title:'اطلاعات همکاران',value:5},
{title:'فراخوان',value:6},{title:'اطلاعات الحاقیه',value:7},
{title:'کمیسیون  معاملات',value:8},{title:'اطلاعات پایه',value:9},
{title:'بانک کلید واژه',value:10},

].map(a => { return { key: a.value, label: a.title, value: a.value } });
export const entityName='permission';
export const pageHeader='اطلاعات دسترسی ها';

export const columns = [
  {
    Header: "کاربر",
    accessor: "user",
  },
  {
    Header: "دسترسی",
    accessor: "permission",
  },
  ]