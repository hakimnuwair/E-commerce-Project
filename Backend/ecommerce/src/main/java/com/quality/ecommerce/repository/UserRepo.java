package com.quality.ecommerce.repository;

import com.quality.ecommerce.entities.authenticationEntities.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserRepo extends JpaRepository<User, Integer> {

    @Override
    Optional<User> findById(Integer integer);

    public User findByEmail(String username);

}
