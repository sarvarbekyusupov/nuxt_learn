<template>
  <div class="page">
    <!-- Animated background blobs -->
    <div class="blob blob-1" />
    <div class="blob blob-2" />
    <div class="blob blob-3" />

    <!-- Dot grid overlay -->
    <div class="grid-bg" />

    <!-- Language switcher -->
    <div class="lang-switcher">
      <CommonLanguageSwitcher />
    </div>

    <!-- Card -->
    <div class="card animate-up">
      <slot />
    </div>
  </div>
</template>

<style scoped>
.page {
  min-height: 100vh;
  height: 100%;
  width: 100%;
  background: #f1f5f9;
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: var(--font-family-base);
  padding: 1.5rem;
  box-sizing: border-box;
  position: relative;
  overflow: hidden;
}

/* Blobs */
.blob {
  position: absolute;
  width: 480px;
  height: 480px;
  border-radius: 50%;
  filter: blur(80px);
  opacity: 0.45;
  mix-blend-mode: multiply;
  animation: blob 8s ease-in-out infinite;
}

.blob-1 {
  background: #bfdbfe; /* blue-200 */
  top: -80px;
  left: -80px;
  animation-delay: 0s;
}

.blob-2 {
  background: #ddd6fe; /* violet-200 */
  top: -80px;
  right: -80px;
  animation-delay: 2.5s;
}

.blob-3 {
  background: #c7d2fe; /* indigo-200 */
  bottom: -100px;
  left: 10%;
  animation-delay: 5s;
}

@keyframes blob {
  0%   { transform: translate(0, 0) scale(1); }
  33%  { transform: translate(30px, -40px) scale(1.08); }
  66%  { transform: translate(-20px, 20px) scale(0.93); }
  100% { transform: translate(0, 0) scale(1); }
}

/* Dot grid */
.grid-bg {
  position: absolute;
  inset: 0;
  background-image: radial-gradient(circle, #94a3b8 1px, transparent 1px);
  background-size: 28px 28px;
  opacity: 0.18;
  pointer-events: none;
}

/* Vignette over grid */
.page::after {
  content: '';
  position: absolute;
  inset: 0;
  background: radial-gradient(ellipse at center, transparent 35%, #f1f5f9 90%);
  pointer-events: none;
}

/* Language switcher */
.lang-switcher {
  position: absolute;
  top: 1.25rem;
  right: 1.25rem;
  z-index: 20;
}

/* Card */
.card {
  position: relative;
  z-index: 10;
  width: 100%;
  max-width: 400px;
  background: rgba(255, 255, 255, 0.85);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.7);
  border-radius: 24px;
  padding: 2.5rem 2.25rem;
  box-shadow:
    0 0 0 1px rgba(148, 163, 184, 0.1),
    0 4px 6px rgba(0, 0, 0, 0.02),
    0 12px 40px rgba(0, 0, 0, 0.07);
}
</style>