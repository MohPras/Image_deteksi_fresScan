# Laporan Proyek Machine Learning System Recomendation Content Base Filtering Resep Makananan Dan Image Deteksi Buah Sayur Segar Atau Busuk

----------------------------------------------------

## Project Overview
<div align="center">
<img width="1517" alt="image" src="https://github.com/user-attachments/assets/63215743-74f2-4fa0-8718-11489830304b" />
<br/>
</div>

Dalam industri makanan dan konsumsi sehari-hari, **kualitas dan kesegaran bahan baku** adalah faktor krusial. Membedakan buah dan sayur yang segar dari yang sudah busuk secara manual seringkali memakan waktu, terutama dalam volume besar, dan rentan terhadap kesalahan manusia. Hal ini tidak hanya berujung pada pemborosan makanan tetapi juga berpotensi memengaruhi kualitas hidangan yang dihasilkan. Seiring kemajuan teknologi, **deteksi citra berbasis *Machine Learning*** menawarkan solusi inovatif untuk tantangan ini. Dengan melatih model kecerdasan buatan pada dataset gambar buah dan sayur dalam berbagai kondisi (segar, matang, atau busuk), sistem dapat secara otomatis dan akurat mengidentifikasi status kesegaran. Penerapan teknologi ini dapat mengurangi limbah makanan, memastikan penggunaan bahan baku yang optimal, dan mendukung rantai pasok makanan yang lebih efisien.

Di sisi lain, dengan melimpahnya informasi dan pilihan di era digital, sistem rekomendasi telah menjadi alat yang sangat diperlukan untuk membantu pengguna menavigasi konten. Dalam konteks kuliner, kemampuan untuk merekomendasikan resep makanan yang sesuai dengan preferensi individu dapat secara signifikan memperkaya pengalaman pengguna. Pendekatan **Content-Based Filtering** sangat cocok untuk tujuan ini, karena ia menganalisis atribut spesifik dari setiap resep (misalnya, bahan-bahan, jenis masakan, metode memasak) dan mencocokkannya dengan riwayat interaksi serta preferensi yang telah ditetapkan oleh pengguna. Dengan demikian, sistem dapat menyajikan rekomendasi yang sangat personal dan relevan, membuka wawasan kuliner baru bagi pengguna.

Proyek ini bertujuan untuk mengintegrasikan kedua kapabilitas penting ini. Kami akan membangun sistem yang tidak hanya merekomendasikan resep makanan lezat melalui **Content-Based Filtering**, tetapi juga dilengkapi dengan fitur **deteksi citra untuk memverifikasi kesegaran buah dan sayur** yang akan digunakan. Integrasi ini diharapkan dapat memberikan pengalaman kuliner yang lebih cerdas dan holistik, membantu pengguna dalam memilih resep yang sesuai selera sekaligus memastikan kualitas dan kesegaran bahan baku, yang pada akhirnya berkontribusi pada pembuatan hidangan yang lebih baik dan mengurangi pemborosan.

----------------------------------------------------

## Business Understanding

### Problem Statements

Dalam industri makanan dan konsumsi rumahan, **kualitas dan kesegaran bahan baku** adalah faktor fundamental yang memengaruhi cita rasa, keamanan, dan nutrisi hidangan. Membedakan buah dan sayur yang segar dari yang sudah busuk secara manual seringkali memakan waktu dan rentan terhadap kesalahan, terutama dalam volume besar. Hal ini tidak hanya berujung pada **pemborosan makanan** yang signifikan, tetapi juga berpotensi memengaruhi **kualitas hidangan yang dihasilkan** dan kesehatan konsumen.

Di sisi lain, dengan melimpahnya resep dan informasi kuliner di era digital, pengguna seringkali kesulitan menemukan **resep yang relevan dan sesuai dengan selera** mereka. Tanpa sistem yang mampu menyaring dan merekomendasikan resep secara personal, pengalaman memasak dapat menjadi kurang optimal, dan pengguna mungkin melewatkan ide-ide hidangan menarik yang sebenarnya cocok untuk mereka.

