package br.com.rpx.financecontrol.controller.exceptions;

import br.com.rpx.financecontrol.service.exceptions.DatabaseException;
import br.com.rpx.financecontrol.service.exceptions.ResourceNotFoundException;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

import java.time.Instant;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@ControllerAdvice
public class ResourceExceptionHandler {

    @ExceptionHandler(ResourceNotFoundException.class)
    public ResponseEntity<StandardError> resourceNotFound(ResourceNotFoundException e, HttpServletRequest request) {
        String error = "Resource not found";
        HttpStatus status = HttpStatus.NOT_FOUND;
        StandardError err = createStandardErrorDefault(error, e.getMessage(), request, status);
        return ResponseEntity.status(status).body(err);
    }

    @ExceptionHandler(DatabaseException.class)
    public ResponseEntity<StandardError> dataBase(DatabaseException e, HttpServletRequest request) {
        String error = "Database error";
        HttpStatus status = HttpStatus.BAD_REQUEST;
        StandardError err = createStandardErrorDefault(error, e.getMessage(), request, status);

        return ResponseEntity.status(status).body(err);
    }

    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<ValidateError> valid(MethodArgumentNotValidException ex, HttpServletRequest request) {
        String error = "Validation error";
        HttpStatus status = HttpStatus.BAD_REQUEST;

        Map<String, String> errors = new HashMap<>();
        ex.getBindingResult().getFieldErrors().forEach(e -> {
            errors.put(e.getField(), e.getDefaultMessage());
        });

        ValidateError validateError = ValidateError.builder()
                .timestamp(Instant.now())
                .status(status.value())
                .error(error)
                .messages(errors)
                .path(request.getRequestURI())
                .build();

        return ResponseEntity.status(status).body(validateError);
    }


    private StandardError createStandardErrorDefault(
            final String error,
            final String message,
            final HttpServletRequest request,
            final HttpStatus status
    ) {
        List<String> messages = List.of(message);
        return createStandardErrorDefault(error, messages, request, status);
    }

    private StandardError createStandardErrorDefault(
            final String error,
            final List<String> message,
            final HttpServletRequest request,
            final HttpStatus status
    ) {
        return StandardError.builder()
                .timestamp(Instant.now())
                .status(status.value())
                .error(error)
                .messages(message)
                .path(request.getRequestURI())
                .build();
    }

}
