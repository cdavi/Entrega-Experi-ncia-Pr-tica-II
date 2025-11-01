import { templates } from './templates.js';
import { initFormValidator } from './formValidator.js';

// O elemento principal onde o conteúdo será injetado
const appElement = document.getElementById('app');
const navLinks = document.querySelectorAll('.nav-link');
const navMenuCheckbox = document.getElementById('nav-toggle-checkbox');

/**
 * Carrega o conteúdo da página no DOM.
 * @param {string} routeName - O nome da rota (ex: 'home', 'projetos').
 */
const loadContent = async (routeName) => {
    // Busca a função de template correspondente
    const templateLoader = templates[routeName] || templates.home; // Padrão 'home'
    
    try {
        //Carrega o HTML do template
        const htmlContent = await templateLoader();
        
        //Injeta o HTML no DOM (Manipulação do DOM)
        appElement.innerHTML = htmlContent;

        //(Específico) Se a página for 'cadastro', inicializa o validador
        if (routeName === 'cadastro') {
            initFormValidator('cadastro-form');
        }

        // Atualiza o estado 'active' nos links de navegação
        updateActiveLink(routeName);
        
        //Fecha o menu hambúrguer (em mobile)
        navMenuCheckbox.checked = false;

    } catch (error) {
        console.error('Erro ao carregar o template:', error);
        appElement.innerHTML = '<div class="container"><p>Erro ao carregar a página. Tente novamente.</p></div>';
    }
};

/**
 * Atualiza qual link de navegação está com a classe 'active'.
 */

const updateActiveLink = (routeName) => {
    navLinks.forEach(link => {
        if (link.dataset.route === routeName) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });
};


/**
 * Lida com a navegação e eventos de hash.
 */
const handleNavigation = () => {
    // Pega o hash da URL (ex: #projetos) e remove o '#'
    const routeName = window.location.hash.substring(1) || 'home';
    loadContent(routeName);
};

/**
 * Inicializa o roteador da SPA.
 */
export const initRouter = () => {
    // ouve por mudanças no hash da URL (ex: clique em link, setas voltar/avançar)
    window.addEventListener('hashchange', handleNavigation);
    

    //Ouve o carregamento inicial da página
    window.addEventListener('load', handleNavigation);
};