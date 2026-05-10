package com.traveloop.traveloop_backend.controller;
import com.traveloop.traveloop_backend.dto.BudgetDTO;
import com.traveloop.traveloop_backend.service.BudgetService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/budgets")
@RequiredArgsConstructor
public class BudgetController {

    private final BudgetService budgetService;

    @PostMapping
    public ResponseEntity<BudgetDTO> create(@RequestBody BudgetDTO dto) {
        return ResponseEntity.ok(budgetService.createBudget(dto));
    }

    @GetMapping("/trip/{tripId}")
    public ResponseEntity<List<BudgetDTO>> getByTrip(@PathVariable Long tripId) {
        return ResponseEntity.ok(budgetService.getBudgetsByTrip(tripId));
    }

    @GetMapping("/{id}")
    public ResponseEntity<BudgetDTO> getById(@PathVariable Long id) {
        return ResponseEntity.ok(budgetService.getById(id));
    }

    @PutMapping("/{id}")
    public ResponseEntity<BudgetDTO> update(@PathVariable Long id, @RequestBody BudgetDTO dto) {
        return ResponseEntity.ok(budgetService.updateBudget(id, dto));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        budgetService.deleteBudget(id);
        return ResponseEntity.noContent().build();
    }
}