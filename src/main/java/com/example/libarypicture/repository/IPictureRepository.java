package com.example.libarypicture.repository;

import com.example.libarypicture.model.Picture;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface IPictureRepository extends JpaRepository<Picture, Long> {
    Iterable<Picture> findByUserId(long userId);
}
