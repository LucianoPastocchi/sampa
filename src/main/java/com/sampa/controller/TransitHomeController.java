package com.sampa.controller;

import com.sampa.entity.SampaUser;
import com.sampa.entity.TransitHome;
import com.sampa.exception.SampaException;
import com.sampa.model.TransitHomeModel;
import com.sampa.service.SampaUserService;
import com.sampa.service.TransitHomeService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/sampa/transit/home")
@RequiredArgsConstructor
public class TransitHomeController {

    private final TransitHomeService transitHomeService;
    private final SampaUserService sampaUserService;

    @PostMapping("/create")
    public ResponseEntity<Object> createTransitHome(@RequestBody TransitHomeModel transitHomeModel) {
        try {
            
            SampaUser user = sampaUserService.findById(transitHomeModel.getHomeOwner().getId())
                    .orElseThrow(() -> new SampaException("Usuario no encontrado"));

            TransitHome home = new TransitHome();
            home.setDescription(transitHomeModel.getDescription());
            home.setAddress(transitHomeModel.getAddress());
            transitHomeService.setGeoLocation(transitHomeModel);
            home.setCapacity(transitHomeModel.getCapacity());
            home.setHomeOwner(user);

            TransitHome saved = transitHomeService.save(home);
            return ResponseEntity.ok(saved);

        } catch (SampaException e) {
            return ResponseEntity.badRequest().body("Error al crear el hogar de tránsito: " + e.getMessage());
        }
    }
}

