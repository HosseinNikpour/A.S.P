import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Switch, Route, Link ,useLocation } from "react-router-dom";

import logo from './assets/img/brand/asp.png';
import profile from './assets/img/brand/user.png';
import logout from './assets/img/brand/logout.png';

import User from './forms/user/index';
import BaseInfo from './forms/baseInfo/index';
import Organizational from './forms/organizational/index';
import Keyword from './forms/keyword/index';
import Colleague from './forms/colleague/index';
import Projects from './forms/projects/index';
import Trading_commission from './forms/trading_commission/index';
import Contract from './forms/contract/index';
import Call from './forms/call/index';
import Supplement from './forms/supplement/index';
import FileMNG from './forms/file_MNG/index';
import FileMNGrpt from './forms/file_MNG/rpt';
import Permission from './forms/permission/index';
import CommingSoon from './forms/commingSoon';
// import Company1 from './forms/company/index3';
// import Company2 from './forms/company/index2A';
// import Company3 from './forms/company/index2T';
import MainPage from './forms/mainPage';

import './assets/css/antd.rtl.css';
import './assets/vendor/nucleo/css/nucleo.rtl.css';
import './assets/vendor/@fortawesome/fontawesome-free/css/all.min.css';
import './assets/css/argon.rtl.css';
import './assets/fonts/IRANSans/style.css';
import './assets/css/custom.css';

import PrivateRoute from './components/PrivateRoute'
import Login from './components/login'

