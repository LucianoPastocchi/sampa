package com.sampa.model;

import com.sampa.entity.SampaUser;
import com.sampa.enums.ServiceType;
import lombok.Data;

@Data
public class ServiceModel {

    private ServiceType type;

    private String description;

    private Double pricePerHour;

    private SampaUser provider;
}
