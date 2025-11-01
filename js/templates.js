
/**
 * Carrega o template da página inicial (Home).
 */
const getHomeTemplate = () => {
    // Para a home, podemos criar o HTML diretamente aqui
    return Promise.resolve(`
        <div class="container">
            <div class="grid-container">
                <section id="sobre" class="col-span-8">
                    <h1>Sobre a ONG Impacto</h1>
                    <p>Nossa missão é transformar vidas e comunidades através de ações sociais efetivas. Promovemos o desenvolvimento social, educacional e ambiental das comunidades carentes.</p>
                    <article>
                        <h2>Visão e Valores</h2>
                        <p>Ser referência em transparência, comprometimento e impacto social positivo.</p>
                    </article>
                </section>
                <aside id="contato" class="col-span-4">
                    <h2>Informações de Contato</h2>
                    <address>
                        <p>Rua da Esperança, 123 - Centro</p>
                        <p>Fortaleza, CE - CEP: 60000-000</p>
                        <p>Telefone: (85) 99999-0000</p>
                        <p>Email: <a href="mailto:contato@ongimpacto.org">contato@ongimpacto.org</a></p>
                    </address>
                </aside>
            </div>
        </div>
    `);
};

/**
 * Carrega o template da página de Projetos.
 * Usamos fetch() para carregar o arquivo HTML.
 */
const getProjetosTemplate = () => {
    return fetch('projetos.html')
        .then(response => response.text());
};

/**
 * Carrega o template da página de Cadastro.
 */
const getCadastroTemplate = () => {
    return fetch('cadastro.html')
        .then(response => response.text());
};

// Exporta as funções para o router usar
export const templates = {
    home: getHomeTemplate,
    projetos: getProjetosTemplate,
    cadastro: getCadastroTemplate
};