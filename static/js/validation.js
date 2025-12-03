// =============================================
// VALIDAÇÃO UNIFICADA: CADASTRO | LOGIN | RECUPERAÇÃO
// =============================================

// Validação em camadas:
// 1. HTML5 (required) - funciona mesmo com JS desabilitado
// 2. JavaScript - melhora UX com feedback customizado
// 3. Backend - validação final obrigatória no servidor

// =============================================
// PREVENIR TOOLTIP NATIVO E MANTER VALIDATION HTML5
// =============================================
document.addEventListener('DOMContentLoaded', function () {
    const inputs = document.querySelectorAll('input[required], select[required]');

    inputs.forEach(input => {
        // Prevenir tooltip padrão, mas manter validação HTML5
        input.addEventListener('invalid', function (e) {
            e.preventDefault();
            // evita tooltip nativo do navegador, mas não anula validação
            this.setCustomValidity(' ');
        }, true);

        // Limpar custom validity quando usuário digitar/mudar
        if (input.type === 'checkbox') {
            input.addEventListener('change', function () {
                this.setCustomValidity('');
            });
        } else {
            input.addEventListener('input', function () {
                this.setCustomValidity('');
            });
        }
    });

    // Inicializar validações
    initValidation();
});

// =============================================
// FUNÇÕES AUXILIARES (reutilizadas uma vez)
// =============================================
function showError(inputId, messageId, message) {
    const input = document.getElementById(inputId);
    if (!input) return;

    const errorSpan = document.getElementById(messageId);
    const inputContainer = input.closest('.input-container');
    const checkboxContainer = input.closest('.checkbox-container');

    if (inputContainer) {
        inputContainer.classList.remove('success');
        inputContainer.classList.add('error');
        input.setAttribute('aria-invalid', 'true');
    }

    if (checkboxContainer) {
        checkboxContainer.classList.add('error');
        input.setAttribute('aria-invalid', 'true');
    }

    if (errorSpan) {
        errorSpan.textContent = message;
        errorSpan.classList.add('show');
    }
}

function clearValidation(inputId, messageId) {
    const input = document.getElementById(inputId);
    if (!input) return;

    const errorSpan = document.getElementById(messageId);
    const inputContainer = input.closest('.input-container');
    const checkboxContainer = input.closest('.checkbox-container');

    if (inputContainer) {
        inputContainer.classList.remove('error', 'success');
        input.removeAttribute('aria-invalid');
    }

    if (checkboxContainer) {
        checkboxContainer.classList.remove('error');
        input.removeAttribute('aria-invalid');
    }

    if (errorSpan) {
        errorSpan.textContent = '';
        errorSpan.classList.remove('show');
    }
}

// =============================================
// FUNÇÕES DE VALIDAÇÃO DE DADOS
// =============================================
function validateEmail(email) {
    const emailRegex = /^[a-zA-Z0-9!#$%&'*+\-/=?^_`{|}~](?!.*?\.\.)(?!.*?\.$)[a-zA-Z0-9!#$%&'*+\-/=?^_`{|}~.]*[a-zA-Z0-9!#$%&'*+\-/=?^_`{|}~]@(?:[a-zA-Z0-9](?:[a-zA-Z0-9-]*[a-zA-Z0-9])?\.)+[a-zA-Z0-9](?:[a-zA-Z0-9-]*[a-zA-Z0-9])?$/;
    return emailRegex.test(email);
}

function validatePassword(password) {
    // Senha forte: pelo menos 8 chars, maiúscula, número e caractere especial
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return passwordRegex.test(password);
}

function validatePasswordMatch(password, confirmPassword) {
    return password === confirmPassword && password.length > 0;
}

function validateBirthDate(dateString) {
    if (!dateString) return false;

    const birthDate = new Date(dateString);
    if (isNaN(birthDate.getTime())) return false;

    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();

    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
        age--;
    }

    return age >= 18;
}

// =============================================
// INICIALIZAÇÃO PRINCIPAL - detecta quais forms estão na página
// =============================================
function initValidation() {
    // Detectar formulários (padrão da tua estrutura)
    const cadastroForm = document.querySelector('.cadastro-form form');
    const loginForm = document.querySelector('.login-form form');

    // Se existir o formulário de cadastro/redefinição
    if (cadastroForm) {
        attachCadastroValidation(cadastroForm);
    }

    // Se existir o formulário de login
    if (loginForm) {
        attachLoginValidation(loginForm);
    }
}

