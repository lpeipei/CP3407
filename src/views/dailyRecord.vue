<template>
  <div :class="s.wrapper">
      <div :class="s.header">
        <div :class="s.avatar"></div>
        <div :class="s.headerDetail">
            <p>{{currentyYear}}</p>
            <p>{{currentMonth}}</p>
        </div>
      </div>

    <div :class="s.weekCalendar">
        <div :class="s.weekCalendarDates">
            <div v-for="(date, index) in dates" :class="{[s.weekDate]:true, [s.active]: date === today}">
                <div :class="{[s.day]:true, [s.active]: date === today}">{{ getDayOfWeek(date) }} </div>
                <div :class="s.date">{{ dayjs(date).format('D') }}</div>
            </div>
        </div>
    </div>

    <div>
        <Timeline :records="timelineRecords" />
    </div>
    <van-button :class="s.addButton" icon="plus" @click="showActionSheet"></van-button>

     <van-popup
      v-model:show="show"
      round position="bottom"
    >
        <div :class="s.popupContainer">
            <van-field v-model="text" placeholder="Title..." :class="s.textField"/>

            <van-cell-group :class="s.textField">
                <van-field
                    v-model="startTime"
                    readonly
                    clickable
                    placeholder="Select start time"
                    @click="showStartTime"
                    />

                
                <van-field
                    v-model="endTime"
                    readonly
                    clickable
                    placeholder="Select end time"
                    @click="showEndTimePicker = true"
                    />
            </van-cell-group>

            <p :class="s.hint">Continue</p>
           
           <van-cell-group :class="s.textField">
                <van-field
                    readonly
                    clickable
                    placeholder="From"
                    />

                
                <van-field
                    readonly
                    clickable
                    placeholder="Number of Days"
                    >
                    <template #right-icon>
                        <van-icon name="notes" class="search-icon" />
                    </template>
                </van-field>
            </van-cell-group>

            <div style="text-align: center;margin-top: 32px;">
                <van-button color="#787785" icon="guide-o" :class="s.subBtn"/>
            </div>
            
        </div>
    </van-popup>
   
    
  </div>
</template>
<script>
import { ref, toRefs, reactive, defineComponent, onMounted, computed } from "vue";
import Timeline from '../components/timeline.vue';
import dayjs from 'dayjs';
import 'dayjs/locale/en'; // 引入英文语言包
dayjs.locale('en'); // 设置 dayjs 使用英文语言

export default defineComponent({
    components: {
        Timeline
    },
    setup() {
        const data = reactive({
            timelineRecords: [
                { time: '09:00', description: 'Breakfast' },
                { time: '10:30', description: 'Meeting with client' },
                { time: '12:00', description: 'Lunch' },
                { time: '14:00', description: 'Work on project' },
                { time: '18:00', description: 'Exercise' },
                { time: '20:00', description: 'Dinner' },
                { time: '22:00', description: 'Read a book' }
            ],
            show: false,
            showPicker: true,
            endTime: '',
            showStartTimePicker: false,
      })
        const showStartTime = () => {
            data.showStartTimePicker = true;
        }
        const startTime = '';
        const currentMonth = ref(dayjs().format('MMMM'));
        const currentyYear = ref(dayjs().format('YYYY'));
        const today = dayjs().format('YYYY-MM-DD');
        const currentDate = ref(dayjs());
        const weekDays = ref(['Sun', 'Mon', 'Tues', 'Wed', 'Thur', 'Fri', 'Sat']);

        const dates = computed(() => {
            return [...Array(7).keys()].map((index) => {
                return currentDate.value.add(index, 'day').format('YYYY-MM-DD');
            });
        });
        const onTimeCancel = (val) => {
            
        }
        const showActionSheet = () => {
            data.show = true;
        }

        const getDayOfWeek = (date) => {
            return weekDays.value[dayjs(date).day()];
        };
        const onTimeConfirm = () => {
            showToast(`${startTime.value.join(':')} ${endTime.value.join(':')}`);
        };
        
      return {
        ...toRefs(data),
        weekDays,
        today,
        dates,
        getDayOfWeek,
        currentMonth,
        currentyYear,
        dayjs,
        showActionSheet,
        onTimeConfirm,
        onTimeCancel,
        showStartTime,
        startTime
      }
    }
})
</script>
<style scoped module='s'>
.wrapper {
    position: relative;
}
.header {
    display: flex;
    align-items: center;
}
.avatar {
    width: 60px;
    height: 60px;
    border-radius: 50%;
    background: #ccc;
}

.headerDetail {
    font-size: 14px;
    color: #787785;
    margin-left: 12px;
}


.weekCalendar {
  overflow: hidden;
  margin-top: 45px;
  border-bottom: 1px solid #787785;
  margin: 0 -2rem;
}

.weekCalendarHeader {
  display: flex;
  justify-content: space-between;
  background-color: #f7f7f7;
}

.weekDay {
  flex: 1;
  text-align: center;
  padding: 8px 0;
}

.weekCalendarDates {
  display: flex;
}

.weekDate {
  flex: 1;
  text-align: center;
  padding: 8px 0;
  color: #787785;
  font-size: 8px;
}

.date {
  font-size: 16px;
}

.day {
  font-size: 14px;
  color: #666;
}

.active {
  color: #B79393;
}

.addButton {
    background: #787785;
    position: fixed;
    right: 16px;
    color: #fff;
    border-radius: 50%;
    height: 50px;
    width: 50px;
}
.popupContainer {
    background: #fff;
    padding: 16px;
}

.textField {
    border: 2px solid #ccc;
    border-radius: 5px;
    margin-top: 24px;
}
.subBtn {
    width: 240px;
    font-size: 28px;
    border-radius: 10px;
}
.hint {
    color: #666;
    margin-top: 24px;
    margin-bottom: -14px;
}
</style>
