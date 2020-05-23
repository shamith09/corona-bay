# Tensorflow is not supported on Python 3.8. I used Python 3.7 to write this program.
# Packages to pip install: tensorflow (using 2.1.0), numpy, pillow, tkinter

import numpy as np
import tensorflow as tf
from PIL import Image
from tensorflow.keras.models import load_model, model_from_json
from tkinter.filedialog import askopenfilename

root = ".\\"  # directory with saved_model.pb file

RESIZE_DIMS = (150, 150)
THRESHOLD = 0.5

my_model = load_model(root)


def to_arr(path):
    x = []
    x.append(
        (np.array(
            Image.open(path).convert("L").resize(RESIZE_DIMS),
            np.float64
        )) / 255    # normalization to [0, 1] values
    )
    return np.array(x)


try:
    filename = askopenfilename()  # pick image file (jpeg, png, gif, etc.)
    img = to_arr(filename)
    prediction = my_model.predict(img[:1])[0][0]

    print(prediction)  # Probablility (0, 1) of being positive for COVID-19
    print(prediction > THRESHOLD)  # Boolean: True is positive, False is negative
except:
    print("No file selected")
