import { useCallback, useEffect, useState } from 'react'
import styles from './styles/App/App.module.css'

// importa os dados do jogo
import { listaDePalavras } from './data/palavras'

// importa os components
import Jogo from './components/Jogo'
import InicioDoJogo from './components/InicioDoJogo'
import FimDoJogo from './components/FimDoJogo'

// estágios do jogo
const estagio = [
  {id: 1, nome: 'inicio'},
  {id: 2, nome: 'jogo'},
  {id: 3, nome: 'fim'},
]

// quantidade de chances do jogador
const quantidadeDeChances: number = 3

function App() {
 
  // jogo começa no estágio 0 que é o início
  const [estagioDoJogo, setEstagioDoJogo] = useState(estagio[2].nome)
  // importa o objeto que tem as palavras e categorias do jogo
  const [palavras] = useState(listaDePalavras)

  const [palavraEscolhida, setPalavraEscolhida] = useState('')
  const [categoriaEscolhida, setCategoriaEscolhida] = useState('')

  const [letras, setLetras] = useState([] as Array<string>)

  // letras adivinhadas
  const [letrasAdivinhadas, setLetrasAdivinhadas] = useState([] as Array<string>)
  // letras erradas
  const [letrasErradas, setLetrasErradas] = useState([] as Array<string>)
  // chances do usuário
  const [chancesUsuario, setChancesUsuario] = useState(quantidadeDeChances)
  // pontuação do usuário
  const [pontuacao, setPontuacao] = useState(0)

  const pegarPalavraEcategoria = useCallback(()=>{

    // as categorias são as chaves do objeto: carro, programacao ...
    const categorias = Object.keys(palavras)

    // vai pegar a chave do objeto da categoria aleatório: carro, programacao ...
    const categoria = categorias[Math.floor(Math.random() * Object.keys(categorias).length)]
    console.log('Item da categoria ', categoria)

    // vai pegar os elementos dentro do objeto da categoria, se for corpo vai pegar: 
    // 'Braço', 'Perna', 'Cérebro', 'Pescoço', 'Olhos'
    const minhaCategoria = palavras[categoria]
    // console.log('Minha categoria', minhaCategoria)

    // vai pegar um desses elementos do minhaCategoria aleatoriamente
    const palavra = minhaCategoria[Math.floor(Math.random() * palavras[categoria].length)]
    // console.log('Palavra', palavra)

    return {categoria, palavra}
  }, [palavras])


  // Início do jogo
  const iniciarJogo = useCallback(()=>{
    limparEstadoDasLetras()

    // vai ser gerado a categoria e a palavra
    const{ categoria, palavra } = pegarPalavraEcategoria();

    // Separando as letras da palavras
    let letraDaPalavra = palavra.split("")

    // transformando as letras todas em minúsculas
    letraDaPalavra = letraDaPalavra.map((letra)=>{
      return letra.toLowerCase()
    })

    const palavraRecortada: any = letraDaPalavra

    console.log(letraDaPalavra)
    console.log(categoriaEscolhida, palavra)

    // estados preenchidos
    setPalavraEscolhida(palavra)
    setCategoriaEscolhida(categoria)
    setLetras(palavraRecortada)

    setEstagioDoJogo(estagio[1].nome)

  }, [pegarPalavraEcategoria])

  const verificarLetra = (letra: string)=>{
    console.log('Letra: ', letra)

    const letraLowerCase = letra.toLocaleLowerCase()

    if(letrasAdivinhadas.includes(letraLowerCase) || letrasErradas.includes(letraLowerCase)){
      return;
    }

    // pegando a letra adivinhada ou removendo ela
    if(letras.includes(letraLowerCase)){
      setLetrasAdivinhadas((letraAdivinhadaAtual)=>{
        return [
          ...letraAdivinhadaAtual,
          letraLowerCase
        ]
      })
    }else{
      setLetrasErradas((letraErradadaAtual)=>{
        return [
          ...letraErradadaAtual, 
          letraLowerCase
        ]
      }
      )

      setChancesUsuario((chanceAtual)=>{
        return chanceAtual - 1
      })
    }
  }

    // Limpar todas as letras antes de iniciar o jogo
    const limparEstadoDasLetras = ()=>{
      setLetrasAdivinhadas([])
      setLetrasErradas([])
    }

    // verificando se as chances do usuário acabaram
    useEffect(()=>{
      if(chancesUsuario <= 0){
        limparEstadoDasLetras();
        setEstagioDoJogo(estagio[2].nome)
      }
    }, [chancesUsuario])

      // verificar a condição de vitória
      useEffect(()=>{
      // array de letras únicas
        const letrasUnicas = [... new Set(letras)]

        // condição de vitória
        if(letrasAdivinhadas.length === letrasUnicas.length){
          // adicionando pontuação ao jogador
          setPontuacao((pontuacaoAtual)=> pontuacaoAtual += 100)

          // reiniciar o jogo com uma nova palavra
          iniciarJogo()
        }
      },[letrasAdivinhadas, letras, iniciarJogo])

    // reiniciarJogo o jogo
    const reiniciarJogo = ()=>{
      setPontuacao(0)
      setChancesUsuario(quantidadeDeChances)
      setEstagioDoJogo(estagio[0].nome)
    }

  return (
    <div className={styles.App}>
      {estagioDoJogo === 'inicio' && <InicioDoJogo iniciarJogo={iniciarJogo} />}
      {estagioDoJogo === 'jogo' && 
      <Jogo 
        verificarLetra={verificarLetra} 
        palavraEscolhida={palavraEscolhida} 
        categoriaEscolhida={categoriaEscolhida} 
        letras={letras} 
        letrasAdivinhadas={letrasAdivinhadas}
        letrasErradas={letrasErradas}
        chancesUsuario={chancesUsuario}
        pontuacao={pontuacao}
      />}
      {estagioDoJogo === 'fim' && <FimDoJogo reiniciarJogo={reiniciarJogo} pontuacao={pontuacao} />}
    </div>
  )
}

export default App
