package br.com.rpx.financecontrol.repository;

import br.com.rpx.financecontrol.model.Transaction;
import br.com.rpx.financecontrol.model.TypeTransaction;
import br.com.rpx.financecontrol.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@Repository
public interface TransactionRepository extends JpaRepository<Transaction, Long> {
    List<Transaction> findByUser(User user);

    @Query("SELECT SUM(t.amount) FROM Transaction t WHERE t.user = :user AND t.type = :type AND t.date BETWEEN :dateStart AND :dateEnd")
    BigDecimal sumAmountByUserAndTypeAndBetween(
            @Param("user") User user,
            @Param("type") TypeTransaction type,
            @Param("dateStart") LocalDate dateStart,
            @Param("dateEnd") LocalDate dateEnd
    );

    @Query("select t from Transaction t where t.user = :user and t.date between :dateStart and :dateEnd order by t.date asc")
    List<Transaction> findByUserAndDateBetween(@Param("user") User user, @Param("dateStart") LocalDate dateStart, @Param("dateEnd") LocalDate dateEnd);

    @Query("select t from Transaction t  where t.user.id = :userId and t.id = :id")
    Optional<Transaction> findByIdUser(@Param("userId") Long userId, @Param("id") Long id);


    @Query("delete from Transaction t where t.user.id = :userId and t.id = :id")
    void deleteByIdAndUserId(@Param("userId") Long userId, @Param("id") Long id);

} 