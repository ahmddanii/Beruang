<template>
  <div
    :class="[
      fixed ? 'fixed' : 'absolute',
      'pointer-events-none bottom-0 left-0 right-0 w-full overflow-hidden select-none z-0 transform-gpu leading-none'
    ]"
    aria-hidden="true"
    role="presentation"
  >
    <!-- 
      SYMMETRICAL, BALANCED SKY-BLUE CUMULUS CLOUD HORIZON
      - Palette: Brand accent blue palette transitioning into pure luminous white at the crests
        ("makin naik makin putih atau saturasi").
      - Geometry: Strictly balanced & level left-to-right (rata kiri-kanan).
        Left edge and right edge enter and exit at identical heights with centered cradle peaks.
      - Full-bleed edge-to-edge fit via preserveAspectRatio="none" on balanced vector curves.
    -->
    <svg
      viewBox="0 0 1440 500"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      preserveAspectRatio="none"
      class="block w-full h-[46vh] sm:h-[50vh] md:h-[54vh] lg:h-[56vh] min-h-[320px] max-h-[580px] transform-gpu transition-opacity duration-300"
    >
      <defs>
        <!-- ================================================================= -->
        <!-- LIGHT MODE GRADIENTS (Vibrant Soft Sky-Blue to Pure White Peaks)  -->
        <!-- ================================================================= -->
        
        <!-- Layer 1 (Back, Highest Tier): White Crest -> Luminous Sky Blue -->
        <linearGradient id="cloudBlueBackLight" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stop-color="#FFFFFF" stop-opacity="1" />
          <stop offset="16%" stop-color="#F2F7FE" stop-opacity="0.98" />
          <stop offset="42%" stop-color="#D7E7FD" stop-opacity="0.96" />
          <stop offset="75%" stop-color="#B8D7FC" stop-opacity="0.98" />
          <stop offset="100%" stop-color="#93C5FD" stop-opacity="1" />
        </linearGradient>

        <!-- Layer 2 (Mid Tier): White Crest -> Clean Pastel Brand Blue -->
        <linearGradient id="cloudBlueMidLight" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stop-color="#FFFFFF" stop-opacity="1" />
          <stop offset="22%" stop-color="#F5F9FE" stop-opacity="0.98" />
          <stop offset="55%" stop-color="#DFECFD" stop-opacity="0.98" />
          <stop offset="82%" stop-color="#C5DDFC" stop-opacity="0.98" />
          <stop offset="100%" stop-color="#A8CEFC" stop-opacity="1" />
        </linearGradient>

        <!-- Layer 3 (Foreground Tier): White Crown -> Soft Cloud Base -->
        <linearGradient id="cloudBlueFrontLight" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stop-color="#FFFFFF" stop-opacity="1" />
          <stop offset="30%" stop-color="#F8FAFE" stop-opacity="0.98" />
          <stop offset="65%" stop-color="#E7F1FE" stop-opacity="0.98" />
          <stop offset="100%" stop-color="#CCE3FD" stop-opacity="1" />
        </linearGradient>

        <!-- ================================================================= -->
        <!-- DARK MODE GRADIENTS (Moonlit Celestial Indigo / Twilight Sky)     -->
        <!-- ================================================================= -->
        <linearGradient id="cloudBlueBackDark" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stop-color="#4A70B5" stop-opacity="0.9" />
          <stop offset="35%" stop-color="#283E6B" stop-opacity="0.95" />
          <stop offset="75%" stop-color="#182544" stop-opacity="0.98" />
          <stop offset="100%" stop-color="#0E162B" stop-opacity="1" />
        </linearGradient>

        <linearGradient id="cloudBlueMidDark" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stop-color="#3D5E9B" stop-opacity="0.92" />
          <stop offset="40%" stop-color="#203358" stop-opacity="0.96" />
          <stop offset="80%" stop-color="#131F37" stop-opacity="0.98" />
          <stop offset="100%" stop-color="#0B1120" stop-opacity="1" />
        </linearGradient>

        <linearGradient id="cloudBlueFrontDark" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stop-color="#334F85" stop-opacity="0.94" />
          <stop offset="50%" stop-color="#1A2846" stop-opacity="0.98" />
          <stop offset="100%" stop-color="#090E1A" stop-opacity="1" />
        </linearGradient>
      </defs>

      <!-- =================================================================== -->
      <!-- LAYER 1: Deepest / Highest Tier (Symmetrical Crown Horizon)         -->
      <!-- Left Edge Y=220, Right Edge Y=220                                   -->
      <!-- =================================================================== -->
      <path
        d="M 0,500 
           L 0,220 
           C 70,145 170,135 250,175 
           C 330,115 450,95 540,145 
           C 600,75 680,65 720,65 
           C 760,65 840,75 900,145 
           C 990,95 1110,115 1190,175 
           C 1270,135 1370,145 1440,220 
           L 1440,500 Z"
        class="fill-[url(#cloudBlueBackLight)] dark:fill-[url(#cloudBlueBackDark)]"
      />

      <!-- =================================================================== -->
      <!-- LAYER 2: Middle Tier (Symmetrical Interlocking Billows)             -->
      <!-- Left Edge Y=290, Right Edge Y=290                                   -->
      <!-- =================================================================== -->
      <path
        d="M 0,500 
           L 0,290 
           C 80,225 190,215 280,245 
           C 370,175 500,165 600,205 
           C 670,145 770,145 840,205 
           C 940,165 1070,175 1160,245 
           C 1250,215 1360,225 1440,290 
           L 1440,500 Z"
        class="fill-[url(#cloudBlueMidLight)] dark:fill-[url(#cloudBlueMidDark)]"
      />

      <!-- =================================================================== -->
      <!-- LAYER 3: Foreground Tier (Symmetrical Soft Grounding Pillows)       -->
      <!-- Left Edge Y=360, Right Edge Y=360                                   -->
      <!-- =================================================================== -->
      <path
        d="M 0,500 
           L 0,360 
           C 110,305 240,295 360,325 
           C 470,255 620,245 720,245 
           C 820,245 970,255 1080,325 
           C 1200,295 1330,305 1440,360 
           L 1440,500 Z"
        class="fill-[url(#cloudBlueFrontLight)] dark:fill-[url(#cloudBlueFrontDark)]"
      />
    </svg>
  </div>
</template>

<script setup lang="ts">
withDefaults(
  defineProps<{
    fixed?: boolean
  }>(),
  {
    fixed: false
  }
)
</script>
