import styles from '../../styles/FimDoJogo/styles.module.css'

type Props = {
  reiniciarJogo: ()=> void,
  pontuacao: any
}

const FimDoJogo = ({reiniciarJogo, pontuacao}: Props) => {
  return (
    <div className={styles.inicio}>
        <div className={styles.conteudo}>
        <h1>Fim do jogo!</h1>
        <h2>A sua pontuação foi:  
          <span> {pontuacao}</span>
        </h2>
        <button className={styles.botao} onClick={reiniciarJogo}>Reiniciar jogo</button>
        </div>
    </div>
  )
}

export default FimDoJogo