package com.sampa.repository;

import com.sampa.entity.SampaUser;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;

import java.util.Optional;

public interface SampaUserRepository extends JpaRepository<SampaUser, Long>, JpaSpecificationExecutor<SampaUser> {
    void deleteByUsername(String username);

    Optional<SampaUser> findByUserName(String username);
}
