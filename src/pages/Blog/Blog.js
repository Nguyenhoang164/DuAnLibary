import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer , toast } from "react-toastify";
function Blog(){
   const [showLoading, setShowLoading] = useState(true);
var userName = sessionStorage.getItem("userName");
var userId = sessionStorage.getItem("userId");
var userEmail = sessionStorage.getItem("userEmail");
const navigate = useNavigate();
const [blog,setBlogs] = useState([]);
const formatDate = (dateString) => {
   const date = new Date(dateString);
   const hours = date.getHours().toString().padStart(2, '0');
   const minutes = date.getMinutes().toString().padStart(2, '0');
   const day = date.getDate().toString().padStart(2, '0');
   const month = (date.getMonth() + 1).toString().padStart(2, '0'); // Months are zero-indexed
   const year = date.getFullYear();
   
   return `${hours}:${minutes} - ${day}/${month}/${year}`;
 };
useEffect(() =>{
   if(userId == null){
      toast.error(`Warning !, this site is private , your permission is not allow to connect, try to login`, {
         position: "top-right",
         autoClose: 3000, // Đặt thời gian autoClose là 3 giây
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
            toast.error(`Warning !, this site is private, your permission is not allow to connect, try to login`, {
               position: "top-right",
               autoClose: 3000, // Đặt thời gian autoClose là 3 giây
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
useEffect(() =>{
    axios.get("http://localhost:8080/api/blogs").then(res =>{
        setBlogs(res.data)
    });
    const timer = setTimeout(() => {
        setShowLoading(false);
      }, 3000);
      return () => clearTimeout(timer);
   
},[])
const signOut = () =>{
   sessionStorage.clear();
   navigate("/login");
}
    return(
        <>
        <ToastContainer />
        {showLoading && (
                <div id="loading">
                  <div id="loading-center"></div>
                </div>
              )}
             <div class="wrapper">
                <div class="iq-sidebar">
                   <div class="iq-sidebar-logo d-flex justify-content-between">
                      <a href="index.html" class="header-logo">
                         <img src="../assets/images//logo.png" class="img-fluid rounded-normal" alt=""/>
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
                  <li><a href="/homeAdmin" class="text-primary"><i class="ri-arrow-right-line"></i><span>quay lại trang chính</span></a></li>
                  <li class="active active-menu"><a href="index.html" class="iq-waves-effect"><i class="las la-home iq-arrow-left"></i><span>Trang chính</span></a></li>
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
                                        <div class="iq-card shadow-none m-0">
                                           <div class="iq-card-body p-0">
                                              <div class="bg-primary p-3">
                                                 <h5 class="mb-0 text-white">All Notifications<small class="badge  badge-light float-right pt-1">4</small></h5>
                                              </div>
                                              <a href="#" class="iq-sub-card" >
                                                 <div class="media align-items-center">
                                                    <div class="">
                                                       <img class="avatar-40 rounded" src="../assets/images/user/01.jpg" alt=""/>
                                                    </div>
                                                    <div class="media-body ml-3">
                                                       <h6 class="mb-0 ">Emma Watson Barry</h6>
                                                       <small class="float-right font-size-12">Just Now</small>
                                                       <p class="mb-0">95 MB</p>
                                                    </div>
                                                 </div>
                                              </a>
                                              <a href="#" class="iq-sub-card" >
                                                 <div class="media align-items-center">
                                                    <div class="">
                                                       <img class="avatar-40 rounded" src="../assets/images/user/02.jpg" alt=""/>
                                                    </div>
                                                    <div class="media-body ml-3">
                                                       <h6 class="mb-0 ">New customer is join</h6>
                                                       <small class="float-right font-size-12">5 days ago</small>
                                                       <p class="mb-0">Cyst Barry</p>
                                                    </div>
                                                 </div>
                                              </a>
                                              <a href="#" class="iq-sub-card" >
                                                 <div class="media align-items-center">
                                                    <div class="">
                                                       <img class="avatar-40 rounded" src="../assets/images/user/03.jpg" alt=""/>
                                                    </div>
                                                    <div class="media-body ml-3">
                                                       <h6 class="mb-0 ">Two customer is left</h6>
                                                       <small class="float-right font-size-12">2 days ago</small>
                                                       <p class="mb-0">Cyst Barry</p>
                                                    </div>
                                                 </div>
                                              </a>
                                              <a href="#" class="iq-sub-card" >
                                                 <div class="media align-items-center">
                                                    <div class="">
                                                       <img class="avatar-40 rounded" src="../assets/images/user/04.jpg" alt=""/>
                                                    </div>
                                                    <div class="media-body ml-3">
                                                       <h6 class="mb-0 ">New Mail from Fenny</h6>
                                                       <small class="float-right font-size-12">3 days ago</small>
                                                       <p class="mb-0">Cyst Barry</p>
                                                    </div>
                                                 </div>
                                              </a>
                                           </div>
                                        </div>
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
                            <div class="col-sm-12">
                               <div class="iq-card">
                                  <div class="iq-card-header d-flex justify-content-between">
                                     <div class="iq-header-title">
                                        <h4 class="card-title">Danh sách danh mục</h4>
                                     </div>
                                  </div>
                                  <div class="iq-card-body">
                                     <div class="table-view">
                                        <table class="data-tables table movie_table" style={{width : "100%"}}>
                                           <thead>
                                              <tr>
                                                 <th style={{width : "10%"}}>STT</th>
                                                 <th style={{width : "20%"}}>Tên tiêu đề</th>
                                                 <th style={{width : "10%"}}>Nội dung</th>
                                                 <th style={{width : "5%"}}>Lượt thích</th>
                                                 <th style={{width : "10%"}}>Ngày đăng</th>
                                                 <th style={{width : "10%"}}>Người dùng đăng</th>
                                                 <th style={{width : "30%"}}>Action</th>
                                              </tr>
                                           </thead>
                                           <tbody>
                                            {blog.map((item,index) =>(
                                               <tr key={index}>
                                               <td>{index + 1}</td>
                                               <td>{item.title}</td>
                                               <td>{item.description}</td>
                                               <td>{item.likePage}</td>
                                               <td>{formatDate(item.localDateTime)}</td>
                                               <td>{item.user.userName}</td>
                                               <td>  <button>Delete</button>
                                              </td>
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
    )
}
export default Blog;