Berdasarkan permasalahan tersebut, masalah utama yang ingin diselesaikan dalam proyek ini adalah:
1.  Bagaimana membangun sistem yang mampu **mendeteksi kesegaran buah dan sayur** secara otomatis dan akurat menggunakan teknologi *Machine Learning*?
2.  Bagaimana mengembangkan **sistem rekomendasi resep makanan** yang personal dan relevan bagi pengguna berdasarkan preferensi dan ketersediaan bahan?
3.  Bagaimana **mengintegrasikan** kedua kapabilitas ini untuk menciptakan solusi kuliner yang lebih cerdas dan efisien, dari pemilihan bahan hingga rekomendasi resep?


### Goals

Tujuan utama dari proyek ini adalah:
1.  Mengembangkan model **deteksi citra berbasis *Machine Learning*** yang mampu mengidentifikasi status kesegaran (segar atau busuk) pada berbagai jenis buah dan sayur.
2.  Membangun **sistem rekomendasi resep makanan** menggunakan pendekatan **Content-Based Filtering** yang mampu memberikan daftar resep berdasarkan bahan yang tersedia dan preferensi pengguna.
3.  Mengintegrasikan modul deteksi kesegaran bahan baku dengan sistem rekomendasi resep untuk **meningkatkan kualitas dan efisiensi** proses persiapan makanan, serta mengurangi limbah.


### Solution Statements

Untuk mencapai tujuan-tujuan tersebut, proyek ini akan mengimplementasikan dua pendekatan utama:

1.  **Image Detection untuk Deteksi Kesegaran Buah dan Sayur**
    Pendekatan ini akan memanfaatkan teknik **Deep Learning** dan **Computer Vision** untuk melatih model klasifikasi gambar. Dataset gambar buah dan sayur yang telah dilabeli (segar atau busuk) akan digunakan untuk membangun model yang mampu secara otomatis menentukan status kesegaran suatu objek. Solusi ini akan mengurangi ketergantungan pada penilaian manual yang subjektif dan tidak efisien.

2.  **Content-Based Filtering untuk Rekomendasi Resep Makanan**
    Pendekatan ini akan merekomendasikan resep berdasarkan **kemiripan fitur konten resep** itu sendiri. Fitur-fitur yang akan dipertimbangkan meliputi bahan-bahan, jenis masakan, metode memasak, dan atribut lainnya. Sistem ini akan menghitung kemiripan antara resep dan preferensi pengguna untuk menyajikan **Top-N rekomendasi** yang relevan. Misalnya, jika pengguna menyukai resep dengan bahan tertentu atau genre masakan tertentu, sistem akan menyarankan resep lain dengan karakteristik yang serupa.

Dalam proyek ini, kedua pendekatan tersebut akan **diimplementasikan secara terintegrasi**. Modul deteksi citra akan menjadi bagian awal yang membantu pengguna memastikan kualitas bahan baku mereka, yang kemudian dapat dihubungkan dengan sistem rekomendasi resep yang relevan. Integrasi ini akan memberikan pengalaman yang komprehensif, dari validasi bahan hingga inspirasi resep.

----------------------------------------------------

## Data Understanding

