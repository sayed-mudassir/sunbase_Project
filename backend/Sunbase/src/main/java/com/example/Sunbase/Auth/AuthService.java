package com.example.Sunbase.Auth;

import com.example.Sunbase.model.AuthResponse;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.HashMap;
import java.util.Map;

@Service
public class AuthService {
    private static final String AUTH_URL = "https://qa.sunbasedata.com/sunbase/portal/api/assignment_auth.jsp";

    public String authenticate() {
        RestTemplate restTemplate = new RestTemplate();
        Map<String, String> requestBody = new HashMap<>();
        requestBody.put("login_id", "test@sunbasedata.com");
        requestBody.put("password", "Test@123");

        AuthResponse authResponse = restTemplate.postForObject(AUTH_URL, requestBody, AuthResponse.class);
        return authResponse.getToken();
    }
}

