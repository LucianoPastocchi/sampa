package com.sampa.model;

import com.sampa.entity.Pet;
import com.sampa.entity.SampaUser;
import lombok.Data;

import java.util.List;

@Data
public class TransitHomeModel {

    private SampaUser homeOwner;

    private String description;

    private String address;

    private Double latitude;

    private Double longitude;

    private Integer capacity;

    private List<Pet> petsHistory;

}
