package com.autoflex.demo.business.dto.out;

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
public class ProductMaterialResponseDTO {
  private Long materialId;
  private String materialName;
  private Double requiredQuantity;
}
