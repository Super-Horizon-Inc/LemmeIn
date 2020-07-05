package com.super_horizon.lemmein.models.repositories;

import java.lang.reflect.InvocationTargetException;
import java.lang.reflect.Method;
import java.util.*;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.*;

public class RepositoryImpl<T> implements IRepository<T> {

    protected final MongoTemplate mongoTemplate;
    private Class<T> documentClass;

    public RepositoryImpl(MongoTemplate mongoTemplate, Class<T> type) {
        this.documentClass = type;
        this.mongoTemplate = mongoTemplate;
    }

    @Override
    public List<T> findOrCreate(Map<String, String> dynamicQuery) throws NoSuchMethodException, InstantiationException, IllegalAccessException, InvocationTargetException {
        
        List<T> result = new ArrayList<>();   
            
        Query queryDocument = new Query();
        List<Criteria> criteria = new ArrayList<>();    

        if (this.mongoTemplate.collectionExists(this.documentClass)) {

            // generate query to run it against db 
            for (Map.Entry<String, String> entry : dynamicQuery.entrySet()) {
                String property = (String) entry.getKey();
                String value = (String) entry.getValue();
                criteria.add(Criteria.where(property).is(value));
            }
            
            queryDocument.addCriteria(new Criteria().andOperator(criteria.toArray(new Criteria[criteria.size()])));

            // get the collection from db and run the query
            // then add result into final list of documents
            List<T> documents = this.mongoTemplate.find(queryDocument, this.documentClass);

                // if document does not exist, then create one
            if (documents.isEmpty()) {

                T obj = this.documentClass.getConstructor(Map.class).newInstance(dynamicQuery);                   
                T savedDocument = this.mongoTemplate.save(obj);                   
                result.add(savedDocument);

            }
            else {
                
                for (T document : documents) {
                    Method method = document.getClass().getMethod("setIsNew", Boolean.class);
                    method.invoke(document, false);
                    this.mongoTemplate.save(document);
                    result.add(document);
                }

            }

        }
        
        return result;
    }

}