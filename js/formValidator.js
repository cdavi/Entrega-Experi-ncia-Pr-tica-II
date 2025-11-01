/**
 * Inicializa a validação de consistência de dados para um formulário.
 * @param {string} formId - O ID do formulário a ser validado.
 */
export const initFormValidator = (formId) => {
    const form = document.getElementById(formId);
    if (!form) return; // Sai se o formulário não existir nesta página

    // Seleciona todos os inputs com 'required'
    const inputs = form.querySelectorAll('input[required]');
    
    // Função para mostrar o erro
    const showError = (input) => {
        // Encontra a mensagem de erro específica para este input
        const errorElement = form.querySelector(`.error-message[data-error-for="${input.id}"]`);
        if (errorElement) {
            input.classList.add('is-invalid'); // Adiciona classe para CSS (opcional)
            errorElement.style.display = 'block'; // Mostra a mensagem
            
            // Define mensagens de erro customizadas
            if (input.validity.valueMissing) {
                errorElement.textContent = 'Este campo é obrigatório.';
            } else if (input.validity.typeMismatch) {
                errorElement.textContent = 'Por favor, insira um e-mail válido.';
            } else if (input.validity.patternMismatch) {
                errorElement.textContent = `Formato inválido. Use: ${input.placeholder}`;
            }
        }
    };

    // Função para esconder o erro
    const hideError = (input) => {
        const errorElement = form.querySelector(`.error-message[data-error-for="${input.id}"]`);
        if (errorElement) {
            input.classList.remove('is-invalid');
            errorElement.style.display = 'none';
        }
    };

    // Adiciona evento de 'input' para validação em tempo real
    inputs.forEach(input => {
        input.addEventListener('input', () => {
            if (input.validity.valid) {
                hideError(input);
            } else {
                showError(input);
            }
        });
    });

    // Evento de 'submit' do formulário
    form.addEventListener('submit', (event) => {
        let isFormValid = true;
        
        // Verifica todos os inputs antes de enviar
        inputs.forEach(input => {
            if (!input.validity.valid) {
                showError(input);
                isFormValid = false;
            } else {
                hideError(input);
            }
        });

        if (!isFormValid) {
            // Previne o envio do formulário se for inválido
            event.preventDefault(); 
            alert('Por favor, corrija os erros no formulário antes de enviar.');
        } else {
            // (Opcional) Ação se o formulário for válido
            alert('Formulário enviado com sucesso!');
            // event.preventDefault(); // Descomente se não quiser que a página recarregue
        }
    });
};