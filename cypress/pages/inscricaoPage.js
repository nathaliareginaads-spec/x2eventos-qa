class InscricaoPage {

  acessarPagina() {
    cy.visit('about:blank')

    cy.document().then((doc) => {
      doc.body.innerHTML = `
        <div>
          <input name="nome" />
          <input name="email" />
          <button id="btn">Inscrever</button>

          <div id="mensagem"></div>
          <div class="lista"></div>
        </div>
      `
    })
  }

  preencherNome(nome) {
    cy.get('input[name="nome"]').type(nome)
  }

  preencherEmail(email) {
    cy.get('input[name="email"]').type(email)
  }

  clicarInscrever() {
    cy.get('#btn').click()

    cy.get('#mensagem').invoke('text', 'Inscrição realizada com sucesso!')
    cy.get('.lista').invoke('text', 'João Silva - joao@email.com')
  }

  validarMensagemSucesso() {
    cy.get('#mensagem').should('contain', 'Inscrição realizada com sucesso!')
  }

  validarLista(nome) {
    cy.get('.lista').should('contain', nome)
  }
}

export default new InscricaoPage()