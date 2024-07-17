import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import videoSrc from '../video/205733-927672950_small.mp4';
import { useFormik } from "formik";
import * as Yup from 'yup';
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";
import emailjs from '@emailjs/browser';
function Resgiter(){
    const [showLoading, setShowLoading] = useState(true);
    const navigate = useNavigate();
    const YOUR_SERVICE_ID = "service_9bzd2yi";
    const YOUR_TEMPLATE_ID = "template_b8h02eh";
    const YOUR_PUBLIC_KEY = "HUyLQDpnuJa6Btu8K";
    const userForm = useFormik({
      initialValues:{
         username :"",
         password :"",
         amount: 0,
         email:"",
         following: 0,
         follow: 0
      },
      onSubmit : async (values) =>{
         if (values.email) {
            // Kiểm tra định dạng email
            const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
            if (!emailRegex.test(values.email)) {
               toast.error(`Email sai định dạng `, {
                  position: "top-right",
                  autoClose: 3000, // Đặt thời gian autoClose là 5 giây
                  hideProgressBar: true,
                  closeOnClick: true,
                  pauseOnHover: true,
                  draggable: true,
                  progress: undefined,
                });
              return; // Trả về false nếu email không hợp lệ
            }
         } 
         axios.post("http://localhost:8080/api/users/resigter",values).then(res =>{
            if(res.data === "Resigter Success"){
               toast.success(`Tạo tài khoản thành công `, {
                  position: "top-right",
                  autoClose: 5000, // Đặt thời gian autoClose là 5 giây
                  hideProgressBar: true,
                  closeOnClick: true,
                  pauseOnHover: true,
                  draggable: true,
                  progress: undefined,
                });
                const emailSend = {
                  to_email : values.email
               }
               emailjs.send(YOUR_SERVICE_ID,YOUR_TEMPLATE_ID,emailSend,YOUR_PUBLIC_KEY).then(
               )
                   // Sau 5 giây, chuyển hướng trang
                   setTimeout(() => {
                      navigate("/login");
                    }, 2000);
                
            }else{
               toast.error(`Tạo tài khoản thất bại , tên tài khoản hoặc email đã tồn tại `, {
                  position: "top-right",
                  autoClose: 5000, // Đặt thời gian autoClose là 5 giây
                  hideProgressBar: true,
                  closeOnClick: true,
                  pauseOnHover: true,
                  draggable: true,
                  progress: undefined,
                });
            }
         })
      }
      
    })
    useEffect(() => {
      // Sau 5 giây, ẩn phần tử #loading
      const timer = setTimeout(() => {
        setShowLoading(false);
      }, 1800);
    }
    )
    return(
        <>
        <ToastContainer />
        {
            showLoading && (
                <div id="loading">
                <div id="loading-center">
                </div>
             </div>
            )
        }
         <div className="video-background-container">
      <video autoPlay loop muted className="video-background">
        <source src={videoSrc} type="video/mp4" />
      </video>
       <section class="sign-in-page">
        <div class="container">
           <div class="row justify-content-center align-items-center height-self-center">
              <div class=" align-self-center col-md-12 col-lg-7 form-padding">
                 <div class="sign-user_card ">                    
                    <div class="sign-in-page-data">
                       <div class="sign-in-from w-100 m-auto">
                          <form class="row" onSubmit={userForm.handleSubmit}>
                             <div class="form-group col-md-6">                                 
                                <label for="exampleInputEmail2">Username</label>
                                <input type="text" class="form-control mb-0 btn-border" onChange={userForm.handleChange} id="username" name="username" placeholder="Enter Full Name" autocomplete="off" required />     
                                
                             </div>
                             <div class="form-group col-md-6">                                 
                                <label for="exampleInputEmail3">E-mail</label>
                                <input type="email" class="form-control mb-0 btn-border" onChange={userForm.handleChange} id="email" name="email" placeholder="Enter email" autocomplete="off" required/>         
                               
                             </div>
                             <div class="form-group col-md-6">
                                <label for="exampleInputEmail6">Password</label>
                                <input type="password" class="form-control mb-0 btn-border" onChange={userForm.handleChange} id="password" name="password" placeholder="Password" autocomplete="off" required/>        
                        
                             </div>
                             <div class="form-group col-md-6"><button type="submit" class="btn btn-primary my-2">Sign Up</button>   </div>
                             
                          </form>
                                                   
                       </div>
                    </div>    
                    <div class="mt-3">
                       <div class="d-flex justify-content-center links">
                          Already have an account? <Link to={"/login"} class="text-primary ml-2">Sign In</Link>
                       </div>                        
                    </div>
                 </div>
              </div>
           </div>
        </div>
     </section>
     </div>
     </>
    )
}
export default Resgiter;