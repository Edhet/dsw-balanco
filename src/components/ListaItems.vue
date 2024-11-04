<script setup lang="ts">
import { TipoTransacao } from '@/models/tipo-transacao';
import type { Transacao } from '@/models/transacao'
import { computed } from 'vue';

const props = defineProps<{
    transacoes: Transacao[]
}>()

const emits = defineEmits<{
    delete: [string],
    up: [string],
    down: [string]
}>()

    const isButtonDisabled = computed(()=>{
        return props.transacoes && props.transacoes.length < 2
    })
</script>

<template>
    <section>
        <h2>Lista de transações</h2>
        <p v-if="transacoes.length === 0">Ops, sem transações por enquanto!</p>
        <div class="wrapper-lista" v-if="transacoes.length > 0">
            <div class="item-lista" v-for="transacao in transacoes" :key="transacao.id" >
                <div class="item-lista-header">
                    <p>{{ transacao.ordem }}</p>
                    <p>|</p>
                    <p>{{ transacao.descricao }}</p>
                </div>
                <p v-bind:class="transacao.tipo == TipoTransacao.DEBITO ? 'red' : 'green'">{{ transacao.valor }}</p>
                <button @click="$emit('delete', transacao.id)">Deletar</button>

                <div class="item-lista-ordem">
                    <button :disabled="isButtonDisabled" @click="$emit('up', transacao.descricao)">↑</button>
                    <button :disabled="isButtonDisabled" @click="$emit('down', transacao.descricao)">↓</button>
                </div>
            </div>
        </div>
    </section>
</template>

<style>
.item-lista-ordem button{
    flex: 1;
}
.item-lista-header, .item-lista-ordem{
    display: flex;
    gap: 16px;
}

.wrapper-lista{
    display: flex;
    flex-direction: column;
    gap: 16px;
    max-height: 380px;
    overflow-y: scroll;
    padding-right: 12px;
}

.item-lista{
    display: flex;
    flex-direction: column;
    gap: 12px;
}
.green {
    color: green;
}

.red {
    color: red;
}
</style>