package com.autoflex.demo.business.converter;

import com.autoflex.demo.business.dto.in.MaterialRequestDTO;
import com.autoflex.demo.business.dto.in.MaterialUpdateDTO;
import com.autoflex.demo.business.dto.out.MaterialResponseDTO;
import com.autoflex.demo.infrastructure.entity.RawMaterial;
import org.springframework.stereotype.Component;

@Component
public class MaterialConverter {

  public RawMaterial toEntity(MaterialRequestDTO dto) {
    if (dto == null ) return null;

    return RawMaterial.builder()
        .name(dto.getName())
        .stockQuantity(dto.getStockQuantity())
        .build();
  }

  public MaterialResponseDTO toDTO(RawMaterial entity) {
    if (entity == null) return null;
    return MaterialResponseDTO.builder()
        .id(entity.getId())
        .name(entity.getName())
        .stockQuantity(entity.getStockQuantity())
        .build();
  }

  public void updateEntityFromDto(MaterialUpdateDTO dto, RawMaterial entity) {
    if (dto == null || entity == null) return;

    if (dto.getName() != null && !dto.getName().isBlank()) {
      entity.setName(dto.getName());
    }

    if (dto.getStockQuantity() != null) {
      entity.setStockQuantity(dto.getStockQuantity());
    }
  }
}
