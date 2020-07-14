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
    private Boolean isNew;
    private Boolean isUpdated;
    private int visitCounter;

    public Customer() {};

    public Customer(Map<String, String> params) {
        this.phoneNumber = params.get("phoneNumber");
        this.email = params.get("email");
        this.isNew = true;
        this.isUpdated = false;
        this.visitCounter = 0;
    }

    public String getId() {
        return this.id;
    }

    public void setPhoneNumber(String phoneNumber) {
        this.phoneNumber = phoneNumber;
    }

    public String getPhoneNumber() {
        return this.phoneNumber;
    } 

    public void setEmail(String email) {
        this.email = email;
    }

    public String getEmail() {
        return this.email;
    } 

    public void setDob(String dob) {
        this.dob = dob;
    }

    public String getDob() {
        return this.dob;
    } 

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public String getFirstName() {
        return this.firstName;
    } 
    
    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    public String getLastName() {
        return this.lastName;
    } 

    public void setIsNew(Boolean isNew) {
        this.isNew = isNew;
    }

    public Boolean getIsNew() {
        return this.isNew;
    }

    public void setIsUpdated(Boolean isUpdated) {
        this.isUpdated = isUpdated;
    }

    public Boolean getIsUpdated() {
        return this.isUpdated;
    }

    public void setVisitCounter(int visitCounter) {
        this.visitCounter = visitCounter;
    }

    public int getVisitCounter() {
        return this.visitCounter;
    }
    
}