import { createRouter, createWebHistory } from 'vue-router'
import novaTransacao from '../views/nova-transacao.view.vue'
import listarTransacoes from '../views/listar-transacoes.view.vue'

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/',
            name: 'nova-transacao',
            component: novaTransacao,
            props: true
        },
        {
            path: '/listar',
            name: 'listar-transacoes',
            component: listarTransacoes,
            props: true
        },
    ],
})

export default router
