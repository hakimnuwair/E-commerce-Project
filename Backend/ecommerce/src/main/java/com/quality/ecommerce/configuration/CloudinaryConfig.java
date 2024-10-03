package com.quality.ecommerce.configuration;

import com.cloudinary.Cloudinary;
import com.cloudinary.utils.ObjectUtils;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class CloudinaryConfig {

    @Bean
    public Cloudinary cloudinary() {
        return new Cloudinary(ObjectUtils.asMap(
                "cloud_name", "dfncelgqp",
                "api_key", "336844386194149",
                "api_secret", "MBMuCweJN5KbKjP0hDY5JjJjrt8")
        );
    }
}

