package com.imagine_AI.server.service;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.stereotype.Service;

import java.net.URI;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;
import java.time.Duration;
import java.util.Map;

@Service
public class GeminiService {

    private final ObjectMapper objectMapper;
    private final HttpClient httpClient;

    public GeminiService(ObjectMapper objectMapper) {
        this.objectMapper = objectMapper;
        this.httpClient = HttpClient.newBuilder()
                .connectTimeout(Duration.ofSeconds(30))
                .build();
    }

    public String generateImage(String prompt) throws Exception {

        String apiKey = System.getenv("GEMINI_API_KEY");

        if (apiKey == null || apiKey.isBlank()) {
            throw new IllegalStateException(
                    "GEMINI_API_KEY environment variable is missing");
        }

        Map<String, Object> requestBody = Map.of(
                "model", "gemini-3.1-flash-image",
                "input", prompt,
                "response_format", Map.of(
                        "type", "image",
                        "mime_type", "image/png",
                        "aspect_ratio", "1:1",
                        "image_size", "1K"
                )
        );

        String jsonBody =
                objectMapper.writeValueAsString(requestBody);

        HttpRequest request = HttpRequest.newBuilder()
                .uri(URI.create(
                        "https://generativelanguage.googleapis.com/v1beta/interactions"))
                .header("Content-Type", "application/json")
                .header("x-goog-api-key", apiKey)
                .timeout(Duration.ofSeconds(180))
                .POST(HttpRequest.BodyPublishers.ofString(jsonBody))
                .build();

        HttpResponse<String> response = httpClient.send(
                request,
                HttpResponse.BodyHandlers.ofString()
        );

        if (response.statusCode() != 200) {
            throw new RuntimeException(
                    "Gemini API error: " + response.body());
        }

        JsonNode result =
                objectMapper.readTree(response.body());

        for (JsonNode step : result.path("steps")) {
            if ("model_output".equals(
                    step.path("type").asText())) {

                for (JsonNode content : step.path("content")) {
                    if ("image".equals(
                            content.path("type").asText())) {

                        String imageData =
                                content.path("data").asText(null);

                        if (imageData != null &&
                                !imageData.isBlank()) {
                            return imageData;
                        }
                    }
                }
            }
        }

        throw new RuntimeException(
                "Gemini did not return an image.");
    }
}

