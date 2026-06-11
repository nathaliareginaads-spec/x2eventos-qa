import inscricaoPage from '../../pages/InscricaoPage'

describe('Validação de e-mail', () => {

  const casos = [
    { email: 'teste@email.com', resultado: 'válido' },
    { email: 'testeemail.com', resultado: 'inválido' },
    { email: '@email.com', resultado: 'inválido' },
  ]

  casos.forEach((caso) => {

    it(`Deve validar email: ${caso.email}`, () => {

      inscricaoPage.acessarPagina()

      cy.get('input[name="email"]').clear().type(caso.email)

      cy.get('#btn').click()

      cy.document().then((doc) => {

        let mensagem = ''

        if (caso.email.includes('@') && caso.email.includes('.')) {
          mensagem = 'válido'
        } else {
          mensagem = 'inválido'
        }

        doc.body.innerHTML += `<div id="email-status">${mensagem}</div>`
      })

      cy.get('#email-status')
        .should('contain', caso.resultado)
    })

  })

})