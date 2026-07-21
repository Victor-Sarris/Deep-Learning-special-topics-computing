import os

import numpy as np
import tensorflow as tf
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from PIL import Image, UnidentifiedImageError

BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
MODEL_PATH = os.path.join(BASE_DIR, "melhor_modelo_efficientnet_pc.keras")

# Limiar de decisão. Valores > THRESHOLD são classificados como "sucesso".
# Abaixar o limiar prioriza o recall de falhas (menos falsos negativos).
THRESHOLD = float(os.getenv("PREDICT_THRESHOLD", "0.5"))

# Cache do modelo carregado de forma preguiçosa (lazy) para não travar a
# inicialização do Django (migrate, test, collectstatic) nem quebrar caso o
# arquivo .keras ainda não tenha sido gerado pelo notebook.
_model = None


def get_model():
    global _model
    if _model is None:
        if not os.path.exists(MODEL_PATH):
            raise FileNotFoundError(
                "Modelo não encontrado. Execute o notebook "
                "'Deteccao_Falhas_Impressao3D.ipynb' para gerar "
                f"'{os.path.basename(MODEL_PATH)}' em backend/."
            )
        print("A carregar o modelo EfficientNetB3...")
        _model = tf.keras.models.load_model(MODEL_PATH)
        print("Modelo carregado com sucesso!")
    return _model


@csrf_exempt
def predict_view(request):
    if request.method != "POST":
        return JsonResponse({"error": "Utilize o método POST."}, status=405)

    file = request.FILES.get("file")
    if not file:
        return JsonResponse({"error": "Nenhuma imagem enviada."}, status=400)

    try:
        img = Image.open(file).convert("RGB")
    except (UnidentifiedImageError, OSError):
        return JsonResponse(
            {"error": "Arquivo de imagem inválido ou corrompido."}, status=400
        )

    try:
        model = get_model()
    except FileNotFoundError as exc:
        return JsonResponse({"error": str(exc)}, status=503)

    try:
        img = img.resize((300, 300))
        img_array = tf.keras.preprocessing.image.img_to_array(img)
        img_array = np.expand_dims(img_array, axis=0)

        predicao = float(model.predict(img_array)[0][0])
    except Exception:  # noqa: BLE001 - falha de inferência não deve derrubar o servidor
        return JsonResponse(
            {"error": "Erro ao processar a imagem no modelo."}, status=500
        )

    is_sucesso = predicao > THRESHOLD
    confianca = predicao if is_sucesso else 1 - predicao

    return JsonResponse(
        {
            "status": (
                "Impressão Saudável"
                if is_sucesso
                else "ALERTA: Falha Detectada (Efeito Espaguete)"
            ),
            "confianca": round(confianca * 100, 2),
            "is_sucesso": is_sucesso,
        }
    )
