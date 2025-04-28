package com.sampa.enums;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public enum Species {

    DOG("Dog"),
    CAT("Cat");

    private final String type;
}
