package com.traveloop.traveloop_backend.service;




import com.traveloop.traveloop_backend.dto.TripNoteDTO;
import com.traveloop.traveloop_backend.entity.Trip;
import com.traveloop.traveloop_backend.entity.TripNote;
import com.traveloop.traveloop_backend.exception.ResourceNotFoundException;
import com.traveloop.traveloop_backend.repository.TripNoteRepository;
import com.traveloop.traveloop_backend.repository.TripRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class TripNoteService {

    private final TripNoteRepository tripNoteRepository;
    private final TripRepository tripRepository;

    public TripNoteDTO createNote(TripNoteDTO dto) {
        Trip trip = tripRepository.findById(dto.getTripId())
                .orElseThrow(() -> new ResourceNotFoundException("Trip not found: " + dto.getTripId()));

        TripNote n = TripNote.builder()
                .title(dto.getTitle())
                .content(dto.getContent())
                .trip(trip)
                .build();
        return toDTO(tripNoteRepository.save(n));
    }

    public List<TripNoteDTO> getNotesByTrip(Long tripId) {
        return tripNoteRepository.findByTripId(tripId)
                .stream().map(this::toDTO).collect(Collectors.toList());
    }

    public TripNoteDTO getById(Long id) {
        return toDTO(find(id));
    }

    public TripNoteDTO updateNote(Long id, TripNoteDTO dto) {
        TripNote n = find(id);
        n.setTitle(dto.getTitle());
        n.setContent(dto.getContent());
        return toDTO(tripNoteRepository.save(n));
    }

    public void deleteNote(Long id) {
        tripNoteRepository.delete(find(id));
    }

    private TripNote find(Long id) {
        return tripNoteRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("TripNote not found: " + id));
    }

    private TripNoteDTO toDTO(TripNote n) {
        return TripNoteDTO.builder()
                .id(n.getId())
                .title(n.getTitle())
                .content(n.getContent())
                .tripId(n.getTrip().getId())
                .build();
    }
}
