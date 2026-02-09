package com.autoflex.demo.controller;

import com.autoflex.demo.business.RawMaterialService;
import com.autoflex.demo.business.dto.in.MaterialRequestDto;
import com.autoflex.demo.business.dto.in.MaterialUpdateDTO;
import com.autoflex.demo.business.dto.out.MaterialResponseDTO;
import com.autoflex.demo.infrastructure.entity.RawMaterial;
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

@RequestMapping("/materials")
@RestController
@RequiredArgsConstructor
public class RawMaterialController {
  private final RawMaterialService materialService;

  @PostMapping
  @ResponseStatus(HttpStatus.CREATED)
  public ResponseEntity<MaterialResponseDTO> save(@RequestBody @Valid MaterialRequestDto dto) {
    MaterialResponseDTO response = materialService.save(dto);

    URI location = ServletUriComponentsBuilder
        .fromCurrentRequest()
        .path("/{id}")
        .buildAndExpand(response.getId())
        .toUri();

    return ResponseEntity.created(location).body(response);
  }

  @GetMapping
  public ResponseEntity<List<MaterialResponseDTO>> findAll() {
    return ResponseEntity.ok(materialService.findAll());
  }

  @GetMapping("/{id}")
  public ResponseEntity<MaterialResponseDTO> findById(@PathVariable Long id) {
    return ResponseEntity.ok(materialService.findById(id));
  }

  @PutMapping("/{id}")
  public ResponseEntity<MaterialResponseDTO> update(@RequestBody @Valid MaterialUpdateDTO dto, @PathVariable Long id) {
    return ResponseEntity.ok(materialService.update(dto, id));
  }

  @DeleteMapping("/{id}")
  public ResponseEntity<Void> delete(@PathVariable Long id) {
    materialService.delete(id);
    return ResponseEntity.ok().build();
  }
}
