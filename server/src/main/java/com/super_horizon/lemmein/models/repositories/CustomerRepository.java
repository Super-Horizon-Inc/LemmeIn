package com.super_horizon.lemmein.models.repositories;

import com.super_horizon.lemmein.models.documents.Customer;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CustomerRepository extends MongoRepository<Customer, String>, IRepository<Customer> {

}