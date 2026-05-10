package com.traveloop.traveloop_backend.service;


import com.traveloop.traveloop_backend.dto.TripStopDTO;
import com.traveloop.traveloop_backend.entity.Trip;
import com.traveloop.traveloop_backend.entity.TripStop;
import com.traveloop.traveloop_backend.exception.ResourceNotFoundException;
import com.traveloop.traveloop_backend.repository.TripRepository;
import com.traveloop.traveloop_backend.repository.TripStopRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class TripStopService {

    private final TripStopRepository tripStopRepository;
    private final TripRepository tripRepository;

    public TripStopDTO createStop(TripStopDTO dto) {
        Trip trip = tripRepository.findById(dto.getTripId())
                .orElseThrow(() -> new ResourceNotFoundException("Trip not found: " + dto.getTripId()));

        TripStop stop = TripStop.builder()
                .cityName(dto.getCityName())
                .country(dto.getCountry())
                .arrivalDate(dto.getArrivalDate())
                .departureDate(dto.getDepartureDate())
                .stopOrder(dto.getStopOrder())
                .costIndex(dto.getCostIndex())
                .trip(trip)
                .build();
        return toDTO(tripStopRepository.save(stop));
    }

    public List<TripStopDTO> getStopsByTrip(Long tripId) {
        return tripStopRepository.findByTripIdOrderByStopOrderAsc(tripId)
                .stream().map(this::toDTO).collect(Collectors.toList());
    }

    public TripStopDTO getStopById(Long id) {
        return toDTO(find(id));
    }

    public TripStopDTO updateStop(Long id, TripStopDTO dto) {
        TripStop s = find(id);
        s.setCityName(dto.getCityName());
        s.setCountry(dto.getCountry());
        s.setArrivalDate(dto.getArrivalDate());
        s.setDepartureDate(dto.getDepartureDate());
        s.setStopOrder(dto.getStopOrder());
        s.setCostIndex(dto.getCostIndex());
        return toDTO(tripStopRepository.save(s));
    }

    public void deleteStop(Long id) {
        tripStopRepository.delete(find(id));
    }

    private TripStop find(Long id) {
        return tripStopRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("TripStop not found: " + id));
    }

    private TripStopDTO toDTO(TripStop s) {
        return TripStopDTO.builder()
                .id(s.getId())
                .cityName(s.getCityName())
                .country(s.getCountry())
                .arrivalDate(s.getArrivalDate())
                .departureDate(s.getDepartureDate())
                .stopOrder(s.getStopOrder())
                .costIndex(s.getCostIndex())
                .tripId(s.getTrip().getId())
                .build();
    }
}