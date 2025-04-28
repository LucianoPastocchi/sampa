package com.sampa.service;

import com.sampa.entity.TransitHome;
import com.sampa.repository.TransitHomeRepository;
import org.springframework.stereotype.Service;

@Service
public class TransitHomeService extends BaseService<TransitHome, Long> {

    private final TransitHomeRepository transitHomeRepository;

    public TransitHomeService(TransitHomeRepository transitHomeRepository) {
        super(transitHomeRepository);
        this.transitHomeRepository = transitHomeRepository;
    }
}
