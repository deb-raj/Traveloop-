package com.traveloop.traveloop_backend.entity;



import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDate;

@Entity
@Table(name = "trip_stops")
@Getter @Setter @NoArgsConstructor @AllArgsConstructor @Builder
public class TripStop {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String cityName;

    private String country;
    private LocalDate arrivalDate;
    private LocalDate departureDate;
    private Integer stopOrder;     // order within the trip
    private Double costIndex;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "trip_id", nullable = false)
    private Trip trip;
}