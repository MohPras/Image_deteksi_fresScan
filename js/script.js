// Deklarasi variabel global untuk data agar bisa diakses oleh berbagai fungsi
// Ini dideklarasikan di luar DOMContentLoaded agar bisa diakses secara global jika diperlukan oleh fungsi lain
let recipesData = [];
let similarityMatrix = {};
let foodWasteData = [];

// Fungsi-fungsi navigasi utama (jika ini didefinisikan di luar DOMContentLoaded, biarkan seperti ini)
// Jika tidak, pindahkan juga ke dalam DOMContentLoaded
document.getElementById('nav-chat').addEventListener('click', showChatSection);
document.getElementById('nav-recipes').addEventListener('click', showRecipesSection);
document.getElementById('nav-foodwaste').addEventListener('click', showFoodWasteSection);

function showChatSection() {
    hideAllSections();
    document.getElementById('chat-section').classList.remove('hidden');
    updateActiveNav('nav-chat');
}

function showRecipesSection() {
    hideAllSections();
    document.getElementById('recipes-section').classList.remove('hidden');
    updateActiveNav('nav-recipes');
    if (recipesData.length === 0) {
        loadRecipeData();
    } else {
        showRecipes(recipesData, 6);
    }
}

function showFoodWasteSection() {
    hideAllSections();
    document.getElementById('foodwaste-section').classList.remove('hidden');
    updateActiveNav('nav-foodwaste');
    if (foodWasteData.length === 0) {
        loadFoodWasteData();
    } else {
        displayRandomFoodWasteSolutions();
    }
}

function hideAllSections() {
    document.getElementById('chat-section').classList.add('hidden');
    document.getElementById('recipes-section').classList.add('hidden');
    document.getElementById('recipe-detail-section').classList.add('hidden');
    document.getElementById('foodwaste-section').classList.add('hidden');
    document.getElementById('foodwaste-detail-section').classList.add('hidden');
}

function updateActiveNav(navId) {
    document.querySelectorAll('nav a').forEach(nav => {
        nav.classList.remove('bg-green-50', 'border-l-4', 'border-green-600');
        nav.classList.add('hover:bg-green-50', 'hover:text-green-800');
    });

    const activeNav = document.getElementById(navId);
    if (activeNav) { // Tambah pengecekan null
        activeNav.classList.remove('hover:bg-green-50', 'hover:text-green-800');
        activeNav.classList.add('bg-green-50', 'border-l-4', 'border-green-600');
    }
}

