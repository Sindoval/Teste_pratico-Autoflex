package com.autoflex.demo.business.dto.in;

import com.autoflex.demo.business.dto.ProductComponentDTO;
import jakarta.validation.Valid;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;
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
public class ProductRequestDTO {
  @NotBlank(message = "Product name is required")
  private String name;

  @NotNull(message = "Price us required")
  @Positive(message = "Price must be greater than zero")
  private BigDecimal price;

  @NotEmpty(message = "A product must have at least one raw material")
  @Valid
  private List<ProductComponentDTO> materials;
}
