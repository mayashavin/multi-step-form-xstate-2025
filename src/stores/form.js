import { ref, reactive } from 'vue'
import { defineStore } from 'pinia'
import { fakeApiCall } from '@/apis/fakeApiCall'

export const useFormStore = defineStore('form', () => {
  const formData = reactive({ name: '', email: '', password: '' })
  const step = ref(1)
  const isSubmitting = ref(false)
  const error = ref(null)

  const next = () => {
    if (step.value < 3) {
      step.value++
    }
  }

  const prev = () => {
    if (step.value > 1) {
      step.value--
    }
  }

  const submitForm = async () => {
    isSubmitting.value = true

    try {
      await fakeApiCall(formData)
    } catch (e) {
      console.error(e)
      error.value = 'Submission failed!'
    } finally {
      step.value = 4
      isSubmitting.value = false
    }
  }

  return {
    step,
    formData,
    isSubmitting,
    error,
    next,
    prev,
    submitForm,
  }
})
