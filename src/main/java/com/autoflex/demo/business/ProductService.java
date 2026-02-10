package com.autoflex.demo.business;

import com.autoflex.demo.business.converter.ProductConverter;
import com.autoflex.demo.business.dto.ProductComponentDTO;
import com.autoflex.demo.business.dto.in.ProductRequestDTO;
import com.autoflex.demo.business.dto.in.ProductUpdateDTO;
import com.autoflex.demo.business.dto.out.ProductResponseDTO;
import com.autoflex.demo.infrastructure.entity.Product;
import com.autoflex.demo.infrastructure.entity.ProductMaterial;
import com.autoflex.demo.infrastructure.entity.RawMaterial;
import com.autoflex.demo.infrastructure.exceptions.ResourceNotFoundException;
import com.autoflex.demo.infrastructure.repository.ProductRepository;
import com.autoflex.demo.infrastructure.repository.RawMaterialRepository;
import java.util.ArrayList;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class ProductService {

  private final ProductRepository productRepository;
  private final ProductConverter productConverter;
  private final RawMaterialRepository materialRepository;

  @Transactional
  public ProductResponseDTO save(ProductRequestDTO dto) {
    Product entity = productConverter.toEntity(dto);

    if (entity.getMaterials() == null) {
      entity.setMaterials(new ArrayList<>());
    }

    List<ProductMaterial> productMaterials = listProductMaterialBuilder(dto.getMaterials(), entity);

    entity.setMaterials(productMaterials);
    Product saveProduct = productRepository.save(entity);

    return productConverter.toDTO(saveProduct);
  }

  public List<ProductResponseDTO> findAll() {
    List<Product> products = productRepository.findAll();

    return products.stream().map(productConverter::toDTO).toList();
  }

  public ProductResponseDTO findById(Long id) {
    Product product = productRepository.findById(id).orElseThrow(
        () -> new ResourceNotFoundException("Product Not Found")
    );

    return productConverter.toDTO(product);
  }

  @Transactional
  public ProductResponseDTO update(ProductUpdateDTO dto, Long id) {
    Product entity = productRepository.findById(id).orElseThrow(
        () -> new ResourceNotFoundException("Product Not Found")
    );

    productConverter.updateEntityFromDto(dto, entity);

    if (dto.getMaterials() != null) {
      entity.getMaterials().clear();

      List<ProductMaterial> newMaterials = listProductMaterialBuilder(dto.getMaterials(), entity);

      entity.getMaterials().addAll(newMaterials);
    }
    return productConverter.toDTO(productRepository.save(entity));
  }

  private List<ProductMaterial> listProductMaterialBuilder(List<ProductComponentDTO> componentDTOS, Product product) {
     return componentDTOS.stream().map(materialDto -> {
           RawMaterial material = materialRepository.findById(materialDto.getMaterialId()).orElseThrow(
               () -> new ResourceNotFoundException("Material Not Found")
           );

           return ProductMaterial.builder()
               .product(product)
               .rawMaterial(material)
               .requiredQuantity(materialDto.getRequiredQuantity())
               .build();
         }
     ).toList();
  }

  public void delete(Long id) {
    Product entity = productRepository.findById(id).orElseThrow(
        () -> new ResourceNotFoundException("Product Not Found")
    );
    productRepository.delete(entity);
  }
}
