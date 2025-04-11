package com.manansala.personality;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(path = "/manansala")
public class PersonalityController {

    @Autowired
    private PersonalityRepository personalityRepository;

    // GET all personalities
    @GetMapping("/personalities")
    public ResponseEntity<List<Personality>> getAllPersonalities() {
        List<Personality> personalities = personalityRepository.findAll();
        return ResponseEntity.ok(personalities);
    }

    // POST create a new personality
    @PostMapping("/personalities")
    public ResponseEntity<Personality> addNewPersonality(@RequestBody Personality personality) {
        Personality savedPersonality = personalityRepository.save(personality);
        return ResponseEntity.ok(savedPersonality);
    }

    // POST create multiple personalities (bulk)
    @PostMapping("/personalities/bulk")
    public ResponseEntity<List<Personality>> addBulkPersonalities(@RequestBody List<Personality> personalities) {
        List<Personality> savedPersonalities = personalityRepository.saveAll(personalities);
        return ResponseEntity.ok(savedPersonalities);
    }
}
