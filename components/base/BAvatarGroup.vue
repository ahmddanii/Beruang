<template>
  <div class="inline-flex items-center -space-x-2 select-none">
    <div
      v-for="(user, idx) in visibleUsers"
      :key="user.id || idx"
      class="relative group"
      :title="user.name"
    >
      <!-- Avatar bubble -->
      <div
        :class="[
          'rounded-full overflow-hidden border-2 border-white dark:border-neutral-900 bg-neutral-200 dark:bg-neutral-800 flex items-center justify-center font-heading font-semibold text-neutral-700 dark:text-neutral-200 shadow-xs transition-transform duration-150 group-hover:scale-110 group-hover:z-10',
          sizeClasses[size]
        ]"
      >
        <img
          v-if="user.avatar"
          :src="user.avatar"
          :alt="user.name"
          class="w-full h-full object-cover"
        />
        <span v-else>{{ getInitials(user.name) }}</span>
      </div>

      <!-- Status dot indicator (for consultant client health) -->
      <span
        v-if="user.status"
        :class="[
          'absolute bottom-0 right-0 rounded-full border-2 border-white dark:border-neutral-900',
          dotSizeClasses[size],
          statusColors[user.status]
        ]"
      />
    </div>

    <!-- Remaining count pill -->
    <div
      v-if="remainingCount > 0"
      :class="[
        'rounded-full border-2 border-white dark:border-neutral-900 bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-300 font-heading font-bold flex items-center justify-center shadow-xs',
        sizeClasses[size]
      ]"
    >
      +{{ remainingCount }}
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

export interface AvatarUser {
  id?: string | number
  name: string
  avatar?: string
  status?: 'healthy' | 'warning' | 'danger' | 'neutral'
}

type AvatarSize = 'sm' | 'md' | 'lg'

const props = withDefaults(
  defineProps<{
    users: AvatarUser[]
    max?: number
    size?: AvatarSize
  }>(),
  {
    max: 4,
    size: 'md'
  }
)

const visibleUsers = computed(() => props.users.slice(0, props.max))
const remainingCount = computed(() => Math.max(0, props.users.length - props.max))

const sizeClasses: Record<AvatarSize, string> = {
  sm: 'w-7 h-7 text-[10px]',
  md: 'w-9 h-9 text-xs',
  lg: 'w-11 h-11 text-sm'
}

const dotSizeClasses: Record<AvatarSize, string> = {
  sm: 'w-2 h-2',
  md: 'w-2.5 h-2.5',
  lg: 'w-3 h-3'
}

const statusColors: Record<string, string> = {
  healthy: 'bg-emerald-500',
  warning: 'bg-amber-500',
  danger: 'bg-red-500',
  neutral: 'bg-neutral-400'
}

function getInitials(name: string) {
  if (!name) return '?'
  const parts = name.trim().split(' ')
  if (parts.length >= 2) return `${parts[0][0]}${parts[1][0]}`.toUpperCase()
  return name.slice(0, 2).toUpperCase()
}
</script>
