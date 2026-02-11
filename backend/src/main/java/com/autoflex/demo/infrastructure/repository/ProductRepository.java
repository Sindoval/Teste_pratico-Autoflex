package com.autoflex.demo.infrastructure.repository;

import com.autoflex.demo.infrastructure.entity.Product;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ProductRepository extends JpaRepository<Product, Long> {
  List<Product> findAllByOrderByPriceDesc();
}
