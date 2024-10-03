package com.quality.ecommerce.securityConfig;

import com.quality.ecommerce.jwt.JWTAuthenticationFilter;
import com.quality.ecommerce.jwt.JwtAuthenticationEntryPoint;
import lombok.AllArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

@Configuration
@AllArgsConstructor
public class SecurityFilterConfig {
    private JwtAuthenticationEntryPoint point;
    private JWTAuthenticationFilter filter;

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity security) throws Exception {
        return security.csrf(csrf -> csrf.disable())
                .authorizeHttpRequests(auth -> auth
                        .requestMatchers("/authenticate","/signup").permitAll()
                        .requestMatchers(HttpMethod.GET, "/api/products/**").permitAll()
                        .requestMatchers(HttpMethod.GET, "/api/category/").permitAll()
                        .requestMatchers(HttpMethod.GET, "/api/discount/").permitAll()
                        .requestMatchers(HttpMethod.POST, "/api/discount/").hasRole("ADMIN")
                        .requestMatchers(HttpMethod.PUT, "/api/discount/").hasRole("ADMIN")
                        .requestMatchers(HttpMethod.DELETE, "/api/discount/").hasRole("ADMIN")
                        .requestMatchers(HttpMethod.GET, "/api/product_variants/**").permitAll()
                        .requestMatchers(HttpMethod.PUT, "/api/products/{id}").hasRole("ADMIN")
                        .requestMatchers(HttpMethod.POST, "/api/products/uploads").hasRole("ADMIN")
                        .requestMatchers(HttpMethod.DELETE, "/api/products/{id}").hasRole("ADMIN")
                        .requestMatchers(HttpMethod.GET,"/api/users/**").hasRole("ADMIN")
                        .requestMatchers(HttpMethod.POST, "/api/discount/**").hasRole("ADMIN")
                        .requestMatchers(HttpMethod.POST, "/api/product-discount/**").hasRole("ADMIN")
                        .requestMatchers(HttpMethod.POST, "/api/category/**").hasRole("ADMIN")
                        .requestMatchers(HttpMethod.PUT, "/api/category/**").hasRole("ADMIN")
                        .requestMatchers(HttpMethod.DELETE, "/api/category/**").hasRole("ADMIN")
                        .requestMatchers(HttpMethod.GET, "/order").hasRole("ADMIN")
//                        .requestMatchers(HttpMethod.POST, "/cart").hasRole("ADMIN")
                        .anyRequest().authenticated())
                .exceptionHandling(ex -> ex.authenticationEntryPoint(point))
                .sessionManagement(session -> session.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
                .addFilterBefore(filter, UsernamePasswordAuthenticationFilter.class)
                .build();
    }
}