package com.example.libarypicture.repository;

import com.example.libarypicture.model.Role;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface IRollRepository extends JpaRepository<Role , Long> {
}
