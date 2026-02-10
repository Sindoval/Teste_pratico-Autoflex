package com.autoflex.demo.controller;

import com.autoflex.demo.business.ProductService;
import com.autoflex.demo.business.dto.in.ProductRequestDTO;
import com.autoflex.demo.business.dto.out.MaterialResponseDTO;
import com.autoflex.demo.business.dto.out.ProductResponseDTO;
import jakarta.validation.Valid;
import java.net.URI;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

@RequestMapping("/products")
@RestController
@RequiredArgsConstructor
public class ProductController {
  private final ProductService productService;

  @PostMapping
  @ResponseStatus(HttpStatus.CREATED)
  public ResponseEntity<ProductResponseDTO> save(@RequestBody @Valid ProductRequestDTO dto){
    ProductResponseDTO response = productService.save(dto);

    URI location = ServletUriComponentsBuilder
        .fromCurrentRequest()
        .path("/{id}")
        .buildAndExpand(response.getId())
        .toUri();

    return ResponseEntity.created(location).body(response);
  }
}
