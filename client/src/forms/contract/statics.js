import moment from 'moment-jalaali'

export const columns = [
  {
    Header: "شناسه",
    accessor: "id",
   notInGrid: true,
    notInForm: true,
    type: "serial",
  },

  {
    Header: "پروژه",
    accessor: "project",
    type: "lookup",
    entity: 'projects',
    req: true,
   notInGrid: true,
  },
  {
    Header: "نام قرارداد",
    accessor: "title",
    type: "text",
    req: true,
  },

  {
    Header: "نام پروژه",
    accessor: "project_name",
    type: "calc",
    notInForm: true,
  },
  {
    Header: "طرف قرارداد",
    accessor: "contracting_party",
    type: "lookup",
    entity: 'organizational',
    req: true,

  },
  {
    Header: "مبلغ اولیه قرارداد",
    accessor: "initial_amount",
    type: "number",
    req: true,

  },
  {
    Header: "تاریخ ابلاغ قرارداد",
    accessor: "date_signiification",
    type: "date",
    req: true,
  notInGrid: true,
  },


  {
    Header: "کدپروژه",
    accessor: "Project_code",
    type: "calc",
   notInGrid: true,
  },


  {
    Header: "شماره قرارداد",
    accessor: "contract_number",
    type: "text",
    req: true,
    notInGrid: true,
   
  },

  {
    Header: "موضوع قرارداد",
    accessor: "contract_subject",
    type: "text",
    req: true,
   notInGrid: true,

  },

  {
    Header: "تاریخ انعقاد قرارداد",
    accessor: "date_ratifcation",
    type: "date",
    //req: true,
   notInGrid: true,
  },

  

  {
    Header: "نوع فراخوان",
    accessor: "type_tender",
    type: "lookup",
    entity: 'baseInfo',
   notInGrid: true,
  },


  {
    Header: "تاریخ کمیسیون",
    accessor: "date_commission",
    type: "date",
   notInGrid: true,

  },

  {
    Header: "توضیحات تکمیلی",
    accessor: "commission_number",
    type: "text",
   notInGrid: true,
  },

  {
    Header: "کمیسیون منصوب",
    accessor: "commission_members",
    type: "lookup",
    entity: 'trading_commission',
   notInGrid: true,

  },
  
  {
    Header: "نوع قرارداد",
    accessor: "contract_type",
    type: "lookup",
    entity: 'baseInfo',

  },
  {
    Header: "تاریخ شروع",
    accessor: "start_date1",
    type: "date",
    notInForm: true,
  },
  {
    Header: "تاریخ شروع",
    accessor: "start_date",
    type: "date",
    notInGrid: true,
    req: true,
   //render: function (text) { return text&&moment.isMoment(text)?text.format('jYYYY/jMM/jDD') :''}
  },
  {
    Header: "تاریخ خاتمه",
    accessor: "end_date",
    type: "date",
   notInGrid: true,
    req: true,
  },
  {
    Header: "مدیر پروژه",
    accessor: "project_manager",
    type: "lookup",
    entity: 'colleague',
   notInGrid: true,
  },

  {
    Header: "شماره تماس",
    accessor: "phone_manager",
   notInGrid: true,
    type: "text",

  },
  {
    Header: "کارفرما",
    accessor: "employer",
    type: "lookup",
    entity: 'organizational',
 

  },

  {
    Header: "پیمانکار",
    accessor: "contractor",
    type: "lookup",
    entity: 'organizational',


  },

  {
    Header: "مشاور",
    accessor: "consultant",
    type: "lookup",
    entity: 'organizational',
   notInGrid: true,

  },
  {
    Header: "استان",
    accessor: "province",
    type: "lookup",
    entity: 'baseInfo',
   notInGrid: true,

  },

  {
    Header: "شهر",
    accessor: "city",
   notInGrid: true,
    type: "text",

  },

  {
    Header: "مبلغ پیش پرداخت",
    accessor: "prepayment_amount",
    type: "number",
    req: true,
   notInGrid: true,
  },
  {
    Header: "نوع تضمین پیش پرداخت",
    accessor: "type_payment",
    type: "lookup",
    entity: 'baseInfo',
   notInGrid: true,
   // req: true,
  },

  {
    Header: "نوع تضمین تعهدات",
    accessor: "type_guarantee",
    type: "lookup",
    entity: 'baseInfo',
   notInGrid: true,
   // req: true,
  },
  {
    Header: "مبلغ تضمین تعهدات",
    accessor: "amount_guarantee",
    type: "number",
   // req: true,
   notInGrid: true,
  },

];


export const entityName = 'contract';
export const pageHeader = 'اطلاعات قراردادها';


