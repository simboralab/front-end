document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('input[required], select[required]');

    form.forEach(input => {
        // Prevenir tooltip padrão, mas manter validação
        input.addEventListener('invalid', function (e) {
            // Prevenir tooltip nativo
            e.preventDefault();
            // Manter validação HTML5 funcionando
            this.setCustomValidity(' ');
        }, true);

        // Limpar validação customizada quando começar a digitar ou mudar
        if (input.type === 'checkbox') {
            input.addEventListener('change', function () {
                this.setCustomValidity('');
            });
        } else {
            input.addEventListener('input', function () {
                this.setCustomValidity('');
            });
        }
    })
});

// Função para mostar erro de validação
/**
 * @param {string} inputId
 * @param {string} messageId
 * @param {string} message 
 */
function showError(inputId, messageId, message) {
    const input = document.getElementById(inputId);
    if (!input) return;

    const errorSpan = document.getElementById(messageId);

    if (errorSpan) {
        errorSpan.textContent = message
        errorSpan.classList.add('show');
    }
}

// Função para limpar erro de validação
/**
 * @param {string} inputId
 * @param {string} messageId 
 */
function clearValidation(inputId, messageId) {
    const input = document.getElementById(inputId);
    if (!input) return;

    const errorSpan = document.getElementById(messageId);

    if (errorSpan) {
        errorSpan.textContent = '';
        errorSpan.classList.remove('show');
    }
}

// Aguardar DOM carregar
document.addEventListener('DOMContentLoaded', function () {
    initValidation();
});



// Função principal de validação
function initValidation() {
    const editForm = document.querySelector('edit-profile-form form');
    if (!editForm) return;

    // Referências dos campos
    const nomeInput = document.getElementById('id_nome');
    const cidadeInput = document.getElementById('id_cidade');
    const estadoSelect = document.getElementById('id_estado');
    const generoSelect = document.getElementById('id_genero');

    // 1. Validar Nome Social
    if (nomeInput) {
        nomeInput.addEventListener('blur', function () {
            const nomeValue = this.value.trim();
            if (!nomeValue) {
                showError('id_nome', 'erro-nome', 'Por favor, insira seu Nome Social');
            } else {
                clearValidation('id_nome', 'erro-nome');
            }
        })

        nomeInput.addEventListener('input', function () {
            const inputContainer = this.closest('.container');
            if (inputContainer && inputContainer.classList.contains('error')) {
                clearValidation('id_nome', 'erro-nome');
            }
        });

        // - Verificar tamanho mínimo se necessário
        nomeInput.addEventListener('blur', function () {
            const nomeValue = this.value.trim();
            if (nomeValue && nomeValue.length < 2) {
                showError('id_nome', 'erro-nome', 'O nome deve ter pelo menos 2 caracteres');
            }
        });

        // - Verificar caracteres especiais se necessário
        nomeInput.addEventListener('blur', function () {
            const nomeValue = this.value.trim();
            const nameRegex = /^[a-zA-ZÀ-ÿ\s'-]+$/;
            if (nomeValue && !nameRegex.test(nomeValue)) {
                showError('id_nome', 'erro-nome', 'O nome contém caracteres inválidos');
            }
        });
    }

    // 2. Validar Cidade
    if (cidadeInput) {
        // Verificar se o campo estiver vazio
        cidadeInput.addEventListener('blur', function () {
            const cidadeValue = this.value.trim();
            if (!cidadeValue) {
                showError('id_cidade', 'erro-cidade', 'Por favor, informe sua Cidade.');
            } else {
                clearValidation('id_cidade', 'erro-cidade');
            }
        });

        cidadeInput.addEventListener('input', function () {
            const inputContainer = this.closest('.input-container');
            if (inputContainer && inputContainer.classList.contains('error')) {
                clearValidation('id_cidade', 'erro-cidade');
            }
        });
    }

    // 3. Validar Estado
    if (estadoSelect) {
        estadoSelect.addEventListener('change', function () {
            const estadoValue = this.value.trim();
            if (!estadoValue) {
                showError('id_estado', 'erro-estado', 'Por favor, selecione um Estado.');
            } else {
                clearValidation('id_estado', 'erro-estado');
            }
        });

        estadoSelect.addEventListener('input', function () {
            const inputContainer = this.closest('.input-container');
            if (inputContainer && inputContainer.classList.contains('error')) {
                clearValidation('id_estado', 'erro-estado');
            }
        });
    }

    // 5. Validar Gênero
    if (generoSelect) {
        generoSelect.addEventListener('change', function () {
            const generoValue = this.value.trim();
            if (!generoValue) {
                showError('id_genero', 'erro-genero', 'Por favor, selecione um Gênero.');
            } else {
                clearValidation('id_genero', 'erro-genero');
            }
        });

        generoSelect.addEventListener('input', function () {
            const inputContainer = this.closest('.input-container');
            if (inputContainer && inputContainer.classList.contains('error')) {
                clearValidation('id_genero', 'erro-genero');
            }
        });
    }

    // Validação do submit para salvar as alterações
    //
    // Validar todos os campos antes do envio das alterações

    editForm.addEventListener('submit', function (e) {
        let isValid = true;

        // Validar nome social
        if (nomeInput && (!nomeInput.value.trim())) {
            showError('id_nome', 'erro-nome', 'Por favor, insira seu Nome Social');
            isValid = false;
        }

        // Validar cidade
        if (cidadeInput && (!cidadeInput.value.trim())) {
            showError('id_cidade', 'erro-cidade', 'Por favor, informe sua Cidade.');
            isValid = false;
        }

        if (estadoSelect && !estadoSelect.value.trim()) {
            showError('id_estado', 'erro-estado', 'Por favor, selecione um Estado.');
            isValid = false;
        }

        if (generoSelect && !generoSelect.value.trim()) {
            showError('id_genero', 'erro-genero', 'Por favor, selecione um Gênero.');
            isValid = false;
        }

        // Se houver erros, previnir o envio e focar no primeiro campo com erro
        if (!isValid) {
            e.preventDefault();
            const firstError = editForm.querySelector('.error input, .error select');
            if (firstError) {
                firstError.focus();
            }
        }
    });
}