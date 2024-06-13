package com.example.Sunbase.Auth;

import com.example.Sunbase.model.Customer;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class ApiController {

    @Autowired
    private ApiService apiService;

    @GetMapping("/customers")
    public Customer[] getCustomers() {
        return apiService.getCustomerList();
    }
}
