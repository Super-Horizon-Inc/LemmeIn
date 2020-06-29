package com.super_horizon.lemmein.models.repositories;

import java.util.List;
import org.bson.Document;

public interface IRepository<T> {
    // List<Document> query(String documentName, String queryString);
    List<T> findOrCreate(String documentName, Document query);
}