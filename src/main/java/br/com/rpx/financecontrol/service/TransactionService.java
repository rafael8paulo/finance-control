package br.com.rpx.financecontrol.service;

import br.com.rpx.financecontrol.model.Transaction;
import br.com.rpx.financecontrol.model.User;
import br.com.rpx.financecontrol.repository.TransactionRepository;
import jakarta.transaction.Transactional;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;

@Slf4j
@Service
@AllArgsConstructor
public class TransactionService {


    private final TransactionRepository transactionRepository;

    @Transactional
    public Transaction saveTransaction(Transaction transaction) {
        return transactionRepository.save(transaction);
    }

    public List<Transaction> findByUserAndMonthAndYear(
            User user,
            Integer idMonth,
            Integer idYear
    ) {
        LocalDate dateStart = LocalDate.of(idYear, idMonth, 1);
        LocalDate dateEnd = dateStart.plusMonths(1).minusDays(1);

        log.info("[{}]Data inicial {} data final {}", user.getId(), dateStart, dateEnd);

        return transactionRepository.findByUserAndDateBetween(user, dateStart, dateEnd);
    }

    public Transaction findById(Long id) {
        return transactionRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Transação não encontrada"));
    }

    @Transactional
    public Transaction update(Long id, Transaction transaction) {
        Transaction transactionDb = findById(id);
        updateData(transaction, transactionDb);
        return transactionRepository.save(transactionDb);
    }

    public void updateData(Transaction request, Transaction db) {
        db.setDescription(request.getDescription());
        db.setType(request.getType());
        db.setDate(request.getDate());
        db.setAmount(request.getAmount());
    }

    public void delete(Long id) {
        transactionRepository.deleteById(id);
    }
}