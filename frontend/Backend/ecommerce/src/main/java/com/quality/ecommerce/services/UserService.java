package com.quality.ecommerce.services;

import com.quality.ecommerce.DTO.UsersResponseDTO;
import com.quality.ecommerce.entities.authenticationEntities.User;
import com.quality.ecommerce.entities.authenticationEntities.UserRoles;
import com.quality.ecommerce.repository.UserRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
public class UserService {
    @Autowired
    UserRepo userRepo;
    @Autowired
    private PasswordEncoder passwordEncoder;

    public User addUser(User user){
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        return userRepo.save(user);
    }

    public User findByEmail(String email){
        return userRepo.findByEmail(email);
    }


    public List<UsersResponseDTO> findAllUsers(){
        List<User> users = userRepo.findAll();
        List<UsersResponseDTO> usersDTO = new ArrayList<>();

        for(User user : users){
            usersDTO.add(convertToDTO(user));
        }
        return usersDTO;
    }

    public UsersResponseDTO findByUsername(String username){
        User user =  userRepo.findByEmail(username);
        UsersResponseDTO usersResponseDTO = convertToDTO(user);
        return usersResponseDTO;
    }


    public User findByUserID(int userId){
        Optional<User> result = userRepo.findById(userId);
        User user = null;
        if(result.isPresent()){
            return result.get();
        }else{
            throw new RuntimeException("User not found" + userId);
        }
    }


    private UsersResponseDTO convertToDTO(User user) {
        UsersResponseDTO userDTO = new UsersResponseDTO();
        userDTO.setUserId(user.getId());
        userDTO.setFullName(user.getFullName());
        userDTO.setEmail(user.getEmail());

        Set<String> roles = new HashSet<>();
        for (UserRoles role : user.getRoles()) {
            roles.add(role.getRoleName());
        }
        userDTO.setRoles(roles);
        return userDTO;
    }
}
