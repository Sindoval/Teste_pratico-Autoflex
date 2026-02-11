package com.autoflex.demo.business.converter;

import com.autoflex.demo.business.dto.in.ProductRequestDTO;
import com.autoflex.demo.business.dto.in.ProductUpdateDTO;
import com.autoflex.demo.business.dto.out.ProductMaterialResponseDTO;
import com.autoflex.demo.business.dto.out.ProductResponseDTO;
import com.autoflex.demo.infrastructure.entity.Product;
import com.autoflex.demo.infrastructure.entity.ProductMaterial;
import org.springframework.stereotype.Component;

@Component
public class ProductConverter {

  public Product toEntity(ProductRequestDTO dto) {
    if (dto == null) return null;
    return Product.builder()
        .name(dto.getName())
        .price(dto.getPrice())
        .build();
  }

  public ProductResponseDTO toDTO(Product entity) {
    if (entity == null) return null;
    return ProductResponseDTO.builder()
        .id(entity.getId())
        .name(entity.getName())
        .price(entity.getPrice())
        .materials(entity.getMaterials()
            .stream().map(this::toProductMaterialResponseDTO).toList())
        .build();
  }

  public ProductMaterialResponseDTO toProductMaterialResponseDTO(ProductMaterial productMaterial) {
    return ProductMaterialResponseDTO.builder()
        .materialId(productMaterial.getRawMaterial().getId())
        .materialName(productMaterial.getRawMaterial().getName())
        .requiredQuantity(productMaterial.getRequiredQuantity())
        .unit(productMaterial.getRawMaterial().getUnit())
        .build();
  }

  public void updateEntityFromDto(ProductUpdateDTO dto, Product entity) {
    if (dto == null || entity == null) return;

    if (dto.getName() != null && !dto.getName().isBlank()) {
      entity.setName(dto.getName());
    }

    if (dto.getPrice() != null) {
      entity.setPrice(dto.getPrice());
    }
  }

}
