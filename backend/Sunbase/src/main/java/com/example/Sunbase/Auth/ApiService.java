package com.example.Sunbase.Auth;

import com.example.Sunbase.model.Customer;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

@Service
public class ApiService {
    private static final String CUSTOMER_LIST_URL = "https://qa.sunbasedata.com/sunbase/portal/api/assignment.jsp?cmd=get_customer_list";

    @Autowired
    private AuthService authService;

    public Customer[] getCustomerList() {
        String token = authService.authenticate();
        RestTemplate restTemplate = new RestTemplate();
        HttpHeaders headers = new HttpHeaders();
        headers.set("Authorization", "Bearer " + token);

        HttpEntity<String> entity = new HttpEntity<>(headers);
        ResponseEntity<Customer[]> response = restTemplate.exchange(CUSTOMER_LIST_URL, HttpMethod.GET, entity, Customer[].class);

        return response.getBody();
    }
}

