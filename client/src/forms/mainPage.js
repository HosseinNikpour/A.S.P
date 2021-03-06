import React from 'react';
import img from '../assets/img/working.png';
import image1 from '../assets/img/mainpage/image1.jpg';
import lamp from '../assets/img/mainpage/lamp.jpg';
import image2 from '../assets/img/mainpage/image2.jpg';
import image3 from '../assets/img/mainpage/image3.jpg';
import image4 from '../assets/img/mainpage/image4.jpg';
import Untitled6 from '../assets/img/mainpage/Untitled-6.jpg';
import cricle from '../assets/img/mainpage/cricle.jpg';
import hand from '../assets/img/mainpage/hand-brain.jpg';
import asd from '../assets/img/mainpage/asd.jpg';
import towman from '../assets/img/mainpage/towman.jpg';




const MainPage = (props) => {



  return (
    <div className="container-fluid home-page ">

   
<p>
  
</p>

<p>سامانه مدیریت اطلاعات پروژه به صورت سفارشی توسعه یافته و با چهار مولفه اصلی قابل گسترش می باشد:</p>
<p>افراد و نقش ایشان ، فرآیندها (وظایف و پروسه ها)، قوانین پایه، ساختار (داده ها و اطلاعات)</p>
<p>  <img src={image1} className="img-center" alt="..." />  </p>
<p>معرفی کاربران و نقش سازمانی آنها (users , Roles) &nbsp;و همچنین ارائه فرآیندهای جاری (Process)&nbsp; شامل وظایف، گردش کارها، پروسه های در حال انجام و همچنین قوانین پایه (Rules) لازم است در قالب مستندات فیزیکی و دیجیتال توسط سازمان (کارفرما) جهت بررسی، تحلیل و طراحی ساختار داده ها و اطلاعات به تیم فنی "بهروش اندیش" ارائه گردد تا بر اساس ترکیب و مختصات اطلاعاتی هر مجموعه کاری، یک طراحی منحصربفرد صورت پذیرد.</p>
<p>  <img src={lamp} className="img-center" alt="..." />  </p>

<p>هدف نهایی این سامانه، دست یابی به داشبردهای هدفمند مدیریت کلان پروژه&nbsp; بدون وابستگی به اسناد فیزیکی می باشد. برای رسیدن به این هدف &nbsp;8 مرحله زیر پیش بینی شده است:</p>
<ul>
<li><u>ارزیابی و تحلیل اولیه:</u> در نخستین گام داده آرایی و طراحی ساختار اطلاعاتی پایه بر اساس فرم های جاری و اطلاعات اخذ شده از سازمان صورت می پذیرد.</li>
<li><u>اطلاعات پایه:</u> در این مرحله، طراحی و پیاده سازی جداول پایه و اطلاعات پایه که همگی آنها معمولا تغییر پذیر نیستند و یا در بازه های زمانی بلند مدت تغییرات کمی دارند؛ انجام می شود. اطلاعات پایه زیر در نظر گرفته شده اند:
<ol>
<li>همکاران</li>
<li>شرکتها و سازمانهای همکار</li>
<li>پروژه ها</li>
<li>قرارداد ها (زیر مجموعه ای از پروژه ها و یا به صورت مستقل)</li>
<li>الحاقیه های قراردادها</li>
<li>کمیسیون معاملات</li>
<li>فراخوان ها</li>
</ol>
</li>
</ul>
<p>&nbsp;</p>
<ul>
<li><u>گزارشات اطلاعات پایه:</u> پس از ورود اطلاعات پایه توسط کاربران عمومی یا راهبر سامانه و ارزیابی مجدد نواقص در اطلاعات پایه و رفع آنها؛ طراحی و پیاده سازی گزارشات کاربردی در قالب جداول، فایل اکسل و یا داشبرد انجام می شود.</li>
<p>  <img src={image2} className="img-center" alt="..." />  </p>

<li><u>اطلاعات پویا:</u> در این گام، ابتدا به منظور استخراج و محلی سازی فیلدهای متغیر، گزارشات اطلاعات پایه و همچنین کلیه فرم ها و اطلاعاتی که دائما تولید می شوند یا تغییر دارند بررسی شده و در چارچوب فرم های اطلاعات پویا (داینامیک) به صورت زیر طبقه بندی می شوند:
<ol>
<li>بودجه بندی (منابع تامین، تخصیص، هزینه تمام شده و...)</li>
<li>برنامه ریزی و کنترل پروژه (زمانبندی، منابع، پیشرفت ریالی و فیزیکی و...)</li>
<li>پیمان و رسیدگی (تحویل ، تعدیل، تمدید، قیمت جدید، تغییر مقادیر و...)</li>
<li>صورت وضعیت ها (موقت، قطعی و...)</li>
<li>بیمه و خسارات (مسئولیت، پروژه و ...)</li>
<p>  <img src={image3} className="img-center" alt="..." />  </p>

</ol>
</li>
</ul>
<p>&nbsp;</p>
<ul>
<li><u>کارتابل پویا: </u>با تکمیل اطلاعات پویا در وضعیت جاری سازمان، تحلیل در خصوص نحوه گردش اطلاعات، چگونگی و انواع ارجاعات سازمانی و بر اساس نقش سازمانی و فرآیندهای موجود انجام پذیرفته و پس از تصویب سازمان، Workflow اختصاصی سازمان، پیاده سازی شده و فرم های مرتبط با هر کاربر سازمان، در کارتابل پویا بر اساس سطوح دسترسی قابل مشاهده و ارجاع خواهد بود.</li>
<p>  <img src={image4} className="img-center" alt="..." />  </p>





</ul>
<p>&nbsp;</p>
<ul>
<li><u>گزارشات اطلاعات پویا: </u>در مرحله بعدی تحلیل ترکیبی اطلاعات پایه و اطلاعات پویا صورت پذیرفته و بر اساس نیازهای سازمان؛ طراحی و پیاده سازی گزارشات کاربردی یه صورت نمودار، جداول، فایل اکسل و یا داشبردهای هوش تجاری (BI) صورت می پذیرد.</li>
<p>  <img src={Untitled6} className="img-center" alt="..." />  </p>





</ul>
<p>&nbsp;</p>
<ul>
<li><u>ارتباط با سامانه مدیریت مستندات</u>: در صورت بکارگیری سامانه DMS در سازمان ، امکان "اتصال بین نرم افزاری" بررسی شده و چنانچه سازگاری وجود داشت فاز تحلیل و طراحی اولیه برای تجمیع نیازهای مورد درخواست سازمان در زمینه گزارشات مستند به فایل های ضمیمه، انجام خواهد شد و در ادامه ضمن تایید سازمان، &nbsp;این ارتباط بین نرم افزاری برقرار می شود.</li>
<p>  <img src={cricle} className="img-center" alt="..." />  </p>



<li><u>تولید محتوای تصمیم یار:</u> با شناخت بیشتر سازمان، فعالیت کاربران در بارگذاری منظم و دقیق اطلاعات و فرآوری اطلاعات ضمن استفاده از اطلاعات پایه و بکارگیری اطلاعات پویا؛ زمینه برای تولید محتوای تصمیم یار به سفارش سازمان مهیا می گردد.</li>
<p>  <img src={hand} className="img-center" alt="..." />  </p>


</ul>
<p><u>&nbsp;</u></p>
<p><u>&nbsp;</u></p>
<p>* در کلیه مراحل هشت گانه، قبل از ورود به مرحله بعد؛ باز مهندسی و بهینه سازی کلیه مراحل قبل بخشی از ارائه خدمات می باشد.</p>
<p>  <img src={asd} className="img-center" alt="..." />  </p>


<p>&nbsp;</p>
<p>&nbsp;</p>
<p>* برای اتصال&nbsp; به سایر سامانه های سازمان به منظور تجمیع یا یکپارچه سازی دسترسی به اطلاعات، ضروری است بررسی اولیه در خصوص سازگاری منابع (بانک های اطلاعاتی) صورت پذیرفته و تحلیل اولیه و اعلام هزینه و زمان به صورت پروژه ای مستقل از سامانه جاری صورت پذیرد.</p>
<p>  <img src={towman} className="img-center" alt="..." />  </p>




<p>سامانه مدیریت اطلاعات پروژه فعلی؛ در <strong><u>نسخه پایه</u></strong> (1.8.0.3) در حال استفاده می باشد&nbsp; و تا مرحله:&nbsp;&nbsp; <strong><u>اطلاعات پایه</u></strong>&nbsp; توسعه یافته است</p>

    

    

    </div>
  )
}

export default MainPage;