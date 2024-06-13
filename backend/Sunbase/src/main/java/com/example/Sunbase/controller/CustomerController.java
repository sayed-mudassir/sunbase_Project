package com.example.Sunbase.controller;

import com.example.Sunbase.model.Customer;
import com.example.Sunbase.service.CustomerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/customers")
public class CustomerController {
    final CustomerService customerService;

    @Autowired
    public CustomerController(CustomerService customerService) {
        this.customerService = customerService;
    }

    @GetMapping("/get/{id}")
    public ResponseEntity getCustomerById(@PathVariable("id") int id){
        try {
            Customer customer = customerService.getCustomerById(id);
            return new ResponseEntity(customer,HttpStatus.ACCEPTED);
        }
        catch (Exception e){
            return new ResponseEntity(e.getMessage(),HttpStatus.BAD_REQUEST);
        }
    }

    @PostMapping("/add")
    public ResponseEntity<Customer> createCustomer(@RequestBody Customer customer) {
        return new ResponseEntity<>(customerService.createCustomer(customer), HttpStatus.CREATED);
    }



    @PutMapping("/update/{id}")
    public ResponseEntity updateCustomer (@PathVariable("id") int id, @RequestBody Customer customer){
        try {
            Customer customer1 = customerService.updateCustomer(id,customer);
            return new ResponseEntity(customer1,HttpStatus.ACCEPTED);
        }
        catch (Exception e){
            return new ResponseEntity(e.getMessage(),HttpStatus.BAD_REQUEST);
        }
    }
    
    @GetMapping("/getAll")
    public ResponseEntity getAllCustomer(){
        return new ResponseEntity<>(customerService.getAllCustomer(),HttpStatus.OK);
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity deleteCustomer(@PathVariable("id") int id){
        try {
            return new ResponseEntity(customerService.deleteCustomer(id),HttpStatus.ACCEPTED);
        }
        catch (Exception e){
            return new ResponseEntity(e.getMessage(),HttpStatus.BAD_REQUEST);
        }
    }

}
