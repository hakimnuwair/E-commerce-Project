package com.quality.ecommerce.repository;

import com.quality.ecommerce.entities.authenticationEntities.UserRoles;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRolesRepo extends JpaRepository<UserRoles, Integer> {
    public UserRoles findByRoleName(String roleName);
}
