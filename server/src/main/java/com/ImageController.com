
package com.imagine_AI.server;

import java.util.Map;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/images")
@CrossOrigin(origins = "http://localhost:3000")
public class ImageController {

    private final ImageService imageService;

    public ImageController(ImageService imageService) {
        this.imageService = imageService;
    }

    @PostMapping("/generate")
    public ResponseEntity<?> generateImage(
            @RequestBody Map<String, String> request) {

        String prompt = request.get("prompt");

        if (prompt == null || prompt.isBlank()) {
            return ResponseEntity.badRequest()
                    .body(Map.of("error", "Please enter an image prompt."));
        }

        try {
            String imageUrl = imageService.generateImage(prompt.trim());

            return ResponseEntity.ok(
                    Map.of("imageUrl", imageUrl)
            );

        } catch (Exception e) {
            return ResponseEntity.internalServerError()
                    .body(Map.of(
                        "error",
                        "Image generation failed. Check your backend logs and Cloudinary configuration."
                    ));
        }
    }
}
