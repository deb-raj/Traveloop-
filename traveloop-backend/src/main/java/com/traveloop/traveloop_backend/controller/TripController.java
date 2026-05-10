package com.traveloop.traveloop_backend.controller;


import com.traveloop.traveloop_backend.dto.TripDTO;
import com.traveloop.traveloop_backend.service.TripService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/trips")
@RequiredArgsConstructor
public class TripController {

    private final TripService tripService;

    @PostMapping
    public ResponseEntity<TripDTO> create(@RequestBody TripDTO dto) {
        return ResponseEntity.ok(tripService.createTrip(dto));
    }

    @GetMapping
    public ResponseEntity<List<TripDTO>> getAll() {
        return ResponseEntity.ok(tripService.getAllTrips());
    }

    @GetMapping("/{id}")
    public ResponseEntity<TripDTO> getById(@PathVariable Long id) {
        return ResponseEntity.ok(tripService.getTripById(id));
    }

    @GetMapping("/user/{userId}")
    public ResponseEntity<List<TripDTO>> getByUser(@PathVariable Long userId) {
        return ResponseEntity.ok(tripService.getTripsByUser(userId));
    }

    @GetMapping("/public")
    public ResponseEntity<List<TripDTO>> getPublic() {
        return ResponseEntity.ok(tripService.getPublicTrips());
    }

    @PutMapping("/{id}")
    public ResponseEntity<TripDTO> update(@PathVariable Long id, @RequestBody TripDTO dto) {
        return ResponseEntity.ok(tripService.updateTrip(id, dto));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        tripService.deleteTrip(id);
        return ResponseEntity.noContent().build();
    }
}