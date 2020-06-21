package com.super_horizon.model.repository;

import java.util.List;

import com.super_horizon.model.collection.Customer;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

@RepositoryRestResource(collectionResourceRel = "customers", path = "customers")
public interface CustomerRepository extends MongoRepository<Customer, String> {

    List<Customer> findByPhoneNumber(@Param("phoneNumber") String phoneNumber);

    List<Customer> findByEmail(@Param("email") String email);

}