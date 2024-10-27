<script setup lang="ts">
import type { Transacao } from '@/models/transacao'
import { ref, type Ref } from 'vue'
import FormAdicao from '@/components/FormAdicao.vue'
import ListaItems from '@/components/ListaItems.vue'
import { TipoTransacao } from '@/models/tipo-transacao'

let listaTransacoes: Transacao[] = []

const TAMANHO_PAGINA = 5
const itemsPagina: Ref<Transacao[]> = ref([])
let pagina = 0

let saldo: Ref<number> = ref(0)

function adicionarTransacao(nova: Transacao | undefined) {
    if (!nova || listaTransacoes.map(t => t.descricao).includes(nova.descricao)) return

    let lattest = 1
    listaTransacoes.forEach(t => {
        if (t.ordem && t.ordem >= lattest) lattest = t.ordem + 1
    })

    nova.ordem = lattest;
    listaTransacoes.push(nova)
    atualizarSaldoEPagina()
}

function calcularSaldo() {
    let saldoCalculado = 0
    for (let transacao of listaTransacoes) {
        if (transacao.tipo == TipoTransacao.CREDITO)
            saldoCalculado += transacao.valor
        else
            saldoCalculado -= transacao.valor
    }
    saldo.value = saldoCalculado
}

function deletarTransacao(descricao: string) {
    const ordemRemovido = listaTransacoes.filter(t => t.descricao == descricao)[0].ordem

    listaTransacoes = listaTransacoes.filter(t => t.descricao != descricao)
    listaTransacoes.forEach(t => {
        if (t.ordem > ordemRemovido) t.ordem--
    })
    atualizarSaldoEPagina()
}

function moveUp(descricao: string) {
    let movido = listaTransacoes.filter(t => t.descricao == descricao)[0]
    if (movido.ordem == 1)
        return

    listaTransacoes.forEach(t => {
        if (t.ordem == movido.ordem - 1)
            t.ordem++
    })
    movido.ordem--

    sortTransacoes()
}

function moveDown(descricao: string) {
    let movido = listaTransacoes.filter(t => t.descricao == descricao)[0]
    if (movido.ordem == listaTransacoes.length)
        return

    listaTransacoes.forEach(t => {
        if (t.ordem == movido.ordem + 1)
            t.ordem--
    })
    movido.ordem++

    sortTransacoes()
}

function sortTransacoes() {
    listaTransacoes = listaTransacoes.sort((t1, t2) => t1.ordem - t2.ordem)
    atualizarSaldoEPagina()
}

function nextPagina() {
    if (pagina + 1 > listaTransacoes.length % 5)
        return
    mostrarPagina(++pagina)
}

function prevPagina() {
    if (pagina - 1 < 0)
        return
    mostrarPagina(--pagina)
}

function mostrarPagina(pagina: number) {
    const inicio = (TAMANHO_PAGINA * pagina)
    itemsPagina.value = listaTransacoes.slice(inicio, inicio + TAMANHO_PAGINA)
}

function atualizarSaldoEPagina() {
    mostrarPagina(pagina)
    calcularSaldo()
}
</script>

<template>
    <main>
        <FormAdicao @add="adicionarTransacao($event)"></FormAdicao>
        <ListaItems :transacoes="itemsPagina" @delete="deletarTransacao($event)" @up="moveUp($event)"
            @down="moveDown($event)"></ListaItems>
        <p v-bind:class="saldo < 0 ? 'amayellow' : ''">Saldo: {{ saldo }}</p>

        <button @click="prevPagina()">Ante</button>
        <button @click="nextPagina()">Próx</button>
    </main>
</template>

<style>
.amayellow {
    color: red;
    background-color: yellow;
}
</style>
