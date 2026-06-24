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
      const response = await fetch("http://localhost:8000/predict", {
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
    <div className="container">
      <header className="header">
        <h1>🖨️ Monitor de Anomalias FDM</h1>
        <p>Detecção de Efeito Espaguete via Deep Learning (EfficientNetB3)</p>
      </header>

      <main className="main-content">
        <div className="upload-section">
          <input
            type="file"
            id="file-upload"
            accept="image/*"
            onChange={handleFileChange}
            className="file-input"
          />
          <label htmlFor="file-upload" className="upload-btn">
            📷 Selecionar Foto da Mesa
          </label>
        </div>

        {imagem && (
          <div className="preview-section">
            <img
              src={imagem}
              alt="Preview da Impressão"
              className="image-preview"
            />

            <button
              onClick={handleAnalisar}
              disabled={loading}
              className="analyze-btn"
            >
              {loading
                ? "A analisar matriz de pixels..."
                : "🔍 Iniciar Análise com IA"}
            </button>
          </div>
        )}
        {resultado && (
          <div
            className={`result-card ${resultado.is_sucesso ? "success" : "failure"}`}
          >
            <h2>
              {resultado.is_sucesso
                ? "🟢 Status: Estável"
                : "🔴 Status: CRÍTICO"}
            </h2>
            <p>
              <strong>Diagnóstico:</strong> {resultado.status}
            </p>
            <p>
              <strong>Confiança do Modelo:</strong> {resultado.confianca}%
            </p>

            {!resultado.is_sucesso && (
              <div className="alert-box">
                ⚠️ RECOMENDAÇÃO: Abortar impressão imediatamente (G-code M112).
              </div>
            )}
          </div>
        )}
      </main>
    </div>
  );
}

export default App;
