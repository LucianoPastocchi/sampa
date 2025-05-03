package com.sampa.model;

import com.sampa.enums.Role;
import lombok.Data;

import java.util.List;

@Data
public class SampaUserModel {

    private String idCard;

    private String name;

    private String lastname;

    private String email;

    private String password;

    private Role role;

    private String phone;

    private String address;

    private List<Long> petIds;
}
