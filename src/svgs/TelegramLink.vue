<script setup lang="ts"></script>

<template>
  <div class="container">
    <!-- Disabled -->
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="17"
      height="17"
      viewBox="0 0 17 17"
      fill="none"
      class="default"
    >
      <g clip-path="url(#clip0_10_1052)">
        <path
          d="M16.9 8.5C16.9 13.1392 13.1392 16.9 8.5 16.9C3.86081 16.9 0.1 13.1392 0.1 8.5C0.1 3.86081 3.86081 0.1 8.5 0.1C13.1392 0.1 16.9 3.86081 16.9 8.5Z"
          fill="#263552"
          stroke="#D4D6E3"
          stroke-width="0.2"
        />
        <path
          fill-rule="evenodd"
          clip-rule="evenodd"
          d="M12.5912 4.65142L11.0747 12.2973C11.0747 12.2973 10.8626 12.8275 10.2794 12.5729L6.77989 9.88998L5.50734 9.27497L3.36524 8.55383C3.36524 8.55383 3.03649 8.43714 3.00472 8.1827C2.9729 7.92811 3.37585 7.79031 3.37585 7.79031L11.8913 4.44992C11.8913 4.44992 12.5911 4.14239 12.5911 4.65142H12.5912Z"
          stroke="#D4D6E3"
          stroke-width="0.2"
        />
        <path
          fill-rule="evenodd"
          clip-rule="evenodd"
          d="M6.51097 12.2114C6.51097 12.2114 6.40882 12.2018 6.28152 11.7989C6.15428 11.3959 5.50745 9.27502 5.50745 9.27502L10.6506 6.00884C10.6506 6.00884 10.9475 5.82855 10.9369 6.00884C10.9369 6.00884 10.9899 6.04061 10.8309 6.18907C10.6718 6.33753 6.79055 9.82638 6.79055 9.82638L6.51102 12.2114H6.51097Z"
          stroke="#D4D6E3"
          stroke-width="0.2"
        />
        <path
          fill-rule="evenodd"
          clip-rule="evenodd"
          d="M8.12171 10.9188L6.73752 12.1807C6.73752 12.1807 6.6293 12.2628 6.51093 12.2114L6.77597 9.86719L8.12171 10.9188Z"
          stroke="#D4D6E3"
          stroke-width="0.2"
        />
      </g>
      <defs>
        <clipPath id="clip0_10_1052">
          <rect width="17" height="17" fill="white" />
        </clipPath>
      </defs>
    </svg>

    <!-- Active -->
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="17"
      height="17"
      viewBox="0 0 17 17"
      fill="none"
      class="active"
    >
      <g clip-path="url(#clip0_10_1052)">
        <path
          d="M8.5 17C13.1944 17 17 13.1944 17 8.5C17 3.80558 13.1944 0 8.5 0C3.80558 0 0 3.80558 0 8.5C0 13.1944 3.80558 17 8.5 17Z"
          fill="url(#paint0_linear_10_1052)"
        />
        <path
          fill-rule="evenodd"
          clip-rule="evenodd"
          d="M12.5912 4.65142L11.0747 12.2973C11.0747 12.2973 10.8626 12.8275 10.2794 12.5729L6.77989 9.88998L5.50734 9.27497L3.36524 8.55383C3.36524 8.55383 3.03649 8.43714 3.00472 8.1827C2.9729 7.92811 3.37585 7.79031 3.37585 7.79031L11.8913 4.44992C11.8913 4.44992 12.5911 4.14239 12.5911 4.65142H12.5912Z"
          fill="#FEFEFE"
        />
        <path
          fill-rule="evenodd"
          clip-rule="evenodd"
          d="M6.51097 12.2114C6.51097 12.2114 6.40882 12.2018 6.28152 11.7989C6.15428 11.3959 5.50745 9.27502 5.50745 9.27502L10.6506 6.00884C10.6506 6.00884 10.9475 5.82855 10.9369 6.00884C10.9369 6.00884 10.9899 6.04061 10.8309 6.18907C10.6718 6.33753 6.79055 9.82638 6.79055 9.82638L6.51102 12.2114H6.51097Z"
          fill="#D4E6F1"
        />
        <path
          fill-rule="evenodd"
          clip-rule="evenodd"
          d="M8.12171 10.9188L6.73752 12.1807C6.73752 12.1807 6.6293 12.2628 6.51093 12.2114L6.77597 9.86719L8.12171 10.9188Z"
          fill="#B6D0E5"
        />
      </g>
      <defs>
        <linearGradient
          id="paint0_linear_10_1052"
          x1="8.28657"
          y1="15.671"
          x2="8.71343"
          y2="1.32893"
          gradientUnits="userSpaceOnUse"
        >
          <stop stop-color="#19A8DD" />
          <stop offset="0.678" stop-color="#2AB2E2" />
          <stop offset="1" stop-color="#3CBDE8" />
        </linearGradient>
        <clipPath id="clip0_10_1052">
          <rect width="17" height="17" fill="white" />
        </clipPath>
      </defs>
    </svg>
  </div>
</template>

<style lang="scss">
.container {
  position: relative;

  .active {
    position: absolute;
    left: 0;
    opacity: 0;
    transition: 0.2s;
  }
  .default {
    transition: 0.2s;
  }

  &:hover {
    .active {
      opacity: 1;
    }
    .default {
      opacity: 0;
    }
  }
}
</style>
