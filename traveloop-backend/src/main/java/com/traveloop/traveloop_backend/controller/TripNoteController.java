package com.traveloop.traveloop_backend.controller;


import com.traveloop.traveloop_backend.dto.TripNoteDTO;
import com.traveloop.traveloop_backend.service.TripNoteService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/trip-notes")
@RequiredArgsConstructor
public class TripNoteController {

    private final TripNoteService tripNoteService;

    @PostMapping
    public ResponseEntity<TripNoteDTO> create(@RequestBody TripNoteDTO dto) {
        return ResponseEntity.ok(tripNoteService.createNote(dto));
    }

    @GetMapping("/trip/{tripId}")
    public ResponseEntity<List<TripNoteDTO>> getByTrip(@PathVariable Long tripId) {
        return ResponseEntity.ok(tripNoteService.getNotesByTrip(tripId));
    }

    @GetMapping("/{id}")
    public ResponseEntity<TripNoteDTO> getById(@PathVariable Long id) {
        return ResponseEntity.ok(tripNoteService.getById(id));
    }

    @PutMapping("/{id}")
    public ResponseEntity<TripNoteDTO> update(@PathVariable Long id, @RequestBody TripNoteDTO dto) {
        return ResponseEntity.ok(tripNoteService.updateNote(id, dto));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        tripNoteService.deleteNote(id);
        return ResponseEntity.noContent().build();
    }
}