package com.traveloop.traveloop_backend.controller;


import com.traveloop.traveloop_backend.dto.TripStopDTO;
import com.traveloop.traveloop_backend.service.TripStopService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/trip-stops")
@RequiredArgsConstructor
public class TripStopController {

    private final TripStopService tripStopService;

    @PostMapping
    public ResponseEntity<TripStopDTO> create(@RequestBody TripStopDTO dto) {
        return ResponseEntity.ok(tripStopService.createStop(dto));
    }

    @GetMapping("/trip/{tripId}")
    public ResponseEntity<List<TripStopDTO>> getByTrip(@PathVariable Long tripId) {
        return ResponseEntity.ok(tripStopService.getStopsByTrip(tripId));
    }

    @GetMapping("/{id}")
    public ResponseEntity<TripStopDTO> getById(@PathVariable Long id) {
        return ResponseEntity.ok(tripStopService.getStopById(id));
    }

    @PutMapping("/{id}")
    public ResponseEntity<TripStopDTO> update(@PathVariable Long id, @RequestBody TripStopDTO dto) {
        return ResponseEntity.ok(tripStopService.updateStop(id, dto));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        tripStopService.deleteStop(id);
        return ResponseEntity.noContent().build();
    }
}