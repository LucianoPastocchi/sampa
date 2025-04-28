package com.sampa.model;

import com.sampa.entity.Product;
import com.sampa.entity.SampaUser;
import com.sampa.enums.ReservationStatus;
import lombok.Data;

import java.time.LocalDate;
import java.time.LocalTime;

@Data
public class ReservationModel {

    private SampaUser owner;

    private Product service;

    private LocalDate fromDate;

    private LocalDate toDate;

    private LocalTime fromTime;

    private LocalTime toTime;

    private ReservationStatus status;
}
