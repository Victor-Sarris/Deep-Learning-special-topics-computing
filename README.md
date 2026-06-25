# 🖨️ Detecção de Falhas em Impressão 3D — Efeito Espaguete

> Projeto de Deep Learning aplicado à detecção automática de falhas em impressoras 3D FDM, desenvolvido como Atividade Prática da disciplina de Tópicos Especiais em Computação.

---

## 📌 Sumário

- [Definição do Problema](#-definição-do-problema)
- [Objetivo da Solução](#-objetivo-da-solução)
- [Base de Dados](#-base-de-dados)
- [Modelagem em Deep Learning](#-modelagem-em-deep-learning)
- [Avaliação dos Resultados](#-avaliação-dos-resultados)
- [Aplicabilidade Real](#-aplicabilidade-real)
- [Demonstração Funcional](#-demonstração-funcional)
- [Estrutura do Repositório](#-estrutura-do-repositório)
- [Tecnologias Utilizadas](#️-tecnologias-utilizadas)
- [Instruções de Instalação e Execução](#-instruções-de-instalação-e-execução)
- [Equipe](#-equipe)

---

## 🔍 Definição do Problema

### Contexto

A impressão 3D por deposição de material fundido (FDM) é amplamente utilizada em prototipagem, manufatura distribuída e produção acadêmica. O processo, porém, é suscetível a falhas silenciosas — em especial o **Efeito Espaguete**, onde o filamento é extrudado no ar sem aderir ao modelo, resultando em uma malha caótica de plástico que inutiliza completamente a peça.

### Impacto

Falhas desse tipo causam:

- **Desperdício de filamento** (que pode custar dezenas de reais por carretel);
- **Perda de tempo** em impressões que duram horas ou dias;
- **Danos potenciais ao equipamento** caso o filamento obstrua componentes;
- **Impacto financeiro** em contextos de produção em série.

### Quem é afetado

Makers, engenheiros, laboratórios de pesquisa, empresas de prototipagem e qualquer usuário de impressoras FDM de mesa aberta — especialmente aqueles que executam impressões longas sem supervisão contínua.

### Relevância

A detecção automática de falhas elimina a necessidade de monitoramento humano constante, permite a interrupção imediata da impressão e reduz significativamente perdas materiais e de tempo.

### Limitações da Solução

- O modelo atua sobre **imagens estáticas** capturadas durante a impressão, sem análise temporal de frames consecutivos;
- A câmera precisa ter posicionamento e iluminação adequados para captura confiável;
- O dataset é relativamente pequeno (327 imagens), o que pode limitar a generalização;
- A solução não detecta outros tipos de falha além do Efeito Espaguete;
- Requer que o backend Django esteja em execução local para funcionar.

### Justificativa do Uso de Deep Learning

A detecção visual de padrões complexos e variáveis — como a morfologia irregular do Efeito Espaguete — é uma tarefa onde abordagens baseadas em regras falham. Redes Neurais Convolucionais com Transfer Learning têm desempenho consolidado em classificação de imagens com conjuntos de dados pequenos, tornando essa a escolha ideal para o problema.

---

## 🎯 Objetivo da Solução

O sistema **classifica automaticamente imagens capturadas durante a impressão 3D** em duas categorias:

| Classe    | Descrição                       |
| --------- | ------------------------------- |
| `success` | Impressão ocorrendo normalmente |
| `failure` | Efeito Espaguete detectado      |

**Resultado esperado:** ao identificar uma falha, o sistema exibe um alerta e recomenda a interrupção imediata da impressão via G-code `M112`.

**Ganho esperado:** redução do desperdício de filamento e tempo de máquina, com maior autonomia para o operador durante impressões longas.

---

## 💾 Base de Dados

### Origem

Dataset público disponível no Kaggle: **[3D Printing - SUCCESS - FAILURE DATASET (finetuned)](https://www.kaggle.com/datasets/bshaurya/3d-printing-success-failure-dataset-finetuned)**

Derivado do projeto open-source **Obico / The Spaghetti Detective**, que coleta imagens reais de impressoras FDM de mesa aberta ao redor do mundo.

### Distribuição das Amostras

| Split                | Classe `failure` | Classe `success` | Total   |
| -------------------- | ---------------- | ---------------- | ------- |
| Treino (`train/`)    | 114              | 114              | **228** |
| Validação (`valid/`) | 32               | 32               | **64**  |
| Teste (`test/`)      | 20               | 15               | **35**  |
| **Total**            | **166**          | **161**          | **327** |

### Pré-processamento

- **Redimensionamento:** imagens redimensionadas para `300x300 pixels` no notebook principal (o `DataPipeline.ipynb` usa `224x224` como exploração inicial — o modelo treinado e em produção usa `300x300`);
- **Normalização:** os valores de pixel são tratados internamente pela EfficientNetB3;
- **Data Augmentation** aplicado durante o treino: flip horizontal e vertical, rotação de até 20% e zoom de até 20%;
- **Otimização de pipeline:** uso de `prefetch` com `tf.data.AUTOTUNE` para carregamento eficiente;
- **Balanceamento:** o dataset já está balanceado nas splits de treino e validação (114 e 32 amostras por classe, respectivamente).

### Limitações da Base

- Dataset relativamente pequeno (327 imagens no total);
- Imagens capturadas em condições variadas de iluminação e ângulo de câmera;
- Possível viés para determinados modelos e marcas de impressoras;
- Cobre apenas o Efeito Espaguete como tipo de falha.

---

## 🧠 Modelagem em Deep Learning

O treinamento foi realizado em **duas fases** com Transfer Learning sobre a arquitetura **EfficientNetB3** pré-treinada na ImageNet.

### Fase 1 — Transfer Learning Padrão

As camadas da base (`EfficientNetB3`) são **congeladas**. Apenas a cabeça de classificação customizada é treinada.

| Parâmetro           | Valor                                                           |
| ------------------- | --------------------------------------------------------------- |
| Base                | EfficientNetB3 (pesos ImageNet, `include_top=False`)            |
| Camadas adicionadas | `GlobalAveragePooling2D` → `Dropout(0.3)` → `Dense(1, sigmoid)` |
| Data Augmentation   | `RandomFlip`, `RandomRotation(0.2)`, `RandomZoom(0.2)`          |
| Otimizador          | Adam (`lr=0.001`)                                               |
| Função de perda     | Binary Crossentropy                                             |
| Épocas              | 10                                                              |
| Batch Size          | 32                                                              |
| Tamanho da imagem   | 300×300 px                                                      |

### Fase 2 — Fine-Tuning Profundo

As **últimas 30 camadas** da base são descongeladas e treinadas com learning rate reduzido.

| Parâmetro             | Valor                                                                                                            |
| --------------------- | ---------------------------------------------------------------------------------------------------------------- |
| Camadas descongeladas | Últimas 30 da EfficientNetB3                                                                                     |
| Otimizador            | Adam (`lr=1e-5`)                                                                                                 |
| Função de perda       | Binary Crossentropy                                                                                              |
| Épocas                | até 15 (com Early Stopping)                                                                                      |
| Callbacks             | `EarlyStopping(patience=4, monitor='val_loss')` + `ModelCheckpoint(monitor='val_accuracy', save_best_only=True)` |

### Estratégias contra Overfitting

- Data Augmentation (flip, rotação, zoom) integrado ao pipeline;
- Dropout de 30% na camada densa;
- Early Stopping com restauração dos melhores pesos;
- Congelamento progressivo das camadas na Fase 1.

### Justificativa da Arquitetura

A EfficientNetB3 oferece excelente equilíbrio entre acurácia e custo computacional, sendo adequada para inferência em ambientes com recursos limitados. Seu desempenho em tarefas de classificação de imagens com fine-tuning é consolidado na literatura, especialmente com datasets pequenos.

---

## 📊 Avaliação dos Resultados

### Resultados Obtidos no Conjunto de Teste (35 amostras)

| Métrica       | Valor  |
| ------------- | ------ |
| **Accuracy**  | 85,71% |
| **Precision** | 85,71% |
| **Recall**    | 80,00% |
| **F1-Score**  | 82,76% |
| **ROC-AUC**   | 0,967  |

### Curvas de Aprendizado

- A **accuracy de validação** atingiu aproximadamente **98%** já nas primeiras épocas da Fase 1, mantendo-se estável durante o Fine-Tuning;
- A **loss de validação** convergiu para valores próximos a **0,15**, com comportamento estável ao longo de todas as épocas;
- O pico de loss de treino no início da Fase 2 é esperado pelo descongelamento das camadas e pela redução drástica do learning rate, normalizando rapidamente em seguida.

<img width="587" height="460" alt="Accuracy ao longo das Épocas" src="https://github.com/user-attachments/assets/ef5c7b39-eea7-4b6c-9f77-2daafdfb8c1c" />
<img width="567" height="449" alt="Loss ao longo das Épocas" src="https://github.com/user-attachments/assets/75161a6b-0616-4a71-84a7-95fd81bddf17" />

### Matriz de Confusão

|                   | Predito: Falha | Predito: Sucesso |
| ----------------- | -------------- | ---------------- |
| **Real: Falha**   | 18 ✅          | 2 ❌             |
| **Real: Sucesso** | 3 ❌           | 12 ✅            |

O modelo acertou 18 de 20 casos de falha (90% de detecção de falhas) e 12 de 15 casos de impressão saudável. Os 2 falsos negativos (falhas não detectadas) são o cenário mais crítico, pois deixam a impressão continuar com defeito. Os 3 falsos positivos (impressões saudáveis classificadas como falha) geram interrupções desnecessárias, mas são menos prejudiciais.

<img width="639" height="482" alt="Matriz de Confusão" src="https://github.com/user-attachments/assets/6e1164d7-4491-4809-938e-33730bf31dd5" />

### Curva ROC

<img width="697" height="463" alt="Curva ROC" src="https://github.com/user-attachments/assets/cc05fdf8-16e0-4bb7-8765-3309a037e511" />

### Interpretação Crítica

O ROC-AUC de **0,967** indica excelente capacidade de separação entre as classes. A accuracy de validação (~98%) é consideravelmente superior à accuracy de teste (85,71%), o que é esperado dado o tamanho reduzido do conjunto de teste (apenas 35 amostras), onde cada erro tem peso proporcionalmente maior. Para um contexto de uso real, o ROC-AUC elevado é o indicador mais confiável da qualidade do modelo.

### Limitações do Modelo

- Dataset pequeno pode limitar a generalização para impressoras e condições muito distintas das do treino;
- Não detecta outros tipos de falha além do Efeito Espaguete;
- Desempenho pode cair com iluminação muito diferente das imagens de treino.

### Possíveis Melhorias Futuras

- Ampliar o dataset com maior diversidade de impressoras, filamentos e condições de iluminação;
- Implementar análise temporal (sequência de frames) para detecção mais robusta;
- Suporte a múltiplas classes de falha (layer shifting, under-extrusion, etc.);
- Conversão para TensorFlow Lite para inferência embarcada (Raspberry Pi, ESP32-CAM);
- Integração direta com firmware de impressoras (Klipper, Marlin) para interrupção automática.

---

## 🌍 Aplicabilidade Real

O sistema pode ser integrado a qualquer impressora 3D FDM por meio de uma câmera de baixo custo conectada a um servidor local. A cada intervalo de tempo, uma foto da mesa de impressão é capturada, enviada ao backend Django e classificada pelo modelo. Em caso de falha detectada, a interface exibe um alerta com o diagnóstico e a recomendação de executar o G-code `M112` (interrupção de emergência).

| Dimensão  | Impacto                                                      |
| --------- | ------------------------------------------------------------ |
| Econômico | Redução de desperdício de filamento e tempo de máquina       |
| Social    | Democratiza impressão 3D autônoma e confiável                |
| Técnico   | Integração possível com ecossistemas de automação existentes |
| Ambiental | Menos descarte de plástico por peças com falha               |

---

## 🖥️ Demonstração Funcional

O projeto inclui uma aplicação web completa com **frontend em React (Vite)** e **backend em Django**, que permite:

1. Upload de uma foto capturada da impressora (JPG, PNG ou WEBP);
2. Envio da imagem à API Django via `POST /predict`;
3. Exibição do diagnóstico (`Impressão Saudável` ou `ALERTA: Falha Detectada`) e da confiança do modelo em percentual com barra visual;
4. Em caso de falha: alerta com instrução de abortar impressão via G-code `M112`.

O modelo treinado (`melhor_modelo_efficientnet_pc.keras`) é carregado automaticamente pelo backend no momento da inicialização.

---

## 📂 Estrutura do Repositório

```
Deep-Learning-special-topics-computing/
│
├── backend/                        # API de inferência (Django)
│   ├── api/
│   │   └── views.py                # Endpoint POST /predict — carrega o modelo e faz a predição
│   ├── setup/
│   │   ├── settings.py             # Configurações Django (CORS habilitado)
│   │   └── urls.py                 # Roteamento: /predict → predict_view
│   ├── Deteccao_Falhas_Impressao3D.ipynb  # Notebook principal (executar aqui para gerar o .keras)
│   ├── melhor_modelo_efficientnet_pc.keras  # Modelo treinado (gerado ao executar o notebook acima)
│   └── manage.py
│
├── frontend/                       # Interface web (React + Vite)
│   ├── src/
│   │   ├── App.jsx                 # Componente principal: upload, chamada à API e exibição do resultado
│   │   └── App.css
│   └── package.json                # Dependências: React 19, Vite 8
│
├── notebooks/
│   ├── DataPipeline.ipynb          # Exploração e carregamento do dataset
│   └── Deteccao_Falhas_Impressao3D.ipynb  # Cópia do notebook principal
│
├── data/                           # Dataset de imagens (baixar via Kaggle — instruções abaixo)
│   ├── train/
│   │   ├── failure/   (114 imagens)
│   │   └── success/   (114 imagens)
│   ├── valid/
│   │   ├── failure/   (32 imagens)
│   │   └── success/   (32 imagens)
│   └── test/
│       ├── failure/   (20 imagens)
│       └── success/   (15 imagens)
│
├── .gitignore
└── README.md
```

---

## 🛠️ Tecnologias Utilizadas

| Categoria               | Tecnologia                                       |
| ----------------------- | ------------------------------------------------ |
| Linguagem               | Python 3.14                                      |
| Deep Learning           | TensorFlow / Keras                               |
| Arquitetura             | EfficientNetB3 (Transfer Learning + Fine-Tuning) |
| Processamento de imagem | Pillow (PIL)                                     |
| Análise e métricas      | NumPy, Scikit-learn                              |
| Visualização            | Matplotlib, Seaborn                              |
| Backend / API           | Django 6 + django-cors-headers                   |
| Frontend                | React 19 + Vite 8                                |
| Notebooks               | Jupyter Notebook                                 |

---

## 🚀 Instruções de Instalação e Execução

### Pré-requisitos

- Python 3.14
- Node.js 18+
- pip

### 1. Clonar o repositório

```bash
git clone https://github.com/Victor-Sarris/Deep-Learning-special-topics-computing.git
cd Deep-Learning-special-topics-computing
```

### 2. Obter o Dataset

Baixe o dataset no Kaggle e extraia os arquivos nos diretórios `data/train/`, `data/valid/` e `data/test/`:

🔗 [3D Printing - SUCCESS - FAILURE DATASET (finetuned)](https://www.kaggle.com/datasets/bshaurya/3d-printing-success-failure-dataset-finetuned)

### 3. Treinar o Modelo (Notebook)

```bash
pip install tensorflow matplotlib numpy scikit-learn seaborn jupyter pillow
cd backend
jupyter notebook Deteccao_Falhas_Impressao3D.ipynb
```

> O notebook carrega os dados com caminhos relativos (`'train'`, `'valid'`, `'test'`), portanto deve ser executado a partir de `backend/`. Como o dataset está na raiz em `data/`, crie links simbólicos antes de rodar:
>
> ```bash
> # Dentro de backend/
> ln -s ../data/train train
> ln -s ../data/valid valid
> ln -s ../data/test test
> ```
>
> Ao final da execução, o arquivo `melhor_modelo_efficientnet_pc.keras` será salvo automaticamente em `backend/`, onde o servidor Django o procura.

### 4. Iniciar o Backend (Django)

```bash
cd backend
pip install django django-cors-headers tensorflow pillow
python manage.py runserver
```

O servidor sobe em `http://localhost:8000`. O modelo é carregado automaticamente na inicialização.

### 5. Iniciar o Frontend (React)

Em outro terminal:

```bash
cd frontend
npm install
npm run dev
```

Acesse `http://localhost:5173` no navegador.

### Endpoint da API

| Método | URL                             | Descrição                                                                               |
| ------ | ------------------------------- | --------------------------------------------------------------------------------------- |
| `POST` | `http://localhost:8000/predict` | Recebe uma imagem (`multipart/form-data`, campo `file`) e retorna o diagnóstico em JSON |

**Exemplo de resposta:**

```json
{
  "status": "ALERTA: Falha Detectada (Efeito Espaguete)",
  "confianca": 94.37,
  "is_sucesso": false
}
```

---

<h3 align="center">👥 Colaboradores</h3>

<div align="center">

<table>
  <tr>
    <td align="center">
      <a href="https://github.com/AmandaGitH">
        <img src="https://avatars.githubusercontent.com/u/181160672?v=4" width="100px;" alt=""/><br />
        <sub><b>Amanda Iasmin</b></sub>
      </a>
    </td>
    <td align="center">
      <a href="https://github.com/Izaque123">
        <img src="https://avatars.githubusercontent.com/u/106625747?v=4" width="100px;" alt=""/><br />
        <sub><b>Izaque Nicolas</b></sub>
      </a>
    </td>
    <td align="center">
      <a href="https://github.com/josehenriquevs">
        <img src="https://avatars.githubusercontent.com/u/187699545?v=4" width="100px;" alt=""/><br />
        <sub><b>José Henrique</b></sub>
      </a>
    </td>
  </tr>
  <tr>
    <td align="center">
      <a href="https://github.com/Matheus10DV">
        <img src="https://avatars.githubusercontent.com/u/192535212?v=4" width="100px;" alt=""/><br />
        <sub><b>Matheus Ribeiro</b></sub>
      </a>
    </td>
    <td align="center">
      <a href="https://github.com/Victor-Sarris">
        <img src="https://avatars.githubusercontent.com/u/178488451?v=4" width="100px;" alt=""/><br />
        <sub><b>Victor Sarrís</b></sub>
      </a>
    </td>
    <td align="center">
      <a href="https://github.com/imnotSabrina">
        <img src="https://avatars.githubusercontent.com/u/106186281?v=4" width="100px;" alt=""/><br />
        <sub><b>Sabrina Laís</b></sub>
      </a>
    </td>
  </tr>
</table>

</div>

---

## 📄 Licença

Este projeto foi desenvolvido para fins acadêmicos como parte da disciplina de Tópicos Especiais em Computação. O dataset utilizado pertence aos seus respectivos autores originais (Obico / The Spaghetti Detective / Kaggle).
