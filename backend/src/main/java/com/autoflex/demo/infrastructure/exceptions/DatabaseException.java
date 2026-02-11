package com.autoflex.demo.infrastructure.exceptions;

public class DatabaseException extends RuntimeException {

  public DatabaseException(String message) {
    super(message);
  }

  public DatabaseException(String message, Throwable throwable) {
    super(message, throwable);
  }
}
