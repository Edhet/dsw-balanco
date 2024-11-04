<script setup lang="ts">
    import type { Transacao } from '@/models/transacao'
    import { ref, type Ref, computed } from 'vue'
    import ListaItems from '../components/ListaItems.vue'

    const isButtonDisabled = computed(() => {
        return !(itemsPagina.value.length > 5)
    });

    const saldo = computed(()=>{
        return itemsPagina.value.reduce((acc, currentValue)=> acc + currentValue.valor, 0)
    })
    const { listaTransacoes } = defineProps<{
        listaTransacoes: Transacao[]
        deletarTransacao: (descricao: string) => void
        sortTransacoes: () => void 
    }>()
    let itemsPagina = computed(()=>{
        return listaTransacoes
    })
    const emit = defineEmits<{
        (e: 'deletarTransacao', descricao: string): void;
        (e: 'sortTransacoes'): void;
    }>();
    const TAMANHO_PAGINA = 5
    let pagina = 0


    function mostrarPagina(pagina: number) {
        const inicio = (TAMANHO_PAGINA * pagina)
    }

    function atualizarSaldoEPagina() {
        mostrarPagina(pagina)
    }

    function deletarTransacao(descricao: string) {
        emit('deletarTransacao', descricao);
        atualizarSaldoEPagina()
    }

    function sortTransacoes() {
        emit('sortTransacoes');
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

</script>

<template>
    <section>
        <ListaItems :transacoes="itemsPagina" @delete="deletarTransacao($event)" @up="moveUp($event)"
            @down="moveDown($event)"></ListaItems>
        
        <p id="saldo" v-bind:class="saldo < 0 ? 'amayellow' : ''">Saldo: <span class="highlight">{{ saldo }}</span></p>

        <div class="lista-footer">
            <button :disabled="isButtonDisabled" @click="prevPagina()">Anterior</button>
            <button :disabled="isButtonDisabled" @click="nextPagina()">Próximo</button>
        </div>
    </section>
</template>

<style>

#saldo{
    margin-block: 16px;
}
.lista-footer{
    display: flex;
    gap: 12px;
    margin-block: 16px;
}
.amayellow {
    color: red;
    background-color: yellow;
}


</style>