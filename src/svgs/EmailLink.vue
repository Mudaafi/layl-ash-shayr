<script setup lang="ts"></script>

<template>
  <div class="container">
    <!-- Uploaded to: SVG Repo, www.svgrepo.com, Generator: SVG Repo Mixer Tools -->
    <svg
      version="1.1"
      id="Layer_1"
      xmlns="http://www.w3.org/2000/svg"
      xmlns:xlink="http://www.w3.org/1999/xlink"
      viewBox="0 0 451.277 451.277"
      xml:space="preserve"
    >
      <circle style="fill: #334d5c" cx="225.638" cy="225.638" r="225.638" />
      <path
        style="opacity: 0.1; enable-background: new"
        d="M450.975,237.605l-96.054-96.054H96.355v168.173l141.25,141.25
	C352.705,444.96,444.96,352.704,450.975,237.605z"
      />
      <rect x="96.353" y="141.553" style="fill: #f6c358" width="258.56" height="168.172" />
      <polygon style="fill: #fcd462" points="225.638,210.645 354.921,309.725 96.355,309.725 " />
      <polygon style="fill: #dc8744" points="225.638,249.791 96.355,141.552 354.921,141.552 " />
      <polygon style="fill: #fcd462" points="225.638,240.631 96.355,141.552 354.921,141.552 " />
    </svg>
  </div>
</template>

<style lang="scss">
.container {
  position: relative;

  .active {
    position: absolute;
    left: 0;
    opacity: 1;
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
      opacity: 1;
    }
  }
}
</style>
