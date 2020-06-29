package com.super_horizon.lemmein.models.repositories;

import com.super_horizon.lemmein.models.documents.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoTemplate;

public class CustomerRepositoryImpl extends RepositoryImpl<Customer> {

    private final MongoTemplate mongoTemplate;

    @Autowired
    public CustomerRepositoryImpl(MongoTemplate mongoTemplate) {
        super(mongoTemplate, Customer.class);
        this.mongoTemplate = mongoTemplate;
        
    }

}