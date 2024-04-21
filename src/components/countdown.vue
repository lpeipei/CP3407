<template>
  <div class="countdown" :style="{ width: size + 'px', height: size + 'px' }">
    <div class="progress">
      <svg class="progress-ring" :width="size" :height="size">
        <!-- Base circle -->
        <circle
          class="progress-ring-circle-base"
          :stroke="baseColor"
          :stroke-width="strokeWidth"
          :r="radius"
          :cx="center"
          :cy="center"
        />
        <!-- Progress circle -->
        <circle
          class="progress-ring-circle"
          :stroke-dasharray="circumference"
          :stroke-dashoffset="dashOffset"
          :stroke="progressColor"
          :stroke-width="strokeWidth"
          :r="radius"
          :cx="center"
          :cy="center"
        />
      </svg>
      <div class="countdown-time" @click="openModal">{{ formattedTime }}</div>
    </div>
  </div>
  <p class="hint">While you focus mode is on, all of your notifications will be off</p>

  <van-button class="startBtn" @click="startCountdown">Start Focusing</van-button>

    <van-popup v-model:show="showDurationModal"  position="bottom">
       <van-time-picker v-model="currentTime" @confirm="confirmDuration" confirm-button-text="confirm" cancel-button-text="cancel" title="Select Duration" />
    </van-popup>

</template>

<script>
export default {
  props: {
    totalTime: {
      type: Number,
      required: true
    },
    baseColor: {
      type: String,
      default: '#787785'
    },
    progressColor: {
      type: String,
      default: '#DEB7B8'
    },
    strokeWidth: {
      type: Number,
      default: 10
    },
    size: {
      type: Number,
      default: 210
    }
  },
  data() {
    return {
      radius: this.size / 2 - this.strokeWidth / 2,
      circumference: Math.PI * (this.size - this.strokeWidth),
      timeLeft: this.totalTime,
      formattedTime: this.formatTime(this.totalTime),
      center: this.size / 2,
      isCounting: false,
      showDurationModal: false,
      duration: 0
    };
  },
  computed: {
    dashOffset() {
      return this.circumference * (1 - this.timeLeft / this.totalTime);
    }
  },
  methods: {
    openModal() {
        this.showDurationModal = true;
    },
    formatTime(duration) {
        const hours = Math.floor(duration / 60);
        const minutes = duration % 60;
        return `${this.padTime(hours)}:${this.padTime(minutes)}`;
    },

    padTime(time) {
      return time < 10 ? `0${time}` : time;
    },
    startCountdown() {
        if (!this.isCounting) {
            this.isCounting = true;
            this.timeLeft = this.duration ? parseInt(this.duration[0]) * 60 + parseInt(this.duration[1]) : this.totalTime;
            this.formattedTime = this.formatTime(this.timeLeft);
            this.timer = setInterval(this.updateTime, 1000);
        }
    },

    confirmDuration(val) {
        this.duration = val.selectedValues;
        this.formattedTime = this.formatTime(parseInt(this.duration[0]) * 60 + parseInt(this.duration[1]));
        this.showDurationModal = false;
    },


    updateTime() {
      if (this.timeLeft > 0) {
        this.timeLeft--;
        this.formattedTime = this.formatTime(this.timeLeft);
      } else {
        clearInterval(this.timer);
        this.isCounting = false;
      }
    }
  }
};
</script>

<style scoped>
.countdown {
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0 auto;
  margin-top: 48px;
}

.progress {
  position: relative;
}

.progress-ring {
  transform: rotate(-90deg);
}

.progress-ring-circle-base {
  fill: transparent;
}

.progress-ring-circle {
  fill: transparent;
  stroke-linecap: round;
  transform-origin: center;
  transition: stroke-dashoffset 0.5s;
}

.countdown-time {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-size: 28px;
  color: #787785;
}

.hint {
    color: #787785;
    margin-top: 32px;
    text-align: center;
    font-size: 20px;
}

.startBtn {
    width: 214px;
    height:46px;
    background: #787785;
    color: #fff;
    border-radius: 10px;
    margin-top: 48px;
}
</style>
