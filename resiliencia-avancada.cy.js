import inscricaoPage from '../../pages/InscricaoPage'

describe('Resiliência da automação (self-healing)', () => {

  it('Deve encontrar botão mesmo com mudança de seletor', () => {

    inscricaoPage.acessarPagina()

    inscricaoPage.preencherNome('João Silva')
    inscricaoPage.preencherEmail('joao@email.com')

    // Simulação: botão pode ter mudado de seletor
    const seletoresPossiveis = [
      '#btn',
      'button',
      'button:contains("Inscrever")'
    ]

    let encontrado = false

    cy.wrap(seletoresPossiveis).each((selector) => {

      cy.get('body').then(($body) => {

        if ($body.find(selector).length > 0 && !encontrado) {

          encontrado = true

          cy.get(selector).first().click()

        }

      })

    })

    cy.then(() => {
      expect(encontrado).to.eq(true)
    })

  })

})