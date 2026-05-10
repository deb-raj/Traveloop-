package com.traveloop.traveloop_backend.entity;



import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "trip_notes")
@Getter @Setter @NoArgsConstructor @AllArgsConstructor @Builder
public class TripNote {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, length = 2000)
    private String content;

    private String title;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "trip_id", nullable = false)
    private Trip trip;

    @Column(updatable = false)
    private LocalDateTime createdAt = LocalDateTime.now();
}
