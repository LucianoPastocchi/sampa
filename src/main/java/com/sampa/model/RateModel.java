package com.sampa.model;

import com.sampa.entity.SampaUser;
import lombok.Data;

import java.time.LocalDate;

@Data
public class RateModel {

    private SampaUser author;

    private SampaUser receiver;

    private Integer rating;

    private String comment;

    private LocalDate date;
}
