from fastapi import FastAPI, File, UploadFile
from fastapi.responses import JSONResponse
from fastapi.middleware.cors import CORSMiddleware
import uvicorn
import numpy as np
import tensorflow as tf
from tensorflow.keras.models import load_model
from tensorflow.keras.preprocessing import image
from PIL import Image
from io import BytesIO

# === Inisialisasi FastAPI ===
app = FastAPI()

# === Middleware CORS agar bisa diakses dari frontend (JS) ===
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Ganti dengan domain frontend-mu untuk keamanan
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# === Konfigurasi Model ===
MODEL_PATH = 'model_cnn.h5'  # Pastikan path model benar
IMG_HEIGHT = 224
IMG_WIDTH = 224

class_names = [
    'freshapples', 'freshbanana', 'freshbittergroud', 'freshcapsicum', 'freshcucumber',
    'freshokra', 'freshoranges', 'freshpotato', 'freshtomato',
    'rottenapples', 'rottenbanana', 'rottenbittergroud', 'rottencapsicum', 'rottencucumber',
    'rottenokra', 'rottenoranges', 'rottenpotato', 'rottentomato'
]

# Muat model sekali saja saat startup
model = load_model(MODEL_PATH)

# === Fungsi bantu ===
def read_imagefile(file) -> Image.Image:
    image = Image.open(BytesIO(file)).convert("RGB")  # Pastikan RGB
    return image

def predict(img: Image.Image):
    # Resize dan ubah ke array tanpa normalisasi ulang (karena model sudah punya Rescaling)
    img = img.resize((IMG_WIDTH, IMG_HEIGHT))
    img_array = image.img_to_array(img)  # [0,255]
    img_array = np.expand_dims(img_array, axis=0)  # [1, 224, 224, 3]

    prediction = model.predict(img_array)
    predicted_class = np.argmax(prediction[0])
    confidence = float(prediction[0][predicted_class]) * 100

    return class_names[predicted_class], confidence

# === Endpoint utama ===
@app.post("/predict")
async def predict_image(file: UploadFile = File(...)):
    try:
        img = read_imagefile(await file.read())
        pred_class, confidence = predict(img)

        response = {
            "filename": file.filename,
            "title": "Prediction Result",
            "message": f"The item is classified as: {pred_class}",
            "confidence": f"{confidence:.2f}",
            "details": [f"Class: {pred_class}", f"Confidence: {confidence:.2f}%"]
        }

        return JSONResponse(content=response)
    except Exception as e:
        return JSONResponse(content={"error": str(e)}, status_code=500)

# === Untuk menjalankan secara lokal ===
if __name__ == "__main__":
    uvicorn.run("app:app", host="0.0.0.0", port=5000, reload=True)

# uvicorn app:app --reload
