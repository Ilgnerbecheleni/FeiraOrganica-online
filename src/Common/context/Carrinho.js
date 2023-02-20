import React,{createContext, useContext, useEffect, useState} from 'react'

export const CarrinhnoContext = createContext();
CarrinhnoContext.displayName = "Carrinho";


export const CarrinhoProvider = ({children})=>{
const [carrinho , setCarrinho] = useState([]);
const [quantidadeProdutos , setQuantidadeProdutos] = useState(0);
    return(
        <CarrinhnoContext.Provider value = {{carrinho , setCarrinho ,quantidadeProdutos ,setQuantidadeProdutos}}>
            {children}
        </CarrinhnoContext.Provider>
    )


}

export const useCarrinhoContext = ()=>{
const  {carrinho , setCarrinho , quantidadeProdutos ,setQuantidadeProdutos} = useContext(CarrinhnoContext);

function mudarQuantidade(id ,quantidade){


    return carrinho.map(itemdocarrinho=>{
        if(itemdocarrinho.id===id) itemdocarrinho.unidade +=quantidade;
      return itemdocarrinho;
})}

useEffect(() => {
    const novaQuantidadeProduto = carrinho.reduce((contador , produto)=> contador + produto.unidade , 0)

setQuantidadeProdutos(novaQuantidadeProduto);



}, [carrinho,setQuantidadeProdutos]);


function adicionarProduto(novoProduto){
    const temproduto = carrinho.some(itemdocarrinho =>itemdocarrinho.id === novoProduto.id);
    if(!temproduto){
      novoProduto.unidade = 1;
      return  setCarrinho(carrinhoanterior =>[...carrinhoanterior,novoProduto])
    }
    setCarrinho(mudarQuantidade(novoProduto.id ,1))
    }

    function removerProduto(id){
       const produto = carrinho.find(itemdocarrinho =>itemdocarrinho.id === id);
       const islast = produto.quantidade ===1 ;

if(!islast){
    return setCarrinho(carrinhoanterior => carrinhoanterior.filter(itemdocarrinho => itemdocarrinho.id!==id));
}
setCarrinho(mudarQuantidade(id,-1));

    }

return { carrinho,setCarrinho ,adicionarProduto,removerProduto ,quantidadeProdutos}
}
