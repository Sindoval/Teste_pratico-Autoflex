package com.autoflex.demo.controller;

import com.autoflex.demo.infrastructure.exceptions.ResourceNotFoundException;
import com.autoflex.demo.infrastructure.exceptions.dto.ErrorResponseDTO;
import jakarta.servlet.http.HttpServletRequest;
import java.util.stream.Collectors;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

@ControllerAdvice
public class GlobalExceptionHandler {

  @ExceptionHandler(ResourceNotFoundException.class)
  public ResponseEntity<ErrorResponseDTO> handleResourceNotFoundException(ResourceNotFoundException e,
      HttpServletRequest request) {
    return ResponseEntity.status(HttpStatus.NOT_FOUND).body(
        buildMessageError(
            HttpStatus.NOT_FOUND.value(),
            e.getMessage(),
            request.getRequestURI(),
            "NOT FOUND"
        )
    );
  }

  @ExceptionHandler(MethodArgumentNotValidException.class)
  public ResponseEntity<ErrorResponseDTO> handleValidationException(MethodArgumentNotValidException e,
      HttpServletRequest request) {
    String errorMessage = e.getBindingResult().getFieldErrors().stream()
        .map(error -> error.getField() + ": " + error.getDefaultMessage())
        .collect(Collectors.joining(", "));

    return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(
        buildMessageError(
            HttpStatus.BAD_REQUEST.value(),
            errorMessage,
            request.getRequestURI(),
            "BAD REQUEST - Validation Error"
        )
    );
  }

  private ErrorResponseDTO buildMessageError(int status, String message, String path, String error) {
    return ErrorResponseDTO.builder()
        .status(status)
        .message(message)
        .path(path)
        .error(error)
        .build();

  }
}
