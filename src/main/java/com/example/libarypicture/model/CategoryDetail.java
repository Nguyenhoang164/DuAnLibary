package com.example.libarypicture.model;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Data
public class CategoryDetail {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column(nullable = false)
    private String description;
    @ManyToOne
    @JoinColumn(name = "id_category")
    private Category category;
}