### Sumber Data Image Deteksi
Sumber dataset yang digunakan dalam proyek ini berasal dari kaggel dengan link sebagai berikut ( https://www.kaggle.com/datasets/swoyam2609/fresh-and-stale-classification )

#### Informasi Umum Dataset

<div align="center">
<img width="674" alt="image" src="https://github.com/user-attachments/assets/4bea8ca0-c4b3-4924-a373-ce0b88b09400" />
<br/>
<strong>Gambar 1.</strong> Jumlah data image deteksi
</div>

Dalam persiapan data untuk pelatihan model, kami berhasil mengidentifikasi **23.619 berkas gambar** yang terbagi ke dalam **18 kelas kategori** yang berbeda. Dari jumlah tersebut, **18.896 berkas gambar (sekitar 80%)** dialokasikan untuk set data pelatihan (*training set*), sementara **4.723 berkas gambar (sekitar 20%)** digunakan untuk set data validasi (*validation set*). Pembagian ini penting untuk memastikan model dapat belajar dari data yang cukup dan dievaluasi secara objektif terhadap data yang belum pernah dilihat sebelumnya.


### Sumber Data Sistem Rekomendasi
Sumber dataset yang digunakan dalam proyek ini berasal dari kaggel dengan link sebagai berikut( https://www.kaggle.com/datasets/wilmerarltstrmberg/recipe-dataset-over-2m )

#### Informasi Umum Dataset
Dari analisis awal, dataset resep makanan kami merupakan sebuah **DataFrame Pandas** yang berisi **3.010 entri resep**, terindeks dari 0 hingga 3.009. Dataset ini terdiri dari **tujuh kolom** yang semuanya memiliki **nilai non-null (tidak ada data yang hilang)**, menunjukkan kelengkapan data pada setiap fitur. Ketujuh kolom tersebut adalah:

* **`title`**: Judul atau nama resep.
* **`ingredients`**: Daftar bahan-bahan yang diperlukan untuk resep.
* **`directions`**: Langkah-langkah atau instruksi cara membuat resep.
* **`link`**: Tautan atau URL asli dari sumber resep.
* **`source`**: Sumber website atau platform tempat resep diambil.
* **`NER`**: Entitas Bernama yang Diekstraksi (Named Entity Recognition), kemungkinan berisi informasi spesifik dari bahan atau kategori resep yang sudah diproses.
* **`site`**: Nama situs web atau platform dari mana resep tersebut berasal.

Semua kolom ini memiliki tipe data **`object`**, yang mengindikasikan bahwa data di dalamnya sebagian besar adalah teks atau string. Kelengkapan dan struktur dataset ini sangat mendukung untuk pengembangan sistem rekomendasi resep berbasis konten.

----------------------------------------------------

## Modeling

### CNN Image deteksi

### Arsitektur Model Deteksi Kesegaran Buah dan Sayur

Untuk tugas deteksi kesegaran buah dan sayur, kami merancang dan mengimplementasikan model **Convolutional Neural Network (CNN)** menggunakan API Sekuensial Keras. Model ini dirancang untuk mengklasifikasikan gambar input ke dalam 18 kelas kategori yang berbeda (mengindikasikan berbagai jenis buah/sayur dan status kesegarannya).

```python
# Lab book name entry
name = "Model"

# Build model
tf.random.set_seed(42)
model = keras.Sequential([
    layers.Input(shape=(IMG_HEIGHT, IMG_WIDTH, 3)),
    layers.Rescaling(1./255),
    data_augmentation,
    layers.Conv2D(filters=8, kernel_size=(5,5),
                  padding="same", activation="relu",
                  kernel_initializer="he_normal"),
    layers.MaxPool2D(),
    layers.Conv2D(filters=16, kernel_size=(3,3),
                  padding="same", activation="relu",
                  kernel_initializer="he_normal"),
    layers.MaxPool2D(),
    layers.Conv2D(filters=32, kernel_size=(3,3),
                  padding="same", activation="relu",
                  kernel_initializer="he_normal"),
    layers.MaxPool2D(),
    layers.Flatten(),
    layers.Dense(18, activation="softmax")
    ], name=name)

model.summary()

# Compile model
model.compile(loss=keras.losses.SparseCategoricalCrossentropy(),
                optimizer=keras.optimizers.Adam(),
                metrics=["accuracy"])

# Fit model
history = model.fit(train_dataset,
                        validation_data=val_dataset,
                        epochs=100,
                        callbacks=[early_cb])

# Write lab-book
train_accuracy = model.evaluate(train_dataset)[1]
val_accuracy = model.evaluate(val_dataset)[1]
lab_book[name] = {"train_accuracy": train_accuracy, "val_accuracy": val_accuracy}
```

### Detail Arsitektur

Berikut adalah komponen utama dari arsitektur model kami:

1.  **Input Layer**:
    * `layers.Input(shape=(IMG_HEIGHT, IMG_WIDTH, 3))`: Lapisan ini mendefinisikan bentuk input untuk model, yaitu gambar dengan dimensi tinggi (`IMG_HEIGHT`), lebar (`IMG_WIDTH`), dan 3 kanal warna (RGB).

2.  **Rescaling Layer**:
    * `layers.Rescaling(1./255)`: Lapisan ini menormalisasi nilai piksel gambar dari rentang [0, 255] menjadi [0, 1]. Normalisasi ini adalah praktik standar yang membantu mempercepat konvergensi pelatihan dan meningkatkan kinerja model.

3.  **Data Augmentation Layer**:
    * `data_augmentation`: Ini adalah lapisan kustom atau pra-terdefinisi yang menerapkan teknik **augmentasi data** seperti rotasi, *zoom*, atau *flip* secara acak pada gambar input selama pelatihan. Augmentasi data sangat penting untuk meningkatkan variasi dataset, membantu model belajar fitur yang lebih robust, dan mengurangi *overfitting*.

4.  **Convolutional Block 1**:
    * `layers.Conv2D(filters=8, kernel_size=(5,5), padding="same", activation="relu", kernel_initializer="he_normal")`: Lapisan konvolusi pertama ini menggunakan **8 filter** dengan ukuran **kernel 5x5**. `padding="same"` memastikan ukuran output spasial tetap sama dengan input, sementara `activation="relu"` (Rectified Linear Unit) memperkenalkan non-linearitas. `kernel_initializer="he_normal"` adalah inisialisasi bobot yang cocok untuk fungsi aktivasi ReLU.
    * `layers.MaxPool2D()`: Setelah operasi konvolusi, lapisan *max pooling* digunakan untuk mengurangi dimensi spasial (*downsampling*) dari fitur peta (*feature maps*), sehingga mengurangi jumlah parameter dan komputasi, serta membantu model menjadi lebih *invariant* terhadap sedikit pergeseran pada input.

5.  **Convolutional Block 2**:
    * `layers.Conv2D(filters=16, kernel_size=(3,3), padding="same", activation="relu", kernel_initializer="he_normal")`: Blok kedua serupa dengan yang pertama, tetapi menggunakan **16 filter** dengan ukuran **kernel 3x3**. Peningkatan jumlah filter memungkinkan model untuk belajar fitur yang lebih kompleks.
    * `layers.MaxPool2D()`: Kembali, *max pooling* diterapkan untuk *downsampling* lebih lanjut.

6.  **Convolutional Block 3**:
    * `layers.Conv2D(filters=32, kernel_size=(3,3), padding="same", activation="relu", kernel_initializer="he_normal")`: Blok ketiga menggunakan **32 filter** dengan ukuran **kernel 3x3**, memungkinkan ekstraksi fitur yang lebih abstrak dan mendalam.
    * `layers.MaxPool2D()`: Lapisan *max pooling* terakhir sebelum masuk ke lapisan *dense*.

7.  **Flatten Layer**:
    * `layers.Flatten()`: Lapisan ini mengubah *feature maps* 3D yang dihasilkan oleh lapisan konvolusi sebelumnya menjadi vektor 1D tunggal. Ini diperlukan karena lapisan *dense* (klasifikasi) berikutnya mengharapkan input 1D.

8.  **Output Layer**:
    * `layers.Dense(18, activation="softmax")`: Ini adalah lapisan *dense* (terhubung penuh) terakhir yang bertanggung jawab untuk klasifikasi. Jumlah unitnya adalah **18**, sesuai dengan jumlah kelas buah dan sayur yang dideteksi. `activation="softmax"` digunakan karena ini adalah tugas klasifikasi multi-kelas, yang akan menghasilkan distribusi probabilitas untuk setiap kelas, di mana total probabilitasnya adalah 1.

### Kompilasi dan Pelatihan Model

Setelah arsitektur model didefinisikan, model dikompilasi dan dilatih:

* **Loss Function**: `keras.losses.SparseCategoricalCrossentropy()` digunakan sebagai fungsi *loss*. Ini cocok untuk tugas klasifikasi multi-kelas ketika label target adalah integer (bukan *one-hot encoded*).
* **Optimizer**: `keras.optimizers.Adam()` dipilih sebagai optimizer. Adam adalah optimizer adaptif yang populer dan efektif, yang menyesuaikan *learning rate* selama pelatihan.
* **Metrics**: `metrics=["accuracy"]` digunakan untuk memantau kinerja model selama pelatihan dan validasi.

Model dilatih selama **100 *epochs*** menggunakan `train_dataset` dan dievaluasi pada `val_dataset`. Callback `early_cb` (kemungkinan *EarlyStopping*) digunakan untuk menghentikan pelatihan lebih awal jika tidak ada peningkatan kinerja pada set validasi, mencegah *overfitting* dan menghemat waktu komputasi.

### Evaluasi Model

Setelah pelatihan, kinerja model dievaluasi pada set data pelatihan (*training set*) dan set data validasi (*validation set*) untuk mendapatkan akurasi akhir.

* **Akurasi Model pada data pelatihan**: **0.93 (93%)**
* **Akurasi Model pada data validasi**: **0.92 (92%)**

| ![Image 1 Alt Text](https://github.com/user-attachments/assets/87d4e69c-fafd-42f9-a435-e52db9047fd9) | ![Image 2 Alt Text](https://github.com/user-attachments/assets/5375fbe2-133d-4451-9889-2a029bd04349) |
| :-------------------------------------------------------------------------------------------------: | :-------------------------------------------------------------------------------------------------: |


Hasil ini menunjukkan bahwa model memiliki kinerja yang kuat dalam mengklasifikasikan kesegaran buah dan sayur, baik pada data yang sudah dilihat selama pelatihan maupun pada data baru yang belum pernah dilihat sebelumnya. Akurasi yang tinggi pada kedua set data mengindikasikan bahwa model tidak mengalami *overfitting* yang signifikan dan memiliki kemampuan generalisasi yang baik.

Arsitektur ini dirancang untuk secara progresif mengekstraksi fitur yang semakin kompleks dari gambar buah dan sayur, memungkinkan model untuk secara akurat mengklasifikasikan status kesegarannya.


### Sistem Rekomendasi Content Base Filtering

### Arsitektur Sistem Rekomendasi Resep (Content-Based Filtering)

Sistem rekomendasi resep makanan ini dirancang menggunakan pendekatan **Content-Based Filtering**. Prinsip utama di balik metode ini adalah merekomendasikan item (dalam hal ini, resep) yang serupa dengan item yang disukai pengguna di masa lalu atau yang saat ini menjadi perhatian mereka. Arsitektur sistem ini berfokus pada analisis fitur konten dari resep untuk menghitung kemiripan dan menghasilkan rekomendasi.

### Tahapan Arsitektur

Berikut adalah tahapan kunci dalam arsitektur sistem rekomendasi resep ini:

1.  **Pengumpulan dan Pemrosesan Data Resep:**
    * **Data Mentah:** Sistem memerlukan dataset resep yang kaya, seperti yang telah dijelaskan, yang mencakup `title`, `ingredients`, `directions`, `link`, `source`, `NER`, dan `site`.
    * **Ekstraksi Fitur Konten:** Dari data mentah, fitur-fitur tekstual kunci seperti `ingredients` (bahan-bahan) dan mungkin `NER` (Named Entity Recognition dari bahan) akan diekstraksi dan diproses. Ini bisa melibatkan langkah-langkah seperti *tokenisasi*, *stemming/lemmatization*, dan penghapusan *stop words*.
    * **Representasi Numerik (Vectorization):** Fitur tekstual ini harus diubah menjadi format numerik yang dapat dipahami oleh algoritma. Metode umum yang digunakan adalah **TF-IDF (Term Frequency-Inverse Document Frequency)** atau **Word Embeddings**. TF-IDF akan memberikan bobot pada kata-kata berdasarkan seberapa sering mereka muncul dalam suatu resep dan seberapa jarang mereka muncul di seluruh koleksi resep, menyoroti kata-kata yang lebih diskriminatif.

2.  **Pembuatan Matriks Kemiripan Konten:**
    * Setelah resep direpresentasikan dalam bentuk vektor numerik, langkah selanjutnya adalah menghitung **kemiripan antar resep**.
    * **Cosine Similarity** adalah metrik yang umum digunakan untuk tujuan ini. Metrik ini mengukur *cosine* dari sudut antara dua vektor, menghasilkan skor antara 0 dan 1, di mana skor 1 menunjukkan kemiripan sempurna dan 0 menunjukkan tidak ada kemiripan sama sekali.
    * Hasil perhitungan ini adalah **matriks kemiripan**, di mana setiap sel `(i, j)` berisi skor kemiripan antara resep `i` dan resep `j`. Matriks ini akan menjadi inti dari sistem rekomendasi.

```python
from sklearn.metrics.pairwise import cosine_similarity

# Compute the cosine similarity matrix based on the tfidf_matrix
cosine_sim = cosine_similarity(tfidf_matrix)

# Print the shape of the cosine similarity matrix to verify
print(cosine_sim.shape)
print()

cosine_sim
```

3.  **Fungsi Rekomendasi (`cbf_recipe_recommen`):**
    * Fungsi ini akan menjadi *endpoint* utama untuk menghasilkan rekomendasi.
    * **Input Pengguna:** Fungsi ini akan menerima input dari pengguna, seperti `ID` resep yang disukai, atau mungkin *keyword* dari nama resep atau genre masakan.
    * **Pencarian Resep Acuan:** Berdasarkan input, sistem akan mengidentifikasi resep acuan yang relevan dari dataset.
    * **Pengambilan Skor Kemiripan:** Menggunakan resep acuan, fungsi akan mencari baris yang sesuai dalam matriks kemiripan untuk mendapatkan skor kemiripan antara resep acuan tersebut dengan semua resep lainnya.
    * **Sorting dan Pemilihan Top-N:** Resep-resep kemudian akan diurutkan berdasarkan skor kemiripan dari yang tertinggi ke terendah.
    * **Penghapusan Resep Sendiri:** Resep acuan itu sendiri akan dikeluarkan dari daftar hasil untuk menghindari rekomendasi yang duplikat.
    * **Output Rekomendasi:** Sistem akan mengembalikan **Top-N rekomendasi** resep yang paling mirip, beserta skor kemiripannya, kepada pengguna.

```python
# Menghasilkan top_n rekomendasi resep berdasarkan kemiripan konten, beserta skor similarity
def cbf_recipe_recommendations(id_recipe, similarity_data=cosine_sim, items=cbf_data, top_n=10):
    index = items.index[items.title == id_recipe][0]  # Dapatkan indeks resep
    sim_scores = list(enumerate(similarity_data[index]))  # Skor similarity dengan semua resep
    sim_scores = sorted(sim_scores, key=lambda x: x[1], reverse=True)  # Urutkan dari paling mirip
    return sim_scores[1:top_n+1]  # Ambil top_n hasil (kecuali diri sendiri)
```

### Cara Kerja Ringkas

Ketika pengguna meminta rekomendasi (misalnya, "resep apa yang mirip dengan 'Nasi Goreng'?"), sistem akan:
1.  Menemukan representasi vektor untuk resep "Nasi Goreng".
2.  Mengakses matriks kemiripan untuk mengetahui seberapa mirip "Nasi Goreng" dengan semua resep lain.
3.  Mengurutkan resep-resep tersebut berdasarkan skor kemiripan (tertinggi ke terendah).
4.  Mengeluarkan "Nasi Goreng" dari daftar.
5.  Menyajikan Top-N resep teratas sebagai rekomendasi.

Arsitektur ini memungkinkan sistem untuk memberikan rekomendasi yang sangat relevan dan personal tanpa memerlukan data interaksi pengguna yang kompleks, cukup dengan memahami "konten" dari resep itu sendiri.

### Evaluasi 
```python
Average Precision@10: 0.769
Average Recall@10: 0.730
Coverage: 0.671
Diversity: 0.718
```
Berdasarkan hasil evaluasi sistem *Content-Based Filtering* (CBF) pada data resep, dapat disimpulkan bahwa performa sistem cukup baik dan menjanjikan:

* **Average Precision\@10 sebesar 0.769** menunjukkan bahwa mayoritas rekomendasi yang diberikan oleh sistem relevan dengan resep input, artinya sistem mampu menyajikan resep-resep yang memang memiliki kemiripan konten secara akurat.

* **Average Recall\@10 sebesar 0.730** memperlihatkan bahwa sistem berhasil menemukan sebagian besar resep yang relevan dari keseluruhan yang seharusnya bisa direkomendasikan, menandakan cakupan rekomendasinya cukup luas.

* **Coverage sebesar 0.671** menunjukkan bahwa sistem merekomendasikan beragam resep dari keseluruhan data, yang berarti sistem tidak hanya berfokus pada sebagian kecil item, melainkan menjangkau berbagai resep berbeda.

* **Diversity sebesar 0.718** mengindikasikan bahwa sistem tidak hanya merekomendasikan resep-resep yang seragam, tetapi juga memberikan variasi resep yang beragam dan tidak monoton, sehingga pengguna mendapatkan pengalaman eksplorasi yang lebih luas.

Secara keseluruhan, sistem CBF ini berhasil memberikan rekomendasi resep yang **relevan, luas cakupannya, serta cukup bervariasi**, sehingga dapat dikatakan **berhasil dan layak untuk digunakan sebagai sistem rekomendasi resep berbasis konten**. Namun, perlu perhatian pada keberagaman dan kualitas fitur konten agar rekomendasi tetap bervariasi dan akurat. Menggabungkannya dengan metode lain seperti collaborative filtering bisa menjadi solusi jangka panjang yang lebih seimbang.

----------------------------------------------------

## Setup Environment

**A. Clone Repository**

Ikuti langkah-langkah berikut untuk menjalankan proyek ini di lingkungan lokal Anda:

1. **Clone Repository**

   ```bash
   git clone <URL-repo>
   ```

2. **Buat dan Aktifkan Virtual Environment**

   * **Untuk Windows:**

     ```bash
     python -m venv venv
     venv\Scripts\activate
     ```

   * **Untuk macOS/Linux:**

     ```bash
     python3 -m venv venv
     source venv/bin/activate
     ```

3. **Install Dependencies**

   ```bash
   pip install -r requirements.txt
   ```

###### Catatan:

* Pastikan Anda sudah menginstal **Python 3.8 atau lebih tinggi**.
* Gunakan `python` atau `python3` sesuai dengan OS dan pengaturan sistem Anda.
* Jika menggunakan **Anaconda**, Anda bisa membuat environment dengan:

**C. Akses Website Dan Model**

Berikut ini adalah link frontend dari projek ini (https://mohpras.github.io/FreshDetect_page/), dalam link itu sudah bisa untuk melakukan rekomendasi baik resep atau penaganan food waste namunn karena keterbatasan akses hosting jadi untuk model deteksi buah dan sayur segar tidak dapat ter integrasi maka dari itu jika anda ingin menguji dan berinteraksi dengan model deteksi gambar kami melalui antarmuka web, ikuti langkah-langkah berikut:

1.  **Unduh Repositori:**
    Pertama, Anda perlu mengunduh seluruh kode proyek. Anda bisa melakukannya dengan mengunduh repositori GitHub ini sebagai file ZIP atau dengan melakukan *cloning* repositori menggunakan Git.

2.  **Buka di Lingkungan Pengembangan:**
    Setelah mendapatkan semua file, buka folder proyek di editor kode pilihan Anda, misalnya Visual Studio Code.

3.  **Instal Dependensi (Opsional untuk Lokal):**
    Jika Anda berencana untuk menjalankan model deteksi gambar dan sistem rekomendasi secara lokal menggunakan FastAPI, buka file `requirements.txt` dan instal semua *library* yang diperlukan menggunakan pip (`pip install -r requirements.txt`). Langkah ini tidak diperlukan jika Anda hanya ingin melihat tampilan web statis tanpa fungsi *backend* yang berjalan secara lokal.
    
```
pip install -r requirements.txt
```

5.  **Verifikasi Struktur File:**
    Pastikan Anda tidak mengubah struktur dasar file `index.html` dan `script.js`. Perubahan pada struktur dokumen ini dapat menyebabkan *error* fungsionalitas pada aplikasi web.

6.  **Jalankan Aplikasi Web:**
    Gunakan ekstensi seperti Live Server di Visual Studio Code, atau *web server* lokal lainnya yang Anda miliki, untuk menjalankan file `index.html`.

7.  **Eksplorasi Fitur:**
    Setelah aplikasi web berjalan, Anda akan otomatis diarahkan ke halaman utama "FreshDetect". Di sana, Anda bisa:
    * Mencoba fitur **deteksi gambar buah dan sayur** untuk mengetahui status kesegarannya.
    * Menjelajahi **sistem rekomendasi resep** kami.
    * Melihat rekomendasi terkait **penanganan limbah makanan (food waste)**.

----------------------------------------------------

## Kesimpulan

Proyek ini telah berhasil mengembangkan dan mengintegrasikan dua sistem berbasis *Machine Learning* yang inovatif untuk mengatasi tantangan dalam konteks kuliner dan penanganan bahan makanan: **sistem deteksi kesegaran buah dan sayur** serta **sistem rekomendasi resep makanan berbasis *Content-Based Filtering***.

Model deteksi kesegaran buah dan sayur, yang dibangun menggunakan arsitektur **Convolutional Neural Network (CNN)**, menunjukkan kinerja yang sangat baik dengan akurasi **93% pada data pelatihan** dan **92% pada data validasi**. Akurasi yang tinggi ini mengindikasikan kemampuan model untuk secara akurat mengidentifikasi status kesegaran (segar atau busuk) dari berbagai jenis buah dan sayur, sebuah capaian krusial untuk mengurangi limbah makanan dan memastikan kualitas bahan baku.

Di sisi lain, sistem rekomendasi resep telah berhasil diimplementasikan menggunakan pendekatan **Content-Based Filtering**. Dengan menganalisis fitur-fitur konten resep seperti bahan, jenis masakan, dan instruksi, sistem ini mampu merekomendasikan resep yang sangat relevan dan personal kepada pengguna. Kemampuan untuk menghasilkan **Top-N rekomendasi** berdasarkan input pengguna, seperti ID resep atau kata kunci, memperkaya pengalaman kuliner dengan menyajikan pilihan hidangan yang sesuai selera.

Integrasi kedua model ini dalam antarmuka **web yang berfungsi dengan baik** merupakan pencapaian signifikan dari proyek ini. Pengguna kini dapat dengan mudah memanfaatkan model deteksi gambar untuk memeriksa kesegaran bahan baku mereka sebelum beralih ke sistem rekomendasi untuk menemukan resep yang paling cocok. Antarmuka web yang intuitif memastikan aksesibilitas dan kemudahan penggunaan, memungkinkan pengguna untuk mendapatkan inspirasi resep sekaligus memastikan kualitas bahan yang akan digunakan.

Secara keseluruhan, proyek ini tidak hanya menunjukkan potensi besar *Machine Learning* dalam domain makanan dan kuliner, tetapi juga menyediakan solusi praktis yang dapat berkontribusi pada pengurangan limbah makanan, peningkatan kualitas hidangan, dan pengalaman memasak yang lebih cerdas dan menyenangkan bagi pengguna. Sistem ini dapat menjadi fondasi untuk pengembangan lebih lanjut di masa depan, termasuk integrasi fitur-fitur tambahan atau peningkatan skala aplikasi.
