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

    @Column(name = "id_card", length = 50, nullable = false)
    private String idCard;

    @Column(columnDefinition = "text", nullable = false)
    private String name;

    @Column(columnDefinition = "text", nullable = false)
    private String lastname;

    @Column(columnDefinition = "text", nullable = false)
    private String email;

    @Column(nullable = false)
    @Lob
    private String password;

    private String role;

    private String phone;

    @Column(columnDefinition = "text")
    private String address;

    @OneToMany(mappedBy = "owner")
    @ToString.Exclude
    private List<Pet> pets;

}
