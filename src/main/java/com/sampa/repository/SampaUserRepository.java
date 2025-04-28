package com.sampa.repository;

import com.sampa.entity.SampaUser;
import org.springframework.data.jpa.repository.JpaRepository;

public interface SampaUserRepository extends JpaRepository<SampaUser, Long> {
}