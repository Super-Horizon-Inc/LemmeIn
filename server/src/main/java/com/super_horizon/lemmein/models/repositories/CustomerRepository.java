package com.super_horizon.lemmein.models.repositories;

import java.util.List;
import com.super_horizon.lemmein.models.documents.Customer;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CustomerRepository extends MongoRepository<Customer, String>, IRepository<Customer> {

    List<Customer> findByPhoneNumber(String phoneNumber);

    List<Customer> findByEmail(String email);

}