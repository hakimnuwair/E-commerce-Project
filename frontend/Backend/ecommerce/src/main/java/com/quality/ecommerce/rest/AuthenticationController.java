package com.quality.ecommerce.rest;
import com.quality.ecommerce.DTO.SignUpRequestDTO;
import com.quality.ecommerce.DTO.UsersResponseDTO;
import com.quality.ecommerce.entities.authenticationEntities.*;
import com.quality.ecommerce.enums.UserStatus;
import com.quality.ecommerce.jwt.JwtHelper;
import com.quality.ecommerce.services.*;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import java.util.*;

@RestController
@AllArgsConstructor
public class AuthenticationController {
    private UserDetailsService userDetailsManager;
    private AuthenticationManager manager;
    @Autowired
    private JwtHelper helper;
    @Autowired
    private UserService userService;
    @Autowired
    private UserRolesService userRolesService;
    @Autowired
    private CustomUserDetailsService customUserDetailsService;

    @PostMapping("/signup")
    ResponseEntity<String> signup(@RequestBody SignUpRequestDTO signupRequest){
        User user = new User();
        user.setFullName(signupRequest.getFullName());
        user.setEmail(signupRequest.getEmail());
        user.setPassword(signupRequest.getPassword());
        user.setUserStatus(UserStatus.active);

        Set<UserRoles> roles = new HashSet<>();
        UserRoles userRole = userRolesService.getOrCreateRole("ROLE_USER");
        roles.add(userRole);
        user.setRoles(roles);

        userService.addUser(user);
        return new ResponseEntity<>("User registed successfuly", HttpStatus.OK);
    }

    @GetMapping("/user")
    public ResponseEntity<UsersResponseDTO> getUserDetails(@AuthenticationPrincipal UserDetails userDetails) {
        UsersResponseDTO userResponseDTO = userService.findByUsername(userDetails.getUsername());
        if (userResponseDTO == null) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(userResponseDTO);
    }

    @PostMapping("/authenticate")
    public ResponseEntity<JwtResponse> login(@RequestBody JwtRequest request) {
        this.doAuthenticate(request.getEmail(), request.getPassword());
        UserDetails userDetails = customUserDetailsService.loadUserByUsername(request.getEmail());
        User user = userService.findByEmail(request.getEmail());
        int userId = user.getId();
        String token = this.helper.generateToken(userDetails, userId);

        // Initialize the list to hold roles
        List<String> roles = new ArrayList<>();

        // Iterate over the authorities
        for (GrantedAuthority authority : userDetails.getAuthorities()) {
            // Add each authority to the roles list
            roles.add(authority.getAuthority());
        }

        JwtResponse response = JwtResponse.builder()
                .jwtToken(token)
                .username(userDetails.getUsername())
                .userRoles(roles).
                build();
        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    private void doAuthenticate(String username, String password) {
        UsernamePasswordAuthenticationToken authentication = new UsernamePasswordAuthenticationToken(username, password);
        try {
            manager.authenticate(authentication);
        } catch (BadCredentialsException e) {
            throw new BadCredentialsException("Credentials Invalid !!");
        }
    }

}
