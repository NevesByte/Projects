package io.github.library.libraryapi.model;

import jakarta.persistence.*;
import lombok.Data;

import java.util.UUID;

@Entity
@Table(name = "autor")
@Data
public class Autor {
    @Column(length = 50, nullable = false)
    String nome;

    @Column(length = 50, nullable = false)
    String email;

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    UUID id;
}
