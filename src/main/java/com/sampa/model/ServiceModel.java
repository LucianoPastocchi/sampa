package com.sampa.model;

import com.sampa.entity.SampaUser;
import lombok.Data;

@Data
public class ServiceModel {

    //TODO - ENUM
    private String type; // PASEO, CUIDADO, HOGAR_TRANSITO

    private String description;

    private Double pricePerHour;

    private SampaUser provider;
}
