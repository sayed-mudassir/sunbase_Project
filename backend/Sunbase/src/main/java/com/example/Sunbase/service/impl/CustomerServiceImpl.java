package com.example.Sunbase.service.impl;

import com.example.Sunbase.Exception.CustomerNotFoundException;
import com.example.Sunbase.model.Customer;
import com.example.Sunbase.repository.CustomerRepository;
import com.example.Sunbase.service.CustomerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class CustomerServiceImpl implements CustomerService {

    final CustomerRepository customerRepository;

    @Autowired
    public CustomerServiceImpl(CustomerRepository customerRepository) {
        this.customerRepository = customerRepository;
    }

    @Override
    public Customer createCustomer(Customer customer) {
        Customer newCustromer = Customer.builder()
                .firstName(customer.getFirstName())
                .lastName(customer.getLastName())
                .state(customer.getState())
                .email(customer.getEmail())
                .phone(customer.getPhone())
                .city(customer.getCity())
                .address(customer.getAddress())
                .street(customer.getStreet())
                .build();
        return customerRepository.save(newCustromer);
    }

    @Override
    public List<Customer> getAllCustomer() {
        return customerRepository.findAll();
    }

    @Override
    public Customer updateCustomer(int id, Customer updatecustomer) {
        Optional<Customer> customerOptional = customerRepository.findById(id);
        if(!customerOptional.isPresent()) throw new CustomerNotFoundException("invalid customer id");
//        Customer customer = customerRepository.findById(id).get();
        customerOptional.get().setFirstName(updatecustomer.getFirstName());
        customerOptional.get().setLastName(updatecustomer.getLastName());
        customerOptional.get().setAddress(updatecustomer.getAddress());
        customerOptional.get().setCity(updatecustomer.getCity());
        customerOptional.get().setEmail(updatecustomer.getEmail());
        customerOptional.get().setState(updatecustomer.getState());
        customerOptional.get().setPhone(updatecustomer.getPhone());
        customerOptional.get().setStreet(updatecustomer.getStreet());
        return customerRepository.save(customerOptional.get());
    }

    @Override
    public Customer getCustomerById(int id) {
        Optional<Customer> customerOptional = customerRepository.findById(id);
        if(!customerOptional.isPresent()) throw new CustomerNotFoundException("invalid customer id");
        return customerRepository.findById(id).get();
    }

    @Override
    public String deleteCustomer(int id) {
        Optional<Customer> customerOptional = customerRepository.findById(id);
        if(!customerOptional.isPresent()) throw new CustomerNotFoundException("invalid customer id");
        customerRepository.delete(customerOptional.get());
        return "customer sucessfully deleted !!!!!!!!!!!";
    }
}
