package com.autoflex.demo.business.dto.out;

import java.math.BigDecimal;
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
public class ProductionSuggestionDTO {
  private Long productId;
  private String productName;
  private Integer quantityToProduce;
  private BigDecimal totalPrice;
}
