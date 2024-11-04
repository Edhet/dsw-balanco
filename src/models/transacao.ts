import { TipoTransacao } from './tipo-transacao'

export interface Transacao {
    tipo: TipoTransacao
    descricao: string
    valor: number
    ordem: number
    id: string
}
