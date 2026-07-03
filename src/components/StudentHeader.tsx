import { Award, GraduationCap, ShieldAlert, Sparkles, Trophy } from "lucide-react";

interface StudentHeaderProps {
  studentName: string;
  setStudentName: (name: string) => void;
  studentClass: string;
  setStudentClass: (cls: string) => void;
  xpPoints: number;
  unlockedLevel: number;
}

export function StudentHeader({
  studentName,
  setStudentName,
  studentClass,
  setStudentClass,
  xpPoints,
  unlockedLevel,
}: StudentHeaderProps) {
  // Calculate dynamic energy bar percentage based on level
  const energyPercent = (unlockedLevel / 5) * 100;

  return (
    <div className="bg-slate-900 text-white rounded-[32px] p-6 md:p-8 mb-6 border-8 border-indigo-200 relative overflow-hidden chunky-shadow-indigo">
      {/* Decorative colored grid inside header */}
      <div className="absolute inset-0 bg-grid-pattern-dark opacity-10 pointer-events-none" />
      <div className="absolute right-0 top-0 w-64 h-64 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="relative flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6 z-10">
        <div>
          <div className="flex flex-wrap items-center gap-2 mb-2">
            <span className="bg-yellow-400 text-indigo-950 text-xs font-black px-3 py-1 rounded-xl uppercase tracking-wider flex items-center gap-1 border-2 border-indigo-950 shadow-[0_2px_0_#1e1b4b]">
              <Sparkles className="w-3.5 h-3.5 fill-current" /> Mentorias Tech
            </span>
            <span className="bg-indigo-600 text-white text-xs font-bold px-3 py-1 rounded-xl flex items-center gap-1 border-2 border-indigo-950">
              <GraduationCap className="w-3.5 h-3.5" /> CETI Moisaniel Alves de Sousa
            </span>
          </div>
          <h1 className="text-2xl md:text-3xl font-display font-black tracking-tight text-white flex items-center gap-2 italic uppercase">
            🚀 Gerador de Avatares <span className="text-yellow-300">Lab Jogo</span>
          </h1>
          <p className="text-slate-300 text-xs mt-1 max-w-2xl font-semibold">
            Professor: <span className="text-yellow-200 font-bold">Francisco das Chagas Pereira Dias</span> • Disciplina: Desenvolvimento de Sistemas
          </p>
        </div>

        {/* Score & Progression Badges in the exact Vibrant Palette Mockup Style */}
        <div className="flex flex-wrap items-center gap-6">
          
          {/* Energy level bar */}
          <div className="flex flex-col items-start sm:items-end">
            <span className="text-xs font-black text-indigo-300 uppercase tracking-wider">Nível de Energia (Progresso)</span>
            <div className="w-48 h-6 bg-indigo-950 rounded-full border-2 border-indigo-400 overflow-hidden relative mt-1">
              <div 
                className="h-full bg-emerald-400 transition-all duration-500 ease-out"
                style={{ width: `${energyPercent}%` }}
              />
              <span className="absolute inset-0 flex items-center justify-center text-[10px] font-black text-white mix-blend-difference">
                {unlockedLevel}/5 PASSO
              </span>
            </div>
          </div>

          {/* XP Badge in Vibrant Yellow/Indigo 3D button style */}
          <div className="bg-yellow-400 text-indigo-950 border-4 border-indigo-950 rounded-2xl px-5 py-2.5 flex items-center gap-3 shadow-[0_6px_0_#1e1b4b] transform hover:translate-y-[2px] hover:shadow-[0_4px_0_#1e1b4b] transition-all">
            <div className="p-1 bg-indigo-950 rounded-lg text-yellow-400">
              <Trophy className="w-5 h-5 animate-pulse" />
            </div>
            <div>
              <p className="text-indigo-950/70 text-[10px] uppercase font-black tracking-wider">Pontuação Total</p>
              <p className="text-xl font-black font-mono leading-none">{xpPoints} XP</p>
            </div>
          </div>

        </div>
      </div>

      {/* Student Form Inputs */}
      <div className="relative mt-6 pt-6 border-t-4 border-indigo-950/50 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 z-10">
        <div>
          <label htmlFor="student-name-input" className="block text-indigo-200 text-xs font-black mb-1.5 uppercase tracking-wider">
            Nome do Aluno(a)
          </label>
          <input
            id="student-name-input"
            type="text"
            placeholder="Introduza o seu nome completo"
            value={studentName}
            onChange={(e) => setStudentName(e.target.value)}
            className="w-full bg-slate-950 border-2 border-indigo-800 rounded-xl px-3 py-2 text-sm text-slate-100 placeholder-slate-600 focus:outline-none focus:border-yellow-400 focus:ring-1 focus:ring-yellow-400 transition-colors font-semibold"
          />
        </div>

        <div>
          <label htmlFor="student-class-input" className="block text-indigo-200 text-xs font-black mb-1.5 uppercase tracking-wider">
            Série e Turma
          </label>
          <input
            id="student-class-input"
            type="text"
            placeholder="Ex: 2º Ano - Turma A"
            value={studentClass}
            onChange={(e) => setStudentClass(e.target.value)}
            className="w-full bg-slate-950 border-2 border-indigo-800 rounded-xl px-3 py-2 text-sm text-slate-100 placeholder-slate-600 focus:outline-none focus:border-yellow-400 focus:ring-1 focus:ring-yellow-400 transition-colors font-semibold"
          />
        </div>

        <div className="flex items-end pb-1 text-slate-400 text-xs sm:col-span-2 md:col-span-1">
          {studentName.trim() === "" ? (
            <div className="flex items-center gap-2 text-yellow-300 bg-yellow-400/5 px-3 py-2 rounded-xl border-2 border-yellow-400/30 w-full font-medium">
              <ShieldAlert className="w-4 h-4 flex-shrink-0 text-yellow-400" />
              <span>Escreva o seu nome para liberar o seu Certificado!</span>
            </div>
          ) : (
            <div className="flex items-center gap-2 text-emerald-300 bg-emerald-500/5 px-3 py-2 rounded-xl border-2 border-emerald-500/30 w-full font-medium">
              <Sparkles className="w-4 h-4 flex-shrink-0 text-emerald-400" />
              <span>Estudante registado! Boa sorte na missão.</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
