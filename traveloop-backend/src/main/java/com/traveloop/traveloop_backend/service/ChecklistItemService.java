package com.traveloop.traveloop_backend.service;
import com.traveloop.traveloop_backend.dto.ChecklistItemDTO;
import com.traveloop.traveloop_backend.entity.ChecklistItem;
import com.traveloop.traveloop_backend.entity.Trip;
import com.traveloop.traveloop_backend.exception.ResourceNotFoundException;
import com.traveloop.traveloop_backend.repository.ChecklistItemRepository;
import com.traveloop.traveloop_backend.repository.TripRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class ChecklistItemService {

    private final ChecklistItemRepository checklistItemRepository;
    private final TripRepository tripRepository;

    public ChecklistItemDTO createItem(ChecklistItemDTO dto) {
        Trip trip = tripRepository.findById(dto.getTripId())
                .orElseThrow(() -> new ResourceNotFoundException("Trip not found: " + dto.getTripId()));

        ChecklistItem item = ChecklistItem.builder()
                .itemName(dto.getItemName())
                .category(dto.getCategory())
                .quantity(dto.getQuantity() != null ? dto.getQuantity() : 1)
                .isPacked(dto.getIsPacked() != null && dto.getIsPacked())
                .trip(trip)
                .build();
        return toDTO(checklistItemRepository.save(item));
    }

    public List<ChecklistItemDTO> getItemsByTrip(Long tripId) {
        return checklistItemRepository.findByTripId(tripId)
                .stream().map(this::toDTO).collect(Collectors.toList());
    }

    public ChecklistItemDTO getById(Long id) {
        return toDTO(find(id));
    }

    public ChecklistItemDTO updateItem(Long id, ChecklistItemDTO dto) {
        ChecklistItem i = find(id);
        i.setItemName(dto.getItemName());
        i.setCategory(dto.getCategory());
        if (dto.getQuantity() != null) i.setQuantity(dto.getQuantity());
        if (dto.getIsPacked() != null) i.setIsPacked(dto.getIsPacked());
        return toDTO(checklistItemRepository.save(i));
    }

    public ChecklistItemDTO togglePacked(Long id) {
        ChecklistItem i = find(id);
        i.setIsPacked(!i.getIsPacked());
        return toDTO(checklistItemRepository.save(i));
    }

    public void deleteItem(Long id) {
        checklistItemRepository.delete(find(id));
    }

    private ChecklistItem find(Long id) {
        return checklistItemRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("ChecklistItem not found: " + id));
    }

    private ChecklistItemDTO toDTO(ChecklistItem i) {
        return ChecklistItemDTO.builder()
                .id(i.getId())
                .itemName(i.getItemName())
                .category(i.getCategory())
                .quantity(i.getQuantity())
                .isPacked(i.getIsPacked())
                .tripId(i.getTrip().getId())
                .build();
    }
}