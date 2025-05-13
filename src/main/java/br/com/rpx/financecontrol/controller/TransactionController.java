package br.com.rpx.financecontrol.controller;

import br.com.rpx.financecontrol.dto.BalanceResponseDTO;
import br.com.rpx.financecontrol.dto.TransactionRequestDTO;
import br.com.rpx.financecontrol.dto.TransactionResponseDTO;
import br.com.rpx.financecontrol.model.Transaction;
import br.com.rpx.financecontrol.model.TypeTransaction;
import br.com.rpx.financecontrol.model.User;
import br.com.rpx.financecontrol.service.TransactionService;
import br.com.rpx.financecontrol.service.UserService;
import jakarta.validation.Valid;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.math.BigDecimal;
import java.time.YearMonth;
import java.util.List;
import java.util.stream.Collectors;

@RestController
@AllArgsConstructor
@RequestMapping("/transactions")
public class TransactionController {

    private final TransactionService transacaoService;
    private final UserService userService;

    @PostMapping
    public ResponseEntity<TransactionResponseDTO> createTransaction(@Valid @RequestBody TransactionRequestDTO request) {
        User user = userService.findById(request.getUserId());

        Transaction transaction = new Transaction();
        transaction.setUser(user);
        transaction.setAmount(request.getValue());
        transaction.setType(TypeTransaction.valueOf(request.getType()));
        transaction.setDate(request.getDate());
        transaction.setDescription(request.getDescription());

        Transaction transactionSaved = transacaoService.saveTransaction(transaction);
        return ResponseEntity.ok(converterParaResponseDTO(transactionSaved));
    }

    @GetMapping(value = "/{id}/{month}/{year}")
    public ResponseEntity<List<TransactionResponseDTO>> listByUserAndMonthAndYear(
            @PathVariable(value = "id") Long id,
            @PathVariable(value = "month") Integer monthId,
            @PathVariable(value = "year") Integer yearId
    ) {

        User user = userService.findById(id);

        List<Transaction> transactions = transacaoService.findByUserAndMonthAndYear(user, monthId, yearId);
        List<TransactionResponseDTO> response = transactions.stream()
                .map(this::converterParaResponseDTO)
                .collect(Collectors.toList());

        return ResponseEntity.ok(response);
    }

    @GetMapping(value = "/{id}")
    public ResponseEntity<TransactionResponseDTO> getById(@PathVariable(value = "id") Long id) {
        return ResponseEntity.ok(converterParaResponseDTO(transacaoService.findById(id)));
    }

    @PutMapping(value = "/{id}")
    public ResponseEntity<TransactionResponseDTO> update(@PathVariable(value = "id") Long id, @RequestBody TransactionRequestDTO request) {
        Transaction transactionConverted = new Transaction().builder()
                .description(request.getDescription())
                .type(TypeTransaction.valueOf(request.getType()))
                .date(request.getDate())
                .amount(request.getValue())
                .build();

        Transaction transaction = transacaoService.update(id, transactionConverted);
        return ResponseEntity.ok(converterParaResponseDTO(transaction));
    }

    @DeleteMapping(value = "/{id}")
    public ResponseEntity<Void> delete(@PathVariable(value = "id") Long id) {
        transacaoService.delete(id);
        return ResponseEntity.noContent().build();
    }

    private TransactionResponseDTO converterParaResponseDTO(Transaction transaction) {
        TransactionResponseDTO dto = new TransactionResponseDTO();
        dto.setId(transaction.getId());
        dto.setUserId(transaction.getUser().getId());
        dto.setUserName(transaction.getUser().getName());
        dto.setValue(transaction.getAmount());
        dto.setType(transaction.getType().name());
        dto.setDate(transaction.getDate());
        dto.setDescription(transaction.getDescription());
        return dto;
    }
} 