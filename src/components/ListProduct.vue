<script setup>
import { ref, onMounted } from 'vue'
import Navbar from './Navbar.vue'

const files = ref([])

function getRandomDiscount(max) {
  return Math.floor(Math.random() * max) + 1
}

// Fetch product data dari /product
const getProduct = async () => {
  try {
    const response = await fetch('http://18.141.194.211/api/product')
    const data = await response.json()

    // Setiap product dikasih property baru: discount
    files.value = data.map((item) => ({
      ...item,
      discount: getRandomDiscount(20), // maksimal 20%
    }))
  } catch (error) {
    console.error('Gagal mengambil daftar produk:', error)
  }
}

onMounted(getProduct)
</script>

<template>
  <Navbar />

  <section class="flex justify-center items-center bg-gradient-to-br from-[#C8FFC3] to-[#FFF0DF]">
    <div class="mx-auto max-w-screen-xl px-4 py-8 sm:px-6 lg:px-8">
      <div class="grid grid-cols-3 gap-6">
        <div
          class="relative block rounded-tr-3xl border border-gray-50"
          v-for="file in files"
          :key="file.id"
        >
          <span
            class="absolute -top-px -right-px rounded-tr-3xl rounded-bl-3xl bg-rose-600 px-6 py-4 font-medium tracking-widest text-white uppercase z-10"
          >
            Save {{ file.discount }}%
          </span>

          <img
            :src="file.gambar_url"
            alt="Product Image"
            class="h-80 w-full rounded-tr-3xl object-cover transition duration-300 filter hover:brightness-90 hover:contrast-90"
          />

          <div class="relative rounded-b-xl bg-gradient-to-br from-[#F2D0FA] to-[#CCE6FE] p-6">
            <span
              class="bg-gradient-to-bl from-[#A3D5FF] to-[#E1FFA3] px-3 py-1.5 text-xs font-medium whitespace-nowrap"
            >
              {{ file.kategori }}
            </span>

            <div class="mt-3 flex justify-between">
              <p class="text-gray-700">
                Rp{{ (file.harga - (file.harga * file.discount) / 100).toLocaleString('id-ID') }}
                <span> &#124; </span>
                <span class="text-gray-400 line-through"
                  >Rp{{
                    Number(file.harga).toLocaleString('id-ID', {
                      minimumFractionDigits: 0,
                      maximumFractionDigits: 0,
                    })
                  }}
                </span>
              </p>

              <p class="text-gray-900">Stock: {{ file.stok }}</p>
            </div>

            <h3 class="mt-1.5 text-lg font-medium text-gray-900">{{ file.nama }}</h3>

            <p class="mt-1.5 line-clamp-3 text-gray-700">
              {{ file.deskripsi }}
            </p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
