package com.quality.ecommerce.rest;

import com.quality.ecommerce.DTO.UsersResponseDTO;
import com.quality.ecommerce.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/users")
public class UsersController {
    @Autowired
    UserService userService;
    @GetMapping("/")
    ResponseEntity<List<UsersResponseDTO>> getUsers(@RequestHeader("Authorization") String token){
        List<UsersResponseDTO> users = userService.findAllUsers();
        return new ResponseEntity<>(users,HttpStatus.OK);
    }
}
