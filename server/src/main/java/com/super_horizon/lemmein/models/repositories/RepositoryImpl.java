package com.super_horizon.lemmein.models.repositories;

import java.util.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.bson.Document;
import com.mongodb.client.*;
import com.super_horizon.lemmein.models.documents.Customer;
import java.lang.reflect.ParameterizedType;
import org.springframework.data.mongodb.core.query.*;

// import org.json.simple.JSONObject;
// import org.json.simple.parser.JSONParser;
// import com.super_horizon.lemmein.models.documents.*;

public class RepositoryImpl<T> implements IRepository<T> {

    private final MongoTemplate mongoTemplate;
    private Class<T> documentClass;

    //@Autowired
    public RepositoryImpl(MongoTemplate mongoTemplate, Class<T> type) {
        this.documentClass = type;
        this.mongoTemplate = mongoTemplate;
    }

    @Override
    public List<T> findOrCreate(String documentName, Document dynamiQuery) {
        try {    
            
            Query queryDocument = new Query();
            List<Criteria> criteria = new ArrayList<>();    
            List<T> result = new ArrayList<>();

            if (this.mongoTemplate.collectionExists(documentName)) {
                
                // generate query to run it against db 
                for (Map.Entry<String, Object> entry : dynamiQuery.entrySet()) {
                    String property = (String) entry.getKey();
                    String value = (String) entry.getValue();
                    criteria.add(Criteria.where(property).is(value));
                }

                queryDocument.addCriteria(new Criteria().andOperator(criteria.toArray(new Criteria[criteria.size()])));

                // get the collection from db and run the query
                // then add result into final list of documents
                List<T> collection = this.mongoTemplate.find(queryDocument, this.documentClass);

                 // if document does not exist, then create one
                if (collection == null) {

                    // Document document = new Document();
                    // for (Map.Entry<String, Object> entry : query.entrySet()) {
                    //     String property = (String) entry.getKey();
                    //     String value = (String) entry.getValue();
                    //     document.put(property, value);
                    // }
                    
                    // Document savedDocument = this.mongoTemplate.save(document);
                    
                    // result.add(savedDocument);

                }
                    // else {
                        
                    //     for (Document document : iterable) {
                    //         result.add(document);
                    //     }

                    // }

                

            }

            return result;

           // throw new Exception("collection does not exist");

        } 
        catch (Exception e) {
            return null;
        }
    }

    // @Override
    // public List<Document> findOrCreate(String documentName, String queryString) {

    //     try {

    //         if ("customers".equals(documentName)) {

    //             List<Document> result = this.query(documentName, queryString);
    
    //             if (result.isEmpty()) {
    
    //                 // parse json and create a customer based on passed query string
    //                 JSONObject jsonObject = (JSONObject) new JSONParser().parse(queryString);
    //                 if(!jsonObject.isEmpty()) {
    
    //                     Customer customer = new Customer();
    
    //                     for(Object key : jsonObject.keySet()) {
    //                         String attribute = (String) key;
    //                         if("phoneNumber".equals(attribute)) {
    //                             customer.setPhoneNumber((String)jsonObject.get(attribute));
    //                         }
    //                         else {
    //                             customer.setEmail((String)jsonObject.get(attribute));
    //                         }
    //                     }
    
    //                     this.mongoTemplate.save(customer);


    
    //                 }
                    
    //             }

    //         }

    //     }
    //     catch (ParseException e) {
    //         e.printStackTrace();
    //     }

    // }
}