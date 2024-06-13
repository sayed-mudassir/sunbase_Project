package com.example.Sunbase.service;

import com.example.Sunbase.model.Customer;

import java.util.List;

public interface CustomerService {
    public Customer createCustomer(Customer customer);
    public List<Customer> getAllCustomer();
    public Customer updateCustomer(int id, Customer updatecustomer);
    public Customer getCustomerById(int id);
    public String deleteCustomer(int id);
}
