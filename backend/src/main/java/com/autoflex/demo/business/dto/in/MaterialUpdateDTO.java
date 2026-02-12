package com.autoflex.demo.business.dto.in;

import com.autoflex.demo.infrastructure.enums.MeasurementUnit;
import jakarta.validation.constraints.PositiveOrZero;
import jakarta.validation.constraints.Size;
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
public class MaterialUpdateDTO {
  @Size(min = 2, max = 100, message = "Name must be between 2 and 100 characters")
  private String name;

  @PositiveOrZero(message = "Stock quantity cannot be negative")
  private Double stockQuantity;

  private MeasurementUnit unit;
}
