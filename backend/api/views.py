from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from PIL import Image
import numpy as np
import os

BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
MODEL_PATH = os.path.join(BASE_DIR, "melhor_modelo_efficientnet_pc.keras")

_model = None

def get_model():
    global _model
    if _model is None:
        import tensorflow as tf
        _model = tf.keras.models.load_model(MODEL_PATH)
    return _model


@csrf_exempt
def predict_view(request):
    if request.method == "POST":
        file = request.FILES.get("file")
        if not file:
            return JsonResponse({"error": "Nenhuma imagem enviada."}, status=400)

        import tensorflow as tf
        model = get_model()

        img = Image.open(file).convert("RGB")
        img = img.resize((300, 300))

        img_array = tf.keras.preprocessing.image.img_to_array(img)
        img_array = np.expand_dims(img_array, axis=0)

        predicao = model.predict(img_array)[0][0]

        is_sucesso = bool(predicao > 0.5)
        confianca = float(predicao) if is_sucesso else float(1 - predicao)

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

    return JsonResponse({"error": "Utilize o método POST."}, status=405)
