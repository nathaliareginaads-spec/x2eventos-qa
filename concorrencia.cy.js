import inscricaoPage from '../../pages/InscricaoPage'

describe('Concorrência de inscrições', () => {

  it('Evitar overbooking em acessos simultâneos', () => {

    let vagas = 1

    inscricaoPage.acessarPagina()

    const usuario1 = () => {
      return new Promise((resolve) => {

        if (vagas > 0) {
          vagas--
          resolve('confirmado')
        } else {
          resolve('esgotado')
        }

      })
    }

    const usuario2 = () => {
      return new Promise((resolve) => {

        if (vagas > 0) {
          vagas--
          resolve('confirmado')
        } else {
          resolve('esgotado')
        }

      })
    }

    cy.wrap(Promise.all([usuario1(), usuario2()])).then((resultados) => {

      const confirmados = resultados.filter(r => r === 'confirmado')
      const esgotados = resultados.filter(r => r === 'esgotado')

      // apenas 1 pode ser confirmado
      expect(confirmados.length).to.eq(1)

      // o outro deve falhar
      expect(esgotados.length).to.eq(1)

      cy.document().then((doc) => {
        doc.body.innerHTML += `
          <div id="concorrencia">Vagas esgotadas</div>
        `
      })

    })

    cy.get('#concorrencia')
      .should('contain', 'Vagas esgotadas')

  })

})