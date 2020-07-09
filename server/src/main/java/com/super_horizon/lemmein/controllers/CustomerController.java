package com.super_horizon.lemmein.controllers;

import java.util.*;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.*;
import org.springframework.web.bind.annotation.*;
import com.super_horizon.lemmein.models.documents.Customer;
import com.super_horizon.lemmein.services.CustomerService;
import com.super_horizon.lemmein.services.EmailService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.PathVariable;

@RestController
@RequestMapping("/lemmein/customers")
public class CustomerController {

    @Autowired
    private CustomerService customerService;

    @Autowired
    private EmailService emailService;

    @PostMapping
    public ResponseEntity<List<Customer>> showOrAdd(@RequestBody Map<String, String> query) {
        try {

            List<Customer> customers = customerService.showOrAdd(query);
            Customer customer = customers.get(0);

            if (customer.getIsNew() && customer.getEmail() != null) {
                emailService.sendEmail(customer.getEmail(), customer.getId());
            }

            return new ResponseEntity<> (customers, HttpStatus.CREATED);

        }
        catch (Exception ex) {
            return new ResponseEntity<> (null, HttpStatus.EXPECTATION_FAILED);
        }
    }

    @GetMapping(value="/{id}/edit")
    public ResponseEntity<Customer> edit(@PathVariable String id) {

        try {
            Customer _customer = customerService.edit(id);
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
    public ResponseEntity<Customer> update(@PathVariable String id, @RequestBody Customer customer) {
        try {
            Customer _customer = customerService.update(id, customer);
            return new ResponseEntity<> (_customer, HttpStatus.OK);
        }
        catch (Exception e) {
            return new ResponseEntity<> (null, HttpStatus.EXPECTATION_FAILED);
        }       
    }

    @PostMapping(value="/email")
    public String sendEmail(@RequestBody Customer customer) {
        
        if (!Objects.isNull(customer)) {
            emailService.sendEmail(customer.getEmail(), customer.getId());
            return "Email was sent successfully.";
        }
        return "Customer does not exist.";
    }
    
}