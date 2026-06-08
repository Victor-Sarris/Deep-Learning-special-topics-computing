# 🖨️ Detecção de Falhas em Impressão 3D (Efeito Espaguete)

## 🎯 Objetivo do Projeto

Este projeto aplica técnicas de Deep Learning (Redes Neurais Convolucionais) para a detecção automática de falhas durante o processo de impressão 3D (FDM). O foco principal é identificar o "Efeito Espaguete", permitindo que a impressão seja abortada antes que haja desperdício significativo de tempo e filamento.

O projeto foi desenvolvido como requisito para a Atividade Prática de Deep Learning e propõe uma solução leve e aplicável ao mundo real.

## 👥 Equipe de Desenvolvimento

- **Victor Sarrís Silva Santos**
- **Cleber Henrique Lacerda Duarte**
- **Matheus Ribeiro de Araujo**
- **Izaque Nicolas**

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
- **Arquitetura Base:** MobileNetV2 (Transfer Learning)
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

_(Preencher esta seção após a conclusão do treinamento)_

- **Accuracy (Acurácia):** %
- **F1-Score:** \* **Matriz de Confusão:** (Inserir print da matriz gerada)

---

Dataset usado: https://www.kaggle.com/datasets/bshaurya/3d-printing-success-failure-dataset-finetuned

_Projeto em desenvolvimento ativo._
