import { useState, useRef } from "react";
import "./App.css";
import { Routes, Route, Navigate, Link } from "react-router-dom";

import imgAccuracy from "./assets/img/accuracy_epochs.png";
import imgLoss from "./assets/img/tripplet_loss.png";
import imgConfusion from "./assets/img/Matriz_Confusao.png";
import imgRoc from "./assets/img/Curva_Roc.png";

function Home() {
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 font-sans text-slate-800 dark:text-slate-200">
      {/* HEADER / HERO SECTION */}
      <header className="relative overflow-hidden bg-slate-950 text-white pt-32 pb-40 px-4 sm:px-6 lg:px-8">
        {/* Efeitos de Fundo (Grid e Glow) */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:24px_24px]"></div>
        <div className="absolute left-1/2 top-0 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-indigo-600/30 rounded-full blur-[120px] opacity-70 pointer-events-none"></div>
        <div className="absolute right-0 top-1/4 w-[500px] h-[500px] bg-blue-600/20 rounded-full blur-[100px] opacity-50 pointer-events-none"></div>

        <div className="relative max-w-5xl mx-auto text-center z-10">
          {/* Badge Moderno com Ponto Pulsante */}
          <div className="inline-flex items-center gap-2.5 px-5 py-2.5 rounded-full bg-white/5 border border-white/10 backdrop-blur-md mb-8 shadow-2xl">
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-indigo-500"></span>
            </span>
            <span className="text-sm font-semibold tracking-wider uppercase text-indigo-200">
              Projeto Acadêmico
            </span>
          </div>

          {/* Título Principal */}
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight mb-8">
            <span className="block text-white mb-2 drop-shadow-sm">
              Detecção de Falhas
            </span>
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-blue-400 to-cyan-400 drop-shadow-lg">
              em Impressão 3D
            </span>
          </h1>

          {/* Subtítulo */}
          <p className="mt-6 max-w-2xl text-lg sm:text-xl text-slate-300 mx-auto font-light leading-relaxed mb-12">
            Projeto de Deep Learning aplicado à detecção automática do{" "}
            <strong>Efeito Espaguete</strong> em impressoras FDM. Desenvolvido
            como Atividade Prática da disciplina de Tópicos Especiais em
            Computação.
          </p>

          {/* Botões de Ação */}
          <div className="flex flex-col sm:flex-row justify-center items-center gap-5">
            <Link
              to="/deep-learning"
              className="group relative inline-flex items-center justify-center gap-3 px-8 py-4 text-lg font-bold text-white transition-all duration-300 bg-indigo-600 rounded-full hover:bg-indigo-500 hover:scale-105 shadow-[0_0_40px_-10px_rgba(79,70,229,0.5)] focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:ring-offset-2 focus:ring-offset-slate-900"
            >
              <span>Testar IA na Prática</span>
              {/* Ícone de Raio */}
              <svg
                className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M13 10V3L4 14h7v7l9-11h-7z"
                />
              </svg>
            </Link>

            <a
              href="#sobre"
              className="inline-flex items-center justify-center gap-3 px-8 py-4 text-lg font-semibold text-slate-300 transition-all duration-300 bg-white/5 border border-white/10 rounded-full hover:bg-white/10 hover:text-white backdrop-blur-sm"
            >
              <span>Entender o Projeto</span>
              {/* Ícone de Seta para baixo */}
              <svg
                className="w-5 h-5 transition-transform duration-300 group-hover:translate-y-1"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </a>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 -mt-16 relative z-10 space-y-12 pb-20">
        {/* CONTEXTO E PROBLEMA */}
        <section
          id="sobre"
          className="bg-white dark:bg-slate-900 rounded-3xl shadow-xl p-8 sm:p-12 border border-slate-100 dark:border-slate-800"
        >
          <div className="mb-10 text-center">
            <h2 className="text-3xl font-bold text-indigo-600 dark:text-indigo-400">
              🔍 Definição do Problema
            </h2>
            <div className="h-1 w-20 bg-indigo-500 mx-auto mt-4 rounded-full"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            <div>
              <h3 className="text-xl font-semibold mb-3 flex items-center gap-2">
                <span className="text-2xl">🏭</span> Contexto
              </h3>
              <p className="text-slate-600 dark:text-slate-400 leading-relaxed mb-6">
                A impressão 3D (FDM) é suscetível a falhas silenciosas — em
                especial o <strong>Efeito Espaguete</strong>, onde o filamento é
                extrudado no ar sem aderir ao modelo, resultando em uma malha
                caótica de plástico que inutiliza a peça.
              </p>

              <h3 className="text-xl font-semibold mb-3 flex items-center gap-2">
                <span className="text-2xl">💥</span> Impacto
              </h3>
              <ul className="space-y-2 text-slate-600 dark:text-slate-400">
                <li className="flex items-start gap-2">
                  <span>•</span> Desperdício de filamento;
                </li>
                <li className="flex items-start gap-2">
                  <span>•</span> Perda de tempo em impressões longas;
                </li>
                <li className="flex items-start gap-2">
                  <span>•</span> Danos potenciais ao equipamento;
                </li>
                <li className="flex items-start gap-2">
                  <span>•</span> Impacto financeiro em produção em série.
                </li>
              </ul>
            </div>

            <div className="bg-slate-50 dark:bg-slate-800/50 p-6 rounded-2xl border border-slate-100 dark:border-slate-700">
              <h3 className="text-xl font-semibold mb-3">
                Limitações da Solução
              </h3>
              <ul className="space-y-3 text-slate-600 dark:text-slate-400 text-sm">
                <li className="flex items-start gap-2">
                  <span>⚠️</span> Atua sobre imagens estáticas sem análise
                  temporal.
                </li>
                <li className="flex items-start gap-2">
                  <span>⚠️</span> Requer câmera bem posicionada e iluminada.
                </li>
                <li className="flex items-start gap-2">
                  <span>⚠️</span> Dataset relativamente pequeno (327 imagens).
                </li>
                <li className="flex items-start gap-2">
                  <span>⚠️</span> Focada unicamente no Efeito Espaguete.
                </li>
              </ul>
              <div className="mt-6 pt-6 border-t border-slate-200 dark:border-slate-700">
                <h4 className="font-semibold text-slate-800 dark:text-slate-200 mb-2">
                  Por que Deep Learning?
                </h4>
                <p className="text-sm text-slate-600 dark:text-slate-400">
                  A morfologia irregular do espaguete inviabiliza abordagens por
                  regras. CNNs com Transfer Learning são a escolha ideal.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* OBJETIVO E SOLUÇÃO */}
        <section className="bg-gradient-to-r from-indigo-50 to-blue-50 dark:from-indigo-950/30 dark:to-blue-900/20 rounded-3xl p-8 sm:p-12 border border-indigo-100 dark:border-indigo-900/50">
          <div className="text-center max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold text-indigo-700 dark:text-indigo-400 mb-6">
              🎯 Objetivo da Solução
            </h2>
            <p className="text-lg text-slate-700 dark:text-slate-300 mb-8">
              Classificar automaticamente imagens da impressão em duas
              categorias:
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
              <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl shadow-sm border border-emerald-100 dark:border-emerald-900/30">
                <div className="text-4xl mb-2">✅</div>
                <h3 className="text-xl font-bold text-emerald-600 mb-2">
                  Success
                </h3>
                <p className="text-slate-600 dark:text-slate-400 text-sm">
                  A impressão está ocorrendo normalmente e com estabilidade.
                </p>
              </div>
              <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl shadow-sm border border-rose-100 dark:border-rose-900/30">
                <div className="text-4xl mb-2">🚨</div>
                <h3 className="text-xl font-bold text-rose-600 mb-2">
                  Failure
                </h3>
                <p className="text-slate-600 dark:text-slate-400 text-sm">
                  Efeito Espaguete detectado. Ação recomendada:{" "}
                  <strong>M112</strong>.
                </p>
              </div>
            </div>
            <p className="text-slate-600 dark:text-slate-400 font-medium">
              <span className="text-indigo-600 dark:text-indigo-400">
                Ganho esperado:
              </span>{" "}
              Redução do desperdício de material e maior autonomia para o
              operador.
            </p>
          </div>
        </section>

        {/* DATASET E MODELAGEM */}
        <section className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="bg-white dark:bg-slate-900 rounded-3xl shadow-lg p-8 border border-slate-100 dark:border-slate-800">
            <h2 className="text-2xl font-bold text-slate-800 dark:text-slate-100 mb-6">
              💾 Base de Dados
            </h2>
            <p className="text-slate-600 dark:text-slate-400 mb-6 text-sm">
              Derivado do projeto open-source{" "}
              <em>Obico / The Spaghetti Detective</em>, disponível no Kaggle
              (327 imagens).
            </p>
            <div className="overflow-x-auto mb-6">
              <table className="min-w-full text-sm text-left text-slate-600 dark:text-slate-400">
                <thead className="text-xs text-slate-700 uppercase bg-slate-50 dark:bg-slate-800 dark:text-slate-300">
                  <tr>
                    <th className="px-4 py-3 rounded-tl-lg">Split</th>
                    <th className="px-4 py-3">Failure</th>
                    <th className="px-4 py-3">Success</th>
                    <th className="px-4 py-3 rounded-tr-lg">Total</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                  <tr>
                    <td className="px-4 py-3 font-medium">Treino</td>
                    <td className="px-4 py-3">114</td>
                    <td className="px-4 py-3">114</td>
                    <td className="px-4 py-3">228</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3 font-medium">Validação</td>
                    <td className="px-4 py-3">32</td>
                    <td className="px-4 py-3">32</td>
                    <td className="px-4 py-3">64</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3 font-medium text-indigo-600">
                      Teste
                    </td>
                    <td className="px-4 py-3">20</td>
                    <td className="px-4 py-3">15</td>
                    <td className="px-4 py-3 font-bold">35</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <h3 className="font-semibold text-slate-800 dark:text-slate-200 mb-2 text-sm">
              Pré-processamento:
            </h3>
            <ul className="text-sm text-slate-600 dark:text-slate-400 space-y-1 list-disc list-inside">
              <li>Redimensionamento para 300x300 pixels</li>
              <li>Data Augmentation (Flip, Rotação 20%, Zoom 20%)</li>
              <li>Uso de prefetch com tf.data.AUTOTUNE</li>
            </ul>
          </div>

          <div className="bg-white dark:bg-slate-900 rounded-3xl shadow-lg p-8 border border-slate-100 dark:border-slate-800">
            <h2 className="text-2xl font-bold text-slate-800 dark:text-slate-100 mb-6">
              🧠 Modelagem (EfficientNetB3)
            </h2>
            <div className="space-y-6">
              <div>
                <h3 className="font-semibold text-indigo-600 dark:text-indigo-400 flex items-center gap-2">
                  <span className="bg-indigo-100 dark:bg-indigo-900/50 text-indigo-600 w-6 h-6 rounded-full inline-flex items-center justify-center text-xs">
                    1
                  </span>
                  Transfer Learning Padrão
                </h3>
                <p className="text-sm text-slate-600 dark:text-slate-400 mt-2">
                  Base congelada (pesos ImageNet). Cabeça de classificação
                  customizada: GlobalAveragePooling2D → Dropout(0.3) → Dense(1,
                  sigmoid). Adam (lr=0.001) por 10 épocas.
                </p>
              </div>
              <div>
                <h3 className="font-semibold text-indigo-600 dark:text-indigo-400 flex items-center gap-2">
                  <span className="bg-indigo-100 dark:bg-indigo-900/50 text-indigo-600 w-6 h-6 rounded-full inline-flex items-center justify-center text-xs">
                    2
                  </span>
                  Fine-Tuning Profundo
                </h3>
                <p className="text-sm text-slate-600 dark:text-slate-400 mt-2">
                  Descongelamento das últimas 30 camadas. Learning rate reduzido
                  (Adam lr=1e-5). Uso de EarlyStopping e ModelCheckpoint.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* RESULTADOS DOS GRÁFICOS */}
        <section className="bg-white dark:bg-slate-900 rounded-3xl shadow-xl p-8 sm:p-12 border border-slate-100 dark:border-slate-800">
          <div className="mb-10 text-center">
            <h2 className="text-3xl font-bold text-indigo-600 dark:text-indigo-400">
              📊 Avaliação dos Resultados
            </h2>
            <div className="h-1 w-20 bg-indigo-500 mx-auto mt-4 rounded-full"></div>
          </div>

          <div className="flex flex-wrap justify-center gap-4 mb-12">
            <div className="px-6 py-4 bg-slate-50 dark:bg-slate-800 rounded-2xl text-center shadow-sm">
              <span className="block text-slate-500 text-sm font-medium">
                Accuracy
              </span>
              <span className="block text-2xl font-bold text-slate-800 dark:text-white">
                85,71%
              </span>
            </div>
            <div className="px-6 py-4 bg-slate-50 dark:bg-slate-800 rounded-2xl text-center shadow-sm">
              <span className="block text-slate-500 text-sm font-medium">
                Precision
              </span>
              <span className="block text-2xl font-bold text-slate-800 dark:text-white">
                85,71%
              </span>
            </div>
            <div className="px-6 py-4 bg-slate-50 dark:bg-slate-800 rounded-2xl text-center shadow-sm">
              <span className="block text-slate-500 text-sm font-medium">
                Recall
              </span>
              <span className="block text-2xl font-bold text-slate-800 dark:text-white">
                80,00%
              </span>
            </div>
            <div className="px-6 py-4 bg-slate-50 dark:bg-slate-800 rounded-2xl text-center shadow-sm">
              <span className="block text-slate-500 text-sm font-medium">
                F1-Score
              </span>
              <span className="block text-2xl font-bold text-slate-800 dark:text-white">
                82,76%
              </span>
            </div>
            <div className="px-6 py-4 bg-indigo-50 dark:bg-indigo-900/30 rounded-2xl text-center shadow-sm border border-indigo-100 dark:border-indigo-800">
              <span className="block text-indigo-500 text-sm font-medium">
                ROC-AUC
              </span>
              <span className="block text-2xl font-bold text-indigo-700 dark:text-indigo-300">
                0,967
              </span>
            </div>
          </div>

          {/* Grid de Gráficos */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
            <div className="border border-slate-200 dark:border-slate-700 rounded-xl overflow-hidden bg-white p-2">
              <img
                src={imgAccuracy}
                alt="Gráfico de Accuracy"
                className="w-full h-auto rounded-lg"
              />
              <p className="text-center text-xs text-slate-500 mt-2">
                Accuracy ao longo das épocas
              </p>
            </div>
            <div className="border border-slate-200 dark:border-slate-700 rounded-xl overflow-hidden bg-white p-2">
              <img
                src={imgLoss}
                alt="Gráfico de Loss"
                className="w-full h-auto rounded-lg"
              />
              <p className="text-center text-xs text-slate-500 mt-2">
                Loss (Perda) ao longo das épocas
              </p>
            </div>
            <div className="border border-slate-200 dark:border-slate-700 rounded-xl overflow-hidden bg-white p-2">
              <img
                src={imgConfusion}
                alt="Matriz de Confusão"
                className="w-full h-auto rounded-lg"
              />
              <p className="text-center text-xs text-slate-500 mt-2">
                Matriz de Confusão (Dados de Teste)
              </p>
            </div>
            <div className="border border-slate-200 dark:border-slate-700 rounded-xl overflow-hidden bg-white p-2">
              <img
                src={imgRoc}
                alt="Curva ROC"
                className="w-full h-auto rounded-lg"
              />
              <p className="text-center text-xs text-slate-500 mt-2">
                Curva ROC (0.967)
              </p>
            </div>
          </div>

          <div className="bg-slate-50 dark:bg-slate-800/50 p-6 rounded-2xl text-sm text-slate-700 dark:text-slate-300">
            <h4 className="font-bold text-slate-900 dark:text-white mb-2">
              Interpretação Crítica
            </h4>
            <p>
              O ROC-AUC de 0,967 indica excelente separação das classes. O
              modelo detectou corretamente 18 dos 20 casos de falha (90%). Os 2
              falsos negativos representam o principal ponto de atenção para
              melhorias futuras, onde a ampliação do dataset e análises
              temporais podem elevar a robustez do sistema.
            </p>
          </div>
        </section>

        {/* APLICABILIDADE */}
        <section className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="col-span-1 md:col-span-4 mb-4">
            <h2 className="text-2xl font-bold text-slate-800 dark:text-slate-100 flex items-center gap-3">
              🌍 Aplicabilidade Real
            </h2>
          </div>
          {[
            {
              t: "Econômico",
              d: "Redução de desperdício de filamento e tempo de máquina",
              i: "💰",
            },
            {
              t: "Social",
              d: "Democratiza a impressão 3D autônoma e mais confiável",
              i: "🤝",
            },
            {
              t: "Técnico",
              d: "Integração viável com automações existentes (Marlin/Klipper)",
              i: "⚙️",
            },
            {
              t: "Ambiental",
              d: "Menos descarte de plástico proveniente de peças que falharam",
              i: "🌱",
            },
          ].map((item, idx) => (
            <div
              key={idx}
              className="bg-white dark:bg-slate-900 p-6 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-800 text-center"
            >
              <div className="text-3xl mb-3">{item.i}</div>
              <h3 className="font-bold text-slate-800 dark:text-slate-200 mb-2">
                {item.t}
              </h3>
              <p className="text-xs text-slate-600 dark:text-slate-400">
                {item.d}
              </p>
            </div>
          ))}
        </section>

        {/* TECNOLOGIAS E EQUIPE */}
        <section className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="bg-slate-900 text-white rounded-3xl p-8 shadow-xl">
            <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
              🛠️ Stack Tecnológico
            </h2>
            <div className="space-y-4">
              <div>
                <span className="block text-slate-400 text-sm mb-1">
                  Modelo & IA
                </span>
                <div className="flex flex-wrap gap-2">
                  <span className="bg-slate-800 px-3 py-1 rounded-md text-sm border border-slate-700">
                    TensorFlow/Keras
                  </span>
                  <span className="bg-slate-800 px-3 py-1 rounded-md text-sm border border-slate-700">
                    EfficientNetB3
                  </span>
                  <span className="bg-slate-800 px-3 py-1 rounded-md text-sm border border-slate-700">
                    Scikit-learn
                  </span>
                </div>
              </div>
              <div>
                <span className="block text-slate-400 text-sm mb-1">
                  Backend
                </span>
                <div className="flex flex-wrap gap-2">
                  <span className="bg-slate-800 px-3 py-1 rounded-md text-sm border border-slate-700">
                    Python 3.14
                  </span>
                  <span className="bg-slate-800 px-3 py-1 rounded-md text-sm border border-slate-700">
                    Django 6
                  </span>
                </div>
              </div>
              <div>
                <span className="block text-slate-400 text-sm mb-1">
                  Frontend
                </span>
                <div className="flex flex-wrap gap-2">
                  <span className="bg-slate-800 px-3 py-1 rounded-md text-sm border border-slate-700">
                    React 19
                  </span>
                  <span className="bg-slate-800 px-3 py-1 rounded-md text-sm border border-slate-700">
                    Vite 8
                  </span>
                  <span className="bg-slate-800 px-3 py-1 rounded-md text-sm border border-slate-700">
                    Tailwind CSS
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-slate-900 rounded-3xl p-8 shadow-xl border border-slate-100 dark:border-slate-800">
            <h2 className="text-2xl font-bold text-slate-800 dark:text-slate-100 mb-6 flex items-center gap-2">
              👥 Equipe
            </h2>
            {/* Grelha ajustável: 2 colunas em ecrãs pequenos, 3 colunas a partir de sm */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-6">
              {[
                {
                  nome: "Amanda Iasmin",
                  github: "AmandaGitH",
                  img: "181160672",
                },
                {
                  nome: "Izaque Nicolas",
                  github: "Izaque123",
                  img: "106625747",
                },
                {
                  nome: "José Henrique",
                  github: "josehenriquevs",
                  img: "187699545",
                },
                {
                  nome: "Matheus Ribeiro",
                  github: "Matheus10DV",
                  img: "192535212",
                },
                {
                  nome: "Victor Sarrís",
                  github: "Victor-Sarris",
                  img: "178488451",
                },
                {
                  nome: "Sabrina Laís",
                  github: "imnotSabrina",
                  img: "106186281",
                },
              ].map((membro) => (
                <a
                  key={membro.github}
                  href={`https://github.com/${membro.github}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex flex-col items-center p-4 rounded-2xl hover:bg-slate-50 dark:hover:bg-slate-800 transition-all border border-transparent hover:border-slate-200 dark:hover:border-slate-700 group"
                >
                  <img
                    src={`https://avatars.githubusercontent.com/u/${membro.img}?v=4`}
                    alt={`Foto de perfil de ${membro.nome}`}
                    className="w-16 h-16 rounded-full mb-3 shadow-md group-hover:scale-110 transition-transform duration-300"
                  />
                  <span className="text-sm font-bold text-slate-700 dark:text-slate-300 text-center">
                    {membro.nome}
                  </span>
                </a>
              ))}
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-slate-900 text-slate-400 py-8 text-center text-sm border-t border-slate-800">
        <p>© 2026 - Tópicos Especiais em Computação.</p>
        <p className="mt-1 opacity-75">
          Dataset por Obico / The Spaghetti Detective.
        </p>
      </footer>
    </div>
  );
}

export default Home;
