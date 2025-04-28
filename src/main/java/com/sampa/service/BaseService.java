package com.sampa.service;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.transaction.annotation.Transactional;

/**
 * @param <T> Entity type
 * @param <K> Type of the primary key
 */
@Transactional(readOnly = true)
public abstract class BaseService<T, K> {

    protected final JpaRepository<T, K> repository;

    public BaseService(JpaRepository<T, K> repository) {
        this.repository = repository;
    }

    @Transactional
    public T save(T entity) {
        beforeSave(entity);
        T savedEntity = repository.save(entity);
        afterSave(savedEntity);
        return savedEntity;
    }

    protected void beforeSave(T entity) {
        validateEntity(entity);
    }

    protected void validateEntity(T entity) {
        if (entity == null || entity.toString().isEmpty()) {
            throw new IllegalArgumentException("Entity must not be null or empty");
        }
        try {
            Object id = entity.getClass().getMethod("getId").invoke(entity);
            if (id == null || id.toString().isEmpty()) {
                throw new IllegalArgumentException("Entity ID must not be null or empty");
            }
        } catch (Exception e) {
            throw new RuntimeException("Failed to get ID from entity", e);
        }
    }

    protected void afterSave(T entity) {
        try {
            Object id = entity.getClass().getMethod("getId").invoke(entity);
        } catch (Exception e) {
            throw new RuntimeException("Failed to get ID from entity", e);
        }
    }
}
