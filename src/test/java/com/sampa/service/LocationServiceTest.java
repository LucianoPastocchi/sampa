package com.sampa.service;

import okhttp3.*;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.*;

class LocationServiceTest {

    private LocationService locationService;

    @BeforeEach
    void setup() {
        locationService = new LocationService();

        locationService.setMapboxToken("pk.eyJ1IjoiZGFuaXBhc3RvY2NoaSIsImEiOiJjbWFmeHM3OTgwN3E1Mm1xNWczaGM4YWhuIn0.MHW0X8pEoalzPRoIFB6cGw");
        locationService.setMapboxUrl("https://api.mapbox.com/geocoding/v5/mapbox.places/");
    }

    @Test
    void testGeocodeAddress_Success() throws Exception {
        String sampleJsonResponse = """
                {
                  "type": "FeatureCollection",
                  "features": [
                    {
                      "center": [-58.384655, 34.595755]
                    }
                  ]
                }
                """;

        OkHttpClient mockClient = mock(OkHttpClient.class);
        Call mockCall = mock(Call.class);
        Response mockResponse = mock(Response.class);
        ResponseBody mockBody = mock(ResponseBody.class);

        when(mockClient.newCall(any(Request.class))).thenReturn(mockCall);
        when(mockCall.execute()).thenReturn(mockResponse);
        when(mockResponse.isSuccessful()).thenReturn(true);
        when(mockResponse.body()).thenReturn(mockBody);
        when(mockBody.string()).thenReturn(sampleJsonResponse);

        String address = "Av. Santa Fe 1234, Buenos Aires, Argentina";
        double[] result = locationService.geocodeAddress(address);

        assertEquals(-34.595755, result[0], 0.0001); // lat
        assertEquals(-58.384655, result[1], 0.0001); // lng
    }
}

