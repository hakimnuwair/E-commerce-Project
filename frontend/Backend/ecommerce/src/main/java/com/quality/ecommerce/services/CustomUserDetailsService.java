package com.quality.ecommerce.services;

import com.quality.ecommerce.entities.authenticationEntities.UserRoleMapping;
import com.quality.ecommerce.entities.authenticationEntities.UserRoles;
import com.quality.ecommerce.entities.authenticationEntities.User;
import com.quality.ecommerce.repository.UserRepo;
import com.quality.ecommerce.repository.UserRoleMappingRepo;
import com.quality.ecommerce.repository.UserRolesRepo;
import com.quality.ecommerce.utils.CustomUserDetails;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class CustomUserDetailsService implements UserDetailsService {

    @Autowired
    private UserRepo userRepo;

    @Autowired
    private UserRoleMappingRepo userRoleMappingRepo;

    @Autowired
    private UserRolesRepo userRoleRepo;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        User user = userRepo.findByEmail(username);

        if (user == null) {
            throw new UsernameNotFoundException("User not found");
        }

        // Fetch roles
        List<UserRoleMapping> roleMappings = userRoleMappingRepo.findByUserId(user.getId());

        List<GrantedAuthority> authorities = new ArrayList<>();
        for (UserRoleMapping roleMapping : roleMappings) {
            UserRoles role = userRoleRepo.findById(roleMapping.getUserRole().getId()).orElse(null);
            if (role != null) {
                authorities.add(new SimpleGrantedAuthority(role.getRoleName()));
            }
        }

        return new CustomUserDetails(user, authorities);
    }
}
