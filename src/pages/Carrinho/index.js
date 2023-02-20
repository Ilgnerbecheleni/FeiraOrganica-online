import { Button, Snackbar, InputLabel, Select, MenuItem } from '@material-ui/core';
import MuiAlert from '@material-ui/lab/Alert';
import {  useState } from 'react';
import { Container, Voltar, TotalContainer, PagamentoContainer} from './styles';
import { useCarrinhoContext } from 'Common/context/Carrinho';
import Produto from 'components/Produto';
import { useHistory } from 'react-router-dom';
import {  usePagamentoContext } from 'Common/context/Pagamento';

function Carrinho() {
  const history = useHistory();
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const {carrinho,valorTotalCarrinho} = useCarrinhoContext();
  const {formaPagamento , tiposPagamento ,mudarFormaPagamento} = usePagamentoContext();

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
            <span> R$ </span>
          </div>
          <div>
            <h2> Saldo Total: </h2>
            <span> R$ </span>
          </div>
        </TotalContainer>
      <Button
        onClick={() => {
          setOpenSnackbar(true);
        }}
        color="primary"
        variant="contained"
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
          onClose={() => setOpenSnackbar(false)}
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