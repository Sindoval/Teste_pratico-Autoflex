package com.autoflex.demo.business.dto.in;

import com.autoflex.demo.business.dto.ProductComponentDTO;
import jakarta.validation.Valid;
import jakarta.validation.constraints.Positive;
import jakarta.validation.constraints.Size;
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
public class ProductUpdateDTO {
  @Size(min = 2, message = "Name too short")
  private String name;

  @Positive(message = "Price must be positive")
  private BigDecimal price;

  @Valid
  private List<ProductComponentDTO> materials;
}
