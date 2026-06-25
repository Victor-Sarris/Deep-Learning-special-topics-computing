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

A impressão 3D por deposição de material fundido (FDM) é amplamente utilizada em prototipagem, manufatura distribuída e produção acadêmica. No entanto, o processo é suscetível a falhas silenciosas — em especial o **Efeito Espaguete**, onde o filamento é extrudado no ar sem aderir ao modelo, resultando em uma malha caótica de plástico que inutiliza a peça.

### Impacto

Falhas desse tipo causam:
- **Desperdício de filamento** (que pode custar dezenas de reais por carretel);
- **Perda de tempo** em impressões que podem durar horas ou dias;
- **Danos potenciais ao equipamento** caso o filamento obstrua componentes;
- **Impacto financeiro** em contextos de produção em série.

### Quem é afetado

Makers, engenheiros, laboratórios de pesquisa, empresas de prototipagem e qualquer usuário de impressoras FDM de mesa aberta — especialmente aqueles que executam impressões longas sem supervisão contínua.

### Relevância

A detecção automática de falhas elimina a necessidade de monitoramento humano constante, permite a interrupção imediata da impressão e reduz significativamente perdas materiais e de tempo.

### Limitações da Solução

- O modelo atua sobre **imagens estáticas**, sem considerar o contexto temporal da impressão;
- A câmera precisa ter posicionamento e iluminação adequados para captura confiável;
- Casos extremamente atípicos de falha podem não ser reconhecidos se ausentes no dataset de treino;
- A solução não substitui a supervisão humana, mas a complementa de forma eficiente.

### Justificativa do Uso de Deep Learning

A detecção visual de padrões complexos e variáveis — como a morfologia irregular do Efeito Espaguete — é uma tarefa onde abordagens baseadas em regras falham. Redes Neurais Convolucionais (CNNs), especialmente com Transfer Learning, têm demonstrado desempenho superior em tarefas de classificação de imagens, tornando Deep Learning a escolha natural para este problema.

---

## 🎯 Objetivo da Solução

O sistema tem como objetivo **classificar automaticamente imagens capturadas durante a impressão 3D** em duas categorias:

| Classe | Descrição |
|---|---|
| `success` | Impressão ocorrendo normalmente |
| `failure` | Efeito Espaguete detectado |

**Resultado esperado:** ao identificar uma falha, o sistema pode acionar um alerta ou interromper automaticamente a impressão, evitando desperdício.

**Ganho esperado:** redução do desperdício de filamento e tempo, além de maior autonomia para o operador durante impressões longas.

---

## 💾 Base de Dados

### Origem

