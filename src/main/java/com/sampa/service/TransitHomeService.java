package com.sampa.service;

import com.sampa.entity.TransitHome;
import com.sampa.exception.SampaException;
import com.sampa.model.TransitHomeModel;
import com.sampa.repository.TransitHomeRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

@Slf4j
@Service
public class TransitHomeService extends BaseService<TransitHome, Long> {

    private final TransitHomeRepository transitHomeRepository;
    private final LocationService locationService;

    public TransitHomeService(TransitHomeRepository transitHomeRepository, LocationService locationService) {
        super(transitHomeRepository);
        this.transitHomeRepository = transitHomeRepository;
        this.locationService = locationService;
    }

    public void setGeoLocation(TransitHomeModel home) throws SampaException {

        double[] coordinates = locationService.geocodeAddress(home.getAddress());
        home.setLatitude(coordinates[0]);
        home.setLongitude(coordinates[1]);

    }

}
