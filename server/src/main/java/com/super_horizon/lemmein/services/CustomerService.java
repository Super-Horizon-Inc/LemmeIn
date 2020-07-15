package com.super_horizon.lemmein.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.super_horizon.lemmein.models.repositories.CustomerRepository;
import com.super_horizon.lemmein.models.documents.*;
import java.util.*;
import java.time.LocalDate;

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

    public Customer update(Customer customer) {

        Customer _customer = this.findById(customer.getId());
          
        String phoneNumberForm = customer.getPhoneNumber();
        String phoneNumber = phoneNumberForm.length() > 14 ? phoneNumberForm.split("\\+1 ")[1] : phoneNumberForm;

        _customer.setPhoneNumber(phoneNumber);   
        _customer.setEmail(customer.getEmail());

        if (customer.getDob().contains("-")) {
            LocalDate dob = LocalDate.parse(customer.getDob());
            String dobString = dob.getMonth() + " " + dob.getDayOfMonth() + ", " + dob.getYear();
            _customer.setDob(dobString);
        }
        else {
            _customer.setDob(customer.getDob());
        }

        _customer.setFirstName(customer.getFirstName());
        _customer.setLastName(customer.getLastName());

        if (!_customer.getIsUpdated()) {
            _customer.setVisitCounter(_customer.getVisitCounter()+1);
        }
        
        _customer.setIsUpdated(true);

        this.save(_customer);

        return _customer;
    }

    public List<Customer> searchAll() {

        List<Customer> customers = customerRepository.findAll();
        
        if (!customers.isEmpty()) {
            return customers;
        }

        throw new NullPointerException();
    }

    public void save(Customer customer) {
        customerRepository.save(customer);
    }

}