Dataset público disponível no Kaggle: **[3D Printing - SUCCESS - FAILURE DATASET (finetuned)](https://www.kaggle.com/datasets/bshaurya/3d-printing-success-failure-dataset-finetuned)**

Derivado do projeto open-source **Obico / The Spaghetti Detective**, que coleta imagens reais de impressoras FDM de mesa aberta ao redor do mundo.

### Características

| Atributo | Detalhe |
|---|---|
| Tipo de dado | Imagens RGB |
| Classes | `success` / `failure` (binário) |
| Origem | Impressoras FDM de mesa aberta — imagens reais |
| Formato de entrada | `224x224 pixels` (após redimensionamento) |

### Pré-processamento

- **Redimensionamento:** todas as imagens foram redimensionadas para `224x224 pixels`, compatível com a entrada da arquitetura EfficientNetB3;
- **Normalização:** valores de pixel normalizados para o intervalo `[0, 1]`;
- **Separação treino/validação/teste:** o dataset está organizado nos diretórios `/train`, `/valid` e `/test`;
- **Balanceamento:** verificado por meio do notebook `DataPipeline.ipynb`.

### Limitações da Base

- Imagens capturadas em condições variadas de iluminação e ângulo;
- Possível viés para determinados modelos e marcas de impressoras;
- Não cobre falhas de impressão além do Efeito Espaguete.

---

## 🧠 Modelagem em Deep Learning

### Arquitetura

Foi adotado **Transfer Learning** com a arquitetura **EfficientNetB3** pré-treinada na ImageNet, com camadas de classificação customizadas adicionadas ao topo.

**Justificativa técnica:** a EfficientNetB3 oferece excelente equilíbrio entre acurácia e custo computacional, sendo adequada para implantação em ambientes com recursos limitados (como Raspberry Pi acoplados a impressoras). Seu desempenho em tarefas de classificação de imagens é consolidado na literatura.

### Configuração do Treinamento

| Parâmetro | Valor |
|---|---|
| Tipo de rede | CNN (Transfer Learning — EfficientNetB3) |
| Função de ativação | ReLU (camadas intermediárias) / Sigmoid (saída binária) |
| Função de perda | Binary Crossentropy |
| Otimizador | Adam |
| Métricas | Accuracy, Precision, Recall, F1-Score, ROC-AUC |
| Batch Size | 32 |

### Estratégias contra Overfitting

- **Data Augmentation** (rotações, flips, zoom, brilho);
- **Dropout** nas camadas densas superiores;
- **Early Stopping** monitorando a loss de validação;
- Congelamento das camadas base da EfficientNetB3 na fase inicial.

---

## 📊 Avaliação dos Resultados

### Métricas Utilizadas

O modelo foi avaliado com métricas adequadas ao contexto de classificação binária com impacto prático na taxa de falsos negativos (falhas não detectadas):

- **Accuracy** — proporção geral de acertos;
- **Precision** — dos casos classificados como falha, quantos realmente eram;
- **Recall** — dos casos reais de falha, quantos foram detectados;
- **F1-Score** — harmônico entre Precision e Recall;
- **Matriz de Confusão** — visualização detalhada dos acertos e erros;
- **Curva ROC / AUC** — avaliação da separabilidade entre classes;
- **Curvas de Loss e Accuracy** — treino vs. validação ao longo das épocas.

### Visualizações

Os gráficos de desempenho estão disponíveis no notebook principal `Deteccao_Falhas_Impressao3D.ipynb` e incluem:

- Curvas de aprendizado (loss e accuracy);
- Matriz de confusão;
- Curva ROC.

### Limitações do Modelo

- Desempenho pode cair com iluminação muito distinta do dataset de treino;
- Não detecta falhas além do Efeito Espaguete;
- Requer imagem de qualidade mínima para classificação confiável.

### Possíveis Melhorias Futuras

- Expansão do dataset com maior diversidade de impressoras e condições;
- Implementação de análise temporal (sequência de frames) para detecção mais robusta;
- Suporte a múltiplas classes de falha;
- Fine-tuning completo do modelo base com dataset expandido;
- Integração com firmware de impressoras (ex: Klipper, Marlin) para interrupção automática.

---

## 🌍 Aplicabilidade Real

### Como a solução poderia ser usada

O sistema pode ser integrado a qualquer impressora 3D FDM por meio de uma câmera de baixo custo (ex: câmera USB ou módulo ESP32-CAM) conectada a um servidor local ou embarcado. A cada intervalo de tempo, uma imagem é capturada, enviada ao modelo e classificada. Em caso de falha detectada, um alerta é disparado ou a impressora é interrompida via API.

### Custos Computacionais

O modelo baseado em EfficientNetB3 é leve o suficiente para inferência em CPU em tempo quase real. Para uso embarcado, pode ser convertido para TensorFlow Lite.

### Impactos

| Dimensão | Impacto |
|---|---|
| Econômico | Redução de desperdício de filamento e tempo de máquina |
| Social | Democratiza impressão 3D autônoma e confiável |
| Técnico | Integração possível com ecossistemas de automação existentes |
| Ambiental | Menos descarte de plástico por peças com falha |

### Viabilidade Prática

Alta. O hardware necessário (câmera + microcomputador) tem custo acessível, e soluções como o próprio Obico já validam a viabilidade comercial do conceito.

---

## 🖥️ Demonstração Funcional

O projeto inclui uma **interface web** (frontend + backend) que permite ao usuário:

1. Fazer upload de uma imagem capturada da impressora;
2. Receber a classificação do modelo (`success` ou `failure`);
3. Visualizar a confiança da predição.

Os notebooks também podem ser executados de forma independente para reproduzir o treinamento e a avaliação do modelo.

---

## 📂 Estrutura do Repositório

```
Deep-Learning-special-topics-computing/
│
├── backend/                   # API de inferência (servidor Python)
│
├── frontend/                  # Interface web para demonstração funcional
│
├── notebooks/
│   ├── DataPipeline.ipynb     # Pré-processamento e análise exploratória do dataset
│   └── Deteccao_Falhas_Impressao3D.ipynb  # Treinamento, avaliação e métricas do modelo
│
├── data/                      # Dataset (instruções de obtenção abaixo)
│   ├── train/
│   │   ├── success/
│   │   └── failure/
│   ├── valid/
│   │   ├── success/
│   │   └── failure/
│   └── test/
│       ├── success/
│       └── failure/
│
├── .gitignore
└── README.md
```

---

## 🛠️ Tecnologias Utilizadas

| Categoria | Tecnologia |
|---|---|
| Linguagem | Python 3.x |
| Deep Learning | TensorFlow / Keras |
| Arquitetura | EfficientNetB3 (Transfer Learning) |
| Análise de Dados | NumPy, Pandas |
| Visualização | Matplotlib, Seaborn |
| Avaliação | Scikit-learn |
| Interface | HTML, CSS, JavaScript (frontend) |
| Backend / API | Python (backend) |
| Notebooks | Jupyter Notebook |

---

## 🚀 Instruções de Instalação e Execução

### Pré-requisitos

- Python 3.8 ou superior
- pip
- (Recomendado) Ambiente virtual via `venv` ou `conda`
- GPU com CUDA (opcional, mas recomendado para treinamento)

### 1. Clonar o repositório

```bash
git clone https://github.com/Victor-Sarris/Deep-Learning-special-topics-computing.git
cd Deep-Learning-special-topics-computing
```

### 2. Criar e ativar o ambiente virtual

```bash
python -m venv venv
# Linux/macOS
source venv/bin/activate
# Windows
venv\Scripts\activate
```

### 3. Instalar as dependências

```bash
pip install tensorflow numpy matplotlib seaborn scikit-learn pandas jupyter
```

### 4. Obter o Dataset

Baixe o dataset no Kaggle e extraia os arquivos no diretório `data/`:

🔗 [3D Printing - SUCCESS - FAILURE DATASET (finetuned)](https://www.kaggle.com/datasets/bshaurya/3d-printing-success-failure-dataset-finetuned)

### 5. Executar o pipeline de dados (pré-processamento)

```bash
jupyter notebook notebooks/DataPipeline.ipynb
```

### 6. Treinar e avaliar o modelo

```bash
jupyter notebook notebooks/Deteccao_Falhas_Impressao3D.ipynb
```

> ⚠️ Ao final da execução, um arquivo `.keras` com os pesos treinados será gerado automaticamente para ser consumido pelo backend.

### 7. Executar a demonstração funcional (interface web)

```bash
# Iniciar o backend
cd backend
python app.py

# Em outro terminal, abrir o frontend
cd frontend
# Abrir index.html no navegador ou servir com:
python -m http.server 8080
```

---

## 👥 Equipe

| Nome |
|---|
| Amanda Iasmin Sousa Nascimento |
| Izaque Nícolas Vieira de Melo|
| José Henrique Vieira da Silva |
| Matheus Ribeiro de Araújo |
| Sabrina Laís Vieira Ramos |
| Victor Sarrís Silva Santos |

---

## 📄 Licença

Este projeto foi desenvolvido para fins acadêmicos como parte da disciplina de Tópicos Especiais em Computação. O dataset utilizado pertence aos seus respectivos autores originais (Obico / The Spaghetti Detective / Kaggle).