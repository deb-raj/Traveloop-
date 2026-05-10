package com.traveloop.traveloop_backend.entity;



import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "budgets")
@Getter @Setter @NoArgsConstructor @AllArgsConstructor @Builder
public class Budget {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String category;       // Transport, Stay, Meals, Activities, Other

    private Double estimatedAmount;
    private Double actualAmount;
    private String currency = "USD";

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "trip_id", nullable = false)
    private Trip trip;
}