import inscricaoPage from '../../pages/InscricaoPage'

describe('Inscrição em evento', () => {

  it('Inscrição com dados válidos', () => {

    // Given
    inscricaoPage.acessarPagina()

    // When
    inscricaoPage.preencherNome('João Silva')
    inscricaoPage.preencherEmail('joao@email.com')
    inscricaoPage.clicarInscrever()

    // Then
    inscricaoPage.validarMensagemSucesso()
    inscricaoPage.validarLista('João Silva')
  })

})