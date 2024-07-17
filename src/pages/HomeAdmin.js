import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

function HomeAdmin(){
    const [showLoading, setShowLoading] = useState(true);
    const [users , setUsers] = useState([]);
    const [userVip , setUserVip] = useState([]);
    const [userVipFive ,setUserVipFive] = useState([]);
    const [blogs,setBlog] = useState([]);
    const [view, setView] = useState(0);
    const [hasUpdatedLocalStorage, setHasUpdatedLocalStorage] = useState(false);
    var userName = sessionStorage.getItem("userName");
    var userId = sessionStorage.getItem("userId");
    var userEmail = sessionStorage.getItem("userEmail");

    console.log(userName)
    console.log(userId)
    console.log(userEmail)
    const navigate = useNavigate();
   const signOut = () =>{
        sessionStorage.clear();
        navigate("/login");
   }
   useEffect(() =>{
      if(userId == null){
         toast.error(`Warning !, this site is private , your permission is not allow to connect, try to login`, {
            position: "top-right",
            autoClose: 4000, // Đặt thời gian autoClose là 3 giây
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          })
          navigate("/login");
      }else{
         axios.get("http://localhost:8080/api/users/admin/" + userId).then(res =>{
            var bolean = res.data;
            if(bolean == "false"){
               toast.error(`Warning !, this site is private , your permission is not allow to connect, try to login`, {
                  position: "top-right",
                  autoClose: 4000, // Đặt thời gian autoClose là 3 giây
                  hideProgressBar: true,
                  closeOnClick: true,
                  pauseOnHover: true,
                  draggable: true,
                  progress: undefined,
                })
                navigate("/login");
            }else{
               toast.success(`your permissom is suscess to login this site, happy doing`, {
                  position: "top-right",
                  autoClose: 5000, // Đặt thời gian autoClose là 3 giây
                  hideProgressBar: true,
                  closeOnClick: true,
                  pauseOnHover: true,
                  draggable: true,
                  progress: undefined,
                })
            }
         })
      }
   },[])
   useEffect(() => {
      // Đọc giá trị view từ local storage khi component được render
      const storedView = localStorage.getItem('view');
      if (storedView) {
        setView(parseInt(storedView));
      } else {
        // Nếu chưa có giá trị view trong local storage, khởi tạo giá trị là 1
        setView(0);
      }
    }, []);
  
    useEffect(() => {
      // Chỉ cập nhật local storage khi view thay đổi và chưa cập nhật local storage
      if (view !== 0 && !hasUpdatedLocalStorage) {
        localStorage.setItem('view', view + 1);
        setHasUpdatedLocalStorage(true);
      }
    }, [view, hasUpdatedLocalStorage]);
  useEffect(() => {
   axios.get("http://localhost:8080/api/blogs").then(res =>{
      setBlog(res.data);
   })
   axios.get("http://localhost:8080/api/users").then(res =>{
      setUsers(res.data);
   });
   axios.get("http://localhost:8080/api/users/userVip").then(res =>{
      setUserVip(res.data);
   });
   axios.get("http://localhost:8080/api/users/topFiveUser").then(res =>{
      setUserVipFive(res.data);
   });
    // Sau 5 giây, ẩn phần tử #loading
    const timer = setTimeout(() => {
      setShowLoading(false);
    }, 3000);
      
    // Cleanup timer khi component được unmount
    return () => clearTimeout(timer);

  }, []);
    return(
        <>
         {showLoading && (
        <div id="loading">
          <div id="loading-center"></div>
        </div>
      )}

   <div class="wrapper">
    
      <div class="iq-sidebar">
         <div class="iq-sidebar-logo d-flex justify-content-between">
            <a href="index.html" class="header-logo">
               <img src="../assets/images/logo.png" class="img-fluid rounded-normal" alt=""/>
               <div class="logo-title">
                  <span class="text-primary text-uppercase">Streamit</span>
               </div>
            </a>
            <div class="iq-menu-bt-sidebar">
               <div class="iq-menu-bt align-self-center">
                  <div class="wrapper-menu">
                     <div class="main-circle"><i class="las la-bars"></i></div>
                  </div>
               </div>
            </div>
         </div>
         <div id="sidebar-scrollbar">
            <nav class="iq-sidebar-menu">
               <ul id="iq-sidebar-toggle" class="iq-menu">
                  <li><a href="/" class="text-primary"><i class="ri-arrow-right-line"></i><span>Trang người dùng</span></a></li>
                  <li class="active active-menu"><a href="index.html" class="iq-waves-effect"><i class="las la-home iq-arrow-left"></i><span>Trang chủ</span></a></li>
                  <li><a href="/users" class="iq-waves-effect"><i class="las la-user-friends"></i><span>Người dùng</span></a></li>
                  <li><a href="/bill" class="iq-waves-effect"><i class="ri-price-tag-line"></i><span>Hóa đơn</span></a></li>
                  <li>
                     <a href="#ui-elements" class="iq-waves-effect collapsed" data-toggle="collapse" aria-expanded="false"><i class="lab la-elementor iq-arrow-left"></i><span>Bài viết</span><i class="ri-arrow-right-s-line iq-arrow-right"></i></a>
                     <ul id="ui-elements" class="iq-submenu collapse" data-parent="#iq-sidebar-toggle">
                        <li>
                        <a href="/blog"><i class="lab la-elementor iq-arrow-left"></i><span>Bài viết</span></a>
                        </li>
                     </ul>
                  </li>
               </ul>
            </nav>
         </div>
      </div>
      <div class="iq-top-navbar">
         <div class="iq-navbar-custom">
            <nav class="navbar navbar-expand-lg navbar-light p-0">
               <div class="iq-menu-bt d-flex align-items-center">
                  <div class="wrapper-menu">
                     <div class="main-circle"><i class="las la-bars"></i></div>
                  </div>
                  <div class="iq-navbar-logo d-flex justify-content-between">
                     <a href="index.html" class="header-logo">
                        <img src="../assets/images/logo.png" class="img-fluid rounded-normal" alt=""/>
                        <div class="logo-title">
                           <span class="text-primary text-uppercase">Streamit</span>
                        </div>
                     </a>
                  </div>
               </div>
               <div class="iq-search-bar ml-auto">
                  <form action="#" class="searchbox">
                     <input type="text" class="text search-input" placeholder="Search Here..."/>
                     <a class="search-link" href="#"><i class="ri-search-line"></i></a>
                  </form>
               </div>
               <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent"  aria-label="Toggle navigation">
                  <i class="ri-menu-3-line"></i>
               </button>
               <div class="collapse navbar-collapse" id="navbarSupportedContent">
                  <ul class="navbar-nav ml-auto navbar-list">
                     <li class="nav-item nav-icon search-content">
                        <a href="#" class="search-toggle iq-waves-effect text-gray rounded">
                           <i class="ri-search-line"></i>
                        </a>
                        <form action="#" class="search-box p-0">
                           <input type="text" class="text search-input" placeholder="Type here to search..."/>
                           <a class="search-link" href="#"><i class="ri-search-line"></i></a>
                        </form>
                     </li>
                     <li class="nav-item nav-icon">
                        <a href="#" class="search-toggle iq-waves-effect text-gray rounded">
                           <i class="ri-notification-2-line"></i>
                           <span class="bg-primary dots"></span>
                        </a>
                        <div class="iq-sub-dropdown">
                        </div>
                     </li>
                     <li class="nav-item nav-icon dropdown">
                        <a href="#" class="search-toggle iq-waves-effect text-gray rounded">
                           <i class="ri-mail-line"></i>
                           <span class="bg-primary dots"></span>
                        </a>
                        <div class="iq-sub-dropdown">
                           <div class="iq-card shadow-none m-0">
                              <div class="iq-card-body p-0 ">
                                 <div class="bg-primary p-3">
                                    <h5 class="mb-0 text-white">All Messages<small class="badge  badge-light float-right pt-1">5</small></h5>
                                 </div>
                                 <a href="#" class="iq-sub-card">
                                    <div class="media align-items-center">
                                       <div class="">
                                          <img class="avatar-40 rounded" src="../assets/images/user/01.jpg" alt=""/>
                                       </div>
                                       <div class="media-body ml-3">
                                          <h6 class="mb-0 ">Barry Emma Watson</h6>
                                          <small class="float-left font-size-12">13 Jun</small>
                                       </div>
                                    </div>
                                 </a>
                                 <a href="#" class="iq-sub-card">
                                    <div class="media align-items-center">
                                       <div class="">
                                          <img class="avatar-40 rounded" src="../assets/images/user/02.jpg" alt=""/>
                                       </div>
                                       <div class="media-body ml-3">
                                          <h6 class="mb-0 ">Lorem Ipsum Watson</h6>
                                          <small class="float-left font-size-12">20 Apr</small>
                                       </div>
                                    </div>
                                 </a>
                                 <a href="#" class="iq-sub-card">
                                    <div class="media align-items-center">
                                       <div class="">
                                          <img class="avatar-40 rounded" src="../assets/images/user/03.jpg" alt=""/>
                                       </div>
                                       <div class="media-body ml-3">
                                          <h6 class="mb-0 ">Why do we use it?</h6>
                                          <small class="float-left font-size-12">30 Jun</small>
                                       </div>
                                    </div>
                                 </a>
                                 <a href="#" class="iq-sub-card">
                                    <div class="media align-items-center">
                                       <div class="">
                                          <img class="avatar-40 rounded" src="../assets/images/user/04.jpg" alt=""/>
                                       </div>
                                       <div class="media-body ml-3">
                                          <h6 class="mb-0 ">Variations Passages</h6>
                                          <small class="float-left font-size-12">12 Sep</small>
                                       </div>
                                    </div>
                                 </a>
                                 <a href="#" class="iq-sub-card">
                                    <div class="media align-items-center">
                                       <div class="">
                                          <img class="avatar-40 rounded" src="../assets/images/user/05.jpg" alt=""/>
                                       </div>
                                       <div class="media-body ml-3">
                                          <h6 class="mb-0 ">Lorem Ipsum generators</h6>
                                          <small class="float-left font-size-12">5 Dec</small>
                                       </div>
                                    </div>
                                 </a>
                              </div>
                           </div>
                        </div>
                     </li>
                     <li class="line-height pt-3">
                        <a href="#" class="search-toggle iq-waves-effect d-flex align-items-center">
                           <img src="../assets/images/user/man-300x300.png" class="img-fluid rounded-circle mr-3" alt="user"/>
                        </a>
                        <div class="iq-sub-dropdown iq-user-dropdown">
                           <div class="iq-card shadow-none m-0">
                              <div class="iq-card-body p-0 ">
                                 <div class="bg-primary p-3">
                                    <h5 class="mb-0 text-white line-height">Hello {userName}</h5>
                                    <span class="text-white font-size-12">Available email {userEmail}</span>
                                 </div>
                                 <a href="profile.html" class="iq-sub-card iq-bg-primary-hover">
                                    <div class="media align-items-center">
                                       <div class="rounded iq-card-icon iq-bg-primary">
                                          <i class="ri-file-user-line"></i>
                                       </div>
                                       <div class="media-body ml-3">
                                          <h6 class="mb-0 ">My Profile</h6>
                                          <p class="mb-0 font-size-12">View personal profile details.</p>
                                       </div>
                                    </div>
                                 </a>
                                 <a href="profile-edit.html" class="iq-sub-card iq-bg-primary-hover">
                                    <div class="media align-items-center">
                                       <div class="rounded iq-card-icon iq-bg-primary">
                                          <i class="ri-profile-line"></i>
                                       </div>
                                       <div class="media-body ml-3">
                                          <h6 class="mb-0 ">Edit Profile</h6>
                                          <p class="mb-0 font-size-12">Modify your personal details.</p>
                                       </div>
                                    </div>
                                 </a>
                                 <a href="account-setting.html" class="iq-sub-card iq-bg-primary-hover">
                                    <div class="media align-items-center">
                                       <div class="rounded iq-card-icon iq-bg-primary">
                                          <i class="ri-account-box-line"></i>
                                       </div>
                                       <div class="media-body ml-3">
                                          <h6 class="mb-0 ">Account settings</h6>
                                          <p class="mb-0 font-size-12">Manage your account parameters.</p>
                                       </div>
                                    </div>
                                 </a>
                                 <a href="privacy-setting.html" class="iq-sub-card iq-bg-primary-hover">
                                    <div class="media align-items-center">
                                       <div class="rounded iq-card-icon iq-bg-primary">
                                          <i class="ri-lock-line"></i>
                                       </div>
                                       <div class="media-body ml-3">
                                          <h6 class="mb-0 ">Privacy Settings</h6>
                                          <p class="mb-0 font-size-12">Control your privacy parameters.</p>
                                       </div>
                                    </div>
                                 </a>
                                 <div class="d-inline-block w-100 text-center p-3">
                                    <a class="bg-primary iq-sign-btn" onClick={() => signOut()} role="button">Sign out<i class="ri-login-box-line ml-2"></i></a>
                                 </div>
                              </div>
                           </div>
                        </div>
                     </li>
                  </ul>
               </div>
            </nav>
         </div>
      </div>
   
      <div id="content-page" class="content-page">
         <div class="container-fluid">
            <div class="row">
               <div class="col-lg-8">
                  <div class="row">
                     <div class="col-sm-6 col-lg-6 col-xl-3">
                        <div class="iq-card iq-card-block iq-card-stretch iq-card-height">
                           <div class="iq-card-body">
                              <div class="d-flex align-items-center justify-content-between">
                                 <div class="iq-cart-text text-capitalize">
                                    <p class="mb-0">
                                       lượt xem
                                    </p>
                                 </div>
                                 <div class="icon iq-icon-box-top rounded-circle bg-primary">
                                    <i class="las la-eye"></i>
                                 </div>
                              </div>
                              <div class="d-flex align-items-center justify-content-between mt-3">
                                 <h4 class=" mb-0">{view}</h4>
                              </div>
                           </div>
                        </div>
                     </div>
                     <div class="col-sm-6 col-lg-6 col-xl-3">
                        <div class="iq-card iq-card-block iq-card-stretch iq-card-height">
                           <div class="iq-card-body">
                              <div class="d-flex align-items-center justify-content-between">
                                 <div class="iq-cart-text text-capitalize">
                                    <p class="mb-0 font-size-14">
                                       Premium
                                    </p>
                                 </div>
                                 <div class="icon iq-icon-box-top rounded-circle bg-warning">
                                    <i class="lar la-star"></i>
                                 </div>
                              </div>
                              <div class="d-flex align-items-center justify-content-between mt-3">
                                 
                              </div>
                           </div>
                        </div>
                     </div>
                     <div class="col-sm-6 col-lg-6 col-xl-3">
                        <div class="iq-card iq-card-block iq-card-stretch iq-card-height">
                           <div class="iq-card-body">
                              <div class="d-flex align-items-center justify-content-between">
                                 <div class="iq-cart-text text-capitalize">
                                    <p class="mb-0 font-size-14">
                                       Blog
                                    </p>
                                 </div>
                                 <div class="icon iq-icon-box-top rounded-circle bg-info">
                                    <i class="las la-download">{blogs.length}</i>
                                 </div>
                              </div>
                              <div class="d-flex align-items-center justify-content-between mt-3">
                                 <h4 class=" mb-0">+1M</h4>
                                 <p class="mb-0 text-info"><span><i class="fa fa-caret-up mr-2"></i></span>80%</p>
                              </div>
                           </div>
                        </div>
                     </div>
                     <div class="col-sm-6 col-lg-6 col-xl-3">
                        <div class="iq-card iq-card-block iq-card-stretch iq-card-height">
                           <div class="iq-card-body">
                              <div class="d-flex align-items-center justify-content-between">
                                 <div class="iq-cart-text text-uppercase">
                                    <p class="mb-0 font-size-14">
                                       Tài khoản
                                    </p>
                                 </div>
                                 <div class="icon iq-icon-box-top rounded-circle bg-success">
                                    <i class="lar la-user"></i>
                                 </div>
                              </div>
                              <div class="d-flex align-items-center justify-content-between mt-3">
                                 <h4 class=" mb-0">{users.length}</h4>
                              </div>
                           </div>
                        </div>
                     </div>
                  </div>
                  <div class="iq-card">
                     <div class="iq-card-header d-flex justify-content-between align-items-center">
                        <div class="iq-header-title">
                           <h4 class="card-title">Top Rated Item </h4>
                        </div>
                        <div id="top-rated-item-slick-arrow" class="slick-aerrow-block "></div>
                     </div>
                     <div class="iq-card-body">
                        <ul class="list-unstyled row top-rated-item mb-0">
                           <li class="col-sm-6 col-lg-4 col-xl-3 iq-rated-box">
                              <div class="iq-card mb-0">
                                 <div class="iq-card-body p-0">
                                    <div class="iq-thumb">
                                       <a href="javascript:void(0)">
                                          <img src="../assets/images/dashboard/01.jpg" class="img-fluid w-100 img-border-radius" alt=""/>
                                       </a>
                                    </div>
                                    <div class="iq-feature-list">
                                       <h6 class="font-weight-600 mb-0">The Last Breath</h6>
                                       <p class="mb-0 mt-2">T.v show</p>
                                       <div class="d-flex align-items-center my-2 iq-ltr-direction">
                                          <p class="mb-0 mr-2"><i class="lar la-eye mr-1"></i> 134</p>
                                          <p class="mb-0 "><i class="las la-download ml-2"></i> 30 k</p>
                                       </div>
                                    </div>
                                 </div>
                              </div>
                           </li>
                           <li class="col-sm-6 col-lg-4 col-xl-3 iq-rated-box">
                              <div class="iq-card mb-0">
                                 <div class="iq-card-body p-0">
                                    <div class="iq-thumb">
                                       <a href="javascript:void(0)">
                                          <img src="../assets/images/dashboard/02.jpg" class="img-fluid w-100 img-border-radius" alt=""/>
                                       </a>
                                    </div>
                                    <div class="iq-feature-list">
                                       <h6 class="font-weight-600 mb-0">Last Night</h6>
                                       <p class="mb-0 mt-2">Movie</p>
                                       <div class="d-flex align-items-center my-2 iq-ltr-direction">
                                          <p class="mb-0 mr-2"><i class="lar la-eye mr-1"></i> 133</p>
                                          <p class="mb-0 "><i class="las la-download ml-2"></i> 20 k</p>
                                       </div>
                                    </div>
                                 </div>
                              </div>
                           </li>
                           <li class="col-sm-6 col-lg-4 col-xl-3 iq-rated-box">
                              <div class="iq-card mb-0">
                                 <div class="iq-card-body p-0">
                                    <div class="iq-thumb">
                                       <a href="javascript:void(0)">
                                          <img src="../assets/images/dashboard/03.jpg" class="img-fluid w-100 img-border-radius" alt=""/>
                                       </a>
                                    </div>
                                    <div class="iq-feature-list">
                                       <h6 class="font-weight-600 mb-0">Jeon Woochie</h6>
                                       <p class="mb-0 mt-2">Movie</p>
                                       <div class="d-flex align-items-center my-2 iq-ltr-direction">
                                          <p class="mb-0 mr-2"><i class="lar la-eye mr-1"></i> 222</p>
                                          <p class="mb-0 "><i class="las la-download ml-2"></i> 40 k</p>
                                       </div>
                                    </div>
                                 </div>
                              </div>
                           </li>
                           <li class="col-sm-6 col-lg-4 col-xl-3 iq-rated-box">
                              <div class="iq-card mb-0">
                                 <div class="iq-card-body p-0">
                                    <div class="iq-thumb">
                                       <a href="javascript:void(0)">
                                          <img src="../assets/images/dashboard/04.jpg" class="img-fluid w-100 img-border-radius" alt=""/>
                                       </a>
                                    </div>
                                    <div class="iq-feature-list">
                                       <h6 class="font-weight-600 mb-0">Dino Land</h6>
                                       <p class="mb-0 mt-2">T.v show</p>
                                       <div class="d-flex align-items-center my-2 iq-ltr-direction">
                                          <p class="mb-0 mr-2"><i class="lar la-eye mr-1"></i> 122</p>
                                          <p class="mb-0 "><i class="las la-download ml-2"></i> 25 k</p>
                                       </div>
                                    </div>
                                 </div>
                              </div>
                           </li>
                           <li class="col-sm-6 col-lg-4 col-xl-3 iq-rated-box">
                              <div class="iq-card mb-0">
                                 <div class="iq-card-body p-0">
                                    <div class="iq-thumb">
                                       <a href="javascript:void(0)">
                                          <img src="../assets/images/dashboard/05.jpg" class="img-fluid w-100 img-border-radius" alt=""/>
                                       </a>
                                    </div>
                                    <div class="iq-feature-list">
                                       <h6 class="font-weight-600 mb-0">Last Race</h6>
                                       <p class="mb-0 mt-2">T.v show</p>
                                       <div class="d-flex align-items-center my-2 iq-ltr-direction">
                                          <p class="mb-0 mr-2"><i class="lar la-eye mr-1"></i> 144</p>
                                          <p class="mb-0 "><i class="las la-download ml-2"></i> 35 k</p>
                                       </div>
                                    </div>
                                 </div>
                              </div>
                           </li>
                           <li class="col-sm-6 col-lg-4 col-xl-3 iq-rated-box">
                              <div class="iq-card mb-0">
                                 <div class="iq-card-body p-0">
                                    <div class="iq-thumb">
                                       <a href="javascript:void(0)">
                                          <img src="../assets/images/dashboard/06.jpg" class="img-fluid w-100 img-border-radius" alt=""/>
                                       </a>
                                    </div>
                                    <div class="iq-feature-list">
                                       <h6 class="font-weight-600 mb-0">Opend Dead Shot</h6>
                                       <p class="mb-0 mt-2">T.v show</p>
                                       <div class="d-flex align-items-center my-2 iq-ltr-direction">
                                          <p class="mb-0 mr-2"><i class="lar la-eye mr-1"></i> 134</p>
                                          <p class="mb-0 "><i class="las la-download ml-2"></i> 30 k</p>
                                       </div>
                                    </div>
                                 </div>
                              </div>
                           </li>
                        </ul>
                     </div>
                  </div>
               </div>
               <div class="col-lg-4">
                  <div class="iq-card iq-card iq-card-block iq-card-stretch iq-card-height">
                     <div class="iq-card-header">
                        <div class="iq-header-title">
                           <h4 class="card-title text-center"> Top user's premium <img src="../assets/images/prize.png" style={{width:"10%"}}/></h4>
                        </div>
                     </div>
                     <div class="iq-card-body pb-0">
                        <div id="view-chart-01">
                        </div>
                        <table class="data-tables table movie_table" style={{width : "100%"}} >
                           <tr>
                              <th>Top</th>
                              <th>name</th>
                              <th>money spend</th>
                           </tr>
                        {userVip.map((item,index) =>(
                                      <tr key={index}>
                                      <td>
                                        {index === 0 ? (
                                          <img src="../assets/images/one.png" alt="Icon 1" className="vip-image" style={{width : "35px"}}/>
                                        ) : index === 1 ? (
                                          <img src="../assets/images/2nd-place.png" style={{width : "35px"}} className="vip-image" alt="Icon 2" />
                                        ) : index === 2 ? (
                                          <img src="../assets/images/Custom-Icon-Design-Flatastic-4-Number-3.512.png" className="vip-image" style={{width : "35px"}} alt="Icon 3" />
                                        ) : (
                                          index + 1
                                        )}
                                      </td>
                                      <td>{item.username}</td>
                                      <td>{item.amount} $</td>
                                    </tr>
                           ))}
                        </table>
                     </div>
                  </div>
               </div>
            </div>
            <div class="row">
               <div class="col-lg-8">
                  <div class="iq-card iq-card-block iq-card-stretch iq-card-height">
                     <div class="iq-card-header d-flex align-items-center justify-content-between">
                        <div class="iq-header-title">
                           <h4 class="card-title">Top Category</h4>
                        </div>
                        <div class="iq-card-header-toolbar d-flex align-items-center seasons">
                           <div class="iq-custom-select d-inline-block sea-epi s-margin">
                              <select name="cars" class="form-control season-select">
                                 <option value="season1">Today</option>
                                 <option value="season2">This Week</option>
                                 <option value="season2">This Month</option>
                              </select>
                           </div>
                        </div>
                     </div>
                     <div class="iq-card-body row align-items-center">
                        <div class="col-lg-7">
                           <div class="row list-unstyled mb-0 pb-0">
                              <div class="col-sm-6 col-md-4 col-lg-6 mb-3">
                                 <div class="iq-progress-bar progress-bar-vertical iq-bg-primary">
                                    <span class="bg-primary" data-percent="100" style={{ width: '100%', height: '2s ease 0s  40%'}} ></span>
                                 </div>
                              </div>
                             
                           </div>
                        </div>
                        <div class="col-lg-5">
                           <div id="view-chart-02" class="view-cahrt-02"></div>
                        </div>
                     </div>
                  </div>
               </div>
               <div class="col-sm-12">
                  <div class="iq-card">
                     <div class="iq-card-header d-flex justify-content-between">
                        <div class="iq-header-title">
                           <h4 class="card-title">10 tài khoản mới nhất </h4>
                        </div>
                        {/* <div class="iq-card-header-toolbar d-flex align-items-center seasons">
                           <div class="iq-custom-select d-inline-block sea-epi s-margin">
                              <select name="cars" class="form-control season-select">
                                 <option value="season1">Most Likely</option>
                                 <option value="season2">Unlikely</option>
                              </select>
                           </div>
                        </div> */}
                     </div>
                     <div class="iq-card-body">
                        <div class="table-responsive">
                           <table class="data-tables table movie_table" style={{ width: '100%'}}>
                              <thead>
                                 <tr>
                                    <th style={{ width: '20%'}}>Tên tài khoản</th>
                                    <th style={{ width: '20%'}}>Email</th>
                                    <th style={{ width: '20%'}}>Quyền hạn</th>
                                    <th style={{ width: '20%'}}>Trạng thái</th>
                                 </tr>
                              </thead>
                              <tbody>
                              {userVipFive.map(item =>(
                                 <tr>
                                    <td>{item.username}</td>
                                    <td>{item.email}</td>
                                    <td>
                                    {item.role.name === "admin" ? (
  <span className="admin-status">Admin</span>
) : item.role.name === "vip" ? (
  <span className="vip-status">VIP</span>
) : (
  item.role.name
)}
                                    </td>

                                    <td>{item.status}</td>
                                 </tr>
                                 ))}
                              </tbody>
                           </table>
                        </div>
                     </div>
                  </div>
               </div>
            </div>
         </div>
      </div>
   </div>

   <footer class="iq-footer">
      <div class="container-fluid">
         <div class="row">
            <div class="col-lg-6">
               <ul class="list-inline mb-0">
                  <li class="list-inline-item"><a href="privacy-policy.html">Privacy Policy</a></li>
                  <li class="list-inline-item"><a href="terms-of-service.html">Terms of Use</a></li>
               </ul>
            </div>
            <div class="col-lg-6 text-right">
               Copyright 2020 <a href="#">Streamit</a> All Rights Reserved.
            </div>
         </div>
      </div>
   </footer>
        </>
        
    );
}
export default HomeAdmin;