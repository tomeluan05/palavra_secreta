// Interface
interface MinhaListaDePalavras{
    [keyof: string]: string[]
}

export const listaDePalavras: MinhaListaDePalavras = 
    {
        programacao: ['Linguagem', 'Framework', 'JavaScript', 'React'],
        fruta: ['Banana', 'Maçã', 'Pera', 'Laranja'],
        corpo: ['Braço', 'Perna', 'Cérebro', 'Pescoço', 'Olhos'],
        computador: ['Mouse', 'Teclado', 'Monitor', 'Gabinete'],
        carro: ['Motor', 'Porta', 'Pneu', 'Antena'],
        comida: ['Arroz', 'Feijão', 'Carne', 'Leite', 'Ovo'],
    }