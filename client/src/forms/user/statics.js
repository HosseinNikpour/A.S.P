import moment from 'moment-jalaali'
export const columns = [
    {
        Header: "شناسه",
        accessor: "id",
        notInGrid:true,
        notInForm:true,
    },
    {
        Header: "نام و نام خانوادگی",
        accessor: "name",
        req:true
    },
    {
        Header: "نام کاربری",
        accessor: "username",
        req:true
    },
    {
        Header: "شماره موبایل ",
        accessor: "phone",
    },
    {
        Header: "رمز عبور",
        accessor: "password",
        notInGrid:true,
       // req:true
    },
    {
        Header: "فعال؟",
        accessor: "enabled",
         Cell:({ value }) => value?"بله":"خیر"
    },
    {
        Header: "تاریخ آخرین اتصال",
        accessor: "last_login",
        notInForm:true,
        Cell:({ value }) => (value)?moment(String(value)).format('jYYYY/jMM/jDD HH:mm'):''
    },
];

export const entityName='user';
export const pageHeader='مدیریت کاربران';