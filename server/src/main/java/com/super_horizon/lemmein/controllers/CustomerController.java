package com.super_horizon.lemmein.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.*;
import org.springframework.web.bind.annotation.*;
import com.super_horizon.lemmein.models.documents.Customer;
import com.super_horizon.lemmein.models.repositories.CustomerRepository;
import org.springframework.http.ResponseEntity;
import java.util.*;
import org.bson.Document;

@RestController
@RequestMapping("/lemmein/customers")
public class CustomerController {

    @Autowired
    CustomerRepository customerRepository;

    //@GetMapping("/{queryString}")
    @PostMapping
    public ResponseEntity<List<Customer>> findOrCreate(@RequestBody Document query) {
        try {
            List<Document> documents = customerRepository.findOrCreate("customers", query);
            List<Customer> customers = new ArrayList<>();

            // using for-each loop for iteration over returned documents
            // and convert each to a customer object
            for (Document document : documents) {
                Customer customer = new Customer();
                for (Map.Entry<String, Object> entry : document.entrySet()) {
                    switch(entry.getKey()) {
                        case "id" : {

                            break;
                        }
                        case "phoneNumber" : {
                            customer.setPhoneNumber((String)entry.getValue());
                            break;
                        }
                        case "email" : {
                            customer.setEmail((String)entry.getValue());
                            break;
                        }
                        case "dob" : {
                            customer.setDOB((String)entry.getValue());
                            break;
                        }
                        case "firstName" : {
                            customer.setFirstName((String)entry.getValue());
                            break;
                        }
                        case "lastName" : {
                            customer.setLastName((String)entry.getValue());
                            break;
                        }
                    }
                }
                customers.add(customer);
            }

            if (customers.isEmpty()) {
                return new ResponseEntity<> (null, HttpStatus.EXPECTATION_FAILED);
            }

            return new ResponseEntity<> (customers, HttpStatus.CREATED);

        }
        catch (Exception ex) {
            System.out.println(query);
            return new ResponseEntity<> (null, HttpStatus.EXPECTATION_FAILED);
        }
    }

    // @GetMapping
    // public ResponseEntity<List<Customer>> findCustomers(@RequestParam(required = false) String phoneNumber, 
    //                                                     @RequestParam(required = false) String email) 
    // {
    //     try {
    //         List<Customer> customers = new ArrayList<Customer>();

    //         if (phoneNumber == null && email == null) {
    //             customerRepository.findAll().forEach(customers::add);
    //         }
    //         else if (email == null) {
    //             customerRepository.findByPhoneNumber(phoneNumber).forEach(customers::add);
    //         }
    //         else {
    //             customerRepository.findByEmail(email).forEach(customers::add);
    //         }

    //         if (customers.isEmpty()) {
    //             return new ResponseEntity<> (HttpStatus.NO_CONTENT);
    //         }
    //         return new ResponseEntity<> (customers, HttpStatus.OK);
    //     }
    //     catch (Exception ex) {
    //         return new ResponseEntity<> (HttpStatus.INTERNAL_SERVER_ERROR);
    //     }
    // }
    
}