// --- Seluruh logika aplikasi berada dalam satu blok DOMContentLoaded ---
document.addEventListener("DOMContentLoaded", () => {
    // Inisialisasi elemen untuk bagian resep
    const recipesSection = document.getElementById("recipes-section");
    const recipeDetailSection = document.getElementById("recipe-detail-section");
    const recipeDetailContent = document.getElementById("recipe-detail-content");
    const backToRecipesButton = document.getElementById("back-to-recipes");
    const recipeContainer = document.getElementById("recipe-cards-container");
    const recipeSearchInput = document.getElementById("recipe-search");

    // Inisialisasi elemen untuk bagian food waste
    const foodWasteSection = document.getElementById("foodwaste-section");
    const foodWasteDetailSection = document.getElementById("foodwaste-detail-section");
    const foodWasteDetailContent = document.getElementById("foodwaste-detail-content");
    const backToFoodWasteButton = document.getElementById("back-to-foodwaste");
    const foodWasteCardsContainer = document.getElementById("foodwaste-cards-container");
    const foodWasteSearchInput = document.getElementById("foodwaste-search");

    // Inisialisasi elemen untuk bagian chat/quality detection (sesuai HTML baru)
    const imageInput = document.getElementById('imageInput');
    const predictButton = document.getElementById('predictButton');
    const fileNameDisplay = document.getElementById('fileNameDisplay');
    const chatContainer = document.getElementById('chatContainer');

    // Sidebar toggle (dari kode Anda sebelumnya)
    const toggleSidebar = document.getElementById('toggleSidebar');
    if (toggleSidebar) { // Pastikan elemen ada
        toggleSidebar.addEventListener('click', function() {
            const sidebar = document.getElementById('sidebar');
            const mainContent = document.getElementById('main-content');

            if (sidebar && mainContent) { // Pastikan elemen ada
                if (sidebar.classList.contains('sidebar-expanded')) {
                    sidebar.classList.remove('sidebar-expanded');
                    sidebar.classList.add('sidebar-collapsed');
                    mainContent.classList.remove('ml-80');
                    mainContent.classList.add('ml-20');
                } else {
                    sidebar.classList.remove('sidebar-collapsed');
                    sidebar.classList.add('sidebar-expanded');
                    mainContent.classList.remove('ml-20');
                    mainContent.classList.add('ml-80');
                }
            }
        });
    }

    // -------------------------------------------------- FUNGSI-FUNGSI UTAMA UNTUK RECIPE --------------------------------------------------

    // Fungsi untuk memuat data resep
    async function loadRecipeData() {
        try {
            const [data, similarity] = await Promise.all([
                fetch("js/data.json").then((res) => res.json()),
                fetch("js/top_cosine_similarity.json").then((res) => res.json()),
            ]);
            recipesData = data;
            similarityMatrix = similarity;
            showRecipes(recipesData, 6); // Tampilkan resep setelah dimuat
        } catch (err) {
            console.error("Gagal memuat resep atau kesamaan:", err);
            if (recipeContainer) { // Cek keberadaan elemen
                recipeContainer.innerHTML = `<p class="text-red-500">Gagal memuat resep. Silakan coba lagi.</p>`;
            }
        }
    }

    // Fungsi untuk menampilkan kartu resep
    function showRecipes(recipes, maxToShow = 12) {
        if (!recipeContainer) return; // Keluar jika elemen tidak ada
        recipeContainer.innerHTML = "";

        if (recipes.length === 0) {
            recipeContainer.innerHTML = `<p class="text-green-700 col-span-full">Tidak ada resep yang ditemukan.</p>`;
            return;
        }

        const displayedRecipes = maxToShow >= recipes.length ? recipes : recipes.slice(0, maxToShow);

        displayedRecipes.forEach((recipe) => {
            const item = document.createElement("div");
            item.className =
                "p-4 border border-green-400 rounded-lg hover:bg-green-50 transition cursor-pointer";

            item.innerHTML = `
                <div class="flex justify-between items-start">
                    <div>
                        <h3 class="font-semibold text-green-900 text-lg">${recipe.title}</h3>
                        <p class="text-green-700 mt-1 text-sm">${truncateText(
                            parseFirstDirection(recipe),
                            90
                        )}</p>
                        <div class="flex gap-2 mt-2 text-xs">
                            <span class="bg-green-200 text-green-900 px-2 py-1 rounded-full">${parseNER(
                                recipe
                            ).length} bahan</span>
                            <span class="bg-green-200 text-green-900 px-2 py-1 rounded-full">${estimateTime(
                                recipe
                            )}</span>
                        </div>
                    </div>
                    <a href="#" class="text-green-700 hover:text-green-900 text-sm recipe-detail-btn" data-id="${
                        recipe.id
                    }">Lihat →</a>
                </div>
            `;

            item.addEventListener("click", (e) => {
                if (!e.target.classList.contains("recipe-detail-btn")) {
                    showRecipeDetail(recipe);
                }
            });

            item.querySelector(".recipe-detail-btn").addEventListener("click", (e) => {
                e.preventDefault();
                showRecipeDetail(recipe);
            });

            recipeContainer.appendChild(item);
        });
    }

    // Fungsi pembantu untuk mem-parsing data resep
    function parseIngredients(recipe) {
        try {
            return JSON.parse(recipe.ingredients);
        } catch {
            return [];
        }
    }

    function parseDirections(recipe) {
        try {
            return JSON.parse(recipe.directions);
        } catch {
            return [];
        }
    }

    function parseNER(recipe) {
        try {
            return JSON.parse(recipe.NER);
        } catch {
            return [];
        }
    }

    function parseFirstDirection(recipe) {
        const directions = parseDirections(recipe);
        return directions.length > 0 ? directions[0] : "";
    }

    function estimateTime(recipe) {
        const directions = parseDirections(recipe);
        const steps = directions.length;
        return `${steps * 5} menit`;
    }

    function showSimilarRecipes(recipeId, maxSimilar = 10) {
        const simScores = similarityMatrix[recipeId];
        if (!simScores) return "<p>Tidak ada resep serupa yang ditemukan.</p>";

        const sortedScores = Object.entries(simScores)
            .filter(([id]) => parseInt(id) !== recipeId)
            .sort((a, b) => b[1] - a[1])
            .slice(0, maxSimilar);

        const similarRecipes = sortedScores
            .map(([id]) => recipesData.find((r) => r.id === parseInt(id)))
            .filter(Boolean);

        return `
            <h3 class="text-lg font-semibold mb-2 text-green-600 mt-6">Resep Serupa</h3>
            <div class="flex overflow-x-auto gap-4 pb-2">
            ${similarRecipes
                .map(
                (r) => `
                <div class="min-w-[200px] p-3 border border-green-300 rounded hover:bg-green-50 cursor-pointer flex-shrink-0" data-id="${r.id}">
                <h4 class="text-green-800 font-semibold">${r.title}</h4>
                <p class="text-green-700 text-sm">${truncateText(parseFirstDirection(r), 70)}</p>
                </div>
            `
                )
                .join("")}
            </div>
        `;
    }

    if (recipeDetailContent) { // Cek keberadaan elemen
        recipeDetailContent.addEventListener("click", (e) => {
            const card = e.target.closest("div[data-id]");
            if (card) {
                const id = parseInt(card.dataset.id);
                const recipe = recipesData.find((r) => r.id === id);
                if (recipe) showRecipeDetail(recipe);
            }
        });
    }


    function showRecipeDetail(recipe) {
        const ingredients = parseIngredients(recipe);
        const directions = parseDirections(recipe);
        const ner = parseNER(recipe);

        if (recipesSection && recipeDetailSection && recipeDetailContent) { // Cek keberadaan elemen
            recipesSection.classList.add("hidden");
            recipeDetailSection.classList.remove("hidden");

            recipeDetailContent.innerHTML = `
                <h2 class="text-2xl font-bold mb-4 text-green-700">${recipe.title}</h2>
                <h3 class="text-lg font-semibold mb-2 text-green-600">Bahan-bahan:</h3>
                <ul class="list-disc ml-6 mb-4">
                ${ingredients.map((ing) => `<li>${ing}</li>`).join("")}
                </ul>
                <h3 class="text-lg font-semibold mb-2 text-green-600">Instruksi:</h3>
                <ol class="list-decimal ml-6 mb-4">
                ${directions.map((step) => `<li>${step}</li>`).join("")}
                </ol>
                <h3 class="text-lg font-semibold mb-2 text-green-600">Entitas Teridentifikasi:</h3>
                <div class="flex flex-wrap gap-2 mb-6">
                ${ner
                    .map(
                    (item) =>
                        `<span class="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">${item}</span>`
                    )
                    .join("")}
                </div>

                ${showSimilarRecipes(recipe.id, 10)}
            `;
        }
    }

    if (backToRecipesButton) { // Cek keberadaan elemen
        backToRecipesButton.addEventListener("click", () => {
            if (recipeDetailSection && recipesSection) { // Cek keberadaan elemen
                recipeDetailSection.classList.add("hidden");
                recipesSection.classList.remove("hidden");
            }
        });
    }

    if (recipeSearchInput) { // Cek keberadaan elemen
        recipeSearchInput.addEventListener("input", () => {
            const query = recipeSearchInput.value.trim().toLowerCase();

            if (query === "") {
                showRecipes(recipesData, 6);
            } else {
                const filtered = recipesData.filter((r) =>
                    r.combined_features.toLowerCase().includes(query)
                );
                showRecipes(filtered, filtered.length);
            }
        });
    }

    // -------------------------------------------------- FUNGSI-FUNGSI UTAMA UNTUK FOOD WASTE --------------------------------------------------

    // Fungsi untuk memuat data food waste (placeholder)
    async function loadFoodWasteData() {
        foodWasteData = [
            // Fresh produce solutions
            {
                id: 1, fruit_name: "Apel", status: "segar",
                title: "Penyimpanan Apel Segar yang Optimal",
                short_desc: "Jaga apel tetap renyah dan segar lebih lama.",
                details: [
                    "Simpan apel di laci lemari es yang terpisah dari buah dan sayuran lain (terutama yang memproduksi gas etilen tinggi seperti pisang).",
                    "Jika memungkinkan, simpan dalam kantong plastik berlubang atau bungkus dengan handuk kertas untuk menjaga kelembaban.",
                    "Periksa secara berkala dan buang apel yang mulai membusuk untuk mencegah penyebaran."
                ],
                benefits: ["Memperpanjang masa simpan apel.", "Mengurangi pemborosan makanan.", "Menjaga kualitas rasa dan tekstur."],
                tips: "Apel yang dingin lebih lambat matang. Jangan mencuci apel sebelum disimpan."
            },
            {
                id: 2, fruit_name: "Pisang", status: "segar",
                title: "Tips Penyimpanan Pisang Segar",
                short_desc: "Pertahankan kesegaran pisang dan cegah cepat matang.",
                details: [
                    "Simpan pisang di suhu ruangan, jauh dari sinar matahari langsung.",
                    "Pisahkan pisang dari buah lain dan bungkus batang pisang dengan plastik wrap untuk memperlambat proses pematangan.",
                    "Setelah matang, simpan di lemari es (kulit akan menghitam, tetapi isi tetap segar lebih lama)."
                ],
                benefits: ["Mengontrol kecepatan pematangan.", "Mencegah pisang cepat busuk.", "Memastikan pisang siap saat dibutuhkan."],
                tips: "Jika Anda ingin pisang cepat matang, simpan bersama buah yang memproduksi etilen tinggi seperti apel atau tomat dalam kantong kertas."
            },
            {
                id: 3, fruit_name: "Pare", status: "segar",
                title: "Menjaga Kesegaran Pare",
                short_desc: "Cara terbaik menyimpan pare agar tahan lebih lama.",
                details: [
                    "Simpan pare dalam kantong kertas atau plastik berlubang di dalam laci kulkas.",
                    "Jangan mencuci pare sebelum disimpan karena kelembaban bisa mempercepat pembusukan.",
                    "Gunakan dalam waktu seminggu untuk rasa dan tekstur terbaik."
                ],
                benefits: ["Mempertahankan kerenyahan pare.", "Menjaga nutrisi.", "Mengurangi kemungkinan busuk prematur."],
                tips: "Pare paling baik digunakan segar. Jika ingin disimpan lebih lama, Anda bisa membekukannya setelah dipotong."
            },
            {
                id: 4, fruit_name: "Paprika", status: "segar",
                title: "Penyimpanan Paprika Segar",
                short_desc: "Tips menjaga paprika tetap renyah.",
                details: [
                    "Simpan paprika utuh dan belum dicuci dalam laci kulkas yang kering.",
                    "Gunakan kantong plastik berlubang atau wadah kedap udara untuk mencegah kehilangan kelembaban.",
                    "Paprika yang sudah dipotong harus disimpan dalam wadah kedap udara di lemari es dan dikonsumsi dalam beberapa hari."
                ],
                benefits: ["Menjaga tekstur renyah.", "Mempertahankan vitamin.", "Mengurangi pemborosan."],
                tips: "Paprika merah, kuning, dan oranye umumnya memiliki masa simpan lebih singkat dibanding paprika hijau."
            },
            {
                id: 5, fruit_name: "Mentimun", status: "segar",
                title: "Menyimpan Mentimun Agar Tetap Segar",
                short_desc: "Trik untuk menjaga mentimun tetap padat.",
                details: [
                    "Bungkus mentimun erat-erat dengan plastik wrap atau simpan dalam wadah kedap udara.",
                    "Simpan di bagian terdingin kulkas (tapi tidak membeku) untuk masa simpan terlama.",
                    "Jauhkan dari buah yang memproduksi etilen seperti tomat dan pisang."
                ],
                benefits: ["Menjaga kekenyalan dan kesegaran.", "Mencegah layu.", "Memperpanjang masa pakai."],
                tips: "Jangan menyimpan mentimun di suhu ruangan terlalu lama, karena mereka akan cepat melunak."
            },
            {
                id: 6, fruit_name: "Okra", status: "segar",
                title: "Cara Menyimpan Okra Segar",
                short_desc: "Tips sederhana untuk menjaga okra tetap segar.",
                details: [
                    "Simpan okra yang belum dicuci dalam kantong kertas atau plastik longgar di laci kulkas.",
                    "Hindari kelembaban berlebih yang dapat menyebabkan okra berlendir.",
                    "Gunakan dalam 2-3 hari setelah pembelian."
                ],
                benefits: ["Mempertahankan tekstur.", "Mencegah pembusukan.", "Menjaga kualitas rasa."],
                tips: "Okra sangat sensitif terhadap dingin. Jangan simpan di suhu di bawah 7°C (45°F)."
            },
            {
                id: 7, fruit_name: "Jeruk", status: "segar",
                title: "Penyimpanan Jeruk Segar",
                short_desc: "Jaga jeruk tetap juicy dan lezat.",
                details: [
                    "Simpan jeruk di suhu ruangan jika akan dikonsumsi dalam beberapa hari.",
                    "Untuk penyimpanan lebih lama, simpan di lemari es dalam kantong jaring atau laci kulkas yang berventilasi baik.",
                    "Pastikan ada sirkulasi udara yang baik untuk mencegah jamur."
                ],
                benefits: ["Mempertahankan jus dan rasa.", "Mencegah kekeringan.", "Memperpanjang kesegaran."],
                tips: "Jangan menyimpan jeruk dalam kantong plastik tertutup rapat karena dapat memerangkap kelembaban dan menyebabkan jamur."
            },
            {
                id: 8, fruit_name: "Kentang", status: "segar",
                title: "Penyimpanan Kentang Segar yang Benar",
                short_desc: "Jaga kentang agar tidak bertunas atau berubah hijau.",
                details: [
                    "Simpan kentang di tempat yang sejuk, gelap, dan kering (sekitar 7-10°C atau 45-50°F).",
                    "Jauhkan dari sinar matahari langsung dan lampu terang untuk mencegah kehijauan.",
                    "Jangan menyimpan kentang di lemari es karena pati akan berubah menjadi gula lebih cepat."
                ],
                benefits: ["Mencegah tunas dan perubahan warna.", "Mempertahankan tekstur dan rasa.", "Memperpanjang masa simpan."],
                tips: "Hindari menyimpan kentang dekat bawang, karena gas yang dikeluarkan bawang dapat mempercepat tunas kentang."
            },
            {
                id: 9, fruit_name: "Tomat", status: "segar",
                title: "Menyimpan Tomat Segar",
                short_desc: "Tips untuk menjaga tomat tetap beraroma.",
                details: [
                    "Simpan tomat matang di meja pada suhu ruangan agar rasanya tetap optimal.",
                    "Jika tomat terlalu matang dan Anda ingin memperlambat pembusukan, simpan di lemari es (kulit mungkin sedikit melunak).",
                    "Jangan menyimpan tomat di lemari es jika belum matang karena dapat menghambat proses pematangan dan merusak rasa."
                ],
                benefits: ["Mempertahankan aroma alami tomat.", "Mengontrol proses pematangan.", "Mengurangi pemborosan."],
                tips: "Simpan tomat terpisah dari buah dan sayuran lain karena tomat menghasilkan gas etilen."
            },
            // Rotten produce solutions
            {
                id: 10, fruit_name: "Apel", status: "busuk",
                title: "Penanganan Apel Busuk: Kompos atau Buang",
                short_desc: "Ubah apel busuk menjadi kompos atau buang dengan benar.",
                details: [
                    "Jika apel hanya sedikit busuk atau memiliki bintik kecil, potong bagian yang busuk dan gunakan sisanya untuk membuat saus apel atau pure.",
                    "Jika apel benar-benar busuk (berjamur, lembek), buang ke tempat sampah organik atau kompos (jika sistem kompos Anda mampu menangani bahan busuk)."
                ],
                benefits: ["Mengurangi limbah TPA.", "Memperkaya tanah dengan nutrisi (jika dikompos).", "Mencegah bau tak sedap."],
                tips: "Apel yang busuk parah harus dibuang untuk mencegah penyebaran bakteri atau jamur ke makanan lain."
            },
            {
                id: 11, fruit_name: "Pisang", status: "busuk",
                title: "Memanfaatkan Pisang Busuk",
                short_desc: "Jangan buang pisang terlalu matang, manfaatkan untuk resep lezat!",
                details: [
                    "Pisang yang kulitnya sudah sangat menghitam adalah pilihan sempurna untuk **roti pisang, muffin pisang, atau smoothie**.",
                    "Anda bisa mengupasnya, menghancurkannya, dan membekukannya dalam porsi kecil untuk penggunaan nanti.",
                    "Untuk pupuk alami: masukkan ke dalam kompos atau kubur di sekitar tanaman (potong kecil-kecil)."
                ],
                benefits: ["Mengurangi limbah makanan.", "Menambah rasa manis alami pada resep.", "Sumber nutrisi untuk tanaman (kompos)."],
                tips: "Semakin busuk pisang, semakin busuk dan mudah dihancurkan, sempurna untuk *baking*."
            },
            {
                id: 12, fruit_name: "Pare", status: "busuk",
                title: "Penanganan Pare Busuk",
                short_desc: "Solusi untuk pare yang sudah tidak layak konsumsi.",
                details: [
                    "Jika pare hanya memiliki bintik kecil atau sedikit lunak, potong bagian yang busuk dan gunakan sisanya untuk dimasak segera.",
                    "Jika pare sudah berlendir, berjamur, atau baunya tidak sedap, sebaiknya buang ke tempat sampah organik atau kompos (pastikan sistem kompos Anda mampu mengolahnya)."
                ],
                benefits: ["Mencegah kontaminasi makanan lain.", "Mendukung praktik pengelolaan limbah yang bertanggung jawab."],
                tips: "Pastikan untuk membuang pare yang sangat busuk segera untuk menghindari menarik hama atau bau yang tidak sedap."
            },
            {
                id: 13, fruit_name: "Paprika", status: "busuk",
                title: "Memanfaatkan Paprika Busuk",
                short_desc: "Solusi untuk paprika yang mulai layu atau lembek.",
                details: [
                    "Paprika yang sedikit layu masih bisa digunakan untuk **sup, semur, atau saus** di mana tekstur tidak begitu penting.",
                    "Jika ada bagian yang berjamur, potong dan buang bagian tersebut secara menyeluruh. Hanya gunakan bagian yang masih sehat dan masak segera.",
                    "Paprika yang sudah sangat busuk atau berjamur luas harus dibuang ke tempat sampah organik atau kompos."
                ],
                benefits: ["Mengurangi pemborosan makanan.", "Menambahkan rasa pada masakan.", "Daur ulang nutrisi (jika dikompos)."],
                tips: "Potong paprika yang mulai layu menjadi potongan-potongan dan bekukan untuk digunakan nanti dalam masakan."
            },
            {
                id: 14, fruit_name: "Mentimun", status: "busuk",
                title: "Penanganan Mentimun Busuk",
                short_desc: "Mengelola mentimun yang sudah layu atau berlendir.",
                details: [
                    "Mentimun yang sangat layu tapi belum berlendir atau berjamur bisa dihidrasi kembali dengan merendamnya di air es selama 30 menit.",
                    "Jika mentimun sudah berlendir, berjamur, atau baunya asam, sebaiknya buang ke tempat sampah organik.",
                    "Mentimun yang tidak terlalu busuk bisa ditambahkan ke tumpukan kompos untuk nutrisi tanah."
                ],
                benefits: ["Mengurangi limbah.", "Mencegah penyebaran bakteri.", "Mendaur ulang nutrisi."],
                tips: "Mentimun yang sudah terlalu layu mungkin tidak enak untuk dimakan mentah, tapi masih bisa ditambahkan ke sup atau jus."
            },
            {
                id: 15, fruit_name: "Okra", status: "busuk",
                title: "Penanganan Okra Busuk",
                short_desc: "Solusi untuk okra yang berlendir atau berjamur.",
                details: [
                    "Okra yang sudah berlendir atau berjamur harus dibuang segera ke tempat sampah organik.",
                    "Hindari mencoba memotong bagian yang busuk karena jamur bisa menyebar ke seluruh bagian."
                ],
                benefits: ["Menjaga kebersihan dapur.", "Mencegah pertumbuhan bakteri.", "Mengurangi risiko kesehatan."],
                tips: "Okra sangat cepat busuk; sebaiknya masak atau bekukan dalam 2-3 hari setelah pembelian."
            },
            {
                id: 16, fruit_name: "Jeruk", status: "busuk",
                title: "Penanganan Jeruk Busuk",
                short_desc: "Cara mengelola jeruk yang sudah berjamur atau mengering.",
                details: [
                    "Jeruk yang hanya memiliki bintik jamur kecil dapat dipotong bagian yang berjamur dan sisa buahnya bisa digunakan untuk membuat zest (parutan kulit jeruk) atau jus (jika bagian dalam masih baik).",
                    "Jika jeruk sudah berjamur luas, lembek, atau mengering, sebaiknya buang ke tempat sampah.",
                    "Kulit jeruk yang tidak berjamur bisa dikomposkan atau digunakan untuk membuat pembersih alami."
                ],
                benefits: ["Mengurangi limbah makanan.", "Memanfaatkan bagian yang masih baik.", "Daur ulang bahan organik."],
                tips: "Jamur pada buah jeruk bisa menyebar dengan cepat, jadi segera tangani jeruk yang mulai busuk."
            },
            {
                id: 17, fruit_name: "Kentang", status: "busuk",
                title: "Penanganan Kentang Busuk",
                short_desc: "Solusi untuk kentang yang bertunas, hijau, atau lembek.",
                details: [
                    "Kentang yang bertunas atau memiliki bintik hijau kecil bisa dipotong bagian tersebut sebelum dimasak.",
                    "Jika kentang sudah sangat lembek, berbau tidak sedap, atau memiliki jamur besar, buang ke tempat sampah organik.",
                    "Kentang busuk yang parah dapat menarik hama dan menyebarkan bau tidak sedap."
                ],
                benefits: ["Mencegah potensi racun (solanin pada kentang hijau).", "Menjaga kebersihan dapur.", "Mendukung pengelolaan limbah yang baik."],
                tips: "Jangan pernah mengonsumsi kentang yang sudah hijau atau bertunas banyak, terutama jika pahit, karena mengandung solanin yang beracun."
            },
            {
                id: 18, fruit_name: "Tomat", status: "busuk",
                title: "Penanganan Tomat Busuk",
                short_desc: "Memanfaatkan atau membuang tomat yang sudah terlalu matang atau berjamur.",
                details: [
                    "Tomat yang sangat lembek namun belum berjamur bisa dihaluskan untuk saus tomat, sup, atau pasta.",
                    "Jika tomat berjamur atau baunya asam, buang ke tempat sampah organik.",
                    "Bagian tomat yang busuk harus dibuang agar tidak mencemari kompos jika ada jamur yang berbahaya."
                ],
                benefits: ["Mengurangi limbah.", "Memanfaatkan sisa bahan untuk masakan.", "Mendaur ulang nutrisi."],
                tips: "Saus tomat atau pasta yang dibuat dari tomat yang terlalu matang seringkali memiliki rasa yang lebih kaya."
            }
        ];
        // displayRandomFoodWasteSolutions(); // Tidak perlu panggil di sini, akan dipanggil oleh showFoodWasteSection
    }

    // Fungsi untuk menampilkan kartu solusi food waste
    function showFoodWasteSolutions(solutions, maxToShow = 12) {
        if (!foodWasteCardsContainer) return; // Keluar jika elemen tidak ada
        foodWasteCardsContainer.innerHTML = "";

        if (solutions.length === 0) {
            foodWasteCardsContainer.innerHTML = `<p class="text-green-700 col-span-full">Tidak ada solusi limbah makanan yang ditemukan.</p>`;
            return;
        }

        const displayedSolutions = maxToShow >= solutions.length ? solutions : solutions.slice(0, maxToShow);

        displayedSolutions.forEach((solution) => {
            const item = document.createElement("div");
            item.className =
                "p-4 border border-green-400 rounded-lg hover:bg-green-50 transition cursor-pointer";

            item.innerHTML = `
                <div class="flex justify-between items-start">
                    <div>
                        <h3 class="font-semibold text-green-900 text-lg">${solution.title}</h3>
                        <p class="text-green-700 mt-1 text-sm">${truncateText(
                            solution.short_desc,
                            90
                        )}</p>
                        <div class="flex gap-2 mt-2 text-xs">
                            <span class="bg-green-200 text-green-900 px-2 py-1 rounded-full">${solution.status.charAt(0).toUpperCase() + solution.status.slice(1)}</span>
                            <span class="bg-green-200 text-green-900 px-2 py-1 rounded-full">${solution.fruit_name}</span>
                        </div>
                    </div>
                    <a href="#" class="text-green-700 hover:text-green-900 text-sm foodwaste-detail-btn" data-id="${
                        solution.id
                    }">Lihat →</a>
                </div>
            `;

            item.addEventListener("click", (e) => {
                if (!e.target.classList.contains("foodwaste-detail-btn")) {
                    showFoodWasteDetail(solution);
                }
            });

            item.querySelector(".foodwaste-detail-btn").addEventListener("click", (e) => {
                e.preventDefault();
                showFoodWasteDetail(solution);
            });

            foodWasteCardsContainer.appendChild(item);
        });
    }

    // Fungsi untuk menampilkan detail solusi food waste
    function showFoodWasteDetail(solution) {
        if (foodWasteSection && foodWasteDetailSection && foodWasteDetailContent) { // Cek keberadaan elemen
            foodWasteSection.classList.add("hidden");
            foodWasteDetailSection.classList.remove("hidden");

            foodWasteDetailContent.innerHTML = `
                <h2 class="text-2xl font-bold mb-4 text-green-700">${solution.title}</h2>
                <p class="text-green-600 mb-4">${solution.short_desc}</p>

                <h3 class="text-lg font-semibold mb-2 text-green-600">Cara Melakukannya:</h3>
                <ul class="list-disc ml-6 mb-4">
                    ${solution.details.map((detail) => `<li>${detail}</li>`).join("")}
                </ul>

                <h3 class="text-lg font-semibold mb-2 text-green-600">Manfaat:</h3>
                <ul class="list-disc ml-6 mb-4">
                    ${solution.benefits.map((benefit) => `<li>${benefit}</li>`).join("")}
                </ul>

                ${solution.tips ? `<h3 class="text-lg font-semibold mb-2 text-green-600">Tips:</h3><p class="mb-4">${solution.tips}</p>` : ''}
            `;
        }
    }

    if (backToFoodWasteButton) { // Cek keberadaan elemen
        backToFoodWasteButton.addEventListener("click", () => {
            if (foodWasteDetailSection && foodWasteSection) { // Cek keberadaan elemen
                foodWasteDetailSection.classList.add("hidden");
                foodWasteSection.classList.remove("hidden");
            }
        });
    }

    if (foodWasteSearchInput) { // Cek keberadaan elemen
        foodWasteSearchInput.addEventListener("input", () => {
            const query = foodWasteSearchInput.value.trim().toLowerCase();

            if (query === "") {
                displayRandomFoodWasteSolutions();
            } else {
                const filtered = foodWasteData.filter(
                    (solution) =>
                        solution.title.toLowerCase().includes(query) ||
                        solution.fruit_name.toLowerCase().includes(query) ||
                        solution.status.toLowerCase().includes(query) ||
                        solution.short_desc.toLowerCase().includes(query)
                );
                showFoodWasteSolutions(filtered, filtered.length);
            }
        });
    }

    // Fungsi untuk menampilkan solusi food waste secara acak
    function displayRandomFoodWasteSolutions(count = 6) {
        if (!foodWasteCardsContainer) return; // Keluar jika elemen tidak ada
        if (foodWasteData.length > 0) {
            const shuffled = [...foodWasteData].sort(() => 0.5 - Math.random());
            const randomSolutions = shuffled.slice(0, count);
            showFoodWasteSolutions(randomSolutions, count);
        } else {
            foodWasteCardsContainer.innerHTML = `<p class="text-green-700 col-span-full">Memuat solusi limbah makanan...</p>`;
            // Tidak perlu memanggil loadFoodWasteData() di sini lagi
            // karena sudah dipanggil di DOMContentLoaded atau showFoodWasteSection.
            // Biarkan saja pesan loading dan tunggu data dimuat.
        }
    }

    function truncateText(text, maxLength) {
        return text.length > maxLength ? text.slice(0, maxLength) + "..." : text;
    }

    // -------------------------------------------------- Chat Response Logic (QUALITY DETECTION) --------------------------------------------------
    // Event listener untuk menampilkan nama file saat dipilih
    if (imageInput && fileNameDisplay) { // Pastikan elemen ada
        imageInput.addEventListener('change', function() {
            if (this.files && this.files[0]) {
                fileNameDisplay.textContent = this.files[0].name;
            } else {
                fileNameDisplay.textContent = 'No file chosen';
            }
        });
    }

    // Event listener untuk tombol Prediksi
    if (predictButton) { // Pastikan elemen ada
        predictButton.addEventListener('click', uploadImage);
    }

    async function uploadImage() {
        const file = imageInput.files[0];
        if (!file) {
            alert("Please select an image first!");
            return;
        }

        // Tampilkan gambar yang diunggah oleh pengguna
        const reader = new FileReader();
        reader.onload = function (e) {
            const imgBubble = `
                <div class="flex justify-end mb-4">
                    <div class="max-w-xs bg-green-100 p-2 rounded-lg shadow">
                        <img src="${e.target.result}" class="w-full rounded" />
                    </div>
                </div>
            `;
            if (chatContainer) {
                chatContainer.innerHTML += imgBubble;
                chatContainer.scrollTop = chatContainer.scrollHeight;
            }
        };
        reader.readAsDataURL(file);

        // Kirim gambar ke backend
        const formData = new FormData();
        formData.append("file", file);

        try {
            const response = await fetch("http://3.27.244.203:5000/predict", {
                method: "POST",
                body: formData
            });

            const result = await response.json();
            console.log("Response JSON:", result);

            const isFresh = result.message.toLowerCase().includes("fresh");
            const confidenceValue = parseFloat(result.confidence);

            let borderColor = "";
            let confidenceColor = "";

            if (confidenceValue <= 50) {
                borderColor = "border-l-4 border-yellow-500";
                confidenceColor = "text-yellow-600";
            } else {
                borderColor = isFresh ? "border-l-4 border-green-500" : "border-l-4 border-red-500";
                confidenceColor = isFresh ? "text-green-600" : "text-red-600";
            }

            const predictionBubble = `
                <div class="flex justify-start mb-4">
                    <div class="max-w-xs bg-white p-3 rounded-lg shadow-md flex-col ${borderColor}">
                        <p class="font-bold text-lg mb-1">${result.title}</p>
                        <p class="${confidenceColor} font-semibold mb-2">${result.confidence}% Confidence</p>
                        <p class="mb-2">${result.message}</p>
                        <ul class="list-disc list-inside text-sm text-gray-700">
                            ${result.details.map(item => `<li>${item}</li>`).join('')}
                        </ul>
                    </div>
                </div>
            `;
            if (chatContainer) {
                chatContainer.innerHTML += predictionBubble;
                chatContainer.scrollTop = chatContainer.scrollHeight;
            }

        } catch (err) {
            console.error("Terjadi error:", err);
            const errorBubble = `
                <div class="flex justify-start mb-4">
                    <div class="max-w-xs bg-red-100 p-3 rounded-lg shadow-md border-l-4 border-red-500">
                        <p class="font-bold text-red-700">Error!</p>
                        <p class="text-red-600">Terjadi kesalahan saat memproses gambar. Mohon coba lagi. (${err.message})</p>
                    </div>
                </div>
            `;
            if (chatContainer) {
                chatContainer.innerHTML += errorBubble;
                chatContainer.scrollTop = chatContainer.scrollHeight;
            }
        }
    }


    // Quick suggestion buttons (jika masih ada di HTML, walaupun tidak relevan lagi tanpa input chat teks)
    // Sebaiknya dihapus jika tidak digunakan
    // document.querySelectorAll('.suggestion-btn').forEach(btn => {
    //     btn.addEventListener('click', function() {
    //         // document.getElementById('chat-input').value = this.textContent.trim();
    //     });
    // });

    // --- Panggilan fungsi untuk memuat data awal saat DOMContentLoaded ---
    loadRecipeData(); // Muat data resep
    loadFoodWasteData(); // Muat data food waste

    // Inisialisasi dengan bagian chat terlihat (Ini akan mengatur halaman default)
    // Pastikan #chat-section tidak memiliki kelas 'hidden' di awal HTML jika ini yang ingin ditampilkan pertama
    showChatSection();
});
