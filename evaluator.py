from __future__ import absolute_import, division, print_function, unicode_literals
import numpy as np
import pandas as pd
import tensorflow as tf
import tensorflowjs as tfjs
import os
from PIL import Image
from tensorflow.keras.models import load_model

root = "C:\\Users\\Rinki\\Documents\\Corona\\"
model = load_model(root + "model1")
pd.options.display.max_rows = 10
pd.options.display.float_format = "{:.1f}".format
np.set_printoptions(linewidth = 200)

RESIZE_DIMS = (150, 150)
TEST_SPLIT = 400

features = []
labels = []

# functions

def imgs_to_arr(path, label):
    for f in os.listdir(path):
        features.append(np.array(Image.open(path + f).convert('L').resize(RESIZE_DIMS), np.float64))
        labels.append(label)
def norm(x):
    return x / 255 
def to_list(arr):
    result = []
    for i in range(len(arr)):
        for j in range(len(arr[i])):
            result.append(list(arr[i][j]))
    return result
def shuffle_in_unison(a, b):
    assert len(a) == len(b)
    shuffled_a = np.empty(a.shape, dtype=a.dtype)
    shuffled_b = np.empty(b.shape, dtype=b.dtype)
    permutation = np.random.permutation(len(a))
    for old_index, new_index in enumerate(permutation):
        shuffled_a[new_index] = a[old_index]
        shuffled_b[new_index] = b[old_index]
    return shuffled_a, shuffled_b
def test(my_model, x_arr, y_arr, index):
    prediction = model.predict(x_arr[index:index+1])[0][0]
    actual = y_arr[index]
    return prediction, actual

# calls

# inits
imgs_to_arr(root + "ctdataset\\covidct\\", 1.)
imgs_to_arr(root + "ctdataset\\normalct\\", 0.) 
features = norm(np.array(features))
features, labels = shuffle_in_unison(np.array(features), np.array(labels))
#x_test = features[int(len(features)-len(features)-TEST_SPLIT):int(len(features))]
#y_test = np.array(labels[int(len(labels)-len(labels)-TEST_SPLIT):int(len(labels))])

x_test = features
y_test = labels
# training

batch_size = 100

model.evaluate(x=x_test, y=y_test, batch_size=batch_size)
