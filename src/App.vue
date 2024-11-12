<script lang="ts">
import type { Transacao } from './models/transacao';

export default {
    methods: {
        estiloRota(nomeBotao: "criar"| "listar") {

            if(nomeBotao === "criar" && this.$route.name === 'nova-transacao'){
                return {
                    backgroundColor: "white",
                    color: "black"
                };
            }

            if(nomeBotao === "listar" && this.$route.name === 'listar-transacoes'){
                return {
                    backgroundColor: "white",
                    color: "black"
                };
            }

            return {}

        },

        deletarTransacao(id: string) {
            this.listaTransacoes = this.listaTransacoes.filter((transacao)=> id !== transacao.id).map((transacao)=>{
                return{
                    ...transacao,
                    ordem: transacao.ordem - 1
                }
            })
        },

        sortTransacoes() {
            this.listaTransacoes = this.listaTransacoes.sort((t1, t2) => t1.ordem - t2.ordem)
        },

        adicionaTransacao(transacaoCriada: Transacao){
            if (!transacaoCriada || this.listaTransacoes.map(t => t.descricao).includes(transacaoCriada.descricao))
            { alert("Transação já criada!"); return}

            let lattest = 1
            this.listaTransacoes.forEach(t => {
             if (t.ordem && t.ordem >= lattest) lattest = t.ordem + 1
            })

            transacaoCriada.ordem = lattest;
            this.listaTransacoes.push(transacaoCriada)
        }
    },
    data(){
        return {
            listaTransacoes: [] as unknown as Transacao[]
        }
    }
};
</script>

<template>
    <main>
        <header>
            <h1>Balanço</h1>
            <p> Com esta aplicação, você pode registrar e acompanhar todas as suas transações em uma única conta. </p>
            <p>Adicione descrições e valores para cada entrada ou saída de dinheiro, e visualize automaticamente o saldo atualizado após cada movimentação. Simples, intuitivo e prático para ajudar você a manter suas finanças organizadas.</p>

            <div>
                <RouterLink to="/">
                    <button :style="estiloRota('criar')" @click="">Criar Transação</button>
                </RouterLink>

                <RouterLink to="/listar">
                    <button :style="estiloRota('listar')">Lista de Transações</button>
                </RouterLink>

            </div>
        </header>
        <RouterView :listaTransacoes="listaTransacoes"                  @deletarTransacao="deletarTransacao" @sortTransacoes="sortTransacoes"
        @adicionaTransacao="adicionaTransacao"
        ></RouterView>
    </main>
</template>


<style>

header div {
    display: flex;
    gap: 12px;
}
header{
    width: 100%;
}

header h1{
    font-weight: bold;
}

header p{
    margin-bottom: 16px;
}

#app > main {
    display: grid;
    gap: 32px;
    grid-template-columns: 1fr 1fr;
    min-height: 100vh;
    place-items: center;
    max-width: 900px;
    margin: 0 auto;
}

</style>
