package com.traveloop.traveloop_backend.service;


import com.traveloop.traveloop_backend.dto.BudgetDTO;
import com.traveloop.traveloop_backend.entity.Budget;
import com.traveloop.traveloop_backend.entity.Trip;
import com.traveloop.traveloop_backend.exception.ResourceNotFoundException;
import com.traveloop.traveloop_backend.repository.BudgetRepository;
import com.traveloop.traveloop_backend.repository.TripRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class BudgetService {

    private final BudgetRepository budgetRepository;
    private final TripRepository tripRepository;

    public BudgetDTO createBudget(BudgetDTO dto) {
        Trip trip = tripRepository.findById(dto.getTripId())
                .orElseThrow(() -> new ResourceNotFoundException("Trip not found: " + dto.getTripId()));

        Budget b = Budget.builder()
                .category(dto.getCategory())
                .estimatedAmount(dto.getEstimatedAmount())
                .actualAmount(dto.getActualAmount())
                .currency(dto.getCurrency() != null ? dto.getCurrency() : "USD")
                .trip(trip)
                .build();
        return toDTO(budgetRepository.save(b));
    }

    public List<BudgetDTO> getBudgetsByTrip(Long tripId) {
        return budgetRepository.findByTripId(tripId)
                .stream().map(this::toDTO).collect(Collectors.toList());
    }

    public BudgetDTO getById(Long id) {
        return toDTO(find(id));
    }

    public BudgetDTO updateBudget(Long id, BudgetDTO dto) {
        Budget b = find(id);
        b.setCategory(dto.getCategory());
        b.setEstimatedAmount(dto.getEstimatedAmount());
        b.setActualAmount(dto.getActualAmount());
        if (dto.getCurrency() != null) b.setCurrency(dto.getCurrency());
        return toDTO(budgetRepository.save(b));
    }

    public void deleteBudget(Long id) {
        budgetRepository.delete(find(id));
    }

    private Budget find(Long id) {
        return budgetRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Budget not found: " + id));
    }

    private BudgetDTO toDTO(Budget b) {
        return BudgetDTO.builder()
                .id(b.getId())
                .category(b.getCategory())
                .estimatedAmount(b.getEstimatedAmount())
                .actualAmount(b.getActualAmount())
                .currency(b.getCurrency())
                .tripId(b.getTrip().getId())
                .build();
    }
}