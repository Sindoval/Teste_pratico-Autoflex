package com.autoflex.demo.controller;

import com.autoflex.demo.business.ProductService;
import com.autoflex.demo.business.dto.in.ProductRequestDTO;
import com.autoflex.demo.business.dto.in.ProductUpdateDTO;
import com.autoflex.demo.business.dto.out.ProductResponseDTO;
import jakarta.validation.Valid;
import java.net.URI;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
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

  @GetMapping
  public ResponseEntity<List<ProductResponseDTO>> findAll() {
    return ResponseEntity.ok(productService.findAll());
  }

  @GetMapping("/{id}")
  public ResponseEntity<ProductResponseDTO> findById(@PathVariable Long id) {
    return ResponseEntity.ok(productService.findById(id));
  }

  @PutMapping("/{id}")
  public ResponseEntity<ProductResponseDTO> update(@RequestBody @Valid ProductUpdateDTO dto, @PathVariable Long id) {
    return ResponseEntity.ok(productService.update(dto, id));
  }

  @DeleteMapping("/{id}")
  public ResponseEntity<Void> delete(@PathVariable Long id) {
    productService.delete(id);
    return ResponseEntity.ok().build();
  }
}
