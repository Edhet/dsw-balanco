<script setup lang="ts">
import type { Transacao } from '@/models/transacao'
import { ref, type Ref } from 'vue'
import { TipoTransacao } from '@/models/tipo-transacao'
import { v4 as uuidv4 } from 'uuid';

const emit = defineEmits<{
        (e: 'adicionaTransacao', transacaoCriada: Transacao): void;
    }>();

const novaTransacao: Ref<Omit<Transacao, 'id'>> = ref({
    descricao: '',
    valor: 0,
    tipo: TipoTransacao.CREDITO,
    ordem: 0
})

function adicionarTransacao() {
    if (!novaTransacao.value.descricao || !novaTransacao.value.valor)
    {alert("Não foi possível criar transação!");return}

    const transacaoCriada = Object.assign({
        id: uuidv4()
    }, novaTransacao.value)

    novaTransacao.value.descricao = ''
    novaTransacao.value.valor = 0

    emit('adicionaTransacao', transacaoCriada);
}
</script>

<template>
    <section>
        <form  @submit.prevent="adicionarTransacao">
        <h2>Nova Transação</h2>
        <div class="field">
            <label for="descricao">Descrição</label>
            <input id="descricao" type="text" v-model="novaTransacao.descricao" />
        </div>

        <div class="field">
            <label for="valor">Valor</label>
            <input id="valor" type="number" v-model="novaTransacao.valor" />
        </div>

        <div class="field radio-field">
                <label for="credito">Crédito</label>
                <input
                    id="credito"
                    type="radio"
                    name="tipoTransacao"
                    value="CREDITO"
                    v-model="novaTransacao.tipo"
                    selected
                />
                <label for="debito">Débito</label>
                <input
                    id="debito"
                    type="radio"
                    name="tipoTransacao"
                    value="DEBITO"
                    v-model="novaTransacao.tipo"
                />
        </div>

        <button type="submit">Criar</button>
    </form>
    </section>
</template>

<style>
    form{
        width: 100%;
        padding: 16px;
    }
    form h2{
        font-weight: bold;
        margin-bottom: 16px;

    }

    form .field{
        margin-bottom: 16px;
        display: flex;
        flex-direction: column;
        gap: 8px;
    }

    form .radio-field{
        align-items: flex-start;
    }
</style>
