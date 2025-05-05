package com.sampa.service;

import com.sampa.exception.SampaException;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.transaction.annotation.Transactional;

/**
 * @param <T> Entity type
 * @param <K> Type of the primary key
 */
@Slf4j
public abstract class BaseService<T, K> {

    protected final JpaRepository<T, K> repository;

    protected BaseService(JpaRepository<T, K> repository) {
        this.repository = repository;
    }

    @Transactional
    public T save(T entity) throws SampaException {
        beforeSave(entity);
        T savedEntity = repository.save(entity);
        afterSave(savedEntity);
        return savedEntity;
    }

    protected void beforeSave(T entity) throws SampaException {
        validateEntity(entity);
    }

    protected void validateEntity(T entity) throws SampaException {
        if (entity == null || entity.toString().isEmpty()) {
            throw new IllegalArgumentException("Entity must not be null or empty");
        }
        try {
            Object id = entity.getClass().getMethod("getId").invoke(entity);
            if (id == null || id.toString().isEmpty()) {
                throw new IllegalArgumentException("Entity ID must not be null or empty");
            }
        } catch (Exception e) {
            throw new SampaException("Failed to get ID from entity", e);
        }
    }

    protected void afterSave(T entity) throws SampaException {
        try {
            Object id = entity.getClass().getMethod("getId").invoke(entity);
            log.info("Saved entity {} with ID : {}", entity.getClass().getSimpleName(), id);
        } catch (Exception e) {
            throw new SampaException("Failed to get ID from entity", e);
        }
    }
}
