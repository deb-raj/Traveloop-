package com.traveloop.traveloop_backend.controller;


import com.traveloop.traveloop_backend.dto.ChecklistItemDTO;
import com.traveloop.traveloop_backend.service.ChecklistItemService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/checklist-items")
@RequiredArgsConstructor
public class ChecklistItemController {

    private final ChecklistItemService checklistItemService;

    @PostMapping
    public ResponseEntity<ChecklistItemDTO> create(@RequestBody ChecklistItemDTO dto) {
        return ResponseEntity.ok(checklistItemService.createItem(dto));
    }

    @GetMapping("/trip/{tripId}")
    public ResponseEntity<List<ChecklistItemDTO>> getByTrip(@PathVariable Long tripId) {
        return ResponseEntity.ok(checklistItemService.getItemsByTrip(tripId));
    }

    @GetMapping("/{id}")
    public ResponseEntity<ChecklistItemDTO> getById(@PathVariable Long id) {
        return ResponseEntity.ok(checklistItemService.getById(id));
    }

    @PutMapping("/{id}")
    public ResponseEntity<ChecklistItemDTO> update(@PathVariable Long id,
                                                   @RequestBody ChecklistItemDTO dto) {
        return ResponseEntity.ok(checklistItemService.updateItem(id, dto));
    }

    @PatchMapping("/{id}/toggle")
    public ResponseEntity<ChecklistItemDTO> togglePacked(@PathVariable Long id) {
        return ResponseEntity.ok(checklistItemService.togglePacked(id));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        checklistItemService.deleteItem(id);
        return ResponseEntity.noContent().build();
    }
}