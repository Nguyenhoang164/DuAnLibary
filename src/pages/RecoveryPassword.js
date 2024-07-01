import { useEffect, useState } from "react";
import videoSrc from '../video/205733-927672950_small.mp4';
import axios from "axios";
import { useFormik } from "formik";
import emailjs from '@emailjs/browser';
import swal from "sweetalert";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
function RecoveryPassword(){
    const [showLoading, setShowLoading] = useState(true);
    const YOUR_SERVICE_ID = "service_9bzd2yi";
    const YOUR_TEMPLATE_ID = "template_63pyvbv";
    const YOUR_PUBLIC_KEY = "HUyLQDpnuJa6Btu8K";
    const navigate = useNavigate();
    const formRecovery = useFormik({
        initialValues:{
            email: ""
        },
        onSubmit : async (values) =>{
            console.log(values.email)
            axios.get(`http://localhost:8080/api/users/recoveryPassword/${values.email}`).then(res =>{
                if(res.data){
                 const emailSend = {
                    to_email : values.email
                 }
                 emailjs.send(YOUR_SERVICE_ID,YOUR_TEMPLATE_ID,emailSend,YOUR_PUBLIC_KEY).then(
                    toast.success(`Email khôi phục đã gửi tới tài khoản email của bạn , kiểm tra và đăng nhập lại`, {
                        position: "top-right",
                        autoClose: 5000, // Đặt thời gian autoClose là 5 giây
                        hideProgressBar: true,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                      })
                 )
                 setTimeout(() => {
                    navigate("/login");
                  }, 5000);
                }else{
                    toast.error(`Email không tồn tại , hãy thử lại`, {
                        position: "top-right",
                        autoClose: 3000, // Đặt thời gian autoClose là 5 giây
                        hideProgressBar: true,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                      })
                }
            })
        }
    }
)
 
    useEffect(() =>{
        const timer = setTimeout(() => {
            setShowLoading(false);
          }, 2800);
            
          // Cleanup timer khi component được unmount
          return () => clearTimeout(timer);
    })
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
      <section class="sign-in-page">
         <div class="container h-100">
            <div class="row justify-content-center align-items-center h-100">
               <div class="col-md-6 col-sm-12 col-12 ">
                  <div class="sign-user_card ">
                     <div class="sign-in-page-data">
                        <div class="sign-in-from w-100 m-auto">
                           <h3 class="mb-0">Reset Password</h3>
                           <p class="text-white">Enter your email address and we'll send you an email with instructions to reset your password.</p>
                           <form class="mt-4" onSubmit={formRecovery.handleSubmit} >
                              <div class="form-group">
                                <input type="email" onChange={formRecovery.handleChange}  class="form-control mb-0" id="email" name="email" placeholder="Email address" autocomplete="off" required/>                                
                              </div>
                              <div class="sign-info">
                              <button type="submit" class="btn btn-primary">Sign in</button>
                              </div>
                              <div class="d-inline-block w-100">
                                 <a href="/login" class="btn btn-primary float-right">Back to login</a>
                              </div>

                           </form>
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
export default RecoveryPassword;