// =============================================
// VALIDAÇÃO: CADASTRO e/OU REDEFINIÇÃO (mesmo form structure)
// =============================================
function attachCadastroValidation(form) {
    // Referências (pode faltar alguns elementos dependendo da página; checamos com if)
    const nome = document.getElementById('id_nome');
    const sobrenome = document.getElementById('id_sobrenome');
    const emailCadastro = document.getElementById('id_email_cadastro');
    const senhaCadastro = document.getElementById('id_senha_cadastro');
    const confirmarSenha = document.getElementById('id_confirmar_senha');
    const dataNascimento = document.getElementById('id_data_nascimento');
    const aceitarPoliticas = document.getElementById('id_aceitar_politicas');
    const senhaAntiga = document.getElementById('id_senha_recuperacao'); // só existe na tela de recuperação

    // ---------- EMAIL ----------
    if (emailCadastro) {
        emailCadastro.addEventListener('blur', function () {
            const email = this.value.trim();
            if (!email) {
                showError('id_email_cadastro', 'erro-email-cadastro', 'Por favor, insira seu e-mail');
            } else if (!validateEmail(email)) {
                showError('id_email_cadastro', 'erro-email-cadastro', 'Por favor, insira um e-mail válido');
            } else {
                clearValidation('id_email_cadastro', 'erro-email-cadastro');
            }
        });

        emailCadastro.addEventListener('input', function () {
            clearValidation('id_email_cadastro', 'erro-email-cadastro');
        });
    }

    // ---------- NOME ----------
    if (nome) {
        const nameRegex = /^[a-zA-ZÀ-ÿ\s'-]+$/;
        nome.addEventListener('blur', function () {
            const v = this.value.trim();
            if (!v) {
                showError('id_nome', 'erro-nome', 'Por favor, insira seu nome');
            } else if (v.length < 2) {
                showError('id_nome', 'erro-nome', 'O nome deve ter pelo menos 2 caracteres');
            } else if (!nameRegex.test(v)) {
                showError('id_nome', 'erro-nome', 'O nome contém caracteres inválidos');
            } else {
                clearValidation('id_nome', 'erro-nome');
            }
        });
        nome.addEventListener('input', function () {
            clearValidation('id_nome', 'erro-nome');
        });
    }

    // ---------- SOBRENOME ----------
    if (sobrenome) {
        const nameRegex = /^[a-zA-ZÀ-ÿ\s'-]+$/;
        sobrenome.addEventListener('blur', function () {
            const v = this.value.trim();
            if (!v) {
                showError('id_sobrenome', 'erro-sobrenome', 'Por favor, insira seu sobrenome');
            } else if (v.length < 2) {
                showError('id_sobrenome', 'erro-sobrenome', 'O sobrenome deve ter pelo menos 2 caracteres');
            } else if (!nameRegex.test(v)) {
                showError('id_sobrenome', 'erro-sobrenome', 'O sobrenome contém caracteres inválidos');
            } else {
                clearValidation('id_sobrenome', 'erro-sobrenome');
            }
        });
        sobrenome.addEventListener('input', function () {
            clearValidation('id_sobrenome', 'erro-sobrenome');
        });
    }

    // ---------- SENHA (nova) ----------
    if (senhaCadastro) {
        senhaCadastro.addEventListener('blur', function () {
            const senha = this.value.trim();
            if (!senha) {
                showError('id_senha_cadastro', 'erro-senha-cadastro', 'Por favor, insira sua senha');
            } else if (!validatePassword(senha)) {
                showError('id_senha_cadastro', 'erro-senha-cadastro', 'A senha deve ter pelo menos 8 caracteres, incluindo maiúsculas, número e caractere especial');
            } else {
                clearValidation('id_senha_cadastro', 'erro-senha-cadastro');
            }
        });

        senhaCadastro.addEventListener('input', function () {
            clearValidation('id_senha_cadastro', 'erro-senha-cadastro');

            // se existir confirmarSenha, revalida coincidência
            if (confirmarSenha && confirmarSenha.value.trim()) {
                if (!validatePasswordMatch(this.value.trim(), confirmarSenha.value.trim())) {
                    showError('id_confirmar_senha', 'erro-confirmar-senha', 'As senhas não coincidem');
                } else {
                    clearValidation('id_confirmar_senha', 'erro-confirmar-senha');
                }
            }

            // adicional: se houver senha antiga (recovery), evitar igualdade (feedback imediato)
            if (senhaAntiga && senhaAntiga.value.trim() && this.value.trim() === senhaAntiga.value.trim()) {
                showError('id_senha_cadastro', 'erro-senha-cadastro', 'A nova senha deve ser diferente da senha atual');
            }
        });
    }

    // ---------- CONFIRMAR SENHA ----------
    if (confirmarSenha) {
        confirmarSenha.addEventListener('blur', function () {
            const confirme = this.value.trim();
            const senha = senhaCadastro ? senhaCadastro.value.trim() : '';
            if (!confirme) {
                showError('id_confirmar_senha', 'erro-confirmar-senha', 'Por favor, confirme sua senha');
            } else if (!validatePasswordMatch(senha, confirme)) {
                showError('id_confirmar_senha', 'erro-confirmar-senha', 'As senhas não coincidem');
            } else {
                clearValidation('id_confirmar_senha', 'erro-confirmar-senha');
            }
        });

        confirmarSenha.addEventListener('input', function () {
            clearValidation('id_confirmar_senha', 'erro-confirmar-senha');
        });
    }

    // ---------- DATA DE NASCIMENTO ----------
    if (dataNascimento) {
        dataNascimento.addEventListener('blur', function () {
            const val = this.value.trim();
            if (!val) {
                showError('id_data_nascimento', 'erro-data-nascimento', 'Por favor, insira sua data de nascimento');
            } else if (!validateBirthDate(val)) {
                showError('id_data_nascimento', 'erro-data-nascimento', 'Você deve ter pelo menos 18 anos');
            } else {
                clearValidation('id_data_nascimento', 'erro-data-nascimento');
            }
        });

        dataNascimento.addEventListener('change', function () {
            clearValidation('id_data_nascimento', 'erro-data-nascimento');
        });
    }

    // ---------- ACEITAR POLÍTICAS (checkbox) ----------
    if (aceitarPoliticas) {
        aceitarPoliticas.addEventListener('change', function () {
            if (this.checked) clearValidation('id_aceitar_politicas', 'erro-aceitar-politicas');
        });
    }

    // ---------- SENHA ANTIGA (apenas tela de recuperação) ----------
    if (senhaAntiga) {
        senhaAntiga.addEventListener('blur', function () {
            if (!this.value.trim()) {
                showError('id_senha_recuperacao', 'erro-senha-recuperacao', 'Por favor, insira sua senha atual');
            } else {
                clearValidation('id_senha_recuperacao', 'erro-senha-recuperacao');
            }
        });

        senhaAntiga.addEventListener('input', function () {
            clearValidation('id_senha_recuperacao', 'erro-senha-recuperacao');

            // se já tiver nova senha, garantir que não sejam iguais (feedback)
            if (senhaCadastro && senhaCadastro.value.trim() && senhaCadastro.value.trim() === this.value.trim()) {
                showError('id_senha_cadastro', 'erro-senha-cadastro', 'A nova senha deve ser diferente da senha atual');
            } else {
                // se nova senha também havia erro por igualdade, limpar
                if (senhaCadastro && senhaCadastro.value.trim() && validatePassword(senhaCadastro.value.trim())) {
                    clearValidation('id_senha_cadastro', 'erro-senha-cadastro');
                }
            }
        });
    }

    // ---------- SUBMIT do FORM de cadastro/recovery ----------
    form.addEventListener('submit', function (e) {
        let isValid = true;

        // Email
        if (emailCadastro) {
            const v = emailCadastro.value.trim();
            if (!v || !validateEmail(v)) {
                showError('id_email_cadastro', 'erro-email-cadastro', 'Por favor, insira um e-mail válido');
                isValid = false;
            }
        }

        // Nome
        if (nome && !nome.value.trim()) {
            showError('id_nome', 'erro-nome', 'Por favor, insira seu nome');
            isValid = false;
        }

        // Sobrenome
        if (sobrenome && !sobrenome.value.trim()) {
            showError('id_sobrenome', 'erro-sobrenome', 'Por favor, insira seu sobrenome');
            isValid = false;
        }

        // Senha nova
        if (senhaCadastro) {
            const s = senhaCadastro.value.trim();
            if (!s || !validatePassword(s)) {
                showError('id_senha_cadastro', 'erro-senha-cadastro', 'A senha deve ter pelo menos 8 caracteres, incluindo maiúsculas, número e caractere especial');
                isValid = false;
            }
        }

        // Confirmar senha
        if (confirmarSenha && senhaCadastro) {
            if (!validatePasswordMatch(senhaCadastro.value.trim(), confirmarSenha.value.trim())) {
                showError('id_confirmar_senha', 'erro-confirmar-senha', 'As senhas não coincidem');
                isValid = false;
            }
        }

        // Data de nascimento
        if (dataNascimento) {
            const d = dataNascimento.value.trim();
            if (!d || !validateBirthDate(d)) {
                showError('id_data_nascimento', 'erro-data-nascimento', 'Você deve ter pelo menos 18 anos');
                isValid = false;
            }
        }

        // Aceitar políticas
        if (aceitarPoliticas && !aceitarPoliticas.checked) {
            showError('id_aceitar_politicas', 'erro-aceitar-politicas', 'Você deve aceitar os Termos de Serviço e a Política de Privacidade');
            isValid = false;
        }

        // Senha antiga (recovery)
        if (senhaAntiga) {
            if (!senhaAntiga.value.trim()) {
                showError('id_senha_recuperacao', 'erro-senha-recuperacao', 'Por favor, insira sua senha atual');
                isValid = false;
            } else if (senhaCadastro && senhaCadastro.value.trim() && senhaAntiga.value.trim() === senhaCadastro.value.trim()) {
                // nova senha não pode ser igual à antiga
                showError('id_senha_cadastro', 'erro-senha-cadastro', 'A nova senha deve ser diferente da senha atual');
                isValid = false;
            }
        }

        if (!isValid) {
            e.preventDefault();
            // focar no primeiro campo com erro
            const firstError = form.querySelector('.error input, .error select, .checkbox-container.error input');
            if (firstError) firstError.focus();
        }
    });
}

// =============================================
// VALIDAÇÃO: LOGIN (se houver form de login)
// =============================================
function attachLoginValidation(form) {
    const emailLogin = document.getElementById('id_email_login');
    const senhaLogin = document.getElementById('id_senha_login');

    if (emailLogin) {
        emailLogin.addEventListener('blur', function () {
            const v = this.value.trim();
            if (!v || !validateEmail(v)) {
                showError('id_email_login', 'erro-email-login', 'Por favor, insira um e-mail válido');
            } else {
                clearValidation('id_email_login', 'erro-email-login');
            }
        });

        emailLogin.addEventListener('input', function () {
            clearValidation('id_email_login', 'erro-email-login');
        });
    }

    if (senhaLogin) {
        senhaLogin.addEventListener('blur', function () {
            const v = this.value.trim();
            if (!v) {
                showError('id_senha_login', 'erro-senha-login', 'Por favor, insira sua senha');
            } else if (!validatePassword(v)) {
                // opcional: exigir mesma regra de senha forte no login
                showError('id_senha_login', 'erro-senha-login', 'A senha deve ter pelo menos 8 caracteres');
            } else {
                clearValidation('id_senha_login', 'erro-senha-login');
            }
        });

        senhaLogin.addEventListener('input', function () {
            clearValidation('id_senha_login', 'erro-senha-login');
        });
    }

    form.addEventListener('submit', function (e) {
        let isValid = true;

        if (emailLogin && (!emailLogin.value.trim() || !validateEmail(emailLogin.value.trim()))) {
            showError('id_email_login', 'erro-email-login', 'Por favor, insira um e-mail válido');
            isValid = false;
        }

        if (senhaLogin && !senhaLogin.value.trim()) {
            showError('id_senha_login', 'erro-senha-login', 'Por favor, insira sua senha');
            isValid = false;
        }

        if (!isValid) {
            e.preventDefault();
            const firstError = form.querySelector('.error input');
            if (firstError) firstError.focus();
        }
    });
}
