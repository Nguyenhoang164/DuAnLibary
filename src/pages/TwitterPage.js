import axios from "axios";
import { useFormik, validateYupSchema } from "formik";
import { useEffect, useState } from "react";
import { AiOutlineLike, AiOutlinePicture } from "react-icons/ai";
import { CiHome, CiSearch, CiShare2 } from "react-icons/ci";
import { FaUserGroup, FaXTwitter } from "react-icons/fa6";
import { IoIosMore, IoIosNotifications } from "react-icons/io";
import { MdManageAccounts, MdOutlineEmail } from "react-icons/md";
import { RiPagesLine } from "react-icons/ri";
import { SiNgrok } from "react-icons/si";
import { formatDistanceToNow } from 'date-fns';
import { Link, useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import { FaRegCommentAlt } from "react-icons/fa";

function TwitterPage(){
    const [showLoading, setShowLoading] = useState(true);
    const [showModal, setShowModal] = useState(false);
    const [comment , setComment] = useState([]);
    const [showProfile , setProfile] = useState(false);
    const [userProfile , setUserProfile] = useState();
    const [userBlog , setUserBlog] = useState([])
    var userName = sessionStorage.getItem("userName");
    var userId = sessionStorage.getItem("userId");
    var userEmail = sessionStorage.getItem("userEmail");
    const[blog,setBlogs] = useState([]);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const navigate = useNavigate();
    const signOut = () =>{
      sessionStorage.clear();
      toast.success("Đăng xuất thành công", {
        position: "top-right",
        autoClose: 2000, // Đặt thời gian autoClose là 3 giây
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      })
      navigate("/");
 }
    const toggleMenu = () => {
      setIsMenuOpen(!isMenuOpen);
    };
    const formBlog = useFormik({
        initialValues:{
              multipartFile:"",      
            blog:{
                  description:""
            }
        },
        onSubmit: async (values) => {
          try {
            const formData = new FormData();
            formData.append('multipartFile', values.multipartFile);
            formData.append('blog.description', values.blog.description);
            axios.post(`http://localhost:8080/api/blogs/create/${userId}`, formData, {
              headers: {
                "Content-Type": "multipart/form-data"
              }
            });
        
            toast.success("Đăng thành công", {
              position: "top-right",
              autoClose: 2000,
              hideProgressBar: true,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined
            });
            setTimeout(() => {
              navigate("/twitterPage");
            }, 2000);
          } catch (error) {
            console.error(error);
            // Xử lý lỗi ở đây
          }
        }
    })
    useEffect(() =>{
        const timer = setTimeout(() => {
            setShowLoading(false);
          }, 1000);
            
          // Cleanup timer khi component được unmount
          return () => clearTimeout(timer);
    })
    useEffect(()=>{
      axios.get("http://localhost:8080/api/blogs").then(res =>{
        setBlogs(res.data);
        console.log(res.data);
      })
    },[])
    const [images, setImages] = useState([]);
  
    const handleFileChange = (event) => {
      const file = event.target.files[0]; // Lấy file đầu tiên trong danh sách files
      formBlog.values.multipartFile = file; // Gán file vào formBlog.values.picture
      setImages(file.name); // Gán file vào state images
    };
   const likeBlog = (id) => {
    console.log(id);
      axios.get(`http://localhost:8080/api/blogs/like/${id}/${userId}`).then(res =>{
        axios.get("http://localhost:8080/api/blogs").then(res =>{
          setBlogs(res.data);
          console.log(res.data);
        })
      })
   }
   const showCommentModal = (id) => {
    axios.get(`http://localhost:8080/api/blogs/showComment/${id}`).then(res =>{
       setComment(res.data)
    },[])
    sessionStorage.removeItem("blogid");
    sessionStorage.setItem("blogid",id);
    console.log(comment)
    setShowModal(true);
  };
  const hideCommentModal = () => {
    setShowModal(false);
  };

  const submitComment = () => {
    hideCommentModal();
  };
  const openProfileUser = (id) =>{
    axios.get(`http://localhost:8080/api/users/user/${id}`).then(res =>{
      setUserProfile(res.data);
    },[]);
    axios.get(`http://localhost:8080/api/blogs/show/${id}`).then(res =>{
      setUserBlog(res.data);
    },[])
    console.log(userBlog)
    setProfile(true);
  }
  const hideProfileModal = () => {
    setProfile(false);
  };
  const commentsForm = useFormik({
    initialValues:{
      blog:{
        id:""
      },
      user:{
        id: userId
      },
      comment: ""
    },
    onSubmit : async(values) =>{
      var blogid = sessionStorage.getItem("blogid");
      values.blog.id = blogid;
      axios.post(`http://localhost:8080/api/blogs/comment`,values).then(res =>{
        toast.success("Đăng thành công", {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined
        });
        setTimeout(() => {
          showCommentModal(values.blog.id);
        }, 2000);
      })
    }
  })
  const followingUser = (id) =>{
    console.log(id);
    axios.get(`http://localhost:8080/api/users/followUser/${id}/${userId}`).then(res =>{
      toast.success("Thay đổi lượng theo dõi thành công", {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined
      });
      setTimeout(() => {
        openProfileUser(id);
      }, 500);
    })
  }
    return(
        <>
        <ToastContainer/>
        {showLoading && (
        <div id="loading">
          <div id="loading-center"></div>
        </div>
      )}
        <div className="twitter-main-page">
            <div className="nav-twitter-page">
                <ul className="nav-twitter-side-page">
                    <li><img className="logo-twitter-page" src="https://images2.thanhnien.vn/528068263637045248/2023/7/24/f1x5vdqx0aa9sgt-16901896163331463104829.jpg"/></li>
                    <li>
                        <CiHome className="icon-nav-twitter-page" />
                        <span> Trang chủ</span>
                    </li>
                    <li><CiSearch className="icon-nav-twitter-page"/> <span> Khám phá</span></li>
                    <li><IoIosNotifications className="icon-nav-twitter-page"/> Thông báo</li>
                    <li><MdOutlineEmail className="icon-nav-twitter-page"/> Tin nhắn</li>
                    <li><SiNgrok className="icon-nav-twitter-page"/> Grok</li>
                    <li><RiPagesLine className="icon-nav-twitter-page"/> Dấu trang</li>
                    <li><FaUserGroup className="icon-nav-twitter-page"/> Cộng đồng</li>
                    <li><FaXTwitter className="icon-nav-twitter-page"/> Premium</li>
                    <li><MdManageAccounts className="icon-nav-twitter-page"/> Hồ sơ</li>
                    <li><IoIosMore className="icon-nav-twitter-page" /> Thêm</li>
                </ul>
                <div className="user-dropdown-twitter-page" onClick={toggleMenu}>
      <img className="avatar-user-twitter" src="../assets/images/user/man-300x300.png" />
      <div className="name-user-and-email-twitter">{userName} <br /> @{userEmail}</div>
      <div className="logo-user-button">...</div>
      {isMenuOpen && (
        <div className="dropdown-menu">
          <button>Xem Tài Khoản</button>
          <button type="submit" onClick={() => signOut()}>Đăng Xuất</button>
        </div>
      )}
</div>
            </div>
            <div className="body-twitter-page">
                <div className="switch-twitter-page">
                    <button>Dành cho bạn</button>
                    <button>Đang theo dõi</button>
                </div>
                <div className="create-blog-twitter-page">
                    <div className="form-blog-left">
                        <img className="avatar-user-twitter" src="../assets/images/user/man-300x300.png"/>
                    </div>
                    <div className="form-blog-right">
                    <form onSubmit={formBlog.handleSubmit}>
                    <textarea className="text-title-blog-twitter-page" type="text" id="blog.description" name="blog.description" onChange={formBlog.handleChange} placeholder="Chuyện gì đang xảy ra?!"></textarea>
                    <br/>
                    <div className="file-style">
                    <label className="file-style-left" htmlFor="file-input">
        <AiOutlinePicture style={{ color: '#0077b6', fontSize: '24px' }} />
      </label>
      <input
        type="file"
        id="file-input"
        style={{ display: 'none' }}
        multiple
        onChange={handleFileChange}
      />
      <div className="image-preview">
        
         
        <label className="file-style-right">
          <input type="submit" className="button-send" value={"Đăng"}></input>
        </label>
</div>
      </div>
      {images != null ||images != "" && (
          <>
           <img
            src={`../img/${images}`}
            style={{ width: '500px', height: 'auto' }}
          />
          </>
        )}
          </form>
      </div>                     
                </div>
                <div>
  {blog.map(item => (
    <>
    <div className="part-blog-twitter-page">
       <p>
        <span><button className="btn-no-bg" onClick={() => openProfileUser(item.user.id)}><img className="avatar-user-twitter" src="../assets/images/user/man-300x300.png"/></button></span>
        <span style={{color:"white"}}>{item.user.username}</span>
        <span style={{paddingLeft :"5px"}}>
          @{item.user.email}{" "}
          {formatDistanceToNow(new Date(item.blog.localDateTime), { addSuffix: true })}
        </span>
      </p>
      <p style={{paddingLeft:"80px"}}>{item.blog.description}</p>
      <img className="picture-blog-part" src={item.picture.filePicture} />
      <ul className="icon-part-blog-twitter">
        <li> <button className="btn-no-bg" onClick={() => likeBlog(item.blog.id)}><AiOutlineLike /></button> {item.blog.likePage}</li>
        <li>
  <button className="btn-no-bg" onClick={() => showCommentModal(item.blog.id)}>
    <FaRegCommentAlt />
  </button>
</li>
<div className={`modal ${showModal ? 'visible' : 'hidden'}`}>
  <div className="modal-content">
    <div className="modal-header">
      <h2>Bình luận</h2>
      <span className="close-button" onClick={() => hideCommentModal()}>&times;</span>
    </div>
    <div className="modal-body">
    {comment.map((item) => (
  <div className="comment-page" key={item.id}>
    <div>
      <img className="avatar-user-twitter" src="../assets/images/user/man-300x300.png" />
    </div>
    <div>
      <span>{item.user.username}</span>
      <div style={{paddingLeft:"5px"}}>{item.comment}</div>
      </div>
    
    <span style={{paddingLeft:"10px",marginTop:"25px",fontSize:"10px",color:"#615d5d"}}>{formatDistanceToNow(new Date(item.timeCreateComments), { addSuffix: true })}</span>
  </div>

))}
    </div>
    <div className="modal-footer">
      <form onSubmit={commentsForm.handleSubmit}>
        <input value={userId} id="user.id" name="user.id" onChange={commentsForm.handleChange} type="hidden"></input>
        <input value={item.blog.id} id="blog.id" name="blog.id" onChange={commentsForm.handleChange} type="hidden"></input>
    <textarea rows={1} cols={8} id="comment" name="comment" onChange={commentsForm.handleChange} className="input-comment" placeholder="Write your comment..."></textarea>
      <button className="submit-button" type="submit">Submit</button>
      </form>
    </div>
  </div>
</div>
        <li><button className="btn-no-bg"><CiShare2 /></button> 0</li>
        <div className={`modal ${showProfile ? 'visible' : 'hidden'}`}>
        <div className="modal-content">
    <div className="modal-header">
    <div className="user-profile-inf">
      <img className="avatar-user-twitter-profile" src="../assets/images/user/man-300x300.png" />
      {userProfile ? (
        <>
          <h5 style={{paddingLeft :"15px"}}>{userProfile.username}</h5>
          <span style={{paddingLeft :"15px"}}>{userProfile.email}</span>
        </>
    
  ) : (
    <p>Loading...</p>
  )}
      
    </div>
    
   
      <span className="close-button" onClick={() => hideProfileModal()}>&times;</span>
    </div>
    <div className="modal-body">
       <div className="dis-profile">
       {userProfile ? (
        <>
        <span>Lượt thích {userProfile.follow} </span>
        <span style={{paddingLeft : "10px"}}>Lượt theo dõi {userProfile.following}</span>
        <span style={{ paddingLeft: "60px" }}>
  <button onClick={() => followingUser(userProfile.id)}  style={{
    backgroundColor: "#007bff",
    color: "#fff",
    border: "none",
    padding: "10px 20px",
    borderRadius: "4px",
    fontSize: "10px",
    cursor: "pointer"
  }}>Theo dõi</button>
</span>
<span style={{ paddingLeft: "10px" }}>
  <button style={{
    backgroundColor: "#007bff",
    color: "#fff",
    border: "none",
    padding: "10px 20px",
    borderRadius: "4px",
    fontSize: "10px",
    cursor: "pointer"
  }}>Like</button>
</span>
<br/>

        </>
      ) : (
        <p>Loading...</p>
      )}
      </div>
      <br/>
      Bài viết 
         {userBlog.map((value) =>(
          <>
 <div className="part-blog-twitter-page">
      <p>
      <span><img className="avatar-user-twitter" src="../assets/images/user/man-300x300.png"/></span>
          {formatDistanceToNow(new Date(value.blog.localDateTime), { addSuffix: true })}
      </p>
      <p style={{paddingLeft:"65px"}}>{value.blog.description}</p>
      <img className="picture-blog-part" src={value.picture.filePicture} />
 </div>
          </>
         ))}
    </div>
    
  </div>
        </div>
      </ul>
    </div>
    </>
  ))}
</div>
       
            </div>

            <div className="suggest-twitter-page">
                 <div className="search-twitter-page">
                 <img className="search-icon" src="../assets/images/search-interface-symbol_54481.png"></img>
                 <input type="text" class="search-input-twitter-page" placeholder="Tìm kiếm" />
                 </div>
                 <div className="Premium-twitter-page">
                 <h4>Đăng ký gói Premium</h4>
                  Đăng ký để mở khóa các tính năng mới và nếu đủ điều kiện, bạn sẽ được nhận một khoản chia sẻ doanh thu từ quảng cáo.
                 <br/>
                 <button style={{marginTop:"10px"}}>Đăng ký</button>
                 </div>
            </div>
        </div>
        </>
    )
}
export default TwitterPage;