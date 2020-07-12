package com.super_horizon.lemmein.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.super_horizon.lemmein.models.repositories.CustomerRepository;
import com.super_horizon.lemmein.models.documents.*;
import java.util.*;

@Service
public class CustomerService {

    @Autowired
    private CustomerRepository customerRepository;

    public List<Customer> showOrAdd(Map<String, String> query) {

        try {
            List<Customer> customers = customerRepository.findOrCreate(query);
            return customers;
        }
        catch (Exception ex) {
            return new ArrayList<Customer>();
        }        
    }

    public Customer findById(String id) {

        Customer _customer = customerRepository.findById(id).get();

        if (!Objects.isNull(_customer)) {
            return _customer;
        }

        throw new NullPointerException();       
    }

    public Customer update(String id, Customer customer) {

        Customer _customer = this.findById(id);

        if (!"".equals(customer.getPhoneNumber()) ) {
            _customer.setPhoneNumber(customer.getPhoneNumber());
        }
        else {
            _customer.setEmail(customer.getEmail());
        }

        _customer.setDOB(customer.getDOB());
        _customer.setFirstName(customer.getFirstName());
        _customer.setLastName(customer.getLastName());

        customerRepository.save(_customer);

        return _customer;
    }

    public List<Customer> searchAll() {

        List<Customer> customers = customerRepository.findAll();
        
        if (!customers.isEmpty()) {
            return customers;
        }

        throw new NullPointerException();
    }

}