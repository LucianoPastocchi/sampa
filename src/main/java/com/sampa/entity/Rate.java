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
@Table(name = "RATE")
public class Rate {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    private SampaUser author;

    @ManyToOne
    private SampaUser receiver;

    @Column(nullable = false)
    private Integer rating;

    @Column(length = 500)
    private String comment;

    private LocalDate date;

}
