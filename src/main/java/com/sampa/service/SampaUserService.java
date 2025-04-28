package com.sampa.service;

import com.sampa.entity.SampaUser;
import com.sampa.repository.SampaUserRepository;
import org.springframework.stereotype.Service;

@Service
public class SampaUserService extends BaseService<SampaUser, Long> {

    private final SampaUserRepository sampaUserRepository;

    public SampaUserService(SampaUserRepository sampaUserRepository) {
        super(sampaUserRepository);
        this.sampaUserRepository = sampaUserRepository;
    }
}
