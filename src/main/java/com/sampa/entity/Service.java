package com.sampa.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Entity
@Getter
@Setter
@ToString
@RequiredArgsConstructor
@Table(name = "SERVICE")
public class Service {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String type; // PASEO, CUIDADO, HOGAR_TRANSITO

    private String description;

    @Column(name = "price_per_hour", nullable = false)
    private Double pricePerHour;

    @JoinColumn(nullable = false)
    @ManyToOne
    private SampaUser provider;
}
