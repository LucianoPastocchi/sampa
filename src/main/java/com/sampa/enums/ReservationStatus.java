package com.sampa.enums;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public enum ReservationStatus {

    PENDING("01", "Pending approval"),
    ACCEPTED("02", "Accepted"),
    REJECTED("03", "Rejected"),
    CANCELLED("04", "Cancelled"),
    COMPLETED("05", "Completed");

    private final String description;
    private final String code;

}
