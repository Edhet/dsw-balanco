<script setup lang="ts">
import { TipoTransacao } from '@/models/tipo-transacao'
import type { Transacao } from '@/models/transacao'
import { ref, type Ref } from 'vue'

const emits = defineEmits<{
    add: [Transacao | undefined]
}>()

const novaTransacao: Ref<Transacao> = ref({
    descricao: '',
    valor: 0,
    tipo: TipoTransacao.CREDITO,
    ordem: 0
})

function adicionarTransacao() {
    if (!novaTransacao.value.descricao || !novaTransacao.value.valor) return

    const transacaoCriada = Object.assign({}, novaTransacao.value)
    novaTransacao.value.descricao = ''
    novaTransacao.value.valor = 0

    return transacaoCriada
}
</script>

<template>
    <h2>Inserir nova transação</h2>
    <div>
        <label for="descricao">Descrição</label>
        <input id="descricao" type="text" v-model="novaTransacao.descricao" />
    </div>

    <div>
        <label for="valor">Valor</label>
        <input id="valor" type="number" v-model="novaTransacao.valor" />
    </div>

    <div>
        <div>
            <label for="credito">Crédito</label>
            <input
                id="credito"
                type="radio"
                name="tipoTransacao"
                value="CREDITO"
                v-model="novaTransacao.tipo"
                selected
            />
        </div>
        <div>
            <label for="debito">Débito</label>
            <input
                id="debito"
                type="radio"
                name="tipoTransacao"
                value="DEBITO"
                v-model="novaTransacao.tipo"
            />
        </div>
    </div>

    <button @click="$emit('add', adicionarTransacao())">Criar</button>
</template>
