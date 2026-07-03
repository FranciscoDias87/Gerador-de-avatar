import { GraduationCap, Heart, HelpCircle, Lightbulb, Sparkles } from "lucide-react";
import { motion } from "motion/react";

interface ProfessorFranciscoProps {
  currentStep: number;
  isError: boolean;
  isCorrect: boolean;
  onShowTip: () => void;
  xpAwarded: boolean;
  gameCompleted: boolean;
}

export function ProfessorFrancisco({
  currentStep,
  isError,
  isCorrect,
  onShowTip,
  xpAwarded,
  gameCompleted,
}: ProfessorFranciscoProps) {
  // Get tailored quotes from Professor Francisco based on the level state
  const getProfessorSpeech = () => {
    if (gameCompleted) {
      return "Estou extremamente orgulhoso! Completaste toda a nossa atividade do Laboratório Avançado e construíste um sistema completo de geração de avatares com persistência de dados. Podes agora imprimir o teu Certificado Oficial de Programação!";
    }
    if (isCorrect) {
      return "Excelente trabalho! Acertaste em cheio na solução do desafio. Vê como a aplicação ganhou vida no laboratório à direita! Vamos avançar para o próximo passo?";
    }
    if (isError) {
      return "Hm, quase lá! Repara bem na dica que te dei e no código de referência do nosso manual. A programação exige muita atenção aos detalhes. Tenta novamente, sei que és capaz!";
    }

    switch (currentStep) {
      case 1:
        return "Olá, jovem programador(a)! Bem-vindo(a) ao nosso laboratório prático. Hoje vamos construir um Gerador de Avatares profissional. A nossa primeira missão é estruturar as tags HTML fundamentais. Consegues preencher os atributos e IDs corretos para que o JavaScript possa controlá-los depois?";
      case 2:
        return "Ótimo, temos a estrutura! Mas repara que no laboratório os painéis estão empilhados e desorganizados. Vamos usar CSS Flexbox no contentor principal para posicionar os elementos de forma moderna e elegante lado a lado. Vamos lá arrumar esta casa?";
      case 3:
        return "Agora que a casa está bonita, o nosso JavaScript precisa saber onde estão os móveis! Vamos mapear cada elemento do HTML para variáveis JS usando document.getElementById. Também vamos resgatar o histórico do LocalStorage para que os dados nunca se percam!";
      case 4:
        return "Temos os elementos selecionados. Agora, como mostramos os avatares guardados? Criaremos elementos de imagem (<img>) dinamicamente com JavaScript para cada item da nossa lista. Consegues ordenar as linhas do ciclo na sequência lógica correta?";
      case 5:
        return "Chegámos ao clímax da nossa mentoria! Vamos intercetar o envio do formulário, gerar a URL dinamicamente conectando-se à API do DiceBear usando template strings e salvar tudo em segurança. Consegues ligar os eventos corretos aos seus escutadores?";
      default:
        return "Vamos juntos transformar linhas de código em software real e dinâmico!";
    }
  };

  return (
    <div className="bg-indigo-50 border-4 border-indigo-950 rounded-3xl p-5 shadow-[6px_6px_0_#1e1b4b] relative overflow-hidden flex gap-4 md:gap-5 items-start">
      {/* Accent graphics */}
      <div className="absolute right-2 top-2 text-indigo-200 pointer-events-none">
        <GraduationCap className="w-20 h-20 opacity-15" />
      </div>

      {/* Professor Avatar Container */}
      <div className="flex-shrink-0 text-center flex flex-col items-center">
        <motion.div
          animate={{
            y: isCorrect ? [0, -10, 0] : [0, -2, 0],
            scale: isCorrect ? [1, 1.05, 1] : 1,
          }}
          transition={{
            repeat: isCorrect ? 2 : Infinity,
            duration: isCorrect ? 0.6 : 3,
            ease: "easeInOut"
          }}
          className="relative w-16 h-16 sm:w-20 sm:h-20 bg-indigo-900 rounded-2xl flex items-center justify-center shadow-[4px_4px_0_#1e1b4b] text-white font-display text-2xl font-bold border-4 border-indigo-950 overflow-hidden"
        >
          {/* Simulated Professor Icon */}
          <div className="absolute inset-0 bg-indigo-950/40 flex flex-col justify-end pb-1 items-center">
            <span className="text-[9px] uppercase font-black tracking-widest text-indigo-300">PROF</span>
          </div>
          <span className="text-3xl relative -top-1">👨‍🏫</span>
        </motion.div>
        
        <span className="text-xs font-black text-indigo-950 mt-2.5 block whitespace-nowrap">Prof. Francisco</span>
      </div>

      {/* Speech Bubble */}
      <div className="flex-1 min-w-0">
        <div className="relative bg-white rounded-2xl rounded-tl-none p-4 shadow-[4px_4px_0_#1e1b4b] border-4 border-indigo-950 text-slate-800 text-sm leading-relaxed">
          <p className="font-black flex items-center gap-1.5 mb-1 text-xs uppercase tracking-wider text-indigo-700 font-display">
            {gameCompleted ? (
              <span className="flex items-center gap-1 text-amber-500">
                <Sparkles className="w-3.5 h-3.5 fill-amber-400 text-amber-500 animate-spin" /> Parabéns, Missão Cumprida!
              </span>
            ) : isCorrect ? (
              <span className="text-emerald-600">✨ Excelente Código!</span>
            ) : isError ? (
              <span className="text-rose-600">⚠️ Vamos Analisar...</span>
            ) : (
              <span className="text-indigo-600">💡 Dica de Aula</span>
            )}
          </p>
          
          <p className="text-slate-700 font-medium">{getProfessorSpeech()}</p>
        </div>

        {/* Buttons / Interaction */}
        <div className="flex flex-wrap gap-3 mt-4">
          <button
            onClick={onShowTip}
            id="btn-professor-tip"
            className="text-xs bg-yellow-400 hover:bg-yellow-500 text-indigo-950 font-black px-4 py-2 rounded-xl flex items-center gap-1.5 border-2 border-indigo-950 shadow-[3px_3px_0_#1e1b4b] transition-all active:translate-y-[2px] active:shadow-none cursor-pointer uppercase tracking-wider"
          >
            <Lightbulb className="w-3.5 h-3.5 text-indigo-950 fill-yellow-200" />
            Ver Dica Completa
          </button>
          
          <div className="text-xs text-indigo-950 bg-pink-100 border-2 border-indigo-950 rounded-xl px-4 py-2 flex items-center gap-1 font-black shadow-[3px_3px_0_#1e1b4b]">
            <Heart className="w-3.5 h-3.5 text-pink-600 fill-current animate-pulse" /> +{currentStep * 50} XP em Jogo
          </div>
        </div>
      </div>
    </div>
  );
}
