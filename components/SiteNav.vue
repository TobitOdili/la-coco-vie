<template>
  <div>
    <!-- Top navigation bar -->
    <div class="!fixed z-20 top-0 w-full">
      <div class="container flex justify-between mt-2 md:mt-6">
        <!-- Left: About -->
        <div>
          <div class="menu-item" @click="$emit('toggle-about')">
            <!-- Was `hidden md:block`: on a phone that left an invisible click target and no
                 way into About at all. The reference shows this label at mobile widths too,
                 and it fits (ABOUT + the 136px centre logo + COLLECTION inside 390px). -->
            <span>{{ SITE.nav.aboutLabel }}</span>
          </div>
        </div>
        <!-- Right: Collection link -->
        <div>
          <a
            :href="SITE.nav.collectionUrl"
            rel="noopener noreferrer"
            target="_blank"
            class="menu-item"
          >
            <span>{{ SITE.nav.collectionLabel }}</span>
            <svg
              class="h-[12px] w-[12px] lg:h-[14px] lg:w-[14px]"
              viewBox="0 0 16 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M10.6688 6.27614L4.93109 12.0139L3.98828 11.0711L9.72601 5.33333H4.66883V4H12.0021V11.3333H10.6688V6.27614Z"
              />
            </svg>
          </a>
        </div>
      </div>
    </div>

    <!-- Center logo -->
    <div class="!fixed z-20 top-3 w-full pointer-events-none">
      <div class="container flex justify-center mt-2 md:mt-6">
        <div class="text-center pointer-events-auto" @click="$emit('go-home')">
          <!-- BRAND WORDMARK (vector art). This is the one brand element NOT driven by
               site.config — replace this <svg> on re-skin. The subtitle below + all other
               nav/credit text come from site.config.js. -->
          <div class="logo w-[136px] lg:w-[204px] h-[26px] lg:h-[37.5px]">
            <svg
              width="100%"
              height="100%"
              viewBox="0 0 204 40"
              fill="black"
              xmlns="http://www.w3.org/2000/svg"
              :style="{ fill: accentColor }"
            >
              <g clip-path="url(#clip0_2286_815)">
                <path d="M19.2462 26.8109L11.9211 17.5107C11.8855 17.5467 11.8527 17.5799 11.8171 17.5799V31.5467H8V8.10547H8.76343C12.3726 12.7389 15.9845 17.3005 19.6293 21.9312C21.3996 19.4748 28.6536 10.5619 30.4595 8.10547H31.1545V31.5467H27.3347C27.3347 26.5287 27.3702 22.4927 27.3702 17.4388C27.3347 17.4028 27.2663 17.3696 27.2307 17.3696L19.974 26.8109H19.2462Z" />
                <path d="M38.2734 31.5458V8.38672H42.2657V31.5485H38.2734V31.5458Z" />
                <path d="M89.8657 27.1251H79.8344L78.0285 31.5455H74.1758L84.6257 8.06836H85.3536L95.6968 31.5455H91.7045L89.8657 27.1251ZM80.9782 24.2814H88.7548L84.9376 15.1583H84.7981L80.9782 24.2814Z" />
                <path d="M107.137 31.5463V8H107.9C110.262 10.3873 120.569 21.195 122.966 23.5795H123.106V8.38728H127.03V31.8285H126.335C123.661 28.8797 113.838 19.0539 111.2 16.0719H111.096V31.5463H107.137Z" />
                <path d="M166.653 31.8611C165.055 27.9663 158.184 12.3148 156.586 8.41992H160.786C161.238 9.61218 164.362 17.4739 166.929 23.8943H167.102C168.281 20.8072 172.03 11.366 173.176 8.41992H177.272L167.416 31.8611H166.653Z" />
                <path d="M190.17 27.1251H180.139L178.333 31.5455H174.48L184.93 8.06836H185.658L196.001 31.5455H192.009L190.17 27.1251ZM181.286 24.2814H189.062L185.245 15.1583H185.106L181.286 24.2814Z" />
                <path d="M131.426 20.034C131.426 13.3314 136.701 8.03125 143.575 8.03125C150.621 8.03125 155.62 13.3286 155.62 20.034C155.62 26.8058 150.621 32.0008 143.539 32.0008C135.973 32.0008 131.426 26.8058 131.426 20.034ZM135.454 20.034C135.454 24.9469 138.578 28.7007 143.575 28.7007C148.503 28.7007 151.663 24.8058 151.663 20.034C151.663 15.2954 148.435 11.4365 143.575 11.4365C138.751 11.4365 135.454 15.2263 135.454 20.034Z" />
                <path d="M71.8792 28.3535H66.4778V8.38672H62.4883V31.5458H71.2088L71.8792 30.3591V28.3535Z" />
                <path d="M58.7726 28.3535H53.3712V8.38672H49.3789V31.5458H58.1022L58.7726 30.3591V28.3535Z" />
              </g>
              <defs>
                <clipPath id="clip0_2286_815">
                  <rect width="188" height="24" transform="translate(8 8)" />
                </clipPath>
              </defs>
            </svg>
          </div>
          <div
            v-if="isHome"
            class="text-accent uppercase text-[11px] lg:text-sm tracking-wider mt-1 lg:mt-2"
          >
            {{ SITE.subtitle }}
          </div>
        </div>
      </div>
    </div>

    <!-- Bottom bar -->
    <div class="!fixed z-20 bottom-0 w-full pointer-events-none">
      <div class="container flex justify-between pb-2 md:pb-6">
        <!-- Copyright / Sarakuz -->
        <a
          :href="SITE.credit.url"
          rel="noopener noreferrer"
          target="_blank"
          class="pointer-events-auto"
        >
          <div class="flex items-center menu-item">
            <div class="text-[8px]">
              <span class="opacity-40">{{ SITE.credit.prefix }}</span>{{ SITE.credit.name }}
            </div>
          </div>
        </a>

        <!-- Sound toggle -->
        <div class="menu-item pointer-events-auto" @click="$emit('toggle-sound')">
          <span>{{ soundOn ? 'On' : 'Off' }}</span>
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            :style="{ fill: 'var(--accent)' }"
          >
            <path
              v-if="soundOn"
              d="M10 7.22006L6.60282 9.99957H3V13.9996H6.60282L10 16.7791V7.22006ZM5.88889 15.9996H2C1.44772 15.9996 1 15.5519 1 14.9996V8.99958C1 8.44729 1.44772 7.99958 2 7.99958H5.88889L11.1834 3.66772C11.3971 3.49286 11.7121 3.52436 11.887 3.73808C11.9601 3.82741 12 3.93928 12 4.0547V19.9445C12 20.2206 11.7761 20.4445 11.5 20.4445C11.3846 20.4445 11.2727 20.4046 11.1834 20.3315L5.88889 15.9996ZM15.5 8.76041C16.9478 9.94291 17.9 11.8611 17.9 13.9996C17.9 16.1381 16.9478 18.0563 15.5 19.2388L14.1823 17.6983C15.2806 16.8209 16 15.4898 16 13.9996C16 12.5094 15.2806 11.1783 14.1823 10.3009L15.5 8.76041ZM19.002 5.3645C21.4418 7.39706 23 10.5222 23 13.9996C23 17.477 21.4418 20.6022 19.002 22.6348L17.6664 21.1089C19.7473 19.4295 21.1 16.8717 21.1 13.9996C21.1 11.1275 19.7473 8.56979 17.6664 6.89037L19.002 5.3645Z"
            />
            <path
              v-else
              d="M10 7.22006L6.60282 9.99957H3V13.9996H6.60282L10 16.7791V7.22006ZM5.88889 15.9996H2C1.44772 15.9996 1 15.5519 1 14.9996V8.99958C1 8.44729 1.44772 7.99958 2 7.99958H5.88889L11.1834 3.66772C11.3971 3.49286 11.7121 3.52436 11.887 3.73808C11.9601 3.82741 12 3.93928 12 4.0547V19.9445C12 20.2206 11.7761 20.4445 11.5 20.4445C11.3846 20.4445 11.2727 20.4046 11.1834 20.3315L5.88889 15.9996ZM20.4142 11.9996L23.9497 15.5351L22.5355 16.9494L19 13.4138L15.4645 16.9494L14.0503 15.5351L17.5858 11.9996L14.0503 8.46404L15.4645 7.04983L19 10.5854L22.5355 7.04983L23.9497 8.46404L20.4142 11.9996Z"
            />
          </svg>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { SITE } from '~/site.config'

defineProps({
  isHome: {
    type: Boolean,
    default: true,
  },
  accentColor: {
    type: String,
    default: '#b32c05',
  },
  soundOn: {
    type: Boolean,
    default: false,
  },
})

defineEmits(['toggle-about', 'go-home', 'toggle-sound'])
</script>

<style scoped>
.container {
  margin-left: auto;
  margin-right: auto;
  max-width: none;
  position: relative;
  width: 91.666667%;
  z-index: 1;
}
</style>
