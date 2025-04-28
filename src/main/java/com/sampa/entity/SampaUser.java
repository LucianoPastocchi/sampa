package com.sampa.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.Setter;
import lombok.ToString;

import java.util.List;

@Entity
@Getter
@Setter
@ToString
@RequiredArgsConstructor
@Table(name = "SAMPA_USER")
public class SampaUser {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String idCard;

    private String name;

    private String lastname;

    private String email;

    private String password;

    private String role; // owner, walker, admin

    private String phone;

    private String address;

    @OneToMany(mappedBy = "owner")
    @ToString.Exclude
    private List<Pet> pets;

}