function App() {
  const [selectedNav,setSelectedNav]= useState(0);
  const [subMenu, setSubMenu] = useState(0);
  const [currentUser, setCurrentUser] = useState({});

  useEffect(() => {
    const user = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : undefined;
    if (user){
      setCurrentUser({ name: user.name, lastLoginDate: user.last_login, role_id: user.role_id });
    }
    else {

     // console.log('aaaa');
    }
   // console.log(currentUser);
  }, [])
const signOut=()=>{
  setCurrentUser({});
  localStorage.clear();
  window.location.reload();
 
}
  return (
    <div className="App" dir='RTL'>

      <Router>

        <nav className="sidenav navbar navbar-vertical  fixed-left  navbar-expand-xs navbar-light bg-white" id="sidenav-main">
          <div className="scrollbar-inner">

            <div className="sidenav-header align-items-center">
              {/* <input type="button" onClick={(e)=>e.target.classList.contains("")} value="------" /> */}
              <span className="navbar-brand" >
              <Link to="/" >
                  <img src={logo} className="navbar-brand-img" alt="..." />
                  </Link>
              </span>
            </div>
            <div className="navbar-inner">

              <div className="collapse navbar-collapse" id="sidenav-collapse-main">

                <ul className="navbar-nav">
                 
                 
                  <li className="nav-item" onClick={() => setSubMenu(1)}>
                    <a className="nav-link">
                      <i className="custom-nav-img basicinformation"></i>
                      <span className="nav-link-text">اطلاعات پایه</span></a>
                    {subMenu === 1 && <ul className="nav-sub-menu">
                    <li className="nav-item1" onClick={()=>setSelectedNav(1)}>
                        <Link to="/colleague" className={selectedNav===1?"nav-sub-link selected-nav":"nav-sub-link"}>
                          <span className="nav-link-text1">همکاران</span></Link>
                      </li>
                      <li className="nav-item1" onClick={()=>setSelectedNav(2)}>
                        <Link to="/organizational" className={selectedNav===2?"nav-sub-link selected-nav":"nav-sub-link"}>
                          <span className="nav-link-text1">سازمانهای همکار</span></Link>
                      </li>
                      <li className="nav-item1" onClick={()=>setSelectedNav(3)}>
                        <Link to="/projects" className={selectedNav===3?"nav-sub-link selected-nav":"nav-sub-link"}>
                          <span className="nav-link-text1">پروژه ها</span></Link>
                      </li>
                      <li className="nav-item1" onClick={()=>setSelectedNav(4)}>
                        <Link to="/contract" className={selectedNav===4?"nav-sub-link selected-nav":"nav-sub-link"}>
                          <span className="nav-link-text1">قراردادها</span></Link>
                      </li>
                      <li className="nav-item1" onClick={()=>setSelectedNav(5)}>
                        <Link to="/supplement" className={selectedNav===5?"nav-sub-link selected-nav":"nav-sub-link"}>
                          <span className="nav-link-text1">الحاقیه ها</span></Link>
                      </li>
                      <li className="nav-item1" onClick={()=>setSelectedNav(7)}>
                        <Link to="/trading_commission" className={selectedNav===7?"nav-sub-link selected-nav":"nav-sub-link"}>
                          <span className="nav-link-text1">کمیسیون معاملات  </span></Link>
                      </li>
                      <li className="nav-item1" onClick={()=>setSelectedNav(6)}>
                        <Link to="/call" className={selectedNav===6?"nav-sub-link selected-nav":"nav-sub-link"}>
                          <span className="nav-link-text1">فراخوان ها</span></Link>
                      </li>
                      
                      
                    </ul>}

                  </li>
                  <li className="nav-item" onClick={()=>setSelectedNav(8)}>
                 
                    <Link to="/commingSoon" className= {selectedNav===8?"nav-link selected-nav":"nav-link"}>
                      <i className="fa fa-tasks text-primary"></i>
                      <span className="nav-link-text offline">کارتابل پویا</span></Link>
                  </li> 
                  <li className="nav-item" onClick={()=>setSelectedNav(9)}>
                    <Link to="/commingSoon" className= {selectedNav===9?"nav-link selected-nav":"nav-link"}>
                      <i className="fas fa-chart-line text-primary"></i>
                      <span className="nav-link-text offline">گزارشات</span>
                    </Link>
                  </li>
    
                  <li className="nav-item">
                    <hr className="my-3" />
                    <h4 className="navbar-heading p-0 text-muted" style={{ marginRight: '20px' }}>
                      <span className="docs-normal">راهبر سامانه</span>
                    </h4>
                  </li>
                  <li className="nav-item" onClick={()=>setSelectedNav(10)}>
                    <Link to="/user" className= {selectedNav===10?"nav-link selected-nav":"nav-link"}>
                      <i className="custom-nav-img usermanagmenr"></i>
                      <span className="nav-link-text">مدیریت کاربران</span></Link>
                  </li>
                  <li className="nav-item" onClick={()=>setSelectedNav(11)}>
                    <Link to="/permission" className= {selectedNav===11?"nav-link selected-nav":"nav-link"}>
                      <i className="custom-nav-img permisstion"></i>
                      <span className="nav-link-text">مدیریت دسترسی ها</span></Link>
                  </li>
                  <li className="nav-item" onClick={()=>setSelectedNav(12)}>
                    <Link to="/baseInfo" className= {selectedNav===12?"nav-link selected-nav":"nav-link"}>
                      <i className="custom-nav-img basictable"></i>
                      <span className="nav-link-text">جداول پایه</span></Link>
                  </li>
                    <li className="nav-item" onClick={()=>setSelectedNav(13)}>
                    <Link to="/keyword" className= {selectedNav===13?"nav-link selected-nav":"nav-link"}>
                      <i className="custom-nav-img keywords"></i>
                      <span className="nav-link-text">بانک کلید واژه ها</span></Link>
                  </li>ّ
                </ul>

              </div>
            </div>
          </div>
        </nav>

        <div className="main-content" id="panel">

          <nav className="navbar navbar-top navbar-expand navbar-dark bg-primary border-bottom">
            <div className="container-fluid">
              <div className="collapse navbar-collapse" id="navbarSupportedContent">
                <div class="head-all" >سامانه اطلاعات مدیریت پروژه (نسخه پایه) </div>
                
                <ul className="navbar-nav align-items-center  ml-md-auto login-container ">
                  <li className="nav-item dropdown">
                    <span className="nav-link" >
                      <div className='nav-login'>
                      <img src={profile} className="profile" alt="..." />

                        <span className="">{currentUser ? currentUser.name : ''}</span>
                      </div>
                      {/* <div className="media align-items-center">
                        <span className="avatar avatar-sm rounded-circle">

                        </span>
                        <div className="media-body  ml-2  d-none d-lg-block">
                          <span className="mb-0 text-sm  font-weight-bold">{JSON.parse(localStorage.getItem('user')).name}</span>
                        </div>
                      </div>*/}
                    </span>

                  </li>
                  <div onClick={()=>signOut()}>
                  <img src={logout} className="logout" alt="..." />

                  <span className="exit" >خروج</span>
                  </div>
                </ul>

              </div>
            </div>
          </nav>

          <div className="header bg-light pb-6">
            <Switch>
              {/* <Route path="/user"> <User /> </Route> */}
              <PrivateRoute path="/user" component={User} role="admin" />
              <PrivateRoute path="/baseInfo" component={BaseInfo} role="admin" />
           
              <PrivateRoute path="/organizational" component={Organizational} role="" />
              <PrivateRoute path="/keyword" component={Keyword} role="admin" />
              <PrivateRoute path="/colleague" component={Colleague} role="" />
              <PrivateRoute path="/projects" component={Projects} role="" />
              <PrivateRoute path="/trading_commission" component={Trading_commission} role="" />
              <PrivateRoute path="/contract" component={Contract} role="" />
              <PrivateRoute path="/call" component={Call} role="" />
              <PrivateRoute path="/supplement" component={Supplement} role="" />
              <PrivateRoute path="/fileMng" component={FileMNG} role="admin" />
              <PrivateRoute path="/fileMngRpt" component={FileMNGrpt} role="admin" />
              <PrivateRoute path="/permission" component={Permission} role="admin" />
              <PrivateRoute path="/commingSoon" component={CommingSoon} role="" />
              {/* <PrivateRoute path="/company1" component={Company1} role="admin" />
              <PrivateRoute path="/company2" component={Company2} role="admin" />
              <PrivateRoute path="/company3" component={Company3} role="admin" /> */}
              <Route path="/login">
                <Login />
              </Route>
              <PrivateRoute path="/" component={MainPage} />

            </Switch>
          </div>


        </div>
        <div id="footer"> <a href="mailto: info@bstict.com">طراحی و پیاده سازی : BSTICT </a>  </div>
      </Router>
    </div>
  );
}

export default App;
