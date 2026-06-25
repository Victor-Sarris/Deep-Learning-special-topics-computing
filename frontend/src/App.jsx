import { useState } from "react";
import "./App.css";

function App() {
  const [imagem, setImagem] = useState(null);
  const [file, setFile] = useState(null);
  const [resultado, setResultado] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleFileChange = (e) => {
    const arquivoSelecionado = e.target.files[0];
    if (arquivoSelecionado) {
      setFile(arquivoSelecionado);
      setImagem(URL.createObjectURL(arquivoSelecionado));
      setResultado(null);
    }
  };

  const handleAnalisar = async () => {
    if (!file) return;

    setLoading(true);
    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/predict`, {
        method: "POST",
        body: formData,
      });

      const data = await response.json();
      setResultado(data);
    } catch (error) {
      console.error("Erro de conexão com a API:", error);
      alert("Erro ao conectar com o Backend. O servidor Django está rodando?");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="app-wrapper">
      <div className="main-card">
        <header className="header">
          <div className="header-icon">🖨️</div>
          <h1>Monitor de Anomalias FDM</h1>
          <p className="subtitle">
            Detecção de Efeito Espaguete via Deep Learning para a sua Creality
            Ender-3 V3 SE e outras impressoras.
          </p>
        </header>

        <main className="main-content">
          {!imagem && (
            <div className="upload-section">
              <input
                type="file"
                id="file-upload"
                accept="image/*"
                onChange={handleFileChange}
                className="file-input"
              />
              <label htmlFor="file-upload" className="upload-zone">
                <div className="upload-icon">📸</div>
                <span className="upload-title">
                  Clique para selecionar a foto da mesa
                </span>
                <span className="upload-subtitle">Suporta JPG, PNG e WEBP</span>
              </label>
            </div>
          )}

          {imagem && (
            <div className="preview-section">
              <div className="image-container">
                <img
                  src={imagem}
                  alt="Preview da Impressão"
                  className="image-preview"
                />
                <button
                  onClick={() => {
                    setImagem(null);
                    setFile(null);
                    setResultado(null);
                  }}
                  className="change-image-btn"
                  title="Trocar imagem"
                >
                  ✕
                </button>
              </div>

              <button
                onClick={handleAnalisar}
                disabled={loading}
                className={`analyze-btn ${loading ? "loading" : ""}`}
              >
                {loading ? (
                  <>
                    <span className="spinner"></span>
                    Analisando matriz de pixels...
                  </>
                ) : (
                  "🔍 Iniciar Análise com IA"
                )}
              </button>
            </div>
          )}

          {resultado && (
            <div
              className={`result-card ${resultado.is_sucesso ? "success" : "failure"}`}
            >
              <div className="result-header">
                <div className="status-icon">
                  {resultado.is_sucesso ? "✅" : "🚨"}
                </div>
                <h2>
                  {resultado.is_sucesso
                    ? "Impressão Estável"
                    : "Anomalia Detectada!"}
                </h2>
              </div>

              <div className="result-details">
                <div className="detail-row">
                  <span className="detail-label">Diagnóstico:</span>
                  <span className="detail-value">{resultado.status}</span>
                </div>

                <div className="detail-row confidence-row">
                  <span className="detail-label">Confiança do Modelo:</span>
                  <span className="detail-value">{resultado.confianca}%</span>
                </div>
                <div className="confidence-bar-bg">
                  <div
                    className="confidence-bar-fill"
                    style={{ width: `${resultado.confianca}%` }}
                  ></div>
                </div>
              </div>

              {!resultado.is_sucesso && (
                <div className="alert-box">
                  <strong>⚠️ AÇÃO REQUERIDA:</strong> Abortar impressão
                  imediatamente (G-code M112).
                </div>
              )}
            </div>
          )}
        </main>
      </div>
    </div>
  );
}

export default App;
