package com.autoflex.demo.infrastructure.repository;

import com.autoflex.demo.infrastructure.entity.ProductMaterial;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ProductMaterialRepository extends JpaRepository<Long, ProductMaterial> {
  List<ProductMaterial> findByProductId(Long productId);
}
