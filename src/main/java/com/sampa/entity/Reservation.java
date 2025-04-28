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

    @JoinColumn(nullable = false)
    @ManyToOne
    private SampaUser owner;

    @JoinColumn(nullable = false)
    @ManyToOne
    private Service service;

    @Column(name = "from_date")
    private LocalDate fromDate;

    @Column(name = "to_date")
    private LocalDate toDate;

    @Column(name = "from_time")
    private LocalTime fromTime;

    @Column(name = "to_date")
    private LocalTime toTime;

    private String status; // PENDIENTE, ACEPTADA, CANCELADA, FINALIZADA
}
