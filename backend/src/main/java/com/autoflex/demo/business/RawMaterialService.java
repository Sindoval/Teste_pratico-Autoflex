package com.autoflex.demo.business;

import com.autoflex.demo.business.converter.MaterialConverter;
import com.autoflex.demo.business.dto.in.MaterialRequestDTO;
import com.autoflex.demo.business.dto.in.MaterialUpdateDTO;
import com.autoflex.demo.business.dto.out.MaterialResponseDTO;
import com.autoflex.demo.infrastructure.entity.RawMaterial;
import com.autoflex.demo.infrastructure.exceptions.ResourceNotFoundException;
import com.autoflex.demo.infrastructure.repository.RawMaterialRepository;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class RawMaterialService {
  private final RawMaterialRepository materialRepository;
  private final MaterialConverter materialConverter;


  @Transactional
  public MaterialResponseDTO save(MaterialRequestDTO dto) {
    return materialConverter.toDTO(materialRepository.save(materialConverter.toEntity(dto)));
  }

  public List<MaterialResponseDTO> findAll() {
    List<RawMaterial> materials = materialRepository.findAll();

    return materials.stream().map(materialConverter::toDTO).toList();
  }

  public MaterialResponseDTO findById(Long id) {
    try {
      return materialConverter.toDTO(
          materialRepository.findById(id).orElseThrow(
              () -> new ResourceNotFoundException("Material Not Found: " + id)
          )
      );
    } catch (ResourceNotFoundException e) {
      throw new ResourceNotFoundException("Material Not Found: " + id);
    }
  }

  @Transactional
  public MaterialResponseDTO update(MaterialUpdateDTO dto, Long id) {
    try {
      RawMaterial entity = materialRepository.findById(id).orElseThrow(
          () -> new ResourceNotFoundException("Material Not Found: " + id)
      );
      materialConverter.updateEntityFromDto(dto, entity);
      return materialConverter.toDTO(materialRepository.save(entity));
    } catch (ResourceNotFoundException e) {
      throw new ResourceNotFoundException("Material Not Found: " + id);
    }
  }

  public void delete(Long id) {
    if (!materialRepository.existsById(id)) {
      throw new ResourceNotFoundException("Material Not Found: " + id);
    }
    materialRepository.deleteById(id);
  }
}
