package com.sampa.service;

import com.sampa.entity.Rate;
import com.sampa.repository.RateRepository;
import org.springframework.stereotype.Service;

@Service
public class RateService extends BaseService<Rate, Long> {

    private final RateRepository rateRepository;

    public RateService(RateRepository rateRepository) {
        super(rateRepository);
        this.rateRepository = rateRepository;
    }
}
