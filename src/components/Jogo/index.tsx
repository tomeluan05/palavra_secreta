import React from "react";
import { useState, useRef } from "react";
import styles from "../../styles/Jogo/styles.module.css";

type Props = {
  verificarLetra: (parameter: any) => void;
  palavraEscolhida: string;
  categoriaEscolhida: string;
  letras: any;
  letrasAdivinhadas: any;
  letrasErradas: any;
  chancesUsuario: any;
  pontuacao: any;
};

const Jogo = ({
  verificarLetra,
  palavraEscolhida,
  categoriaEscolhida,
  letras,
  letrasAdivinhadas,
  letrasErradas,
  chancesUsuario,
  pontuacao,
}: Props) => {
  const [letra, setLetra] = useState("");
  const letraInputRef = React.createRef<HTMLInputElement>();

  const envioDoResultado = (evento: any) => {
    evento.preventDefault(null);
    verificarLetra(letra);
    setLetra("");

    letraInputRef.current?.focus();
  };

  return (
    <div className={styles.inicio}>
      <div className={styles.conteudo}>
        <p className={styles.frase_adivinha_letra}>Sua pontuação:
          <span className={styles.pontos}> {pontuacao}</span>
        </p>
        <h1>Descubra qual é a palavra</h1>
        <h3>
          Temos uma dica sobre a palavra:{" "}
          <span className={styles.quadro_dicas}>{categoriaEscolhida}</span>
        </h3>
        <p>Você possui {chancesUsuario} tentativa(s).</p>
        <div className={styles.container_palavras}>
          {letras.map((letra: any, i: any) => {
            return letrasAdivinhadas.includes(letra) ? (
              <span key={i} className={styles.letra}>
                {letra}
              </span>
            ) : (
              <span key={i} className={styles.quadro_letras}></span>
            );
          })}
        </div>
        <div>
          <p className={styles.frase_adivinha_letra}>
            Descubra uma letra da palavra:
          </p>
          <form
            onSubmit={envioDoResultado}
            action=""
            className={styles.container_formulario}
          >
            <input
              className={styles.container_input}
              onChange={(evento) => {
                setLetra(evento.target.value);
              }}
              value={letra}
              ref={letraInputRef}
              type="text"
              name="letra"
              maxLength={1}
              required
              autoFocus
            />
            <button>Jogar</button>
          </form>
        </div>
        <div className={styles.container_letras_erradas}>
          <p>Letras que a palavra não possui:</p>
          {letrasErradas.map((letter: any, i: any) => {
            return <span key={i}>{letter.toUpperCase()} - </span>;
          })}
        </div>
      </div>
    </div>
  );
};

export default Jogo;
