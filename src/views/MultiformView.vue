<template>
  <div class="flex gap-4 flex-col">
    <div v-if="store.step === 1">
      <input
        v-model="store.formData.name"
        placeholder="Name"
        class="w-full p-2 my-2 border border-gray-300 rounded-md"
      />
    </div>
    <div v-else-if="store.step === 2">
      <input
        v-model="store.formData.email"
        placeholder="Email"
        class="w-full p-2 my-2 border border-gray-300 rounded-md"
      />
    </div>
    <div v-else-if="store.step === 3">
      <input
        v-model="store.formData.password"
        type="password"
        placeholder="Password"
        class="w-full p-2 my-2 border border-gray-300 rounded-md"
      />
    </div>
    <div v-else>
      <p v-if="store.error">{{ store.error }}</p>
      <p v-else>Form submitted successfully!</p>
    </div>
    <div class="footer flex justify-between">
      <button
        @click="store.prev"
        v-if="store.step > 1 && store.step < 4"
        class="px-4 py-2 bg-teal-500 text-white shadow-sm hover:shadow-md inline-flex items-center gap-2"
      >
        Back
      </button>
      <button
        @click="store.next"
        v-if="store.step < 3"
        class="px-4 py-2 bg-teal-500 text-white shadow-sm hover:shadow-md inline-flex items-center gap-2"
      >
        Next
      </button>
      <button
        @click="store.submitForm"
        :disabled="store.isSubmitting"
        v-else-if="store.step === 3"
        class="px-4 py-2 bg-rose-500 text-white shadow-sm hover:shadow-md disabled:bg-gray-300 inline-flex items-center gap-2"
      >
        Submit
      </button>
    </div>
  </div>
</template>
<script setup>
import { useFormStore } from '@/stores/form'
const store = useFormStore()
</script>
