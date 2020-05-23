from __future__ import absolute_import, division, print_function, unicode_literals
import numpy as np
import pandas as pd
import tensorflow as tf
import tensorflowjs as tfjs
import os
from PIL import Image
root = "C:\\Users\\Rinki\\Documents\\Corona\\"

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
def create_model(my_learning_rate, lmbda):
  model = tf.keras.models.Sequential()
  model.add(tf.keras.layers.Flatten(input_shape=(CROP_Y, CROP_X)))
  model.add(tf.keras.layers.Dense(units=128, activation='relu', kernel_regularizer=tf.keras.regularizers.l2(l=lmbda)))
  model.add(tf.keras.layers.Dense(units=64, activation='relu'))
  model.add(tf.keras.layers.Dense(units=64, activation='relu'))
  model.add(tf.keras.layers.Dense(units=1, activation=tf.sigmoid))     

  model.compile(optimizer=tf.keras.optimizers.Adam(lr=my_learning_rate),
                loss=tf.keras.losses.BinaryCrossentropy(),
                metrics=['accuracy'])
  
  return model    
def train_model(model, train_features, train_label, epochs,
                batch_size=None):


  history = model.fit(x=train_features, y=train_label, batch_size=batch_size,
                      epochs=epochs, shuffle=True)
 
 
  epochs = history.epoch
  hist = pd.DataFrame(history.history)

  return epochs, hist    
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
    prediction = my_model.predict(x_arr[index:index+1])[0][0]
    actual = y_arr[index]
    return prediction, actual

# calls

# inits
imgs_to_arr(root + "ctdataset\\covidct\\", 1.)
imgs_to_arr(root + "ctdataset\\normalct\\", 0.) 
features = norm(np.array(features))
features, labels = shuffle_in_unison(np.array(features), np.array(labels))
x_train = features[:int(len(features)-len(features)-TEST_SPLIT)]
x_test = features[int(len(features)-len(features)-TEST_SPLIT):int(len(features))]
y_train = np.array(labels[:int(len(labels)-len(labels)-TEST_SPLIT)])
y_test = np.array(labels[int(len(labels)-len(labels)-TEST_SPLIT):int(len(labels))])
print(x_train[1].shape)
# training

learning_rate = 0.001
epochs = 20
batch_size = 100
lmbda = 0.01

my_model = create_model(learning_rate, lmbda)

epochs, hist = train_model(my_model, x_train, y_train, 
                           epochs, batch_size)

print("\n Evaluate the new model against the test set:")
my_model.evaluate(x=x_test, y=y_test, batch_size=batch_size)


tfjs.converters.save_keras_model(my_model, root)
my_model.save("model.h5")
my_model.save(root)
