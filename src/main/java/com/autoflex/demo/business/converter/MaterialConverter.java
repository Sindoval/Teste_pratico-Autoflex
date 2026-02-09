package com.autoflex.demo.business.converter;

import com.autoflex.demo.business.dto.in.MaterialRequestDto;
import com.autoflex.demo.business.dto.out.MaterialResponseDTO;
import com.autoflex.demo.infrastructure.entity.RawMaterial;
import org.springframework.stereotype.Component;

@Component
public class MaterialConverter {

  public RawMaterial toEntity(MaterialRequestDto dto) {
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
}
