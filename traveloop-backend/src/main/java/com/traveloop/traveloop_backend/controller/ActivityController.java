package com.traveloop.traveloop_backend.controller;


import com.traveloop.traveloop_backend.dto.ActivityDTO;
import com.traveloop.traveloop_backend.service.ActivityService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/activities")
@RequiredArgsConstructor
public class ActivityController {

    private final ActivityService activityService;

    @PostMapping
    public ResponseEntity<ActivityDTO> create(@RequestBody ActivityDTO dto) {
        return ResponseEntity.ok(activityService.createActivity(dto));
    }

    @GetMapping("/stop/{stopId}")
    public ResponseEntity<List<ActivityDTO>> getByStop(@PathVariable Long stopId) {
        return ResponseEntity.ok(activityService.getActivitiesByStop(stopId));
    }

    @GetMapping("/{id}")
    public ResponseEntity<ActivityDTO> getById(@PathVariable Long id) {
        return ResponseEntity.ok(activityService.getById(id));
    }

    @PutMapping("/{id}")
    public ResponseEntity<ActivityDTO> update(@PathVariable Long id, @RequestBody ActivityDTO dto) {
        return ResponseEntity.ok(activityService.updateActivity(id, dto));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        activityService.deleteActivity(id);
        return ResponseEntity.noContent().build();
    }
}