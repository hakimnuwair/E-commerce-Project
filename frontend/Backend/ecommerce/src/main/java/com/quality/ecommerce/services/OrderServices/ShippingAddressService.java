package com.quality.ecommerce.services.OrderServices;

import com.quality.ecommerce.DTO.ShippingAddressDTO;
import com.quality.ecommerce.entities.orderEntities.ShippingAddress;
import com.quality.ecommerce.repository.ShippingAddressRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class ShippingAddressService {
    @Autowired
    private ShippingAddressRepository shippingAddressRepository;
    public void addAddress(ShippingAddress shippingAddress){
        shippingAddressRepository.save(shippingAddress);
    }
    public ShippingAddress saveShippingAddress(ShippingAddressDTO shippingAddressDTO){
        ShippingAddress shippingAddress = convertToEntity(shippingAddressDTO);
        return shippingAddressRepository.save(shippingAddress);
    }

//    public ShippingAddressDTO findAddress(int userId){
//        ShippingAddress shippingAddress = shippingAddressRepository.findBy(userId);
//        if(shippingAddress == null){
//            return null;
//        }
//        ShippingAddressDTO shippingAddressDTO = new ShippingAddressDTO();
//        shippingAddressDTO.setId(shippingAddress.getId());
//        shippingAddressDTO.setFullAddress(shippingAddress.getFullAddress());
//        shippingAddressDTO.setState(shippingAddress.getState());
//        shippingAddressDTO.setCity(shippingAddress.getCity());
//        shippingAddressDTO.setPincode(shippingAddress.getPincode());
//        shippingAddressDTO.setMobileNo(shippingAddress.getMobileNo());
//        return shippingAddressDTO;
//    }

//    public Optional<ShippingAddress> findByIdAndUserId(int id, int userId){
//        return shippingAddressRepository.findByIdAndUserId(id, userId);
//    }

    private ShippingAddress convertToEntity(ShippingAddressDTO shippingAddressDTO){
        ShippingAddress shippingAddress = new ShippingAddress();
        shippingAddress.setFullAddress(shippingAddressDTO.getFullAddress());
        shippingAddress.setState(shippingAddressDTO.getState());
        shippingAddress.setCity(shippingAddressDTO.getCity());
        shippingAddress.setPinCode(shippingAddressDTO.getPinCode());
        shippingAddress.setMobileNo(shippingAddressDTO.getMobileNo());

        return shippingAddress;
    }
}
