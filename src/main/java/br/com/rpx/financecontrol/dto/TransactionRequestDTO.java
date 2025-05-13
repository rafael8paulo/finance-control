package br.com.rpx.financecontrol.dto;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.DecimalMin;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.Data;

import java.math.BigDecimal;
import java.time.LocalDate;

@Data
@Schema(description = "DTO para criação de uma nova transação")
public class TransactionRequestDTO {
    
    @Schema(description = "ID do usuário", example = "1")
    @NotNull(message = "O ID do usuário é obrigatório")
    private Long userId;
    
    @Schema(description = "Valor da transação", example = "100.50")
    @NotNull(message = "O valor é obrigatório")
    @DecimalMin(value = "0.01", message = "O valor deve ser maior que zero")
    private BigDecimal value;
    
    @Schema(description = "Tipo da transação (RECEITA ou DESPESA)", example = "INCOME")
    @NotNull(message = "O tipo é obrigatório")
    private String type;
    
    @Schema(description = "Data da transação", example = "2024-03-15")
    @NotNull(message = "A data é obrigatória")
    private LocalDate date;
    
    @Schema(description = "Descrição da transação", example = "Salário")
    @NotBlank(message = "A descrição é obrigatória")
    @Size(min = 3, max = 100, message = "A descrição deve ter entre 3 e 100 caracteres")
    private String description;

} 