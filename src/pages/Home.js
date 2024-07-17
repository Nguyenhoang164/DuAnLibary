import axios from "axios";
import { useFormik } from "formik";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";

function Home(){
  const navigate = useNavigate();
  const [showLoading, setShowLoading] = useState(true);
    useEffect(() =>{
        const timer = setTimeout(() => {
            setShowLoading(false);
          }, 2500);
          return () => clearTimeout(timer);
          
    },[])
  
    return(
        <>
        <ToastContainer/>
           {showLoading && (
        <div id="loading">
          <div id="loading-center"></div>
        </div>
      )}
      <div className="main-twitter">
         <div className="body-twitter">
              <div className="logo-twitter">
                <img className="logo-twitter-size" src="https://images2.thanhnien.vn/528068263637045248/2023/7/24/f1x5vdqx0aa9sgt-16901896163331463104829.jpg"></img>
              </div>
              <div className="form-login-twitter">
                <div className="sologan-twiter">
                 <h1 className="sologan-twiter-text">Đang diễn ra ngay bây giờ</h1><br/>
                 <h2 className="sologan-twiter-text">Tham gia ngay</h2> </div>
                 <div className="button-twitter"><a href="/resgiter"><button class="button-sign-in-twitter">Tạo tài khoản</button> <br/></a>
                 <span className="span">Khi đăng ký, bạn đã đồng ý với <a href="#">Điều khoản Dịch vụ</a> và <a href="#">Chính sách Quyền riêng tư</a></span>
                 <br/>
                 <span className="span">gồm cả Sử dụng Cookie.</span>
                </div>
                <hr/>
                <div>
                  <h4>Đã có tài khoản?</h4>
                  <br/>
                  <div className="button-twitter-login"><a href="/login"><button class="button-sign-in-twitter">Đăng nhập</button></a> <br/></div>
                </div>
                </div>
         </div>
         <div className="footer-twitter">
         <ul className="footer-service-twitter">
            <li>Giới thiệu</li>
            <li>Tải ứng dụng X xuống</li>
            <li>Trung tâm Trợ giúp</li>
            <li>Điều khoản Dịch vụ</li>
            <li>Chính sách Riêng tư</li>
            <li>Chính sách cookie</li>
            <li>Khả năng truy cập</li>
            <li>Thông tin quảng cáo</li>
            <li>Blog</li>
            <li>Nghề nghiệp</li>
            <li>Tài nguyên thương hiệu</li>
            <li>Quảng cáo</li>
            <li>Tiếp thị</li>
            <li>X dành cho doanh nghiệp</li>
            <li>Nhà phát triển</li>
            <li>Danh mục</li>
            <li>Cài đặt</li>
            <li>© 2024 X Corp.</li>
</ul>
         </div>
      </div>
       
      
        </>
    )
}
export default Home;