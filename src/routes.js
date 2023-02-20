import { React } from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import Login from 'pages/Login'
import Feira from 'pages/Feira'
import Carrinho from 'pages/Carrinho'
import { UsuarioProvider } from 'Common/context/Usuario'
import { CarrinhoProvider } from 'Common/context/Carrinho'
import { PagamentoProvider } from 'Common/context/Pagamento'
export default function Router () {
  return (
    <BrowserRouter>
      <Switch>
        <UsuarioProvider>
          <Route exact path='/'>
            <Login />
          </Route>
          <CarrinhoProvider>
            <PagamentoProvider>
              <Route path='/feira'>
                <Feira />
              </Route>
              <Route path='/carrinho'>
                <Carrinho />
              </Route>
            </PagamentoProvider>
          </CarrinhoProvider>
        </UsuarioProvider>
      </Switch>
    </BrowserRouter>
  )
}
