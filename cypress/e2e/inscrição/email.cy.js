import inscricaoPage from '../../pages/InscricaoPage'

describe('Envio de e-mail de confirmação', () => {

  it('Envio de e-mail com sucesso', () => {

    let emailService = 'online'

    inscricaoPage.acessarPagina()

    inscricaoPage.preencherNome('João Silva')
    inscricaoPage.preencherEmail('joao@email.com')
    inscricaoPage.clicarInscrever()

    cy.then(() => {

      if (emailService === 'online') {
        cy.document().then((doc) => {
          doc.body.innerHTML += `
            <div id="email-status">E-mail enviado com sucesso</div>
          `
        })
      }

    })

    cy.get('#email-status')
      .should('contain', 'E-mail enviado com sucesso')

  })


  it('Falha no envio de e-mail', () => {

    let emailService = 'offline'

    inscricaoPage.acessarPagina()

    inscricaoPage.preencherNome('Maria Silva')
    inscricaoPage.preencherEmail('maria@email.com')
    inscricaoPage.clicarInscrever()

    cy.then(() => {

      if (emailService === 'offline') {
        cy.document().then((doc) => {
          doc.body.innerHTML += `
            <div id="email-log">Falha ao enviar e-mail registrada</div>
          `
        })
      }

    })

    cy.get('#email-log')
      .should('contain', 'Falha ao enviar e-mail registrada')

  })

})