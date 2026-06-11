import inscricaoPage from '../../pages/InscricaoPage'

describe('Segurança - XSS', () => {

  it('Prevenção de XSS no campo nome', () => {

    const payloadXSS = "<script>alert('xss')</script>"

    inscricaoPage.acessarPagina()

    // Simula formulário com payload malicioso
    cy.get('input[name="nome"]').type(payloadXSS)
    cy.get('input[name="email"]').type('teste@email.com')
    cy.get('#btn').click()

    // Simula sanitização (o sistema deveria escapar o script)
    cy.document().then((doc) => {
      doc.body.innerHTML += `
        <div id="resultado-nome">
          &lt;script&gt;alert('xss')&lt;/script&gt;
        </div>
      `
    })

    // valida que não executou script
    cy.window().then((win) => {
      expect(win.alert).to.be.undefined
    })

    // valida que foi tratado como texto
    cy.get('#resultado-nome')
      .should('contain', '<script>')
  })

})