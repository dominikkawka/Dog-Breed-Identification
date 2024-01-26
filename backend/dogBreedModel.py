import numpy as np
import tensorflow as tf
from matplotlib import pyplot as plt
from tensorflow.keras.models import Sequential, load_model
from tensorflow.keras.layers import Conv2D, MaxPooling2D, Dense, Flatten, Dropout, RandomFlip, RandomRotation, RandomZoom, Input, BatchNormalization, Resizing,  Rescaling
from tensorflow.keras.metrics import Precision, Recall, BinaryAccuracy
from tensorflow.keras.applications import InceptionV3
from tensorflow.keras.optimizers import Adam

import commonVariables as val

number_of_breeds = len(val.breedLabel)
batch_size = 64
seed = 10
epochs = 120

gpus = tf.config.experimental.list_physical_devices('GPU')
if gpus:
  try:
    for gpu in gpus:
      tf.config.experimental.set_memory_growth(gpu, True)
  except RuntimeError as e:
    print(e)

trainDataset = tf.keras.utils.image_dataset_from_directory(
    val.datasetDir,
    validation_split=0.2,
    subset='training',
    seed=seed,
    batch_size=batch_size,
    image_size=(val.image_size, val.image_size)
    )

validationDataset = tf.keras.utils.image_dataset_from_directory(
    val.datasetDir,
    validation_split=0.2,
    subset='validation',
    seed=seed,
    batch_size=batch_size,
    image_size=(val.image_size, val.image_size)
    )

normalisedDataset = trainDataset.map(lambda x, y: (x/255,y))
data_iterator = normalisedDataset.as_numpy_iterator()
batch = data_iterator.next()

batchToList = batch[1].tolist()
labels = []
for n in batch[1]:
    label = val.breedLabel[n]
    labels.append(label)

#fig, ax = plt.subplots(ncols=8)
#for idx, img in enumerate(batch[0][:8]):
#    ax[idx].imshow(img)
#    ax[idx].title.set_text(labels[idx])
#plt.show()

InceptionV3 = InceptionV3(
   include_top=False,
   weights='imagenet',
) 

dataAugmentation = Sequential([
   RandomFlip("horizontal_and_vertical", input_shape=(val.image_size, val.image_size, 3)),
   RandomRotation(0.2),
   RandomZoom(0.2)
])

model = Sequential([
   dataAugmentation,
   InceptionV3,

   Dense((number_of_breeds*2), activation="relu"),
   Dropout(0.4),
   Flatten(),
   Dense(number_of_breeds, activation='softmax'),
])

print(model.summary())

customOptimizer = Adam(learning_rate=0.001)
model.compile(optimizer=customOptimizer, loss=tf.losses.SparseCategoricalCrossentropy(), metrics=['accuracy'])

earlyStop = tf.keras.callbacks.EarlyStopping(
  monitor="accuracy",
  patience=10,
  mode="max",
  start_from_epoch=40
)

hist = model.fit(trainDataset, validation_data=validationDataset, epochs=epochs, callbacks=[earlyStop])
print(hist)

acc = hist.history['accuracy']
val_acc = hist.history['val_accuracy']
loss = hist.history['loss']
val_loss = hist.history['val_loss']

# In TF2.15, the .keras file will infinately stall when trying to analyse a photo.
#model.save('model/InceptionV3-2.15-28Dec-Augmented.keras')
model.save('model/InceptionV3-2.15-25Jan-123-Augmented.h5')
#model.save('model/InceptionV3-2.15-28Dec-Augmented.tf')

fig = plt.figure()
plt.plot(hist.history['accuracy'], color='red', label='accuracy')
plt.plot(hist.history['val_accuracy'], color='blue', label='val_accuracy')
plt.legend(loc="upper left")
plt.show()

fig = plt.figure()
plt.plot(hist.history['loss'], color='red', label='loss')
plt.plot(hist.history['val_loss'], color='blue', label='val_loss')
plt.legend(loc="upper left")
plt.show()