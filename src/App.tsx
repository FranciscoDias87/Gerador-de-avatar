import { useState, useEffect } from "react";
import { 
  Trophy, 
  BookOpen, 
  Code, 
  HelpCircle, 
  Sparkles, 
  RefreshCw, 
  ArrowRight, 
  Lightbulb, 
  CheckCircle,
  X,
  FileText,
  AlertCircle
} from "lucide-react";
import { StudentHeader } from "./components/StudentHeader";
import { ProfessorFrancisco } from "./components/ProfessorFrancisco";
import { ChallengeArea } from "./components/ChallengeArea";
import { SandboxPreview } from "./components/SandboxPreview";
import { Certificate } from "./components/Certificate";
import { GAME_LEVELS } from "./data/gameData";
import { motion, AnimatePresence } from "motion/react";

export default function App() {
  // Identity & progress states
  const [studentName, setStudentName] = useState<string>(() => {
    return localStorage.getItem("student_name") || "";
  });
  const [studentClass, setStudentClass] = useState<string>(() => {
    return localStorage.getItem("student_class") || "";
  });
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [unlockedLevel, setUnlockedLevel] = useState<number>(1);
  const [xpPoints, setXpPoints] = useState<number>(0);
  const [showTipModal, setShowTipModal] = useState<boolean>(false);
  
  // Evaluation feedbacks states
  const [isCorrect, setIsCorrect] = useState<boolean>(false);
  const [isError, setIsError] = useState<boolean>(false);
  const [gameCompleted, setGameCompleted] = useState<boolean>(false);

  // Persistence for student info
  useEffect(() => {
    localStorage.setItem("student_name", studentName);
  }, [studentName]);

  useEffect(() => {
    localStorage.setItem("student_class", studentClass);
  }, [studentClass]);

  // Load baseline XP from levels
  useEffect(() => {
    let xp = 0;
    for (let i = 1; i < unlockedLevel; i++) {
      if (i === 1) xp += 100;
      if (i === 2) xp += 100;
      if (i === 3) xp += 120;
      if (i === 4) xp += 150;
    }
    if (gameCompleted) {
      xp = 650; // Maximum possible score!
    }
    setXpPoints(xp);
  }, [unlockedLevel, gameCompleted]);

  // Handle when student successfully finishes a challenge level
  const handleStepComplete = (xpGained: number) => {
    setIsCorrect(false);
    setIsError(false);
    
    if (currentStep === 5) {
      setGameCompleted(true);
      setUnlockedLevel(5);
    } else {
      const next = currentStep + 1;
      setCurrentStep(next);
      if (next > unlockedLevel) {
        setUnlockedLevel(next);
      }
    }
  };

  // Reset progress to play again
  const handleResetGame = () => {
    if (window.confirm("Desejas mesmo reiniciar a atividade laboratorial? Todo o teu progresso de fases será limpo.")) {
      setCurrentStep(1);
      setUnlockedLevel(1);
      setGameCompleted(false);
      setIsCorrect(false);
      setIsError(false);
      localStorage.removeItem("savedAvatars");
    }
  };

  // Skip step tool for easy testing/grading
  const handleQuickUnlock = (step: number) => {
    if (step <= unlockedLevel) {
      setCurrentStep(step);
    }
  };

  const activeLevelData = GAME_LEVELS[currentStep - 1];

  return (
    <div className="min-h-screen bg-indigo-50/40 bg-grid-pattern text-slate-800 pb-16 font-sans antialiased">
      
      {/* Top Banner indicating Gamified Lesson */}
      <div className="bg-indigo-950 text-yellow-300 py-2.5 text-xs text-center border-b-4 border-indigo-950 font-black uppercase tracking-wider px-4 print:hidden">
        🎨 <span>CETI Moisaniel Alves de Sousa • Mentorias Tech • Laboratório Gamificado Prático de Programação</span>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-6">
        
        {/* STUDENT METADATA PANEL */}
        <StudentHeader 
          studentName={studentName} 
          setStudentName={setStudentName}
          studentClass={studentClass}
          setStudentClass={setStudentClass}
          xpPoints={xpPoints}
          unlockedLevel={unlockedLevel}
        />

        {/* TIMELINE LEVEL SELECTION ROW */}
        <div className="bg-white rounded-[24px] border-4 border-indigo-950 shadow-[4px_4px_0_#1e1b4b] p-5 mb-6 print:hidden">
          <div className="flex items-center justify-between mb-4 border-b-2 border-indigo-950/10 pb-2">
            <h4 className="text-xs uppercase font-black tracking-wider text-indigo-950 font-display">Passos da Atividade Prática</h4>
            <span className="text-[10px] text-indigo-950 bg-yellow-300 border-2 border-indigo-950 px-2.5 py-0.5 rounded-lg font-black uppercase tracking-wide">
              Progresso do Manual
            </span>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
            {GAME_LEVELS.map((lvl) => {
              const isLvlCompleted = lvl.id < unlockedLevel;
              const isLvlActive = lvl.id === currentStep;
              const isLvlLocked = lvl.id > unlockedLevel;

              return (
                <button
                  key={lvl.id}
                  onClick={() => handleQuickUnlock(lvl.id)}
                  disabled={isLvlLocked}
                  className={`flex-1 text-left p-3 rounded-2xl border-2 transition-all flex items-center gap-3 relative ${isLvlActive ? "bg-yellow-100 border-4 border-indigo-950 shadow-[2px_2px_0_#1e1b4b] ring-2 ring-yellow-400" : isLvlCompleted ? "bg-emerald-100 border-2 border-indigo-950 text-indigo-950 shadow-[2px_2px_0_#1e1b4b]" : "bg-slate-150 border-slate-300 text-slate-400 opacity-60 cursor-not-allowed"} ${!isLvlLocked ? "cursor-pointer" : ""}`}
                >
                  <div className={`w-8 h-8 rounded-full border-2 border-indigo-950 flex items-center justify-center font-black text-xs shadow-[1px_1px_0_#1e1b4b] ${isLvlActive ? "bg-yellow-400 text-indigo-950" : isLvlCompleted ? "bg-emerald-500 text-white" : "bg-slate-250 text-slate-500"}`}>
                    {isLvlCompleted ? "✓" : lvl.id}
                  </div>
                  
                  <div className="min-w-0 flex-1">
                    <p className={`text-[9px] uppercase font-black tracking-wider ${isLvlActive ? "text-indigo-950" : isLvlCompleted ? "text-emerald-700" : "text-slate-450"}`}>
                      {isLvlCompleted ? "Concluído" : isLvlActive ? "Ativo" : "Bloqueado"}
                    </p>
                    <p className={`text-xs font-black truncate uppercase ${isLvlActive ? "text-indigo-950" : isLvlCompleted ? "text-indigo-950" : "text-slate-450"}`}>
                      {lvl.title}
                    </p>
                  </div>
                  
                  {isLvlLocked && (
                    <span className="text-slate-400 text-xs">🔒</span>
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* CONDITIONAL MAIN CONTAINER IF GAME COMPLETED */}
        {gameCompleted ? (
          <div className="space-y-6">
            
            {/* Celebration Card */}
            <motion.div 
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="bg-emerald-100 border-8 border-indigo-950 rounded-[32px] p-6 md:p-8 text-indigo-950 shadow-[8px_8px_0_#1e1b4b] text-center relative overflow-hidden"
            >
              <div className="absolute inset-0 bg-grid-pattern opacity-10 pointer-events-none" />
              <div className="relative z-10 flex flex-col items-center max-w-2xl mx-auto">
                <span className="text-4xl mb-3 animate-bounce">🎉🏆</span>
                <h2 className="text-2xl md:text-4xl font-black tracking-tight mb-2 uppercase italic text-indigo-950">
                  PARABÉNS! COMPLETASTE A MISSÃO!
                </h2>
                <p className="text-indigo-900 text-sm md:text-base leading-relaxed mb-6 font-semibold">
                  Excelente trabalho, <span className="font-black underline text-pink-600">{studentName || "Estudante"}</span>! Conseguiste transformar o Laboratório Avançado de Avatares num jogo dinâmico e solucionaste com sucesso todos os desafios de código: HTML, CSS Flexbox, DOM JavaScript e Persistência Local.
                </p>
                <div className="flex flex-wrap gap-4 justify-center">
                  <a 
                    href="#printable-certificate"
                    className="bg-yellow-400 hover:bg-yellow-500 text-indigo-950 font-black text-xs px-6 py-3 rounded-xl border-2 border-indigo-950 shadow-[3px_3px_0_#1e1b4b] active:translate-y-[2px] active:shadow-none transition-all cursor-pointer uppercase tracking-wider"
                  >
                    Ver o meu Certificado 👇
                  </a>
                  <button
                    onClick={handleResetGame}
                    className="bg-rose-500 hover:bg-rose-600 text-white font-black text-xs px-6 py-3 rounded-xl border-2 border-indigo-950 shadow-[3px_3px_0_#1e1b4b] active:translate-y-[2px] active:shadow-none transition-all cursor-pointer uppercase tracking-wider"
                  >
                    Praticar de Novo 🔄
                  </button>
                </div>
              </div>
            </motion.div>

            {/* Sandbox Visualizer Full Screen Play Area */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              
              <div className="lg:col-span-4 space-y-4">
                <div className="bg-white rounded-[24px] border-4 border-indigo-950 shadow-[4px_4px_0_#1e1b4b] p-5 md:p-6">
                  <h3 className="font-black text-indigo-950 text-base mb-3 flex items-center gap-1.5 uppercase italic">
                    <BookOpen className="w-5 h-5 text-pink-500" />
                    <span>Modo Sandbox Livre</span>
                  </h3>
                  <p className="text-slate-700 text-xs leading-relaxed mb-4 font-semibold">
                    Agora o teu Gerador de Avatares está 100% ativo! Digita o nome que quiseres para veres a API do DiceBear gerar um avatar único. Podes testar diferentes estilos e limpar o histórico.
                  </p>
                  
                  {/* Stats card */}
                  <div className="bg-indigo-50 rounded-xl p-3 border-2 border-indigo-950 text-xs text-indigo-950 space-y-2 font-mono font-bold shadow-[2px_2px_0_#1e1b4b]">
                    <p className="flex justify-between"><strong>Aluno(a):</strong> <span>{studentName || "Incompleto"}</span></p>
                    <p className="flex justify-between"><strong>Série:</strong> <span>{studentClass || "Incompleto"}</span></p>
                    <p className="flex justify-between"><strong>Pontuação Final:</strong> <span className="text-pink-600 font-black">650 XP Max!</span></p>
                    <p className="flex justify-between"><strong>Estado do Lab:</strong> <span className="text-emerald-600 font-black">Aprovado</span></p>
                  </div>
                </div>

                <ProfessorFrancisco 
                  currentStep={currentStep}
                  isError={isError}
                  isCorrect={isCorrect}
                  onShowTip={() => setShowTipModal(true)}
                  xpAwarded={true}
                  gameCompleted={true}
                />
              </div>

              <div className="lg:col-span-8">
                <SandboxPreview 
                  currentStep={5}
                  gameCompleted={true}
                />
              </div>

            </div>

            {/* Printable Certificate component */}
            <Certificate 
              studentName={studentName}
              studentClass={studentClass}
              onResetGame={handleResetGame}
            />

          </div>
        ) : (
          
          /* ACTIVE GAMEPLAY SCREEN (SPLIT PANE) */
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            
            {/* LEFT SIDE: INSTRUCTIONS & INTERACTIVE CHALLENGE */}
            <div className="lg:col-span-6 space-y-6">
              
              {/* Professor Card */}
              <ProfessorFrancisco 
                currentStep={currentStep}
                isError={isError}
                isCorrect={isCorrect}
                onShowTip={() => setShowTipModal(true)}
                xpAwarded={unlockedLevel > currentStep}
                gameCompleted={false}
              />

              {/* Challenge Card */}
              <ChallengeArea 
                currentStep={currentStep}
                onStepComplete={handleStepComplete}
                isCorrect={isCorrect}
                setIsCorrect={setIsCorrect}
                isError={isError}
                setIsError={setIsError}
              />

              {/* COLLAPSIBLE LAB MANUAL (ORIGINAL PDF COMPANION) */}
              <div className="bg-white rounded-[24px] border-4 border-indigo-950 shadow-[4px_4px_0_#1e1b4b] overflow-hidden">
                <div className="bg-yellow-300 border-b-4 border-indigo-950 px-5 py-4 flex items-center justify-between">
                  <h4 className="font-black text-indigo-950 text-xs uppercase flex items-center gap-1.5">
                    <FileText className="w-4.5 h-4.5 text-indigo-950 stroke-[3]" />
                    <span>Manual da Atividade Prática (PDF Oficial)</span>
                  </h4>
                  <span className="text-[9px] font-black uppercase text-indigo-950 bg-white/70 px-2 py-0.5 rounded-md border border-indigo-950">Estudo</span>
                </div>

                <div className="p-5 max-h-[300px] overflow-y-auto text-xs leading-relaxed text-slate-700 space-y-4">
                  <div className="border-l-4 border-pink-500 pl-3">
                    <h5 className="font-black text-indigo-950 text-xs mb-1 uppercase tracking-wide">
                      {activeLevelData.subtitle}
                    </h5>
                    <p className="text-slate-600 font-medium">{activeLevelData.description}</p>
                  </div>

                  <div className="bg-slate-900 text-slate-200 border-2 border-indigo-950 rounded-xl p-3.5 font-mono text-[11px] leading-relaxed relative shadow-inner">
                    <div className="absolute right-2.5 top-2 text-[8px] bg-slate-800 text-slate-300 px-2 py-0.5 border border-slate-700 rounded-md uppercase font-black tracking-widest select-none">
                      Referência
                    </div>
                    <pre className="whitespace-pre-wrap">{activeLevelData.codeSnippet}</pre>
                  </div>
                </div>
              </div>

            </div>

            {/* RIGHT SIDE: LIVE SIMULATION LABORATORY */}
            <div className="lg:col-span-6 lg:sticky lg:top-6 h-full">
              <SandboxPreview 
                currentStep={currentStep}
                gameCompleted={false}
              />
            </div>

          </div>
        )}

      </div>

      {/* DETAILED EDUCATIONAL TIP MODAL */}
      <AnimatePresence>
        {showTipModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-indigo-950/70 backdrop-blur-xs print:hidden">
            <motion.div 
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white rounded-[32px] shadow-[8px_8px_0_#1e1b4b] max-w-lg w-full overflow-hidden border-8 border-indigo-950"
            >
              {/* Modal header */}
              <div className="bg-pink-500 border-b-4 border-indigo-950 text-white px-5 py-4 flex items-center justify-between">
                <h4 className="font-black text-sm flex items-center gap-1.5 uppercase">
                  <Lightbulb className="w-5 h-5 text-yellow-300 fill-yellow-300 stroke-[3]" />
                  <span>Dica Didática • Passo {currentStep}</span>
                </h4>
                <button 
                  onClick={() => setShowTipModal(false)}
                  className="bg-indigo-950 text-white border-2 border-indigo-950 hover:bg-pink-600 p-1.5 rounded-lg transition-all cursor-pointer"
                >
                  <X className="w-4 h-4 stroke-[3]" />
                </button>
              </div>

              {/* Modal content */}
              <div className="p-5 md:p-6 space-y-4 text-xs md:text-sm leading-relaxed">
                <div className="bg-yellow-50 border-2 border-indigo-950 p-4 rounded-2xl shadow-[3px_3px_0_#1e1b4b]">
                  <p className="font-black text-xs uppercase text-pink-600 flex items-center gap-1 mb-1 font-display">
                    👨‍🏫 Conselho do Professor Francisco:
                  </p>
                  <p className="text-indigo-950 italic font-semibold">"{activeLevelData.professorTip}"</p>
                </div>

                <div className="bg-indigo-50 border-2 border-indigo-950 p-4 rounded-2xl shadow-[3px_3px_0_#1e1b4b]">
                  <p className="font-black text-xs uppercase text-indigo-900 flex items-center gap-1 mb-1 font-display">
                    💼 Conexão com o Mercado de Trabalho:
                  </p>
                  <p className="text-slate-700 font-semibold">{activeLevelData.marketTip}</p>
                </div>
              </div>

              {/* Modal footer */}
              <div className="bg-yellow-100 px-5 py-4 border-t-4 border-indigo-950 flex justify-end">
                <button
                  onClick={() => setShowTipModal(false)}
                  className="bg-yellow-400 hover:bg-yellow-500 text-indigo-950 text-xs font-black px-6 py-3.5 border-2 border-indigo-950 shadow-[3px_3px_0_#1e1b4b] active:translate-y-[2px] active:shadow-none transition-all rounded-xl cursor-pointer uppercase tracking-wider"
                >
                  Entendi! Voltar ao Laboratório
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
}
