package com.example.libarypicture.service.impl;

import com.example.libarypicture.dto.BlogDTO;
import com.example.libarypicture.dto.PictureDTO;
import com.example.libarypicture.model.Blog;
import com.example.libarypicture.model.LikeBlog;
import com.example.libarypicture.model.Picture;
import com.example.libarypicture.model.User;
import com.example.libarypicture.repository.IBlogRepository;
import com.example.libarypicture.repository.ILikeRepository;
import com.example.libarypicture.repository.IPictureRepository;
import com.example.libarypicture.repository.IUserRepository;
import com.example.libarypicture.service.IBlogService;
import com.example.libarypicture.service.IUserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
public class BlogService implements IBlogService {
    @Autowired
    private IBlogRepository blogRepository;
    @Autowired
    private IPictureRepository pictureRepository;
    @Autowired
    private IUserRepository userRepository;
    @Autowired
    private ILikeRepository likeRepository;

    @Override
    public boolean saveBlog(BlogDTO blogDTO) {
        LocalDateTime localDateTime = LocalDateTime.now();
        Blog blog = blogDTO.getBlog();
        PictureDTO pictureDTO = new PictureDTO(blogDTO.getMultipartFile());
        blog.setLikePage("0");
        blog.setLocalDateTime(localDateTime);
        blogRepository.save(blog);
            MultipartFile multipartFile = pictureDTO.getMultipartFile();
            String fileName = multipartFile.getOriginalFilename();
            Picture picture = new Picture();
            picture.setFilePicture("../img/" + fileName);
            Optional<User> userOptional = userRepository.findByEmail(blogDTO.getBlog().getUser().getEmail());
            picture.setBlog(blogDTO.getBlog());
            pictureRepository.save(picture);

        return true;
    }

    @Override
    public void deleteBlog(long id) {
      Optional<Blog> blogOptional = blogRepository.findById(id);
      Optional<Picture> pictureIterable = pictureRepository.findByBlog(blogOptional.get());
      pictureRepository.delete(pictureIterable.get());
      blogRepository.delete(blogOptional.get());
    }

    @Override
    public void updateBlog(BlogDTO blogDTO) {
        LocalDateTime localDateTime = LocalDateTime.now();
        Blog blog = blogDTO.getBlog();
        PictureDTO pictureDTO = new PictureDTO(blogDTO.getMultipartFile());
        blog.setLocalDateTime(localDateTime);
        blogRepository.saveAndFlush(blog);
            MultipartFile multipartFile = pictureDTO.getMultipartFile();
            String fileName = multipartFile.getOriginalFilename();
            Picture picture = new Picture();
            picture.setFilePicture("public/" + fileName);
            picture.setBlog(blogDTO.getBlog());
            pictureRepository.saveAndFlush(picture);
        }


    @Override
    public List<Blog> getAllCategories() {
        return blogRepository.findAll();
    }

    @Override
    public Optional<Blog> getBlogById(long id) {
        return blogRepository.findById(id);
    }


    @Override
    public Iterable<Blog> getAllBlogsByUser(long id) {
        Optional<User> userOptional = userRepository.findById(id);
        return blogRepository.findByUser(userOptional.get());
    }
    public boolean likeBlog(long blogId , long userId ) {
        likeRepository.findByBlogIdAndUserId(blogId,userId);
        if(likeRepository.findByBlogIdAndUserId(blogId,userId).isPresent()){
            Optional<Blog> blogOptional = blogRepository.findById(blogId);
            int likePage = Integer.parseInt(blogOptional.get().getLikePage());
            blogOptional.get().setLikePage(String.valueOf(likePage - 1));
            blogRepository.saveAndFlush(blogOptional.get());
            likeRepository.deleteByUserIdAndBlogId(userId,blogId);
            return true;
        }else{
           Optional<Blog> blogOptional = blogRepository.findById(blogId);
           int likePage = Integer.parseInt(blogOptional.get().getLikePage());
           blogOptional.get().setLikePage(String.valueOf(likePage + 1));
           blogRepository.saveAndFlush(blogOptional.get());
           Optional<User> userOptional = userRepository.findById(userId);
           LikeBlog likeBlog = new LikeBlog(blogOptional.get(),userOptional.get());
           likeRepository.save(likeBlog);
           return true;
        }
    }
}

