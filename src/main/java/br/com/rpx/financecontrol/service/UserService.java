package br.com.rpx.financecontrol.service;

import br.com.rpx.financecontrol.model.Transaction;
import br.com.rpx.financecontrol.model.User;
import br.com.rpx.financecontrol.repository.UserRepository;
import io.swagger.v3.oas.models.security.SecurityScheme;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    public User create(User user) {
        return userRepository.save(user);
    }

    public List<User> findAll() {
        return userRepository.findAll();
    }

    public User findById(Long id) {
        Optional<User> usuarioOptional = userRepository.findById(id);
        return usuarioOptional.orElseThrow(() -> new EntityNotFoundException("Usuário não encontrado com o ID: " + id));
    }

    public User update(Long id, User user) {
        User userExistente = findById(id);
        user.setId(userExistente.getId());
        return userRepository.save(user);
    }

    public void delete(Long id) {
        User user = findById(id);
        userRepository.delete(user);
    }
} 