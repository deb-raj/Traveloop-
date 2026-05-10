package com.traveloop.traveloop_backend.repository;

import com.traveloop.traveloop_backend.entity.TripNote;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface TripNoteRepository extends JpaRepository<TripNote,Long> {
    List<TripNote> findByTripId(Long tripId);
}
