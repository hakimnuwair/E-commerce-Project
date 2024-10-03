package com.quality.ecommerce.repository;

import com.quality.ecommerce.entities.authenticationEntities.UserRoleMapping;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface UserRoleMappingRepo extends JpaRepository<UserRoleMapping, Integer> {
    public List<UserRoleMapping> findByUserId(int userId);
}
