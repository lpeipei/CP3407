<template>
  <div :class="s.wrapper">
    <div style="text-align: center;">
      <van-button :class="s.choose" @click="showPicker = true">Choose Focus Type {{['', ' : study', ' : reading', ' : diversion', ' : exercise'][selectedType]}}</van-button>
  

      <div :class="s.count">
        <Countdown :totalTime="60" />
      </div>
      
      <div :class="s.hint">
        Focus Recording <van-icon name="records" style="font-size: 24px;"/>
      </div>
    </div>
    <van-popup v-model:show="showPicker" round position="bottom">
      <van-picker
        :columns="columns"
        @cancel="showPicker = false"
        @confirm="onConfirm"
        confirm-button-text="confirm"
        cancel-button-text="cancel"
      />
    </van-popup>

    
  </div>
</template>
<script>
import { ref, toRefs, reactive, defineComponent, onMounted } from "vue";
import Countdown from '../components/countdown.vue';

export default defineComponent({
    components: {
      Countdown
    },
    setup() {
        const data = reactive({
          showPicker: false,
          showTimePicker: false,
          columns: [
            { text: 'study', value: 1 },
            { text: 'reading', value: 2 },
            { text: 'diversion', value: 3 },
            { text: 'exercise', value: 4 }
          ],
          selectedType: 0
      })
      const currentTime = ref(['12', '00']);
      const onConfirm = (val) => {
        data.selectedType = val.selectedValues[0]
        data.showPicker = false
      }
      return {
        ...toRefs(data),
        onConfirm,
        currentTime
      }
    }
})
</script>
<style scoped module='s'>
.wrapper {
    
}
.choose {
  width: 163px;
  height: 38px;
  background: #DEB7B84A;
  font-size: 13px;
  color: #787785;
  border-radius: 15px;
}

.count {
  margin-top: 32px;
}

.hint {
  font-size: 16px;
  color: #787785;
  text-align: right;
  margin-top: 88px;
}

.selectedType {
  text-align: center;
  font-size: 16px;
  margin-top: 32px;
}

</style>
