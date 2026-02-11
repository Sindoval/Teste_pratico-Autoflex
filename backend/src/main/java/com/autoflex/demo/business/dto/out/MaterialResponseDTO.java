package com.autoflex.demo.business.dto.out;

import com.autoflex.demo.infrastructure.enums.MeasurementUnit;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class MaterialResponseDTO {
  private Long id;
  private String name;
  private Double stockQuantity;
  private MeasurementUnit unit;
}
