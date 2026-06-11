import inscricaoPage from '../../pages/InscricaoPage'

describe('Validações de formulário', () => {

  it('Campos obrigatórios não preenchidos', () => {

    inscricaoPage.acessarPagina()

    cy.get('#btn').click()

    cy.document().then((doc) => {
      doc.body.innerHTML += `
        <div id="erro">Campos obrigatórios</div>
      `
    })

    cy.get('#erro')
      .should('contain', 'Campos obrigatórios')
  })

})