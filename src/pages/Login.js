import { useEffect, useState } from "react";
import videoSrc from '../video/205733-927672950_small.mp4';
import { Link, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Login(){
    const [showLoading, setShowLoading] = useState(true);
    const navigate = useNavigate();
    const userFormLogin = useFormik({
      initialValues :{
         usernameOrEmail: "",
         password:""
      },
      onSubmit: async (values) => {
         try {
           const res = await axios.post("http://localhost:8080/api/users/login", values);
           if (res.data === null || res.data === '') {
            toast.error(`Đăng nhập thất bại , sai tên tài khoản hoặc mật khẩu , thử lại`, {
               position: "top-right",
               autoClose: 3000, // Đặt thời gian autoClose là 5 giây
               hideProgressBar: true,
               closeOnClick: true,
               pauseOnHover: true,
               draggable: true,
               progress: undefined,
             });
             navigate("/login");
           } else {
            
            toast.success(`Chào mừng quay trở lại ${res.data.username}`, {
              position: "top-right",
              autoClose: 5000, // Đặt thời gian autoClose là 5 giây
              hideProgressBar: true,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
            });
            if(res.data.role.name === "admin"){

               sessionStorage.setItem("userName", res.data.username);
               sessionStorage.setItem("userId", res.data.id);
               sessionStorage.setItem("userEmail", res.data.email);
               // Sau 5 giây, chuyển hướng trang
               setTimeout(() => {
                  navigate("/HomeAdmin");
                }, 3000);
            }
          }
         } catch (error) {
           console.error(error);
           // Xử lý lỗi tại đây
         }
       }

    })
    useEffect(() => {
      // Sau 5 giây, ẩn phần tử #loading
      const timer = setTimeout(() => {
        setShowLoading(false);
      }, 2800);
    }
)
    return(
        <>
         <ToastContainer />
         {showLoading && (
        <div id="loading">
          <div id="loading-center"></div>
        </div>
      )}
       <div className="video-background-container">
      <video autoPlay loop muted className="video-background">
        <source src={videoSrc} type="video/mp4" />
      </video>
        <div class="sign-in-page">
          <div class="container">
            <div class="row justify-content-center align-items-center height-self-center">
               <div class="col-lg-5 col-md-12 align-self-center form-padding">
                  <div class="sign-user_card ">                    
                     <div class="sign-in-page-data">
                        <div class="sign-in-from w-100 m-auto">
                           <h3 class="mb-3 text-center">Sign in</h3>
                           <form class="mt-4" onSubmit={userFormLogin.handleSubmit}>
                              <div class="form-group">                                 
                                 <input type="text" onChange={userFormLogin.handleChange} class="form-control mb-0" name="usernameOrEmail" id="usernameOrEmail" placeholder="Enter email or username" autocomplete="off" required/>
                              </div>
                              <div class="form-group">                                 
                                 <input type="password" onChange={userFormLogin.handleChange} class="form-control mb-0" id="password" name="password" placeholder="Password" required/>
                              </div>
                                 <div class="sign-info">
                                    <button type="submit" class="btn btn-primary">Sign in</button>
                                    <div class="custom-control custom-checkbox d-inline-block">
                                       <input type="checkbox" class="custom-control-input" id="customCheck"/>
                                       <label class="custom-control-label" for="customCheck">Remember Me</label>
                                    </div>                                
                                 </div>                                    
                           </form>
                        </div>
                     </div>
                     <div class="mt-3">
                        <div class="d-flex justify-content-center links">
                           Don't have an account? <a href="resgiter" class="text-primary ml-2">Sign Up</a>
                        </div>
                        <div class="d-flex justify-content-center links">
                           <a href="/recovery" class="f-link">Forgot your password?</a>
                        </div>
                     </div>
                  </div>
               </div>
            </div>
         </div>
      </div>
      </div>
      </>
    );
}
export default Login;