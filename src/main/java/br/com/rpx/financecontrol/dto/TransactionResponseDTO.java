package br.com.rpx.financecontrol.dto;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Data;
import java.math.BigDecimal;
import java.time.LocalDate;

@Data
@Schema(description = "DTO de resposta para transação")
public class TransactionResponseDTO {
    @Schema(description = "ID da transação", example = "1")
    private Long id;
    
    @Schema(description = "ID do usuário", example = "1")
    private Long userId;
    
    @Schema(description = "Nome do usuário", example = "João Silva")
    private String userName;
    
    @Schema(description = "Valor da transação", example = "100.50")
    private BigDecimal value;
    
    @Schema(description = "Tipo da transação", example = "RECEITA")
    private String type;

    @Schema(description = "Data da transação", example = "2024-03-15")
    private LocalDate date;
    
    @Schema(description = "Descrição da transação", example = "Salário do mês")
    private String description;

} 