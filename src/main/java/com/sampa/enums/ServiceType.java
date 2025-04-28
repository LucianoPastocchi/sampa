package com.sampa.enums;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public enum ServiceType {

    WALK("01", "Walk"),
    TRANSIT_HOME("02", "Transit home"),
    PET_SITTING("03", "Pet sitting");


    private final String code;
    private final String description;
}
