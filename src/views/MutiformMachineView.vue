<template>
  <div class="flex gap-4 flex-col">
    <div v-if="state.matches('step1')">
      <input
        placeholder="Name"
        @input="send({ type: 'UPDATE', data: { name: $event.target.value } })"
        class="w-full p-2 my-2 border border-gray-300 rounded-md"
      />
    </div>
    <div v-else-if="state.matches('step2')">
      <input
        @input="send({ type: 'UPDATE', data: { email: $event.target.value } })"
        placeholder="Email"
        class="w-full p-2 my-2 border border-gray-300 rounded-md"
      />
    </div>
    <div v-else-if="state.matches('step3')">
      <input
        @input="send({ type: 'UPDATE', data: { password: $event.target.value } })"
        placeholder="Password"
        type="password"
        class="w-full p-2 my-2 border border-gray-300 rounded-md"
      />
    </div>
    <div v-else-if="state.matches('submitting')">
      <p>Submitting...</p>
    </div>
    <div v-else-if="state.matches('success')">
      <p>Form submitted successfully!</p>
    </div>
    <div v-else-if="state.matches('error')">
      <p>Submission failed!</p>
      <button @click="send({ type: 'RETRY'})">Retry</button>
    </div>
  </div>

    <div class="footer flex justify-between">
      <button
        @click="send({ type: 'PREV' })"
        v-if="!state.matches('step1')"
        class="px-4 py-2 bg-teal-500 text-white shadow-sm hover:shadow-md inline-flex items-center gap-2"
      >
        Back
      </button>
      <button
        @click="send({ type: 'NEXT' })"
        v-if="!state.matches('step3') && !state.matches('submitting') && !state.matches('success') && !state.matches('error')"
        class="px-4 py-2 bg-teal-500 text-white shadow-sm hover:shadow-md inline-flex items-center gap-2"
      >
        Next
      </button>
      <button
        @click="send({ type: 'SUBMIT' })"
        :disabled="!state.can({ type: 'SUBMIT' })"
        v-if="state.matches('step3')"
        class="px-4 py-2 bg-rose-500 text-white shadow-sm hover:shadow-md inline-flex items-center gap-2 disabled:bg-gray-300"
      >
        Submit
      </button>
    </div>
</template>
<script setup>
import { useMachine } from '@xstate/vue';
import {formMachine} from '../machines/formMachine';
import { createBrowserInspector } from '@statelyai/inspect';

const { inspect } = createBrowserInspector({
  // Comment out the line below to start the inspector
  autoStart: false
});

const { snapshot: state, send } = useMachine(formMachine, {
  inspect
});
</script>