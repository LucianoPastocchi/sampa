package com.sampa.repository;

import com.sampa.entity.SampaUser;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;

public interface SampaUserRepository extends JpaRepository<SampaUser, Long>, JpaSpecificationExecutor<SampaUser> {
}