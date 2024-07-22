package com.example.libarypicture.controller;

import com.example.libarypicture.dto.BlogDTO;
import com.example.libarypicture.dto.BlogSend;
import com.example.libarypicture.model.Blog;
import com.example.libarypicture.model.Comments;
import com.example.libarypicture.model.Picture;
import com.example.libarypicture.model.User;
import com.example.libarypicture.repository.IBlogRepository;
import com.example.libarypicture.repository.IPictureRepository;
import com.example.libarypicture.repository.IUserRepository;
import com.example.libarypicture.service.impl.BlogService;
import com.example.libarypicture.service.impl.CommentService;
import com.example.libarypicture.service.impl.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/blogs")
@CrossOrigin(value = "*")
public class BlogController {
    @Autowired
    private BlogService blogService;
    @Autowired
    private IBlogRepository BlogRepository;
    @Autowired
    private IPictureRepository PictureRepository;
    @Autowired
    private IUserRepository UserRepository;
    @Autowired
    private CommentService commentService;
    @Autowired
    private UserService userService;
    @GetMapping("")
    public ResponseEntity<List<BlogSend>> getBlogs() {
        Iterable<Blog> blogs = BlogRepository.findAll();
        List<BlogSend> blogList = new ArrayList<>();
        for (Blog blog : blogs) {
            BlogSend blogSend = new BlogSend();
            blogSend.setBlog(blog);
            blogSend.setUser(blog.getUser());
            Optional<Picture> pictureOptional = PictureRepository.findByBlog(blog);
            blogSend.setPicture(pictureOptional.get());
            blogList.add(blogSend);
        }
        Collections.shuffle(blogList);
        return new ResponseEntity<>(blogList, HttpStatus.OK);
    }
    @GetMapping("/show/{id}")
    public ResponseEntity<List<BlogSend>> getBlog(@PathVariable long id) {
        Iterable<Blog> blogs = blogService.getAllBlogsByUser(id);
        List<BlogSend> blogList = new ArrayList<>();
        for (Blog blog : blogs) {
            BlogSend blogSend = new BlogSend();
            blogSend.setBlog(blog);
            blogSend.setUser(blog.getUser());
            Optional<Picture> pictureOptional = PictureRepository.findByBlog(blog);
            blogSend.setPicture(pictureOptional.get());
            blogList.add(blogSend);
        }
        Collections.shuffle(blogList);
        return new ResponseEntity<>(blogList, HttpStatus.OK);
    }
    @PostMapping("/create/{id}")
    public ResponseEntity<Blog> createBlog(@ModelAttribute BlogDTO blogDTO , @PathVariable long id){
        Optional<User> userOptional = UserRepository.findById(id);
        blogDTO.getBlog().setUser(userOptional.get());
        blogService.saveBlog(blogDTO);
        return new ResponseEntity<>(blogDTO.getBlog(),HttpStatus.OK);
    }
    @DeleteMapping("/{id}")
    public ResponseEntity<Boolean> deleteBlog(@PathVariable long id){
        blogService.deleteBlog(id);
        return new ResponseEntity<>(true,HttpStatus.OK);
    }
    @PutMapping("/update/{id}")
    public ResponseEntity<Boolean> updateBlog(@ModelAttribute BlogDTO blogDTO , @PathVariable long id){
        blogDTO.getBlog().setId(id);
        blogService.updateBlog(blogDTO);
        return new ResponseEntity<>(true,HttpStatus.OK);
    }
    @GetMapping("/user/{id}")
    public ResponseEntity<Iterable<Blog>> getBlogByUserId(@PathVariable long id){
        Iterable<Blog> blogIterable = blogService.getAllBlogsByUser(id);
        return new ResponseEntity<>(blogIterable,HttpStatus.OK);
    }
    @GetMapping("/like/{id}/{idUser}")
    public ResponseEntity<Boolean> getBlogByLikeId(@PathVariable long id , @PathVariable long idUser){
        boolean status = blogService.likeBlog(id,idUser);
        if (status){
            return new ResponseEntity<>(true,HttpStatus.OK);
        }else {
            return new ResponseEntity<>(false, HttpStatus.OK);
        }
    }
    @GetMapping("/showComment/{blogId}")
    public ResponseEntity<Iterable<Comments>> getCommentsByBlogId(@PathVariable long blogId){
        Iterable<Comments> comments = commentService.showAllComments(blogId);
        return new ResponseEntity<>(comments,HttpStatus.OK);
    }
    @PostMapping("/comment")
    public ResponseEntity<String> commentsPage(@RequestBody Comments comments){
        Optional<User> userOptional = userService.getUser(comments.getUser().getId());
        Optional<Blog> blogOptional = blogService.getBlogById(comments.getBlog().getId());
        comments.setUser(userOptional.get());
        comments.setBlog(blogOptional.get());
        commentService.commentToPage(comments);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @DeleteMapping("/delete")
    public ResponseEntity<String> deleteComment(@RequestBody Comments comments){
        commentService.deleteComment(comments);
        return new ResponseEntity<>(HttpStatus.OK);
    }
}
