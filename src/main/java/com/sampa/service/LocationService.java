package com.sampa.service;

import com.sampa.exception.SampaException;
import lombok.Data;
import lombok.extern.slf4j.Slf4j;
import okhttp3.OkHttpClient;
import okhttp3.Request;
import okhttp3.Response;
import org.json.JSONArray;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.net.URLEncoder;
import java.nio.charset.StandardCharsets;

@Slf4j
@Service
//TODO -SACAR
@Data
public class LocationService {

    @Value("${mapbox.token}")
    private String mapboxToken;

    @Value("${mapbox.url}")
    private String mapboxUrl;

    public double[] geocodeAddress(String address) throws SampaException {
        OkHttpClient client = new OkHttpClient();

        String encodedAddress = URLEncoder.encode(address, StandardCharsets.UTF_8);
        String url = mapboxUrl + encodedAddress + ".json?access_token=" + mapboxToken;

        Request request = new Request.Builder().url(url).build();

        try (Response response = client.newCall(request).execute()) {
            if (!response.isSuccessful()) throw new SampaException("Error en la petición: " + response);

            assert response.body() != null;
            String body = response.body().string();
            JSONObject json = new JSONObject(body);
            JSONArray features = json.getJSONArray("features");

            if (features.isEmpty()) {
                throw new SampaException("Dirección no encontrada.");
            }

            JSONArray center = features.getJSONObject(0).getJSONArray("center");
            double lng = center.getDouble(0);
            double lat = center.getDouble(1);

            return new double[]{lat, lng};
        } catch (IOException e) {
            throw new SampaException(e);
        }

    }
}
