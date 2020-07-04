package com.super_horizon.lemmein.controllers;

import java.util.*;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.*;
import org.springframework.web.bind.annotation.*;
import com.super_horizon.lemmein.models.documents.Customer;
import com.super_horizon.lemmein.services.CustomerService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.PathVariable;

@RestController
@RequestMapping("/lemmein/customers")
public class CustomerController {

    @Autowired
    private CustomerService customerService;

    @PostMapping
    public ResponseEntity<List<Customer>> searchOrAdd(@RequestBody Map<String, String> query) {
        try {

            List<Customer> customers = customerService.searchOrAdd(query);

            if (customers.isEmpty()) {
                return new ResponseEntity<> (null, HttpStatus.EXPECTATION_FAILED);
            }

            return new ResponseEntity<> (customers, HttpStatus.CREATED);

        }
        catch (Exception ex) {
            return new ResponseEntity<> (null, HttpStatus.EXPECTATION_FAILED);
        }
    }

    @GetMapping(value="/{id}")
    public ResponseEntity<Customer> searchById(@PathVariable String id) {

        try {
            Customer _customer = customerService.searchById(id);
            return new ResponseEntity<> (_customer, HttpStatus.OK);
        }
        catch (Exception e) {
            return new ResponseEntity<> (null, HttpStatus.EXPECTATION_FAILED);
        }
    }

    @GetMapping
    public ResponseEntity<List<Customer>> searchAll() {
        try {
            List<Customer> customers = customerService.searchAll();          
            return new ResponseEntity<> (customers, HttpStatus.OK);
        }
        catch (Exception ex) {
            return new ResponseEntity<> (null, HttpStatus.EXPECTATION_FAILED);
        }
    }

    @PutMapping(value="/{id}")
    public ResponseEntity<Customer> edit(@PathVariable String id, @RequestBody Customer customer) {
        try {
            Customer _customer = customerService.edit(id, customer);
            return new ResponseEntity<> (_customer, HttpStatus.OK);
        }
        catch (Exception e) {
            return new ResponseEntity<> (null, HttpStatus.EXPECTATION_FAILED);
        }
        
    }
    
}