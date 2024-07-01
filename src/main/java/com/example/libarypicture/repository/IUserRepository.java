package com.example.libarypicture.repository;

import com.example.libarypicture.model.User;
import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
@Transactional
public interface IUserRepository extends JpaRepository<User,Long> {
    Optional<User> findByEmail(String email);
    Optional<User> findById(long id);
    Optional<User> findByUsername(String username);
    @Query(value = "select c from User c order by c.amount DESC ")
    Iterable<User> getUserByAmountOrderByAmountAmountAsc();
}
