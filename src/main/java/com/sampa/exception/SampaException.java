package com.sampa.exception;

import java.io.Serial;

public class SampaException extends Exception {

    @Serial
    private static final long serialVersionUID = 7459725648935850303L;

    public SampaException(String message, Exception e) {
        super(message, e);
    }

    public SampaException(String message) {
        super(message);
    }
}
