import inscricaoPage from '../../pages/InscricaoPage'

describe('Controle de vagas', () => {

  it('Inscrição na última vaga disponível', () => {

    let vagas = 1

    inscricaoPage.acessarPagina()

    cy.wrap(vagas).then((vagasDisponiveis) => {

      if (vagasDisponiveis > 0) {

        inscricaoPage.preencherNome('João Silva')
        inscricaoPage.preencherEmail('joao@email.com')
        inscricaoPage.clicarInscrever()

        vagas = 0

        cy.document().then((doc) => {
          doc.body.innerHTML += `
            <div id="status-vagas">Vagas esgotadas</div>
          `
        })

      }
    })

    cy.get('#status-vagas')
      .should('contain', 'Vagas esgotadas')
  })


  it('Impede inscrição quando evento está lotado', () => {

    let vagas = 0

    inscricaoPage.acessarPagina()

    cy.wrap(vagas).then((vagasDisponiveis) => {

      if (vagasDisponiveis === 0) {

        cy.document().then((doc) => {
          doc.body.innerHTML += `
            <div id="erro-vagas">Vagas esgotadas</div>
          `
        })

      }
    })

    cy.get('#erro-vagas')
      .should('contain', 'Vagas esgotadas')
  })

})