import { useState, useEffect, FormEvent } from "react";
import { 
  Laptop, 
  Code, 
  Database, 
  Trash2, 
  Sparkles, 
  BookOpen, 
  Flame, 
  Save, 
  FileCode,
  Globe
} from "lucide-react";
import { Avatar } from "../types";
import { GAME_LEVELS } from "../data/gameData";

interface SandboxPreviewProps {
  currentStep: number;
  gameCompleted: boolean;
}

export function SandboxPreview({ currentStep, gameCompleted }: SandboxPreviewProps) {
  const [activeTab, setActiveTab] = useState<"preview" | "code">("preview");
  const [codeFileTab, setCodeFileTab] = useState<"html" | "css" | "js">("html");

  // State inside Sandbox (active once fully unlocked in Level 5 or when playing completed)
  const [avatarName, setAvatarName] = useState<string>("");
  const [avatarStyle, setAvatarStyle] = useState<string>("bottts");
  const [previewName, setPreviewName] = useState<string>("Admin");
  const [previewUrl, setPreviewUrl] = useState<string>("https://api.dicebear.com/9.x/bottts/svg?seed=Admin");
  const [historyList, setHistoryList] = useState<Avatar[]>([]);

  // Load history list from localStorage if exists
  useEffect(() => {
    try {
      const stored = localStorage.getItem("savedAvatars");
      if (stored) {
        setHistoryList(JSON.parse(stored));
      } else {
        // Sample baseline when JS is working but empty
        setHistoryList([]);
      }
    } catch (e) {
      console.error("Local storage error:", e);
    }
  }, [currentStep, gameCompleted]);

  // Handle submit inside Sandbox (Level 5 or complete only)
  const handleFormSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (currentStep < 5 && !gameCompleted) return; // Locked in earlier steps!
    
    const name = avatarName.trim();
    if (!name) return;

    const url = `https://api.dicebear.com/9.x/${avatarStyle}/svg?seed=${encodeURIComponent(name)}`;
    setPreviewName(name);
    setPreviewUrl(url);

    const updated = [...historyList, { name, url }];
    setHistoryList(updated);
    localStorage.setItem("savedAvatars", JSON.stringify(updated));
    setAvatarName("");
  };

  // Live preview change when Style Select is adjusted
  const handleStyleChange = (style: string) => {
    setAvatarStyle(style);
    if (currentStep >= 5 || gameCompleted) {
      const url = `https://api.dicebear.com/9.x/${style}/svg?seed=${encodeURIComponent(previewName)}`;
      setPreviewUrl(url);
    }
  };

  // Clear history inside Sandbox
  const handleClearHistory = () => {
    setHistoryList([]);
    localStorage.removeItem("savedAvatars");
  };

  // Get Code text content based on selected tab and active level
  const getCodeContent = () => {
    if (codeFileTab === "html") {
      return GAME_LEVELS[0].codeSnippet;
    }
    if (codeFileTab === "css") {
      return GAME_LEVELS[1].codeSnippet;
    }
    // JS
    if (currentStep < 3) {
      return `// app.js\n// Aguardando Passo 3 para iniciar o script...`;
    }
    if (currentStep === 3) {
      return GAME_LEVELS[2].codeSnippet;
    }
    if (currentStep === 4) {
      return `${GAME_LEVELS[2].codeSnippet}\n\n${GAME_LEVELS[3].codeSnippet}`;
    }
    return `${GAME_LEVELS[2].codeSnippet}\n\n${GAME_LEVELS[3].codeSnippet}\n\n${GAME_LEVELS[4].codeSnippet}`;
  };

  // Render dummy mock history elements for Level 4 visuals (before fully operational)
  const renderMockHistory = () => {
    const dummyList = [
      { name: "RoboCop", url: "https://api.dicebear.com/9.x/bottts/svg?seed=RoboCop" },
      { name: "Soraia", url: "https://api.dicebear.com/9.x/adventurer/svg?seed=Soraia" },
      { name: "PixelHero", url: "https://api.dicebear.com/9.x/pixel-art/svg?seed=PixelHero" }
    ];

    return (
      <div className="flex flex-wrap gap-2.5 mt-2">
        {dummyList.map((av, i) => (
          <img
            key={i}
            src={av.url}
            title={av.name}
            className="w-12 h-12 rounded-full border-2 border-slate-200 bg-slate-50 shadow-sm"
            alt={av.name}
          />
        ))}
      </div>
    );
  };

  return (
    <div className="bg-slate-900 border-8 border-indigo-950 rounded-[32px] shadow-[8px_8px_0_#1e1b4b] overflow-hidden flex flex-col h-full min-h-[580px] relative">
      
      {/* Header bar */}
      <div className="bg-indigo-950 px-4 py-3.5 border-b-4 border-indigo-950 flex flex-wrap gap-2.5 items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="flex gap-1.5">
            <span className="w-3.5 h-3.5 bg-rose-500 rounded-full border-2 border-indigo-950" />
            <span className="w-3.5 h-3.5 bg-yellow-400 rounded-full border-2 border-indigo-950" />
            <span className="w-3.5 h-3.5 bg-emerald-400 rounded-full border-2 border-indigo-950" />
          </div>
          <span className="text-yellow-300 text-xs font-black font-mono ml-2 truncate max-w-[200px] md:max-w-[280px] uppercase">
            {activeTab === "preview" ? "📺 LAB-VIRTUAL.EXE" : `📁 APP_PROJECT/${codeFileTab === "html" ? "index.html" : codeFileTab === "css" ? "style.css" : "app.js"}`}
          </span>
        </div>

        {/* View mode toggle */}
        <div className="bg-indigo-900 border-2 border-indigo-950 p-1 rounded-xl flex items-center">
          <button
            onClick={() => setActiveTab("preview")}
            className={`px-4 py-1.5 rounded-lg text-xs font-black flex items-center gap-1.5 transition-all cursor-pointer ${activeTab === "preview" ? "bg-yellow-400 text-indigo-950 border-2 border-indigo-950 shadow-[2px_2px_0_#1e1b4b]" : "text-indigo-200 hover:text-white"}`}
          >
            <Laptop className="w-3.5 h-3.5 stroke-[3]" />
            Laboratório
          </button>
          <button
            onClick={() => setActiveTab("code")}
            className={`px-4 py-1.5 rounded-lg text-xs font-black flex items-center gap-1.5 transition-all cursor-pointer ${activeTab === "code" ? "bg-yellow-400 text-indigo-950 border-2 border-indigo-950 shadow-[2px_2px_0_#1e1b4b]" : "text-indigo-200 hover:text-white"}`}
          >
            <Code className="w-3.5 h-3.5 stroke-[3]" />
            Código-Fonte
          </button>
        </div>
      </div>

      {/* RENDER VIEW AREA */}
      <div className="flex-1 flex flex-col overflow-auto">
        
        {/* TAB 1: PREVIEW */}
        {activeTab === "preview" && (
          <div className="p-4 sm:p-6 bg-slate-950 flex-1 flex flex-col justify-center items-center relative min-h-[450px]">
            {/* Ambient indicator lights */}
            <div className="absolute top-3 left-4 flex items-center gap-2 text-[10px] font-mono text-slate-500 bg-slate-900/50 border border-slate-800/80 px-2 py-1 rounded">
              <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-ping" />
              <span>Estado do Sistema: {currentStep >= 5 || gameCompleted ? "Totalmente Conectado" : `Construindo Passo ${currentStep}`}</span>
            </div>

            {/* IF LEVEL 1 (Primitive, unstyled browser DOM) */}
            {currentStep === 1 && !gameCompleted ? (
              <div className="w-full max-w-md bg-white p-5 border-2 border-black font-serif text-black shadow-none rounded-none text-left leading-normal">
                <h1 className="text-xl font-bold border-b border-black pb-1 mb-3">Avatar System Pro</h1>
                
                <form onSubmit={(e) => e.preventDefault()} className="space-y-2">
                  <h3 className="font-bold text-sm">Criar Avatar</h3>
                  <div className="space-y-1">
                    <label className="text-xs font-bold block">Nome do personagem:</label>
                    <input 
                      type="text" 
                      placeholder="Nome do personagem" 
                      disabled 
                      className="border border-black px-1 py-0.5 text-xs w-full rounded-none bg-slate-100"
                    />
                  </div>
                  
                  <div className="space-y-1">
                    <label className="text-xs font-bold block">Estilo:</label>
                    <select disabled className="border border-black text-xs px-1 rounded-none bg-slate-100 w-full">
                      <option>Robôs</option>
                    </select>
                  </div>

                  <button type="submit" disabled className="bg-neutral-200 border border-black text-xs px-2 py-0.5 font-bold cursor-not-allowed">
                    Gerar & Guardar
                  </button>
                </form>

                <div className="border border-dashed border-black p-3 mt-4 text-center">
                  <img src="https://api.dicebear.com/9.x/bottts/svg?seed=Admin" className="w-16 h-16 mx-auto bg-neutral-100 border border-black mb-1" alt="admin" />
                  <span className="font-bold text-xs">Admin</span>
                </div>

                <div className="border-t border-black mt-4 pt-3">
                  <h3 className="font-bold text-sm">Histórico de Criações</h3>
                  <div className="bg-neutral-100 h-10 border border-black flex items-center justify-center text-xs text-neutral-500 font-sans">
                    [Histórico vazio]
                  </div>
                  <button disabled className="bg-neutral-200 border border-black text-xs px-2 py-0.5 mt-2 font-bold opacity-60 cursor-not-allowed">Limpar Histórico</button>
                </div>
              </div>
            ) : (
              
              /* LEVEL 2, 3, 4, 5 (Beautiful modern layout applied via style.css!) */
              <div className="w-full max-w-3xl bg-yellow-100 p-5 rounded-[28px] border-4 border-indigo-950 shadow-[6px_6px_0_#1e1b4b] text-slate-800 font-sans">
                
                {/* Simulated App Container */}
                <div className="bg-white rounded-2xl p-4 sm:p-6 border-4 border-indigo-950 shadow-[4px_4px_0_#1e1b4b]">
                  
                  <div className="flex flex-col md:flex-row md:items-stretch justify-center gap-6">
                    
                    {/* LEFT PANEL: GENERATOR */}
                    <div className="flex-1 space-y-4 flex flex-col justify-between">
                      
                      <form onSubmit={handleFormSubmit} className="flex flex-col gap-3">
                        <h2 className="text-lg font-black text-indigo-950 border-b-4 border-indigo-950 pb-2 flex items-center gap-1.5 uppercase italic">
                          <span>✨ Criar Avatar</span>
                        </h2>

                        <div className="flex flex-col gap-1.5">
                          <label className="text-xs font-black text-indigo-950 uppercase tracking-wider">Nome do Personagem</label>
                          <input
                            type="text"
                            placeholder="Escreve um nome..."
                            value={avatarName}
                            onChange={(e) => setAvatarName(e.target.value)}
                            disabled={currentStep < 5 && !gameCompleted}
                            className={`px-3 py-2 border-2 rounded-xl text-xs w-full font-bold font-mono transition-all focus:outline-none focus:ring-2 focus:ring-pink-500 ${currentStep < 5 && !gameCompleted ? "bg-slate-100 border-indigo-950/20 text-slate-400 cursor-not-allowed" : "bg-white border-indigo-950 text-indigo-950 shadow-[2px_2px_0_#1e1b4b]"}`}
                            required
                          />
                        </div>

                        <div className="flex flex-col gap-1.5">
                          <label className="text-xs font-black text-indigo-950 uppercase tracking-wider">Estilo de Desenho</label>
                          <select
                            value={avatarStyle}
                            onChange={(e) => handleStyleChange(e.target.value)}
                            disabled={currentStep < 5 && !gameCompleted}
                            className={`px-3 py-2 border-2 rounded-xl text-xs w-full font-bold transition-all focus:outline-none cursor-pointer ${currentStep < 5 && !gameCompleted ? "bg-slate-100 border-indigo-950/20 text-slate-400 cursor-not-allowed" : "bg-white border-indigo-950 text-indigo-950 shadow-[2px_2px_0_#1e1b4b]"}`}
                          >
                            <option value="bottts">🤖 Robôs</option>
                            <option value="adventurer">🤠 Aventureiros</option>
                            <option value="avataaars">🧑 Humanos</option>
                            <option value="pixel-art">👾 Pixel Art</option>
                          </select>
                        </div>

                        <button
                          type="submit"
                          disabled={currentStep < 5 && !gameCompleted}
                          className={`w-full py-2.5 rounded-xl text-xs font-black text-white transition-all border-2 border-indigo-950 flex items-center justify-center gap-1.5 cursor-pointer uppercase tracking-wider ${currentStep < 5 && !gameCompleted ? "bg-slate-300 border-slate-400 text-slate-500 cursor-not-allowed shadow-none" : "bg-pink-500 hover:bg-pink-600 shadow-[3px_3px_0_#1e1b4b] active:translate-y-[2px] active:shadow-none"}`}
                        >
                          <Save className="w-4 h-4 text-white stroke-[3]" />
                          Gerar & Guardar
                        </button>
                      </form>

                      {/* Display Preview Card */}
                      <div className="bg-indigo-50 border-4 border-indigo-950 rounded-2xl p-4 flex flex-col items-center justify-center text-center mt-4 shadow-[3px_3px_0_#1e1b4b]">
                        <div className="relative group">
                          {/* Indicator that connections are set in Step 3 */}
                          {currentStep === 3 && (
                            <div className="absolute inset-0 bg-amber-500/10 rounded-full border border-amber-500 animate-ping pointer-events-none" />
                          )}
                          <img
                            id="avatar-image"
                            src={previewUrl}
                            className="w-24 h-24 rounded-full border-4 border-indigo-950 bg-white shadow-[2px_2px_0_#1e1b4b] p-1 transition-transform duration-300"
                            alt="Preview"
                          />
                        </div>
                        <h3 id="display-name" className="font-display font-black text-indigo-950 mt-2 uppercase tracking-wide">
                          {previewName}
                        </h3>
                        {currentStep < 5 && !gameCompleted && (
                          <span className="text-[9px] bg-yellow-300 text-indigo-950 border-2 border-indigo-950 px-2.5 py-0.5 rounded-lg mt-1.5 font-black uppercase">
                            {currentStep === 2 ? "Fase 2: Estilo Ativo!" : currentStep === 3 ? "Fase 3: DOM Ativado!" : "Fase 4: Loop Ativo!"}
                          </span>
                        )}
                      </div>

                    </div>

                    {/* RIGHT PANEL: HISTORY */}
                    <div className="w-full md:w-64 border-t-4 md:border-t-0 md:border-l-4 border-indigo-950 pt-4 md:pt-0 md:pl-5 flex flex-col justify-between">
                      <div>
                        <h3 className="font-black text-indigo-950 text-xs uppercase mb-3 pb-2 border-b-2 border-indigo-950/10 flex items-center justify-between">
                          <span>📜 Histórico</span>
                          <span className="text-[10px] bg-indigo-950 text-yellow-300 px-2 py-0.5 rounded-lg font-black border border-indigo-950">
                            {historyList.length} ITENS
                          </span>
                        </h3>

                        {/* Rendering state conditional logic based on Step 4 */}
                        {currentStep < 4 && !gameCompleted ? (
                          <div className="bg-indigo-50 border-2 border-indigo-950/20 text-slate-500 text-center py-6 px-4 rounded-xl text-xs leading-normal font-semibold italic">
                            🚫 JavaScript do Histórico não foi montado. Conclua as fases anteriores para ver a renderização dinâmica.
                          </div>
                        ) : currentStep === 4 && !gameCompleted ? (
                          <div className="bg-indigo-50 border-2 border-indigo-950 p-3 rounded-xl shadow-[2px_2px_0_#1e1b4b]">
                            <span className="text-[9px] uppercase font-black text-emerald-600 block mb-2">Simulação (Passo 4):</span>
                            {renderMockHistory()}
                          </div>
                        ) : historyList.length === 0 ? (
                          <div className="bg-indigo-50 border-2 border-indigo-950/20 text-slate-400 text-center py-8 px-4 rounded-xl text-xs font-semibold italic">
                            Nenhum avatar guardado. Digite um nome e clique em gerar acima!
                          </div>
                        ) : (
                          <div id="history-container" className="flex flex-wrap gap-2.5 max-h-[140px] overflow-y-auto p-2 border-2 border-indigo-950 rounded-xl bg-indigo-50 shadow-inner">
                            {historyList.map((avatar, idx) => (
                              <img
                                key={idx}
                                src={avatar.url}
                                title={`${avatar.name} (Clique para focar)`}
                                onClick={() => {
                                  setPreviewName(avatar.name);
                                  setPreviewUrl(avatar.url);
                                }}
                                className="w-11 h-11 rounded-full border-2 border-indigo-950 hover:border-pink-500 hover:scale-110 cursor-pointer transition-all bg-white p-0.5 shadow-[1px_1px_0_#1e1b4b]"
                                alt={avatar.name}
                              />
                            ))}
                          </div>
                        )}
                      </div>

                      <button
                        onClick={handleClearHistory}
                        disabled={currentStep < 5 && !gameCompleted}
                        className={`w-full text-center py-2 text-xs font-black text-white rounded-xl border-2 border-indigo-950 transition-all mt-4 flex items-center justify-center gap-1.5 cursor-pointer uppercase tracking-wider ${currentStep < 5 && !gameCompleted ? "bg-slate-300 border-slate-400 text-slate-500 cursor-not-allowed" : "bg-rose-500 hover:bg-rose-600 shadow-[3px_3px_0_#1e1b4b] active:translate-y-[2px] active:shadow-none"}`}
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                        Limpar Histórico
                      </button>
                    </div>

                  </div>

                </div>

                <div className="mt-3 flex items-center justify-between text-[10px] text-indigo-900 font-bold">
                  <span>Plataforma de Testes Académicos - CETI Moisaniel</span>
                  <span>Persistência: localStorage</span>
                </div>
              </div>
            )}
          </div>
        )}

        {/* TAB 2: SOURCE CODE VIEW */}
        {activeTab === "code" && (
          <div className="p-4 bg-indigo-950 flex-1 flex flex-col font-mono border-t-4 border-indigo-950">
            {/* File navigator tabs */}
            <div className="flex border-b-2 border-indigo-900 mb-3 overflow-x-auto">
              <button
                onClick={() => setCodeFileTab("html")}
                className={`px-4 py-2 text-xs font-mono font-black border-t-4 flex items-center gap-1.5 transition-all cursor-pointer ${codeFileTab === "html" ? "border-yellow-400 bg-slate-900 text-yellow-300" : "border-transparent text-slate-400 hover:text-slate-200"}`}
              >
                <FileCode className="w-3.5 h-3.5 text-yellow-400" />
                index.html
              </button>
              <button
                onClick={() => setCodeFileTab("css")}
                className={`px-4 py-2 text-xs font-mono font-black border-t-4 flex items-center gap-1.5 transition-all cursor-pointer ${codeFileTab === "css" ? "border-pink-500 bg-slate-900 text-pink-400" : "border-transparent text-slate-400 hover:text-slate-200"}`}
              >
                <FileCode className="w-3.5 h-3.5 text-pink-500" />
                style.css
              </button>
              <button
                onClick={() => setCodeFileTab("js")}
                className={`px-4 py-2 text-xs font-mono font-black border-t-4 flex items-center gap-1.5 transition-all cursor-pointer ${codeFileTab === "js" ? "border-emerald-400 bg-slate-900 text-emerald-400" : "border-transparent text-slate-400 hover:text-slate-200"}`}
              >
                <FileCode className="w-3.5 h-3.5 text-emerald-400" />
                app.js
              </button>
            </div>

            {/* Code pane container */}
            <div className="flex-1 bg-slate-900 rounded-xl p-4 text-xs overflow-auto max-h-[400px] border-2 border-indigo-900 shadow-inner">
              <pre className="text-slate-200 leading-relaxed whitespace-pre font-mono">
                <code>{getCodeContent()}</code>
              </pre>
            </div>
            
            <div className="mt-3 bg-indigo-900/40 p-3 rounded-xl border-2 border-indigo-900 text-[11px] text-indigo-200 leading-relaxed font-semibold">
              💡 Este é o código-fonte que está a programar no desafio. À medida que avança de fase, o JavaScript vai-se acumulando e montando a aplicação final!
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
