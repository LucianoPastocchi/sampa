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
@Table(name = "TRANSIT_HOME")
public class TransitHome {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @JoinColumn(nullable = false)
    @ManyToOne
    private SampaUser homeOwner;

    private String description;

    private String address;

    private Double latitude;

    private Double longitude;

    @JoinColumn(nullable = false)
    private Integer capacity;

    @OneToMany
    @ToString.Exclude
    private List<Pet> petsHistory;
}
