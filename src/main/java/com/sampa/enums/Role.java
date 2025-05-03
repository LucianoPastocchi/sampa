package com.sampa.enums;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public enum Role {

    ADMIN("00", "Administrator"),
    DOG_WALKER("01", "Dog walker"),
    PET_OWNER("02", "Pet owner");
    
    private final String code;
    private final String description;
}
