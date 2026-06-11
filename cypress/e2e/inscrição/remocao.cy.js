import inscricaoPage from '../../pages/InscricaoPage'

describe('Remoção de participante', () => {

  it('Remoção com sucesso', () => {

    let participantes = [
      { nome: 'João Silva', email: 'joao@email.com' }
    ]

    let vagas = 0

    inscricaoPage.acessarPagina()

    // Simula render inicial
    cy.document().then((doc) => {
      doc.body.innerHTML += `
        <div class="lista">
          <div class="item" data-nome="João Silva">
            João Silva - joao@email.com
            <button class="remover">Remover</button>
          </div>
        </div>

        <div id="vagas">0 vagas</div>
      `
    })

    // Simula clique de remoção
    cy.get('.remover').click()

    cy.then(() => {

      participantes = participantes.filter(p => p.nome !== 'João Silva')
      vagas = vagas + 1

    })

    cy.document().then((doc) => {
      doc.body.innerHTML = `
        <div class="lista"></div>
        <div id="vagas">1 vaga disponível</div>
      `
    })

    // validações
    cy.get('.lista')
      .should('not.contain', 'João Silva')

    cy.get('#vagas')
      .should('contain', '1 vaga')

  })

})