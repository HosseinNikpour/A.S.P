import React from 'react';
import img from '../assets/img/working.png';

const CommingSoon = (props) => {



  return (
    <div className="container-fluid">

      <p style={{direction: "rtl", textAlign: "center"}}>
        <img src={img} width="500" />
      </p>
      <p style={{direction: "rtl", textAlign: "center"}}>
        پس از تکمیل اطلاعات پایه و تحلیل اطلاعات پویا (Dynamic Information) در فاز های آتی ، این صفحه با سفارش سازمان؛ طراحی و
        پیاده سازی خواهد شد.
</p>

    </div>
  )
}

export default CommingSoon;