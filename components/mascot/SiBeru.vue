<template>
  <div :class="['relative inline-flex flex-col items-center justify-center select-none', sizeClasses[size]]">
    <svg
      :viewBox="viewBox"
      class="w-full h-full transition-transform duration-300 hover:scale-105"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <radialGradient id="beruFur" cx="50%" cy="40%" r="60%">
          <stop offset="0%" stop-color="#FFB319" />
          <stop offset="100%" stop-color="#E88A00" />
        </radialGradient>
        <radialGradient id="beruBelly" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stop-color="#FFF2B2" />
          <stop offset="100%" stop-color="#FED440" />
        </radialGradient>
        <linearGradient id="beruBlueTie" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stop-color="#4B82F6" />
          <stop offset="100%" stop-color="#1F52EB" />
        </linearGradient>
      </defs>

      <!-- Ears -->
      <circle cx="58" cy="62" r="22" fill="url(#beruFur)" stroke="#D47800" stroke-width="3" />
      <circle cx="58" cy="62" r="13" fill="#FFF2B2" />
      
      <circle cx="142" cy="62" r="22" fill="url(#beruFur)" stroke="#D47800" stroke-width="3" />
      <circle cx="142" cy="62" r="13" fill="#FFF2B2" />

      <!-- Party Hat (if state === 'celebrate') -->
      <g v-if="state === 'celebrate'">
        <polygon points="100,10 78,50 122,50" fill="#1F52EB" stroke="#173FC7" stroke-width="2" />
        <circle cx="100" cy="8" r="6" fill="#FED440" />
        <line x1="84" y1="36" x2="116" y2="36" stroke="#FED440" stroke-width="3" />
        <line x1="88" y1="24" x2="112" y2="24" stroke="#FFF" stroke-width="2.5" />
      </g>

      <!-- Body -->
      <ellipse cx="100" cy="142" rx="55" ry="46" fill="url(#beruFur)" stroke="#D47800" stroke-width="3" />
      
      <!-- Belly -->
      <ellipse cx="100" cy="148" rx="34" ry="30" fill="url(#beruBelly)" />

      <!-- Little Blue Consultant Bow/Tie -->
      <g transform="translate(100, 118)">
        <polygon points="-12,-6 -12,6 0,0" fill="url(#beruBlueTie)" />
        <polygon points="12,-6 12,6 0,0" fill="url(#beruBlueTie)" />
        <circle cx="0" cy="0" r="4" fill="#1F52EB" />
      </g>

      <!-- Head -->
      <circle cx="100" cy="88" r="46" fill="url(#beruFur)" stroke="#D47800" stroke-width="3" />

      <!-- Snout -->
      <ellipse cx="100" cy="98" rx="22" ry="17" fill="#FFF2B2" />
      <path d="M92 90 Q100 95 108 90 Q100 102 92 90 Z" fill="#3D2000" />
      <!-- Mouth -->
      <path
        v-if="state === 'celebrate' || state === 'greeting'"
        d="M93 102 Q100 112 107 102"
        stroke="#3D2000"
        stroke-width="2.5"
        stroke-linecap="round"
        fill="none"
      />
      <path
        v-else-if="state === 'thinking'"
        d="M94 104 Q100 101 106 104"
        stroke="#3D2000"
        stroke-width="2.5"
        stroke-linecap="round"
        fill="none"
      />
      <path
        v-else
        d="M95 103 Q100 108 105 103"
        stroke="#3D2000"
        stroke-width="2.5"
        stroke-linecap="round"
        fill="none"
      />

      <!-- Cheeks Blush -->
      <circle cx="72" cy="98" r="6" fill="#FF8383" fill-opacity="0.4" />
      <circle cx="128" cy="98" r="6" fill="#FF8383" fill-opacity="0.4" />

      <!-- Eyes -->
      <g v-if="state === 'celebrate'">
        <!-- Joyful curved eyes (happy squint) -->
        <path d="M78 78 Q84 70 90 78" stroke="#3D2000" stroke-width="3.5" stroke-linecap="round" fill="none" />
        <path d="M110 78 Q116 70 122 78" stroke="#3D2000" stroke-width="3.5" stroke-linecap="round" fill="none" />
      </g>
      <g v-else-if="state === 'thinking'">
        <!-- Thinking eyes looking up -->
        <circle cx="83" cy="74" r="5" fill="#3D2000" />
        <circle cx="84" cy="72" r="1.5" fill="#FFF" />
        <circle cx="117" cy="74" r="5" fill="#3D2000" />
        <circle cx="118" cy="72" r="1.5" fill="#FFF" />
        <!-- Puzzled eyebrow -->
        <path d="M78 66 Q84 63 89 67" stroke="#3D2000" stroke-width="2" stroke-linecap="round" fill="none" />
        <path d="M111 67 Q116 63 122 66" stroke="#3D2000" stroke-width="2" stroke-linecap="round" fill="none" />
      </g>
      <g v-else>
        <!-- Friendly big sparkle eyes -->
        <circle cx="83" cy="77" r="5.5" fill="#3D2000" />
        <circle cx="85" cy="75" r="2" fill="#FFF" />
        <circle cx="117" cy="77" r="5.5" fill="#3D2000" />
        <circle cx="119" cy="75" r="2" fill="#FFF" />
      </g>

      <!-- Hands / Arms -->
      <!-- Waving Hand for Greeting -->
      <g v-if="state === 'greeting'">
        <ellipse cx="148" cy="88" rx="12" ry="16" fill="url(#beruFur)" stroke="#D47800" stroke-width="3" transform="rotate(35 148 88)" />
        <ellipse cx="54" cy="140" rx="11" ry="14" fill="url(#beruFur)" stroke="#D47800" stroke-width="3" />
      </g>
      <!-- Cheering Hands for Celebrate -->
      <g v-else-if="state === 'celebrate'">
        <ellipse cx="46" cy="100" rx="12" ry="18" fill="url(#beruFur)" stroke="#D47800" stroke-width="3" transform="rotate(-30 46 100)" />
        <ellipse cx="154" cy="100" rx="12" ry="18" fill="url(#beruFur)" stroke="#D47800" stroke-width="3" transform="rotate(30 154 100)" />
        <!-- Mini stars -->
        <polygon points="32,60 35,68 44,69 37,74 39,82 32,77 25,82 27,74 20,69 29,68" fill="#FED440" />
        <polygon points="168,60 171,68 180,69 173,74 175,82 168,77 161,82 163,74 156,69 165,68" fill="#FED440" />
      </g>
      <!-- Thinking Hand on Chin -->
      <g v-else-if="state === 'thinking'">
        <ellipse cx="54" cy="144" rx="11" ry="14" fill="url(#beruFur)" stroke="#D47800" stroke-width="3" />
        <ellipse cx="114" cy="112" rx="10" ry="13" fill="url(#beruFur)" stroke="#D47800" stroke-width="2.5" />
      </g>
      <!-- Default Hands Resting -->
      <g v-else>
        <ellipse cx="54" cy="142" rx="11" ry="14" fill="url(#beruFur)" stroke="#D47800" stroke-width="3" />
        <ellipse cx="146" cy="142" rx="11" ry="14" fill="url(#beruFur)" stroke="#D47800" stroke-width="3" />
      </g>

      <!-- Feet -->
      <ellipse cx="78" cy="180" rx="16" ry="10" fill="url(#beruFur)" stroke="#D47800" stroke-width="3" />
      <ellipse cx="122" cy="180" rx="16" ry="10" fill="url(#beruFur)" stroke="#D47800" stroke-width="3" />
    </svg>
  </div>
</template>

<script setup lang="ts">
type BeruState = 'greeting' | 'thinking' | 'celebrate' | 'empty' | 'idle'
type BeruSize = 'sm' | 'md' | 'lg' | 'xl'

const props = withDefaults(
  defineProps<{
    state?: BeruState
    size?: BeruSize
  }>(),
  {
    state: 'greeting',
    size: 'md'
  }
)

const viewBox = '0 0 200 200'

const sizeClasses: Record<BeruSize, string> = {
  sm: 'w-24 h-24',
  md: 'w-36 h-36',
  lg: 'w-48 h-48',
  xl: 'w-64 h-64'
}
</script>
