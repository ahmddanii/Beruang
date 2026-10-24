<template>
  <component
    :is="to ? NuxtLink : 'button'"
    :to="to"
    :type="to ? undefined : type"
    :disabled="disabled"
    :class="[
      variant === 'green'
        ? 'btn-pill-action-green'
        : variant === 'blue'
        ? 'btn-pill-action-blue'
        : variant === 'red'
        ? 'btn-pill-action-red'
        : variant === 'red-outline'
        ? 'btn-pill-action-red-outline'
        : 'btn-pill-action',
      'group',
      disabled ? 'opacity-50 cursor-not-allowed pointer-events-none' : '',
      customClass
    ]"
    @click="$emit('click', $event)"
  >
    <!-- Label Text -->
    <span>
      <slot />
    </span>

    <!-- Icon: Hugeicons component prop or custom slot or built-in icon -->
    <slot name="icon">
      <HugeiconsIcon
        v-if="hugeIcon"
        :icon="hugeIcon"
        :size="iconSize || 16"
        :stroke-width="strokeWidth || 2.0"
        class="shrink-0 transition-transform duration-200 group-hover:translate-x-0.5"
      />
      <!-- Chevron Right (Figma Node 172:333) -->
      <svg
        v-else-if="icon === 'chevron'"
        class="w-4 h-4 shrink-0 transition-transform duration-200 group-hover:translate-x-0.5"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        :stroke-width="strokeWidth || 2.0"
        stroke-linecap="round"
        stroke-linejoin="round"
      >
        <path d="m9 18 6-6-6-6" />
      </svg>

      <!-- Plus Icon (Mockup Catat Kas) -->
      <svg
        v-else-if="icon === 'plus'"
        class="w-4 h-4 shrink-0 origin-center transition-transform duration-300 ease-out group-hover:rotate-180"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        :stroke-width="strokeWidth || 2.0"
        stroke-linecap="round"
        stroke-linejoin="round"
      >
        <path d="M12 5v14M5 12h14" />
      </svg>

      <!-- Download / Arrow Down to Line (Figma Node 172:347) -->
      <svg
        v-else-if="icon === 'download'"
        class="w-4 h-4 shrink-0 transition-transform duration-200 group-hover:translate-y-0.5"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        :stroke-width="strokeWidth || 2.0"
        stroke-linecap="round"
        stroke-linejoin="round"
      >
        <path d="M12 3v13" />
        <path d="m19 11-7 7-7-7" />
        <path d="M5 21h14" />
      </svg>
    </slot>
  </component>
</template>

<script setup lang="ts">
import { resolveComponent } from 'vue'
import { HugeiconsIcon } from '@hugeicons/vue'

const NuxtLink = resolveComponent('NuxtLink')

withDefaults(
  defineProps<{
    variant?: 'default' | 'green' | 'blue' | 'red' | 'red-outline'
    icon?: 'chevron' | 'download' | 'plus' | 'check' | 'none'
    hugeIcon?: any
    iconSize?: number
    strokeWidth?: number
    type?: 'button' | 'submit' | 'reset'
    to?: string
    disabled?: boolean
    customClass?: string
  }>(),
  {
    variant: 'default',
    icon: 'chevron',
    type: 'button',
    disabled: false,
    customClass: ''
  }
)

defineEmits<{
  (e: 'click', event: MouseEvent): void
}>()
</script>
