package com.autoflex.demo.business.dto;

import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;
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
public class ProductComponentDTO {
  @NotNull(message = "Material ID is required")
  private Long materialId;

  @NotNull(message = "Required quantity is required")
  @Positive(message = "Required quantity must be greater than zero")
  private Double requiredQuantity;
}
