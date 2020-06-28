package com.super_horizon.lemmein.model.document;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "customers")
public class Customer {
    
    @Id
    private String id;

    private String phoneNumer;
    private String email;
    private String dob;
    private String firstName;
    private String lastName;

    public void setPhoneNumber(final String phoneNumber) {
        this.phoneNumer = phoneNumber;
    }

    public String getPhoneNumber() {
        return this.phoneNumer;
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