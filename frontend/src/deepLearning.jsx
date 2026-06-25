import { useState, useRef } from "react";
import "./App.css";
import { Routes, Route, Navigate } from "react-router-dom";

function DeepLearning() {
  const [imagem, setImagem] = useState(null);
  const [file, setFile] = useState(null);
  const [resultado, setResultado] = useState(null);
  const [loading, setLoading] = useState(false);
  const [dragActive, setDragActive] = useState(false);
  const [erro, setErro] = useState(null);
  const inputRef = useRef(null);

  const processFile = (arquivo) => {
    if (arquivo && arquivo.type.startsWith("image/")) {
      setFile(arquivo);
      setImagem(URL.createObjectURL(arquivo));
      setResultado(null);
      setErro(null);
    } else {
      setErro(
        "Por favor, selecione um arquivo de imagem válido (JPG, PNG, WEBP).",
      );
    }
  };

  const handleFileChange = (e) => {
    processFile(e.target.files[0]);
  };

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      processFile(e.dataTransfer.files[0]);
    }
  };

  const resetarAnalise = () => {
    setImagem(null);
    setFile(null);
    setResultado(null);
    setErro(null);
    if (inputRef.current) inputRef.current.value = "";
  };

  const handleAnalisar = async () => {
    if (!file) return;
    setLoading(true);
    setErro(null);
    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await fetch("http://localhost:8000/predict", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Falha na comunicação com a API");
      }

      const data = await response.json();
      setResultado(data);
    } catch (error) {
      console.error("Erro de conexão com a API:", error);
      setErro(
        "Erro ao conectar com o Backend. O servidor Django está rodando?",
      );
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-slate-50 dark:bg-slate-950 p-4 sm:p-8 font-sans text-slate-900 dark:text-slate-100 relative overflow-hidden transition-colors duration-300">
      {/* Elementos decorativos de fundo para dar um toque elegante */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-indigo-500/20 rounded-full blur-[128px] -z-10 pointer-events-none"></div>
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-500/20 rounded-full blur-[128px] -z-10 pointer-events-none"></div>

      <div className="w-full max-w-xl bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl border border-slate-200/50 dark:border-slate-800/50 p-8 sm:p-10 rounded-[2rem] shadow-2xl transition-all duration-300">
        <header className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-indigo-500 to-blue-600 mb-6 shadow-lg shadow-indigo-500/30">
            <svg
              className="w-8 h-8 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M14 10l-2 1m0 0l-2-1m2 1v2.5M20 7l-2 1m2-1l-2-1m2 1v2.5M14 4l-2-1-2 1M4 7l2-1M4 7l2 1M4 7v2.5M12 21l-2-1m2 1l2-1m-2 1v-2.5M6 18l-2-1v-2.5M18 18l2-1v-2.5"
              />
            </svg>
          </div>
          <h1 className="text-3xl font-extrabold tracking-tight bg-gradient-to-r from-slate-900 to-slate-600 dark:from-white dark:to-slate-400 bg-clip-text text-transparent mb-3">
            Monitor de Anomalias FDM
          </h1>
          <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed max-w-md mx-auto font-medium">
            Detecção de Efeito Espaguete via Deep Learning para a sua Creality
            Ender-3 V3 SE e outras impressoras.
          </p>
        </header>

        <main className="flex flex-col gap-6">
          {erro && (
            <div className="flex items-center gap-3 p-4 text-sm font-medium text-rose-600 bg-rose-50 border border-rose-200 rounded-2xl dark:bg-rose-900/20 dark:text-rose-400 dark:border-rose-800/50 animate-pulse">
              <svg
                className="w-5 h-5 flex-shrink-0"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                />
              </svg>
              {erro}
            </div>
          )}

          {!imagem && (
            <div
              className={`relative group flex flex-col items-center justify-center p-12 border-2 border-dashed rounded-3xl transition-all duration-300 ease-in-out cursor-pointer overflow-hidden ${
                dragActive
                  ? "border-indigo-500 bg-indigo-50/50 dark:bg-indigo-900/20 scale-[1.02]"
                  : "border-slate-300 dark:border-slate-700 hover:border-indigo-400 hover:bg-slate-50 dark:hover:bg-slate-800/50"
              }`}
              onDragEnter={handleDrag}
              onDragLeave={handleDrag}
              onDragOver={handleDrag}
              onDrop={handleDrop}
            >
              <input
                ref={inputRef}
                type="file"
                id="file-upload"
                accept="image/*"
                onChange={handleFileChange}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
              />
              <svg
                className={`w-12 h-12 mb-4 transition-colors duration-300 ${dragActive ? "text-indigo-500" : "text-slate-400 group-hover:text-indigo-500"}`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="1.5"
                  d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                />
              </svg>
              <span className="text-slate-700 dark:text-slate-200 font-semibold text-lg mb-2 text-center pointer-events-none">
                {dragActive
                  ? "Pode soltar a imagem..."
                  : "Clique ou arraste a foto da mesa"}
              </span>
              <span className="text-slate-500 dark:text-slate-400 text-sm font-medium pointer-events-none">
                Suporta JPG, PNG e WEBP
              </span>
            </div>
          )}

          {imagem && (
            <div className="flex flex-col gap-5 animate-in fade-in zoom-in-95 duration-500">
              <div className="relative w-full rounded-2xl overflow-hidden shadow-lg ring-1 ring-slate-900/5 dark:ring-white/10 group">
                <img
                  src={imagem}
                  alt="Preview da Impressão"
                  className="w-full h-auto max-h-[350px] object-cover block transition-transform duration-700 group-hover:scale-105"
                />
                {!loading && !resultado && (
                  <button
                    onClick={resetarAnalise}
                    className="absolute top-4 right-4 bg-black/40 hover:bg-black/70 text-white backdrop-blur-md rounded-full p-2.5 transition-all duration-300 hover:scale-110 hover:rotate-90 z-10"
                    title="Remover imagem"
                  >
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  </button>
                )}
                {/* Gradiente sutil na base da imagem */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
              </div>

              {!resultado && (
                <button
                  onClick={handleAnalisar}
                  disabled={loading}
                  className={`relative overflow-hidden w-full py-4 px-6 rounded-2xl font-bold text-white shadow-xl flex items-center justify-center gap-3 transition-all duration-300 ${
                    loading
                      ? "bg-slate-500 cursor-not-allowed opacity-90"
                      : "bg-gradient-to-r from-indigo-600 to-blue-600 hover:from-indigo-500 hover:to-blue-500 hover:shadow-indigo-500/40 hover:-translate-y-1"
                  }`}
                >
                  {loading ? (
                    <>
                      <svg
                        className="animate-spin h-5 w-5 text-white"
                        viewBox="0 0 24 24"
                        fill="none"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        ></circle>
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        ></path>
                      </svg>
                      <span>Analisando matriz de pixels...</span>
                    </>
                  ) : (
                    <>
                      <svg
                        className="w-5 h-5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                        />
                      </svg>
                      <span>Iniciar Análise com IA</span>
                    </>
                  )}
                </button>
              )}
            </div>
          )}

          {resultado && (
            <div
              className={`mt-2 flex flex-col p-1 rounded-3xl transition-all duration-500 animate-in slide-in-from-bottom-4 ${resultado.is_sucesso ? "bg-emerald-500" : "bg-rose-500"} shadow-xl`}
            >
              <div className="bg-white dark:bg-slate-900 rounded-[1.35rem] p-6 sm:p-8">
                <div className="flex items-center gap-4 mb-6">
                  <div
                    className={`flex items-center justify-center w-12 h-12 rounded-full ${resultado.is_sucesso ? "bg-emerald-100 text-emerald-600 dark:bg-emerald-900/30 dark:text-emerald-400" : "bg-rose-100 text-rose-600 dark:bg-rose-900/30 dark:text-rose-400"}`}
                  >
                    {resultado.is_sucesso ? (
                      <svg
                        className="w-6 h-6"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="3"
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                    ) : (
                      <svg
                        className="w-6 h-6"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="3"
                          d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                        />
                      </svg>
                    )}
                  </div>
                  <h2
                    className={`text-2xl font-bold tracking-tight ${resultado.is_sucesso ? "text-emerald-600 dark:text-emerald-500" : "text-rose-600 dark:text-rose-500"}`}
                  >
                    {resultado.is_sucesso
                      ? "Impressão Estável"
                      : "Anomalia Detectada!"}
                  </h2>
                </div>

                <div className="bg-slate-50 dark:bg-slate-800/50 rounded-2xl p-5 mb-6 border border-slate-100 dark:border-slate-700/50">
                  <div className="flex justify-between items-center mb-4">
                    <span className="text-slate-500 dark:text-slate-400 font-medium">
                      Diagnóstico
                    </span>
                    <span className="text-slate-900 dark:text-white font-bold capitalize">
                      {resultado.status}
                    </span>
                  </div>

                  <div className="flex justify-between items-center mb-2">
                    <span className="text-slate-500 dark:text-slate-400 font-medium">
                      Confiança do Modelo
                    </span>
                    <span className="text-slate-900 dark:text-white font-bold">
                      {resultado.confianca}%
                    </span>
                  </div>

                  <div className="w-full h-2.5 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
                    <div
                      className={`h-full rounded-full transition-all duration-1000 ease-out ${resultado.is_sucesso ? "bg-emerald-500" : "bg-rose-500"}`}
                      style={{ width: `${resultado.confianca}%` }}
                    ></div>
                  </div>
                </div>

                {!resultado.is_sucesso && (
                  <div className="flex items-start gap-3 p-4 mb-6 bg-rose-500 text-white rounded-2xl shadow-lg shadow-rose-500/20">
                    <svg
                      className="w-6 h-6 flex-shrink-0 mt-0.5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                      />
                    </svg>
                    <div>
                      <strong className="block text-lg mb-1">
                        AÇÃO REQUERIDA
                      </strong>
                      <span className="opacity-90">
                        Abortar impressão imediatamente (G-code M112).
                      </span>
                    </div>
                  </div>
                )}

                <button
                  onClick={resetarAnalise}
                  className="w-full py-4 px-6 rounded-2xl font-bold text-slate-700 dark:text-slate-200 bg-white dark:bg-slate-800 border-2 border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700 hover:border-slate-300 dark:hover:border-slate-600 transition-all duration-200"
                >
                  Analisar Outra Imagem
                </button>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}

export default DeepLearning;
