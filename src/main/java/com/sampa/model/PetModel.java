package com.sampa.model;

import com.sampa.entity.SampaUser;
import com.sampa.enums.Species;
import lombok.Data;

@Data
public class PetModel {

    private String name;

    private Species species;

    private String breed;

    private Integer age;

    private Double weight;

    private String observations;

    private SampaUser owner;

}
