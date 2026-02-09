package com.autoflex.demo.infrastructure.repository;

import com.autoflex.demo.infrastructure.entity.RawMaterial;
import org.springframework.data.jpa.repository.JpaRepository;

public interface RawMaterialRepository extends JpaRepository<Long, RawMaterial> {

}
