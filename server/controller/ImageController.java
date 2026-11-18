package com.imagine_AI.server.controller;

import com.imagine_AI.server.service.GeminiService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/images")
@CrossOrigin(origins = "http://localhost:3000")
public class ImageController {

    private final GeminiService geminiService;

    public ImageController(GeminiService geminiService) {
        this.geminiService = geminiService;
    }

    @PostMapping("/generate")
    public ResponseEntity<?> generateImage(
            @RequestBody Map<String, String> request) {

        try {
            String prompt = request.get("prompt");

            if (prompt == null || prompt.isBlank()) {
                return ResponseEntity.badRequest()
                        .body(Map.of("error", "Prompt is required"));
            }

            String image = geminiService.generateImage(prompt);

            return ResponseEntity.ok(
                    Map.of(
                            "image", image,
                            "mimeType", "image/png"
                    )
            );

        } catch (Exception e) {
            return ResponseEntity.internalServerError()
                    .body(Map.of("error", e.getMessage()));
        }
    }
}

