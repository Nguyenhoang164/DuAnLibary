import { useEffect, useState } from "react";

function Home(){
    const [showLoading, setShowLoading] = useState(true);
    useEffect(() =>{
        const timer = setTimeout(() => {
            setShowLoading(false);
          }, 2500);
          return () => clearTimeout(timer);
          
    },[])
    
    return(
        <>
           {showLoading && (
        <div id="loading">
          <div id="loading-center"></div>
        </div>
      )}
        <div className="main-page">
             <div className="logo-icon vip-image">
              <img src="../assets/images/logo-full.png" />
             </div>
             <div className="img-icon">    
             <img src="../assets/images/shikanoko-nokonoko-koshitantan-torako-koshi.gif" style={{width :"100%",height:"100%"}}></img>
             </div>
             <div className="main-home">
               <div className="search-page">
                
                 <p>Rule #34 Streamit : If it exists there is picture of it. If not, start uploading.</p>
                 <div className="nav-search">
                 <ul className="nav-link">
                      <li><a>Blog</a></li>
                      <li><a>Fandom</a></li>
                      <li><a>Forum</a></li>
                      <li><a href="/login">My Account</a></li>
                      </ul>
                </div>
                 <div className="center">
                 <input type="text" style={{width : "500px"}} placeholder="enter your key word"></input>   
                 </div>
                
                   <br/>
                   <span className="center">Serving 9,185,911 posts - Running Gelbooru Beta 0.2</span>
                 
                 
               </div>
               <div className="img-footer">
                    <span className="center">Terms of Service</span>
                    <br/>
                    <span className="center">At Streamit its easy to find any kind of picture with our fast search engine. Happy browsing!</span>
                    <br/>
                   <span className="center">Contact Us DMCA</span>
               </div>
             </div>
        </div>
        </>
    )
}
export default Home;