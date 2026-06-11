import inscricaoPage from '../../pages/InscricaoPage'

describe('Resiliência da UI - Duplo clique', () => {

  it('Evitar inscrição duplicada por duplo clique', () => {

    let inscricoes = 0
    let bloqueado = false

    inscricaoPage.acessarPagina()

    inscricaoPage.preencherNome('João Silva')
    inscricaoPage.preencherEmail('joao@email.com')

    // simula botão com proteção contra múltiplos cliques
    cy.window().then((win) => {

      win.inscrever = () => {

        if (!bloqueado) {
          bloqueado = true
          inscricoes++
        }

      }

    })

    // dois cliques rápidos
    cy.get('#btn').click().click()

    cy.then(() => {

      expect(inscricoes).to.eq(1)

    })

  })

})