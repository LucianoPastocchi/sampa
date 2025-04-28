package com.sampa.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.Setter;
import lombok.ToString;

import java.time.LocalDate;

@Entity
@Getter
@Setter
@ToString
@RequiredArgsConstructor
@Table(name = "PET")
public class Pet {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(length = 100, nullable = false)
    private String name;

    @Column(nullable = false)
    private String species;

    @Column(length = 50, nullable = false)
    private String breed;

    @Column(nullable = false)
    private LocalDate birth;

    private Integer age;

    @Column(nullable = false)
    private Double weight;

    @Column(name = "additional_info", length = 500)
    private String additionalInfo;

    @ManyToOne
    private SampaUser owner;

}
