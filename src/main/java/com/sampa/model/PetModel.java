package com.sampa.model;

import com.sampa.entity.SampaUser;
import lombok.Data;

@Data
public class PetModel {

    private String name;

    //TODO - ENUM
    private String species;

    private String breed;

    private Integer age;

    private Double weight;

    private String observations;

    private SampaUser owner;

}
