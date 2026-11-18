
package com.imagine_AI.server;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

@Service
public class ImageService {

    @Value("${cloudinary.cloud-name}")
    private String cloudName;

    @Value("${cloudinary.api-key}")
    private String apiKey;

    @Value("${cloudinary.api-secret}")
    private String apiSecret;

    public String generateImage(String prompt) {

        String url = "https://api.cloudinary.com/v2/generate/"
                + cloudName + "/text_to_image";

        RestTemplate restTemplate = new RestTemplate();

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);
        headers.setBasicAuth(apiKey, apiSecret);

        Map<String, Object> body = Map.of(
                "prompt", prompt,
                "model", Map.of("mode", "auto"),
                "target", Map.of("target_type", "managed_asset")
        );

        HttpEntity<Map<String, Object>> request =
                new HttpEntity<>(body, headers);

        Map<?, ?> response = restTemplate.exchange(
                url,
                HttpMethod.POST,
                request,
                Map.class
        ).getBody();

        if (response == null) {
            throw new RuntimeException("Empty response from Cloudinary");
        }

        Map<?, ?> data = (Map<?, ?>) response.get("data");

        if (data == null) {
            throw new RuntimeException("Image data not found");
        }

        List<?> assets = (List<?>) data.get("assets");

        if (assets == null || assets.isEmpty()) {
            throw new RuntimeException("No generated image found");
        }

        Map<?, ?> firstAsset = (Map<?, ?>) assets.get(0);

        Map<?, ?> storage =
                (Map<?, ?>) firstAsset.get("storage");

        if (storage == null) {
            throw new RuntimeException("Image storage information missing");
        }

        String imageUrl = (String) storage.get("secure_url");

        if (imageUrl == null || imageUrl.isBlank()) {
            throw new RuntimeException("Image URL not found");
        }

        return imageUrl;
    }
}
