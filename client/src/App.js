import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import logo from './assets/img/brand/asp.png';
import profile from './assets/img/brand/asp.png';

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
import Dashboard from './forms/dashboard/index';

import './assets/css/antd.rtl.css';
import './assets/vendor/nucleo/css/nucleo.rtl.css';
import './assets/vendor/@fortawesome/fontawesome-free/css/all.min.css';
import './assets/css/argon.rtl.css';
import './assets/fonts/IRANSans/style.css';
import './assets/css/custom.css';

import PrivateRoute from './components/PrivateRoute'
import Login from './components/login'

function App() {
  const [subMenu, setSubMenu] = useState(0);
  const [currentUser, setCurrentUser] = useState({});

  useEffect(() => {
    const user = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : undefined;
    if (user)
      setCurrentUser({ name: user.name, lastLoginDate: user.last_login, role_id: user.role_id });
    else {

      console.log('aaaa');
    }
   // console.log(currentUser);
  }, [])
  return (
    <div className="App" dir='RTL'>

      <Router>

        <nav className="sidenav navbar navbar-vertical  fixed-left  navbar-expand-xs navbar-light bg-white" id="sidenav-main">
          <div className="scrollbar-inner">

            <div className="sidenav-header align-items-center">
              {/* <input type="button" onClick={(e)=>e.target.classList.contains("")} value="------" /> */}
              <span className="navbar-brand" >
                <img src={logo} className="navbar-brand-img" alt="..." />
              </span>
            </div>
            <div className="navbar-inner">

              <div className="collapse navbar-collapse" id="sidenav-collapse-main">

                <ul className="navbar-nav">
                 
                 
                  <li className="nav-item" onClick={() => setSubMenu(1)}>
                    <a className="nav-link">
                      <i className="fas fa-database text-primary"></i>
                      <span className="nav-link-text">اطلاعات پایه</span></a>
                    {subMenu === 1 && <ul className="nav-sub-menu">
                    <li className="nav-item1">
                        <Link to="/colleague" className="nav-sub-link">
                          <span className="nav-link-text1">همکاران</span></Link>
                      </li>
                      <li className="nav-item1">
                        <Link to="/organizational" className="nav-sub-link">
                          <span className="nav-link-text1">سازمانهای همکار</span></Link>
                      </li>
                      <li className="nav-item1">
                        <Link to="/projects" className="nav-sub-link">
                          <span className="nav-link-text1">پروژه ها</span></Link>
                      </li>
                      <li className="nav-item1">
                        <Link to="/contract" className="nav-sub-link">
                          <span className="nav-link-text1">قراردادها</span></Link>
                      </li>
                    
                      <li className="nav-item1">
                        <Link to="/call" className="nav-sub-link">
                          <span className="nav-link-text1">فراخوان ها</span></Link>
                      </li>
                      <li className="nav-item1">
                        <Link to="/supplement" className="nav-sub-link">
                          <span className="nav-link-text1">الحاقیه ها</span></Link>
                      </li>
                      <li className="nav-item1">
                        <Link to="/trading_commission" className="nav-sub-link">
                          <span className="nav-link-text1">کمیسیون معاملات  </span></Link>
                      </li>
                    </ul>}

                  </li>
                  <li className="nav-item">
                    <Link to="/commingSoon" className="nav-link">
                      <i className="fa fa-tasks text-primary"></i>
                      <span className="nav-link-text offline">کارتابل پویا</span></Link>
                  </li> 
                  <li className="nav-item">
                    <Link to="/commingSoon" className="nav-link">
                      <i className="fas fa-chart-line text-primary"></i>
                      <span className="nav-link-text">گزارش</span>
                    </Link>
                  </li>
    
                  <li className="nav-item">
                    <hr className="my-3" />
                    <h4 className="navbar-heading p-0 text-muted" style={{ marginRight: '20px' }}>
                      <span className="docs-normal">راهبر سامانه</span>
                    </h4>
                  </li>
                  <li className="nav-item">
                    <Link to="/user" className="nav-link">
                      <i className="fas fa-user text-teal"></i>
                      <span className="nav-link-text">مدیریت کاربران</span></Link>
                  </li>
                  <li className="nav-item">
                    <Link to="/permission" className="nav-link">
                      <i className="fas fa-user text-teal"></i>
                      <span className="nav-link-text">مدیریت دسترسی ها</span></Link>
                  </li>
                  <li className="nav-item">
                    <Link to="/baseInfo" className="nav-link">
                      <i className="fas fa-user text-teal"></i>
                      <span className="nav-link-text">جداول پایه</span></Link>
                  </li>
                    <li className="nav-item">
                    <Link to="/keyword" className="nav-link">
                      <i className="fas fa-user text-teal"></i>
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
                <ul className="navbar-nav align-items-center  ml-md-auto ">
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
                </ul>
                <span className="exit" >خروج</span>
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
              <PrivateRoute path="/" component={Dashboard} />

            </Switch>
          </div>


        </div>
        <div id="footer"> <a href="mailto: info@bstict.com">طراحی و پیاده سازی : BSTICT </a>  </div>
      </Router>
    </div>
  );
}

export default App;
