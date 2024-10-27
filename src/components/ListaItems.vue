<script setup lang="ts">
import { TipoTransacao } from '@/models/tipo-transacao';
import type { Transacao } from '@/models/transacao'

const props = defineProps<{
    transacoes: Transacao[]
}>()

const emits = defineEmits<{
    delete: [string],
    up: [string],
    down: [string]
}>()
</script>

<template>
    <h2>Lista de transações</h2>
    <div v-if="transacoes.length > 0">
        <div v-for="transacao in transacoes" :key="transacao.descricao" style="display: flex;">
            <p style="font-size: small; margin-right: 4px;">{{ transacao.ordem }}</p>
            <p>{{ transacao.descricao }}</p>
            <p v-bind:class="transacao.tipo == TipoTransacao.DEBITO ? 'red' : 'green'"
                style="margin-left: auto; padding: 0;">{{ transacao.valor }}</p>
            <button @click="$emit('delete', transacao.descricao)" style="margin-left: 4px;">Deletar</button>

            <button @click="$emit('up', transacao.descricao)">↑</button>
            <button @click="$emit('down', transacao.descricao)">⌄</button>
        </div>
    </div>
</template>

<style>
.green {
    color: green;
}

.red {
    color: red;
}
</style>