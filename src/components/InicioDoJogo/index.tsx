import styles from '../../styles/InicioDoJogo/styles.module.css'

type Props = {
  iniciarJogo: ()=> void
}

const InicioDoJogo = ({iniciarJogo}: Props) => {
  return (
    <div className={`container ${styles.inicio}`}>
        <div className={styles.conteudo}>
          <h1>Palavras secretas</h1>
          <p>Clique no botão abaixo para começar a jogar</p>
          <button onClick={iniciarJogo}>Começar o jogo</button>
        </div>
    </div>
  )
}

export default InicioDoJogo