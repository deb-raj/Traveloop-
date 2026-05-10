package com.traveloop.traveloop_backend.repository;

import com.traveloop.traveloop_backend.entity.TripStop;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface TripStopRepository extends JpaRepository<TripStop,Long> {
    List<TripStop> findByTripIdOrderByStopOrderAsc(Long tripId);
}
