package com.super_horizon.lemmein.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;
import com.super_horizon.lemmein.models.documents.Customer;
import com.super_horizon.lemmein.models.repositories.CustomerRepository;
import org.springframework.http.ResponseEntity;
import java.util.*;

@RestController
@RequestMapping("/lemmein/customers")
public class CustomerController {

    @Autowired
    CustomerRepository customerRepository;

    @PostMapping(produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<Customer> save(@RequestBody Customer customer) {
        try {
            Customer _customer = customerRepository.save(customer);
            return new ResponseEntity<> (_customer, HttpStatus.CREATED);
        }
        catch (Exception ex) {
            return new ResponseEntity<> (null, HttpStatus.EXPECTATION_FAILED);
        }
    }

    @GetMapping(produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<List<Customer>> findCustomers(@RequestParam(required = false) String phoneNumber, 
                                                        @RequestParam(required = false) String email) 
    {
        try {
            List<Customer> customers = new ArrayList<Customer>();

            if (phoneNumber == null && email == null) {
                customerRepository.findAll().forEach(customers::add);
            }
            else if (email == null) {
                customerRepository.findByPhoneNumber(phoneNumber).forEach(customers::add);
            }
            else {
                customerRepository.findByEmail(email).forEach(customers::add);
            }

            if (customers.isEmpty()) {
                return new ResponseEntity<> (HttpStatus.NO_CONTENT);
            }
            return new ResponseEntity<> (customers, HttpStatus.OK);
        }
        catch (Exception ex) {
            return new ResponseEntity<> (HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @
    
}