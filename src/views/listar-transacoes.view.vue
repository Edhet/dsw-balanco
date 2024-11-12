<script setup lang="ts">
    import type { Transacao } from '@/models/transacao'
    import { ref,  computed } from 'vue'
    import ListaItems from '../components/ListaItems.vue'

    const pagina = ref(1);

    const isButtonDisabled = computed(() => {
        return !(listaTransacoes.length > 5)
    });

    const saldo = computed(()=>{
        return itemsPagina.value.reduce((acc, currentValue)=> {
            if(currentValue.tipo === "DEBITO")
                { return acc -= currentValue.valor  }
            return acc += currentValue.valor
        }, 0)
    })

    const { listaTransacoes } = defineProps<{
        listaTransacoes: Transacao[]
        deletarTransacao: (descricao: string) => void
        sortTransacoes: () => void
    }>()

    let itemsPagina = computed(()=>{
        return listaTransacoes.slice(pagina.value*5-5, pagina.value*5)
    })

    function mudarPagina(dir: 'prox' | "anterior" ){
        if(dir === "prox"){
            return pagina.value = pagina.value + 1
        }

        return pagina.value = pagina.value - 1
    }

    const emit = defineEmits<{
        (e: 'deletarTransacao', descricao: string): void;
        (e: 'sortTransacoes'): void;
    }>();
    function deletarTransacao(descricao: string) {
        emit('deletarTransacao', descricao);
    }

    function sortTransacoes() {
        emit('sortTransacoes');
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
</script>

<template>
    <section>
        <ListaItems :transacoes="itemsPagina" @delete="deletarTransacao($event)" @up="moveUp($event)"
            @down="moveDown($event)"></ListaItems>

        <p id="saldo" v-bind:class="saldo < 0 ? 'amayellow' : ''">Saldo: <span class="highlight">{{ saldo }}</span></p>

        <div class="lista-footer">
            <button :disabled="isButtonDisabled || pagina === 1" @click="mudarPagina('anterior')">Anterior</button>
            <button :disabled="isButtonDisabled || pagina * 5 - 5 > pagina" @click="mudarPagina('prox')">Próximo</button>
        </div>
    </section>
</template>

<style>
    #saldo{
        margin-block: 16px;
        padding-left: 5px;
    }
    .lista-footer{
        display: flex;
        gap: 12px;
        margin-block: 16px;
    }
    .amayellow {
        color: yellow;
        background-color: red;
        border-radius: 5px;
        padding-left: 5px;
    }
</style>
