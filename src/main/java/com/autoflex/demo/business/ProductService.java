package com.autoflex.demo.business;

import com.autoflex.demo.business.converter.ProductConverter;
import com.autoflex.demo.business.dto.in.ProductRequestDTO;
import com.autoflex.demo.business.dto.out.ProductResponseDTO;
import com.autoflex.demo.infrastructure.entity.Product;
import com.autoflex.demo.infrastructure.entity.ProductMaterial;
import com.autoflex.demo.infrastructure.entity.RawMaterial;
import com.autoflex.demo.infrastructure.exceptions.ResourceNotFoundException;
import com.autoflex.demo.infrastructure.repository.ProductRepository;
import com.autoflex.demo.infrastructure.repository.RawMaterialRepository;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class ProductService {

  private final ProductRepository productRepository;
  private final ProductConverter productConverter;
  private final RawMaterialRepository materialRepository;

  public ProductResponseDTO save(ProductRequestDTO dto) {
    Product entity = productConverter.toEntity(dto);

    List<ProductMaterial> productMaterials = dto.getMaterials().stream().map(materialDto -> {
          RawMaterial material = materialRepository.findById(materialDto.getMaterialId()).orElseThrow(
              () -> new ResourceNotFoundException("Material Not Found: " + materialDto.getMaterialId())
          );

          return ProductMaterial.builder()
              .product(entity)
              .rawMaterial(material)
              .requiredQuantity(materialDto.getRequiredQuantity())
              .build();
        }
    ).toList();

    entity.setMaterials(productMaterials);
    Product saveProduct = productRepository.save(entity);

    return productConverter.toDTO(saveProduct);
  }
}
