import { Award, CheckCircle2, Printer, Sparkles, Trophy } from "lucide-react";

interface CertificateProps {
  studentName: string;
  studentClass: string;
  onResetGame: () => void;
}

export function Certificate({ studentName, studentClass, onResetGame }: CertificateProps) {
  const currentLocalDateString = new Date().toLocaleDateString("pt-PT", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="bg-yellow-50 rounded-[32px] shadow-[8px_8px_0_#1e1b4b] border-8 border-indigo-950 p-6 md:p-10 max-w-4xl mx-auto my-6 print:shadow-none print:border-none print:p-0 relative overflow-hidden">
      
      {/* Decorative Gamey Corner Borders */}
      <div className="absolute top-0 left-0 w-16 h-16 border-t-8 border-l-8 border-pink-500 rounded-tl-lg pointer-events-none" />
      <div className="absolute top-0 right-0 w-16 h-16 border-t-8 border-r-8 border-pink-500 rounded-tr-lg pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-16 h-16 border-b-8 border-l-8 border-pink-500 rounded-bl-lg pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-16 h-16 border-b-8 border-r-8 border-pink-500 rounded-br-lg pointer-events-none" />

      {/* Confetti Background Decorator */}
      <div className="absolute inset-0 bg-grid-pattern opacity-10 pointer-events-none" />
      
      {/* CERTIFICATE BODY FOR PRINTING */}
      <div id="printable-certificate" className="border-4 border-indigo-950 p-6 md:p-8 rounded-2xl flex flex-col justify-center items-center text-center relative z-10 print:border-indigo-950 print:m-0 print:p-6 bg-white shadow-[4px_4px_0_#1e1b4b]">
        
        {/* Certificate Header */}
        <div className="mb-6">
          <p className="text-pink-600 uppercase font-black tracking-widest text-xs mb-1.5 flex items-center justify-center gap-1.5">
            <Award className="w-5 h-5 fill-current animate-bounce text-pink-500" />
            Certificado de Conclusão de Atividade
          </p>
          <h2 className="text-2xl md:text-3xl font-black text-indigo-950 tracking-tight uppercase italic">
            CETI Moisaniel Alves de Sousa
          </h2>
          <p className="text-slate-600 text-xs mt-1 md:text-sm font-black uppercase tracking-wider">
            💻 Curso de Desenvolvimento de Sistemas • Laboratório Gamificado
          </p>
        </div>

        {/* Certificate Intro */}
        <p className="text-slate-700 text-sm italic font-semibold max-w-xl leading-relaxed mb-6">
          Certificamos para os devidos efeitos que o aluno(a) abaixo listado concluiu com distinção e excelência a atividade laboratorial prática de programação e manipulação DOM:
        </p>

        {/* Student Name Display */}
        <div className="my-5 bg-pink-100 border-4 border-indigo-950 p-4 rounded-2xl min-w-[280px] max-w-lg shadow-[4px_4px_0_#1e1b4b]">
          <h3 className="text-2xl md:text-3.5xl font-black text-indigo-950 uppercase tracking-wide">
            {studentName.trim() === "" ? "Estudante Exemplar" : studentName}
          </h3>
        </div>

        {/* Student Class */}
        <p className="text-slate-800 text-sm font-black mb-6 flex items-center gap-2 justify-center mt-4">
          <span>SÉRIE/TURMA:</span> 
          <span className="text-indigo-950 font-bold bg-yellow-200 px-3.5 py-1 rounded-xl border-2 border-indigo-950 shadow-[2px_2px_0_#1e1b4b]">
            {studentClass.trim() === "" ? "2º Ano - Mentorias" : studentClass}
          </span>
        </p>

        {/* Details of Completion */}
        <div className="bg-indigo-50 border-4 border-indigo-950 rounded-2xl p-4 max-w-2xl mb-8 text-left text-xs leading-relaxed text-indigo-950 shadow-[4px_4px_0_#1e1b4b]">
          <p className="font-black mb-2 uppercase text-[10px] tracking-wider text-pink-600 flex items-center gap-1">
            <CheckCircle2 className="w-4 h-4 text-emerald-500 fill-current" />
            Competências Técnicas Avaliadas e Aprovadas:
          </p>
          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-2 font-semibold">
            <li>✔️ <strong>Estruturação HTML5:</strong> IDs semânticos do sistema.</li>
            <li>✔️ <strong>CSS Flexbox:</strong> Alinhamento dinâmico responsivo.</li>
            <li>✔️ <strong>DOM JavaScript:</strong> Seleção via <code>getElementById</code>.</li>
            <li>✔️ <strong>LocalStorage:</strong> Persistência local com JSON.</li>
            <li>✔️ <strong>Manipulação Dinâmica:</strong> Geração de links via API.</li>
            <li>✔️ <strong>Escuta de Eventos:</strong> Tratamento via <code>addEventListener</code>.</li>
          </ul>
        </div>

        {/* Signatures & Stamp block */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-xl items-end mt-4 mb-2">
          
          {/* Teacher Signature */}
          <div className="flex flex-col items-center">
            <div className="h-10 flex items-end justify-center font-black text-indigo-950 select-none text-sm pb-1.5 italic font-semibold">
              Francisco C. P. Dias
            </div>
            <div className="w-48 border-t-2 border-indigo-950" />
            <span className="text-[10px] text-slate-500 uppercase font-black mt-1">Prof. Francisco das Chagas Pereira Dias</span>
            <span className="text-[9px] text-slate-400 font-bold">Mentor / Professor Titular</span>
          </div>

          {/* Academic Date */}
          <div className="flex flex-col items-center">
            <div className="h-10 flex items-end justify-center text-indigo-950 text-xs font-black pb-1.5 font-mono">
              {currentLocalDateString}
            </div>
            <div className="w-48 border-t-2 border-indigo-950" />
            <span className="text-[10px] text-slate-500 uppercase font-black mt-1">Data de Certificação</span>
            <span className="text-[9px] text-slate-400 font-bold">Registo Digital CETI</span>
          </div>

        </div>

        {/* Verified Gold Seal Overlay on background */}
        <div className="absolute right-4 bottom-4 md:right-8 md:bottom-8 select-none pointer-events-none opacity-20 md:opacity-40 flex flex-col items-center text-center">
          <Trophy className="w-16 h-16 text-yellow-500 fill-yellow-300" />
          <span className="text-[9px] font-black text-indigo-950 font-mono tracking-widest mt-1">CETI CERTIFIED</span>
        </div>

      </div>

      {/* ACTIONS BUTTONS AREA */}
      <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4 print:hidden">
        <button
          onClick={handlePrint}
          className="w-full sm:w-auto bg-yellow-400 hover:bg-yellow-500 text-indigo-950 text-xs font-black px-6 py-3.5 rounded-xl flex items-center justify-center gap-2 border-2 border-indigo-950 shadow-[4px_4px_0_#1e1b4b] active:translate-y-[2px] active:shadow-none transition-all cursor-pointer uppercase tracking-wider"
        >
          <Printer className="w-4 h-4 text-indigo-950 stroke-[3]" />
          Imprimir Certificado / Guardar PDF
        </button>

        <button
          onClick={onResetGame}
          className="w-full sm:w-auto bg-rose-500 hover:bg-rose-600 text-white text-xs font-black px-6 py-3.5 rounded-xl flex items-center justify-center gap-2 border-2 border-indigo-950 shadow-[4px_4px_0_#1e1b4b] active:translate-y-[2px] active:shadow-none transition-all cursor-pointer uppercase tracking-wider"
        >
          Reiniciar Laboratório
        </button>
      </div>

      <div className="mt-4 text-center text-xs text-indigo-900 font-bold print:hidden">
        💡 Sugestão: Ao clicar em Imprimir, pode escolher a opção "Guardar como PDF" para arquivar o seu diploma no computador!
      </div>
    </div>
  );
}
