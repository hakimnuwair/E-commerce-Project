package com.quality.ecommerce.services;

import com.quality.ecommerce.entities.authenticationEntities.UserRoles;
import com.quality.ecommerce.repository.UserRolesRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UserRolesService {
    @Autowired
    private UserRolesRepo userRolesRepo;

    public UserRoles addUserRoles(UserRoles userRoles){
        return userRolesRepo.save(userRoles);
    }

    public UserRoles getOrCreateRole(String roleName) {
        UserRoles role = userRolesRepo.findByRoleName(roleName);
        if (role == null) {
            role = new UserRoles(roleName);
            userRolesRepo.save(role);
        }
        return role;
    }

}
