# 🖨️ Detecção de Falhas em Impressão 3D (Efeito Espaguete)

## 🎯 Objetivo do Projeto

Este projeto aplica técnicas de Deep Learning (Redes Neurais Convolucionais) para a detecção automática de falhas durante o processo de impressão 3D (FDM). O foco principal é identificar o "Efeito Espaguete", permitindo que a impressão seja abortada antes que haja desperdício significativo de tempo e filamento.

O projeto foi desenvolvido como requisito para a Atividade Prática de Deep Learning e propõe uma solução leve e aplicável ao mundo real.

## 👥 Equipe de Desenvolvimento

- **Amanda Iasmim de Sousa Nascimento**
- **Izaque Nicolas Vieira**
- **José Henirque Vieira da Silva**
- **Matheus Ribeiro de Araujo**
- **Sabrina Lais Vieira de Ramos**
- **Victor Sarrís Silva Santos**

## 📂 Estrutura do Repositório

- `/train`, `/valid`, `/test`: Diretórios contendo as imagens do dataset separadas nas classes binárias (`success` e `failure`).
- `DataPipeline.ipynb`: Notebook responsável pelo pré-processamento, redimensionamento das imagens e testes de carregamento.
- `Deteccao_Falhas_Impressao3D.ipynb`: Notebook principal contendo a construção, compilação, treinamento e extração de métricas do modelo de Transfer Learning.

## 💾 Base de Dados (Dataset)

A base de dados utilizada é composta por imagens reais de impressoras FDM de mesa aberta.

- **Origem:** Recorte derivado do projeto _Obico / The Spaghetti Detective_, finetunado e obtido na plataforma Kaggle ("3D Printing - SUCCESS - FAILURE DATASET").
- **Pré-processamento:** As imagens foram redimensionadas para `224x224 pixels` e os valores dos pixels foram normalizados para adequação à arquitetura da rede.

## 🛠️ Tecnologias Utilizadas

- **Linguagem:** Python 3.x
- **Deep Learning Framework:** TensorFlow / Keras
- **Arquitetura Base:** EfficientNetB3 (Transfer Learning)
- **Manipulação de Dados e Visualização:** NumPy, Matplotlib, Seaborn, Scikit-learn.

## 🚀 Instruções de Instalação e Execução

### 1. Clonar o repositório

```bash
git clone https://github.com/Victor-Sarris/Deep-Learning-special-topics-computing.git
cd deep-learning-special-topics-computing
```

### 2. Instalar as dependências

Certifique-se de ter o Python instalado. É recomendado o uso de um ambiente virtual (venv ou conda).

```bash
pip install tensorflow numpy matplotlib seaborn scikit-learn
```

### 3. Execução

Para treinar o modelo e visualizar as métricas, abra e execute os blocos do notebook principal:

```bash
jupyter notebook Deteccao*Falhas_Impressao3D.ipynb
```

\_Nota: Ao final da execução, um arquivo `.keras` contendo os pesos treinados será gerado para ser consumido na demonstração funcional.\*

## 📊 Resultados e Validação

- \*\*Accuracy (Acurácia):
<img width="567" height="449" alt="image" src="https://github.com/user-attachments/assets/75161a6b-0616-4a71-84a7-95fd81bddf17" />
<img width="587" height="460" alt="image" src="https://github.com/user-attachments/assets/ef5c7b39-eea7-4b6c-9f77-2daafdfb8c1c" />

- **F1-Score:** \* **Matriz de Confusão:**
<img width="639" height="482" alt="image" src="https://github.com/user-attachments/assets/6e1164d7-4491-4809-938e-33730bf31dd5" />

- **Curva ROC:**
<img width="697" height="463" alt="image" src="https://github.com/user-attachments/assets/cc05fdf8-16e0-4bb7-8765-3309a037e511" />


---

Dataset usado: https://www.kaggle.com/datasets/bshaurya/3d-printing-success-failure-dataset-finetuned

_Projeto em desenvolvimento ativo._
