package com.sampa.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.Setter;
import lombok.ToString;

import java.time.LocalDate;
import java.time.LocalTime;

@Entity
@Getter
@Setter
@ToString
@RequiredArgsConstructor
@Table(name = "RESERVATION")
public class Reservation {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    private SampaUser owner;

    @ManyToOne
    private Service service;

    private LocalDate fromDate;

    private LocalDate toDate;

    private LocalTime fromTime;

    private LocalTime toTime;

    private String state; // PENDIENTE, ACEPTADA, CANCELADA, FINALIZADA
}
