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
public class TransitHome {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    private User homeOwner;

    private String description;

    //TODO - VER COMO GUARDAR LA LOCACION
    private String location;

    private Integer capacity;

    @OneToMany
    @ToString.Exclude
    private List<Pet> petsHistory;
}
