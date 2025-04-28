package com.sampa.model;

import lombok.Data;

import java.util.List;

@Data
public class SampaUserModel {

    private String idCard;

    private String name;

    private String lastname;

    private String email;

    //TODO - ENUM
    private String role;

    private String phone;

    private String address;

    private List<Long> petIds;
}
