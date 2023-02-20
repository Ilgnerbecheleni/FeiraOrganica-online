import { Button, Snackbar, InputLabel, Select, MenuItem } from '@material-ui/core';
import MuiAlert from '@material-ui/lab/Alert';
import {  useContext, useMemo, useState } from 'react';
import { Container, Voltar, TotalContainer, PagamentoContainer} from './styles';
import { useCarrinhoContext } from 'Common/context/Carrinho';
import Produto from 'components/Produto';
import { useHistory } from 'react-router-dom';
import {  usePagamentoContext } from 'Common/context/Pagamento';
import { UsuarioContext } from 'Common/context/Usuario';

function Carrinho() {
  const history = useHistory();

  const [openSnackbar, setOpenSnackbar] = useState(false);
  const {carrinho,valorTotalCarrinho,efetuarCompra} = useCarrinhoContext();
  const {saldo=0} = useContext(UsuarioContext);
  const {formaPagamento , tiposPagamento ,mudarFormaPagamento} = usePagamentoContext();


  const total = useMemo(()=>saldo - valorTotalCarrinho,[saldo,valorTotalCarrinho]); //funcao que so executa se um ou outro for atualizado
  return (
    <Container>
      <Voltar onClick={()=>{history.goBack()}}/>

      <h2>
        Carrinho
      </h2>

{
  carrinho.map(produto => {
    return(
      <Produto
      {...produto}
      key={produto.id}
      />
    )
  })
}


      <PagamentoContainer>
        <InputLabel> Forma de Pagamento </InputLabel>
        <Select
        value={formaPagamento.id}
        onChange={(event)=>{mudarFormaPagamento(event.target.value)}}
        >
          {tiposPagamento.map(pagamento=>{
            return(
            <MenuItem key={pagamento.id} value={pagamento.id}>{pagamento.nome}</MenuItem>
          )})}
        </Select>
      </PagamentoContainer>
      <TotalContainer>
          <div>
            <h2>Total no Carrinho:  </h2>
            <span>R$ {valorTotalCarrinho.toFixed(2)}</span>
          </div>
          <div>
            <h2> Saldo: </h2>
            <span> R$ {Number(saldo).toFixed(2)}</span>
          </div>
          <div>
            <h2> Saldo Total: </h2>
            <span> R${total.toFixed(2)} </span>
          </div>
        </TotalContainer>
      <Button
        onClick={() => {
          efetuarCompra();
          setOpenSnackbar(true);
        }}
        color="primary"
        variant="contained"
        disabled={total<0 || carrinho.length ===0}
      >
         Comprar
       </Button>
        <Snackbar
          anchorOrigin={
            {
              vertical: 'top',
              horizontal: 'right'
            }
          }
          open={openSnackbar}
          onClose={() => {

            setOpenSnackbar(false)
          }}
        >
           <MuiAlert
            onClose={() => setOpenSnackbar(false)}
            severity="success"
          >
            Compra feita com sucesso!
          </MuiAlert>
        </Snackbar>
    </Container>
  )
}

export default Carrinho;