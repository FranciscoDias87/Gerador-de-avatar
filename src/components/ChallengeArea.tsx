import { useState, useEffect } from "react";
import { 
  CheckCircle2, 
  XCircle, 
  Play, 
  HelpCircle, 
  ArrowUp, 
  ArrowDown, 
  RefreshCw, 
  Sparkles, 
  Code,
  Check,
  ChevronRight
} from "lucide-react";
import { 
  LEVEL1_CHALLENGES, 
  LEVEL2_QUIZ, 
  LEVEL3_MATCHES, 
  LEVEL3_STATE_QUIZ, 
  LEVEL4_CODE_LINES, 
  LEVEL5_CHALLENGES,
  CodeLineItem
} from "../data/gameData";
import { motion, AnimatePresence } from "motion/react";

interface ChallengeAreaProps {
  currentStep: number;
  onStepComplete: (xpGained: number) => void;
  isCorrect: boolean;
  setIsCorrect: (correct: boolean) => void;
  isError: boolean;
  setIsError: (error: boolean) => void;
}

export function ChallengeArea({
  currentStep,
  onStepComplete,
  isCorrect,
  setIsCorrect,
  isError,
  setIsError,
}: ChallengeAreaProps) {
  // Level 1 State
  const [level1Answers, setLevel1Answers] = useState<Record<string, string>>({
    "form-id": "",
    "input-type": "",
    "button-type": "",
    "img-id": "",
  });

  // Level 2 State
  const [level2Answer, setLevel2Answer] = useState<string>("");
  const [demoFlexDisplay, setDemoFlexDisplay] = useState<string>("block");
  const [demoFlexGap, setDemoFlexGap] = useState<string>("0px");
  const [demoFlexWrap, setDemoFlexWrap] = useState<string>("nowrap");

  // Level 3 State
  const [level3Matches, setLevel3Matches] = useState<Record<string, string>>({});
  const [level3StateAnswer, setLevel3StateAnswer] = useState<string>("");

  // Level 4 State
  const [shuffledCodeLines, setShuffledCodeLines] = useState<CodeLineItem[]>([]);

  // Level 5 State
  const [level5Wires, setLevel5Wires] = useState<Record<string, string>>({});

  // Reset or initialize level states when currentStep changes
  useEffect(() => {
    setIsCorrect(false);
    setIsError(false);

    if (currentStep === 4) {
      // Shuffled but preserve initial key items with a copy
      const copy = [...LEVEL4_CODE_LINES];
      // Randomize array
      const shuffled = copy.sort(() => Math.random() - 0.5);
      setShuffledCodeLines(shuffled);
    }
  }, [currentStep]);

  // Handle Level 1 check
  const checkLevel1 = () => {
    const allCorrect = LEVEL1_CHALLENGES.every(
      (ch) => level1Answers[ch.id] === ch.correct
    );
    if (allCorrect) {
      setIsCorrect(true);
      setIsError(false);
    } else {
      setIsError(true);
      setIsCorrect(false);
    }
  };

  // Handle Level 2 check
  const checkLevel2 = () => {
    if (level2Answer === LEVEL2_QUIZ.correct) {
      setIsCorrect(true);
      setIsError(false);
      // Synchronize sandbox
      setDemoFlexDisplay("flex");
      setDemoFlexGap("40px");
      setDemoFlexWrap("wrap");
    } else {
      setIsError(true);
      setIsCorrect(false);
    }
  };

  // Handle Level 3 check
  const checkLevel3 = () => {
    const selectorCorrect = LEVEL3_MATCHES.every(
      (m) => level3Matches[m.variable] === m.correctSelector
    );
    const stateCorrect = level3StateAnswer === LEVEL3_STATE_QUIZ.correct;

    if (selectorCorrect && stateCorrect) {
      setIsCorrect(true);
      setIsError(false);
    } else {
      setIsError(true);
      setIsCorrect(false);
    }
  };

  // Handle Level 4 order shifting
  const moveLine = (index: number, direction: "up" | "down") => {
    if (direction === "up" && index === 0) return;
    if (direction === "down" && index === shuffledCodeLines.length - 1) return;

    const newLines = [...shuffledCodeLines];
    const targetIndex = direction === "up" ? index - 1 : index + 1;
    
    // Swap
    const temp = newLines[index];
    newLines[index] = newLines[targetIndex];
    newLines[targetIndex] = temp;
    
    setShuffledCodeLines(newLines);
  };

  const checkLevel4 = () => {
    const isSortedCorrectly = shuffledCodeLines.every(
      (line, idx) => line.correctIndex === idx
    );

    if (isSortedCorrectly) {
      setIsCorrect(true);
      setIsError(false);
    } else {
      setIsError(true);
      setIsCorrect(false);
    }
  };

  // Handle Level 5 check
  const checkLevel5 = () => {
    const allCorrect = LEVEL5_CHALLENGES.every(
      (ch) => level5Wires[ch.id] === ch.correctHandler
    );

    if (allCorrect) {
      setIsCorrect(true);
      setIsError(false);
    } else {
      setIsError(true);
      setIsCorrect(false);
    }
  };

  // Proceed to next step & trigger parent xp credit
  const handleProceed = () => {
    let xp = 100;
    if (currentStep === 3) xp = 120;
    if (currentStep === 4) xp = 150;
    if (currentStep === 5) xp = 180;
    
    onStepComplete(xp);
  };

  return (
    <div className="bg-white rounded-[32px] border-8 border-indigo-950 p-6 md:p-8 relative shadow-[8px_8px_0_#1e1b4b] overflow-hidden">
      {/* Decorative accent grid pattern in background */}
      <div className="absolute inset-0 bg-grid-pattern opacity-5 pointer-events-none" />

      <div className="relative flex flex-col sm:flex-row sm:items-center justify-between mb-6 pb-4 border-b-4 border-indigo-950 z-10 gap-3">
        <h3 className="text-xl font-display font-black text-indigo-950 flex items-center gap-2 uppercase tracking-tight italic">
          <Code className="w-6 h-6 text-pink-500 stroke-[3]" />
          <span>Área de Desafios Jogo</span>
        </h3>
        <div className="text-xs bg-indigo-950 text-yellow-300 font-black px-4 py-1.5 rounded-xl border-2 border-indigo-950 uppercase tracking-widest shadow-[2px_2px_0_#1e1b4b]">
          Passo {currentStep} de 5
        </div>
      </div>

      {/* CHALLENGE PANEL SWITCHER */}
      <div className="min-h-[280px]">
        
        {/* STEP 1: HTML Structure */}
        {currentStep === 1 && (
          <div>
            <p className="text-slate-700 text-sm mb-5 leading-relaxed font-semibold">
              🏆 Completa a estrutura do ficheiro <span className="font-mono bg-yellow-100 border border-yellow-300 px-1.5 py-0.5 rounded text-indigo-950 font-bold">index.html</span> escolhendo as opções corretas baseadas nos parâmetros exigidos no PDF.
            </p>

            <div className="space-y-4">
              {LEVEL1_CHALLENGES.map((ch) => (
                <div key={ch.id} className="bg-indigo-50/50 border-4 border-indigo-950 rounded-2xl p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-[4px_4px_0_#1e1b4b]">
                  <div>
                    <span className="text-[10px] font-black text-pink-600 block uppercase tracking-wider">Atributo HTML / Tag</span>
                    <span className="text-sm font-extrabold text-indigo-950">{ch.label}</span>
                  </div>
                  
                  <select
                    value={level1Answers[ch.id]}
                    onChange={(e) => setLevel1Answers({ ...level1Answers, [ch.id]: e.target.value })}
                    className="bg-white border-2 border-indigo-950 rounded-xl px-3 py-2 text-xs text-indigo-950 focus:outline-none focus:ring-2 focus:ring-pink-500 font-mono font-bold w-full sm:w-56 cursor-pointer shadow-[2px_2px_0_#1e1b4b]"
                  >
                    <option value="">-- Selecione o Valor --</option>
                    {ch.options.map((opt) => (
                      <option key={opt} value={opt}>{opt}</option>
                    ))}
                  </select>
                </div>
              ))}
            </div>

            <div className="mt-6 flex justify-end">
              <button
                onClick={checkLevel1}
                id="btn-check-level-1"
                className="bg-indigo-950 hover:bg-indigo-900 text-yellow-300 font-black text-xs px-6 py-3 rounded-xl flex items-center gap-2 border-2 border-indigo-950 shadow-[4px_4px_0_#1e1b4b] transition-all active:translate-y-[2px] active:shadow-none cursor-pointer uppercase tracking-wider"
              >
                <Play className="w-4 h-4 fill-current text-yellow-300" />
                Validar Estrutura HTML
              </button>
            </div>
          </div>
        )}

        {/* STEP 2: CSS Styles */}
        {currentStep === 2 && (
          <div>
            <p className="text-slate-700 text-sm mb-5 leading-relaxed font-semibold">
              📐 Experimente alterar os parâmetros do contentor abaixo no nosso <strong>Simulador Flexbox</strong> para entender como os elementos se comportam e, em seguida, responda à pergunta teórica do manual.
            </p>

            {/* Sandbox Visualizer */}
            <div className="bg-indigo-950 rounded-2xl p-5 mb-6 border-4 border-indigo-950 shadow-[4px_4px_0_#1e1b4b]">
              <span className="text-[11px] font-black text-yellow-300 uppercase tracking-widest block mb-3">Simulador de Contentor Flexbox</span>
              
              <div className="flex flex-wrap gap-3 mb-5">
                <button
                  onClick={() => { setDemoFlexDisplay(demoFlexDisplay === "flex" ? "block" : "flex"); }}
                  className={`px-4 py-2 rounded-xl text-xs font-black font-mono border-2 transition-all cursor-pointer ${demoFlexDisplay === "flex" ? "bg-yellow-400 border-indigo-950 text-indigo-950 shadow-[2px_2px_0_#1e1b4b]" : "bg-indigo-900 border-indigo-950 text-indigo-200"}`}
                >
                  display: {demoFlexDisplay}
                </button>

                <button
                  onClick={() => { setDemoFlexGap(demoFlexGap === "40px" ? "0px" : "40px"); }}
                  className={`px-4 py-2 rounded-xl text-xs font-black font-mono border-2 transition-all cursor-pointer ${demoFlexGap === "40px" ? "bg-yellow-400 border-indigo-950 text-indigo-950 shadow-[2px_2px_0_#1e1b4b]" : "bg-indigo-900 border-indigo-950 text-indigo-200"}`}
                  disabled={demoFlexDisplay !== "flex"}
                >
                  gap: {demoFlexGap}
                </button>

                <button
                  onClick={() => { setDemoFlexWrap(demoFlexWrap === "wrap" ? "nowrap" : "wrap"); }}
                  className={`px-4 py-2 rounded-xl text-xs font-black font-mono border-2 transition-all cursor-pointer ${demoFlexWrap === "wrap" ? "bg-yellow-400 border-indigo-950 text-indigo-950 shadow-[2px_2px_0_#1e1b4b]" : "bg-indigo-900 border-indigo-950 text-indigo-200"}`}
                  disabled={demoFlexDisplay !== "flex"}
                >
                  flex-wrap: {demoFlexWrap}
                </button>
              </div>

              {/* Box items layout representation */}
              <div 
                className="bg-indigo-900 rounded-xl p-4 min-h-[105px] border-2 border-indigo-800 transition-all duration-300"
                style={{
                  display: demoFlexDisplay,
                  gap: demoFlexGap,
                  flexWrap: demoFlexWrap as any,
                }}
              >
                <div className="bg-pink-500 border-2 border-indigo-950 text-white text-[11px] font-black px-4 py-3 rounded-xl text-center font-mono shadow-[2px_2px_0_#1e1b4b]">
                  Painel de Criação
                </div>
                <div className="bg-emerald-400 border-2 border-indigo-950 text-indigo-950 text-[11px] font-black px-4 py-3 rounded-xl text-center font-mono shadow-[2px_2px_0_#1e1b4b]">
                  Painel do Histórico
                </div>
              </div>
            </div>

            {/* Quiz */}
            <div className="bg-pink-50 border-4 border-indigo-950 rounded-2xl p-5 shadow-[4px_4px_0_#1e1b4b] mb-6">
              <h4 className="text-sm font-black text-indigo-950 mb-4">{LEVEL2_QUIZ.question}</h4>
              
              <div className="space-y-3">
                {LEVEL2_QUIZ.options.map((opt) => (
                  <label 
                    key={opt}
                    className={`flex items-center gap-3 p-3.5 rounded-xl border-2 text-xs font-bold cursor-pointer transition-all ${level2Answer === opt ? "bg-yellow-300 border-indigo-950 text-indigo-950 shadow-[2px_2px_0_#1e1b4b]" : "bg-white border-indigo-950/20 hover:border-indigo-950 text-slate-700"}`}
                  >
                    <input
                      type="radio"
                      name="level2"
                      value={opt}
                      checked={level2Answer === opt}
                      onChange={() => setLevel2Answer(opt)}
                      className="text-indigo-950 focus:ring-pink-500 h-4 w-4 border-2 border-indigo-950"
                    />
                    <span className="font-mono">{opt}</span>
                  </label>
                ))}
              </div>
            </div>

            <div className="mt-6 flex justify-end">
              <button
                onClick={checkLevel2}
                id="btn-check-level-2"
                className="bg-indigo-950 hover:bg-indigo-900 text-yellow-300 font-black text-xs px-6 py-3 rounded-xl flex items-center gap-2 border-2 border-indigo-950 shadow-[4px_4px_0_#1e1b4b] transition-all active:translate-y-[2px] active:shadow-none cursor-pointer uppercase tracking-wider"
              >
                <Play className="w-4 h-4 fill-current text-yellow-300" />
                Validar Estilo CSS
              </button>
            </div>
          </div>
        )}

        {/* STEP 3: JS DOM Elements and LocalStorage */}
        {currentStep === 3 && (
          <div>
            <p className="text-slate-700 text-sm mb-5 leading-relaxed font-semibold">
              🔗 <strong>Desafio DOM Match:</strong> Liga cada uma das variáveis JavaScript ao ID correto correspondente que definimos no Passo 1!
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              {LEVEL3_MATCHES.map((item) => (
                <div key={item.variable} className="bg-indigo-50/50 border-4 border-indigo-950 rounded-2xl p-4 flex flex-col justify-between gap-3 shadow-[4px_4px_0_#1e1b4b]">
                  <div>
                    <span className="text-[11px] bg-indigo-950 text-yellow-300 px-2 py-1 rounded-lg font-mono font-black border-2 border-indigo-950 shadow-[2px_2px_0_#1e1b4b] inline-block">
                      const {item.variable}
                    </span>
                    <span className="text-xs text-indigo-950 font-bold block mt-2">{item.description}</span>
                  </div>
                  
                  <select
                    value={level3Matches[item.variable] || ""}
                    onChange={(e) => setLevel3Matches({ ...level3Matches, [item.variable]: e.target.value })}
                    className="bg-white border-2 border-indigo-950 rounded-xl px-2.5 py-2 text-xs text-indigo-950 font-mono font-bold focus:outline-none focus:ring-2 focus:ring-pink-500 cursor-pointer shadow-[2px_2px_0_#1e1b4b]"
                  >
                    <option value="">-- Escolhe o ID --</option>
                    <option value="avatar-form">"avatar-form"</option>
                    <option value="avatar-name">"avatar-name"</option>
                    <option value="avatar-style">"avatar-style"</option>
                    <option value="avatar-image">"avatar-image"</option>
                    <option value="display-name">"display-name"</option>
                    <option value="history-container">"history-container"</option>
                    <option value="clear-btn">"clear-btn"</option>
                  </select>
                </div>
              ))}
            </div>

            {/* Quiz 2 about State */}
            <div className="bg-pink-50 border-4 border-indigo-950 rounded-2xl p-5 shadow-[4px_4px_0_#1e1b4b] mb-6">
              <h4 className="text-sm font-black text-indigo-950 mb-4">{LEVEL3_STATE_QUIZ.question}</h4>
              
              <div className="space-y-3">
                {LEVEL3_STATE_QUIZ.options.map((opt) => (
                  <label 
                    key={opt}
                    className={`flex items-center gap-3 p-3.5 rounded-xl border-2 text-xs font-bold cursor-pointer transition-all ${level3StateAnswer === opt ? "bg-yellow-300 border-indigo-950 text-indigo-950 shadow-[2px_2px_0_#1e1b4b]" : "bg-white border-indigo-950/20 hover:border-indigo-950 text-slate-700"}`}
                  >
                    <input
                      type="radio"
                      name="level3state"
                      value={opt}
                      checked={level3StateAnswer === opt}
                      onChange={() => setLevel3StateAnswer(opt)}
                      className="text-indigo-950 focus:ring-pink-500 h-4 w-4 border-2 border-indigo-950"
                    />
                    <span className="font-mono">{opt}</span>
                  </label>
                ))}
              </div>
            </div>

            <div className="mt-6 flex justify-end">
              <button
                onClick={checkLevel3}
                id="btn-check-level-3"
                className="bg-indigo-950 hover:bg-indigo-900 text-yellow-300 font-black text-xs px-6 py-3 rounded-xl flex items-center gap-2 border-2 border-indigo-950 shadow-[4px_4px_0_#1e1b4b] transition-all active:translate-y-[2px] active:shadow-none cursor-pointer uppercase tracking-wider"
              >
                <Play className="w-4 h-4 fill-current text-yellow-300" />
                Validar Seleção e Estado
              </button>
            </div>
          </div>
        )}

        {/* STEP 4: Render Loop Sorting */}
        {currentStep === 4 && (
          <div>
            <p className="text-slate-700 text-sm mb-5 leading-relaxed font-semibold">
              <strong>Desafio Ordenação de Código:</strong> O algoritmo de renderização dinâmica no ficheiro <span className="font-mono bg-yellow-100 border border-yellow-300 px-1.5 py-0.5 rounded text-indigo-950 font-bold">app.js</span> está misturado! Ordena as linhas de código abaixo na sequência correta usando os botões de ordenação para construir a função <span className="font-mono text-xs font-bold bg-pink-100 text-pink-700 px-1.5 py-0.5 rounded border border-pink-200">renderHistory()</span>.
            </p>

            <div className="space-y-2 max-h-[350px] overflow-y-auto pr-1">
              {shuffledCodeLines.map((line, idx) => (
                <div 
                  key={line.id} 
                  className="bg-indigo-950 text-white rounded-xl p-3 border-2 border-indigo-900 flex items-center justify-between gap-3 text-xs font-mono shadow-[2px_2px_0_#0f172a]"
                >
                  <div className="flex items-center gap-2 flex-1 min-w-0">
                    <span className="text-pink-500 font-black select-none w-5 text-right">{idx + 1}</span>
                    <span className="text-emerald-400 select-none font-medium">// {line.hint}</span>
                    <span className="text-slate-200 truncate block ml-2 font-semibold">{line.code}</span>
                  </div>

                  <div className="flex items-center gap-1.5">
                    <button
                      onClick={() => moveLine(idx, "up")}
                      className={`p-2 rounded-lg bg-indigo-900 border-2 border-indigo-800 text-white hover:bg-indigo-800 transition-colors cursor-pointer ${idx === 0 ? "opacity-30 cursor-not-allowed" : ""}`}
                      disabled={idx === 0}
                    >
                      <ArrowUp className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => moveLine(idx, "down")}
                      className={`p-2 rounded-lg bg-indigo-900 border-2 border-indigo-800 text-white hover:bg-indigo-800 transition-colors cursor-pointer ${idx === shuffledCodeLines.length - 1 ? "opacity-30 cursor-not-allowed" : ""}`}
                      disabled={idx === shuffledCodeLines.length - 1}
                    >
                      <ArrowDown className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-6 flex flex-col sm:flex-row justify-between items-center gap-4">
              <button
                onClick={() => {
                  const sorted = [...LEVEL4_CODE_LINES].sort(() => Math.random() - 0.5);
                  setShuffledCodeLines(sorted);
                }}
                className="text-xs text-indigo-950 hover:text-pink-600 flex items-center gap-1.5 cursor-pointer font-black uppercase tracking-wider"
              >
                <RefreshCw className="w-4 h-4 text-indigo-950 animate-spin-once" />
                Embaralhar Linhas
              </button>

              <button
                onClick={checkLevel4}
                id="btn-check-level-4"
                className="bg-indigo-950 hover:bg-indigo-900 text-yellow-300 font-black text-xs px-6 py-3 rounded-xl flex items-center gap-2 border-2 border-indigo-950 shadow-[4px_4px_0_#1e1b4b] transition-all active:translate-y-[2px] active:shadow-none cursor-pointer uppercase tracking-wider"
              >
                <Play className="w-4 h-4 fill-current text-yellow-300" />
                Validar Ordem de Criação
              </button>
            </div>
          </div>
        )}

        {/* STEP 5: Wire Event Listeners */}
        {currentStep === 5 && (
          <div>
            <p className="text-slate-700 text-sm mb-5 leading-relaxed font-semibold">
              <strong>Ligações de Eventos (Event Listeners):</strong> Para que a aplicação responda a cliques e preenchimentos, ligue o elemento fonte e o seu respetivo evento ao bloco de lógica correto de manipulação.
            </p>

            <div className="space-y-4">
              {LEVEL5_CHALLENGES.map((ch) => (
                <div key={ch.id} className="bg-indigo-50/50 border-4 border-indigo-950 rounded-2xl p-4 shadow-[4px_4px_0_#1e1b4b]">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3">
                    <span className="text-xs font-mono font-black text-indigo-950 flex flex-wrap items-center gap-1.5">
                      📡 Fonte: <span className="bg-pink-100 text-pink-700 px-2.5 py-0.5 rounded-lg border border-pink-200 font-black">{ch.eventSource}</span>
                      • Evento: <span className="bg-emerald-100 text-emerald-800 px-2.5 py-0.5 rounded-lg border border-emerald-200 font-black">'{ch.eventType}'</span>
                    </span>
                  </div>

                  <p className="text-xs text-slate-700 mb-3 leading-relaxed font-medium">
                    <strong>Ação Esperada:</strong> {ch.actionDescription}
                  </p>

                  <select
                    value={level5Wires[ch.id] || ""}
                    onChange={(e) => setLevel5Wires({ ...level5Wires, [ch.id]: e.target.value })}
                    className="w-full bg-white border-2 border-indigo-950 rounded-xl px-3 py-2 text-xs text-indigo-950 font-mono font-bold focus:outline-none focus:ring-2 focus:ring-pink-500 cursor-pointer shadow-[2px_2px_0_#1e1b4b]"
                  >
                    <option value="">-- Selecione a Função Callback correspondente no app.js --</option>
                    <option value="function(event) { event.preventDefault(); ... }">
                      {"addEventListener('submit', function(event) { preventDefault(); ... })"}
                    </option>
                    <option value="function() { const currentName = ...; avatarImage.src = ... }">
                      {"addEventListener('change', function() { update preview URL... })"}
                    </option>
                    <option value="function() { avatarsHistory = []; localStorage.removeItem(...); renderHistory(); }">
                      {"addEventListener('click', function() { clear array, clear local storage, renderHistory() })"}
                    </option>
                    <option value="renderHistory">
                      {"addEventListener('DOMContentLoaded', renderHistory) (call on window load)"}
                    </option>
                  </select>
                </div>
              ))}
            </div>

            <div className="mt-6 flex justify-end">
              <button
                onClick={checkLevel5}
                id="btn-check-level-5"
                className="bg-indigo-950 hover:bg-indigo-900 text-yellow-300 font-black text-xs px-6 py-3 rounded-xl flex items-center gap-2 border-2 border-indigo-950 shadow-[4px_4px_0_#1e1b4b] transition-all active:translate-y-[2px] active:shadow-none cursor-pointer uppercase tracking-wider"
              >
                <Play className="w-4 h-4 fill-current text-yellow-300" />
                Interligar e Concluir Tudo!
              </button>
            </div>
          </div>
        )}
      </div>

      {/* FEEDBACK POPUP SECTION */}
      <AnimatePresence>
        {isError && (
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            className="mt-6 p-4 rounded-2xl bg-rose-100 border-4 border-rose-400 text-rose-950 flex items-start gap-3 text-xs shadow-[4px_4px_0_#991b1b]"
          >
            <XCircle className="w-5 h-5 text-rose-700 flex-shrink-0 mt-0.5" />
            <div>
              <p className="font-black text-sm uppercase tracking-tight">Alguma coisa falhou!</p>
              <p className="text-rose-900 mt-1 font-semibold">Algumas respostas não correspondem ao gabarito ou ao código exato no PDF. Lê a dica do Professor Francisco e tenta de novo!</p>
            </div>
          </motion.div>
        )}

        {isCorrect && (
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            className="mt-6 p-4 rounded-2xl bg-emerald-100 border-4 border-emerald-500 text-emerald-950 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-xs shadow-[4px_4px_0_#065f46]"
          >
            <div className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-emerald-700 flex-shrink-0 mt-0.5 sm:mt-0" />
              <div>
                <p className="font-black text-sm uppercase tracking-tight flex items-center gap-1.5">
                  Desafio Resolvido com Sucesso! <Sparkles className="w-4 h-4 text-amber-500 fill-amber-400" />
                </p>
                <p className="text-emerald-900 mt-1 font-semibold">O laboratório de testes atualizou! Ganhaste XP correspondente a este passo de programação.</p>
              </div>
            </div>

            <button
              onClick={handleProceed}
              className="bg-yellow-400 hover:bg-yellow-500 text-indigo-950 text-xs font-black px-5 py-2.5 rounded-xl flex items-center gap-1 transition-all border-2 border-indigo-950 shadow-[3px_3px_0_#1e1b4b] active:translate-y-[2px] active:shadow-none w-full sm:w-auto justify-center cursor-pointer uppercase tracking-wider"
            >
              Avançar de Fase <ChevronRight className="w-4 h-4 text-indigo-950 stroke-[3]" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
