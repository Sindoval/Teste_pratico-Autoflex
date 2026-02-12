package com.autoflex.demo.business.dto.out;

import java.math.BigDecimal;
import java.util.List;
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
public class ProductResponseDTO {
  private Long id;
  private String name;
  private BigDecimal price;
  private List<ProductMaterialResponseDTO> materials;
}
