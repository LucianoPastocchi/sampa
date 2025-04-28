package com.sampa.service;

import com.sampa.entity.Pet;
import com.sampa.repository.PetRepository;
import org.springframework.stereotype.Service;

@Service
public class PetService extends BaseService<Pet, Long> {

    private final PetRepository petRepository;

    public PetService(PetRepository petRepository) {
        super(petRepository);
        this.petRepository = petRepository;
    }
}
