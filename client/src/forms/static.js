export const successMessage = "عملیات با موفقیت انجام شد";
export const successDuration = 3;

export const errorMessage = "خطا در ذخیره سازی اطلاعات";
export const errorDuration = 3;

export const errorMesesagDuplicate = "اطلاعات مربوط به این سطر قبلا وارد سیستم شده";
export const errorDurationDuplicate = 5;

export const selectDefaultProp = {
    direction: "rtl", placeholder: 'انتخاب ...',
    filterOption: true, optionFilterProp: "label", showSearch: true
}

export const datePickerDefaultProp = {
    placeholder: "انتخاب تاریخ",
    format: "jYYYY/jMM/jDD", timePicker: false, isGregorian: false
}

export const numberDefaultProp = {
      thousandSeparator:true,
    displayType:'input',
}

export const checkPermission=(item)=>{
    let isAdmin = JSON.parse(localStorage.getItem('user')).role=='admin'?true:false;
    
    let perId=item[0]&&item[0].permission_id?item[0].permission_id:0;
    
    let canRead=isAdmin || perId>=30?true:false;
    let canAdd=isAdmin || perId>=31?true:false;
    let canEdit=isAdmin || perId>=32?true:false;
    return{canRead,canAdd,canEdit}
}
export default {checkPermission,numberDefaultProp,datePickerDefaultProp,selectDefaultProp,errorMesesagDuplicate,errorDurationDuplicate}