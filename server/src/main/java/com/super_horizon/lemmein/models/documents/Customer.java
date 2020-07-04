package com.super_horizon.lemmein.models.documents;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import java.util.*;

@Document(collection = "customers")
public class Customer {
    
    @Id
    private String id;

    private String phoneNumber;
    private String email;
    private String dob;
    private String firstName;
    private String lastName;

    public Customer() {};

    public Customer(Map<String, String> params) {
        this.phoneNumber = params.get("phoneNumber");
        this.email = params.get("email");
    }

    public String getId() {
        return this.id;
    }

    public void setPhoneNumber(final String phoneNumber) {
        this.phoneNumber = phoneNumber;
    }

    public String getPhoneNumber() {
        return this.phoneNumber;
    } 

    public void setEmail(final String email) {
        this.email = email;
    }

    public String getEmail() {
        return this.email;
    } 

    public void setDOB(final String dob) {
        this.dob = dob;
    }

    public String getDOB() {
        return this.dob;
    } 

    public void setFirstName(final String firstName) {
        this.firstName = firstName;
    }

    public String getFirstName() {
        return this.firstName;
    } 
    
    public void setLastName(final String lastName) {
        this.lastName = lastName;
    }

    public String getLastName() {
        return this.lastName;
    } 
    
}