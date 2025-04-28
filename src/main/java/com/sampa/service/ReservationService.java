package com.sampa.service;

import com.sampa.entity.Reservation;
import com.sampa.repository.ReservationRepository;
import org.springframework.stereotype.Service;

@Service
public class ReservationService extends BaseService<Reservation, Long> {

    private final ReservationRepository reservationRepository;

    public ReservationService(ReservationRepository reservationRepository) {
        super(reservationRepository);
        this.reservationRepository = reservationRepository;
    }
}
