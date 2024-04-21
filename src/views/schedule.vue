<template>
  <div class="calendar">
    <div class="month-header">

        <div class="month-left">
            <div class="month-name" @click="showMonthSelector">{{ currentMonth }}</div>
            <div class="year-name" @click="showMonthSelector">{{ currentYear }}</div>
        </div>

        <div class="month-right">
            <div>
                <van-button class="arrow" icon="arrow-left" plain @click="prevMonth" />
                <van-button class="arrow" icon="arrow" plain @click="nextMonth" />

            </div>
            <van-icon name="calendar-o" style="margin-left: 12px;"/>
            <van-icon name="eye-o"  style="margin-left: 12px;"/>

            <van-popup v-model:show="showPopup" position="bottom">
                <van-picker
                :columns="monthSelectorOptions"
                @confirm="confirmMonthSelector"
                @cancel="hideMonthSelector"
                />
            </van-popup>
        </div>

    </div>
  <div class="calendar">
    <table class="calendar-table">
      <thead>
        <tr>
          <th  class="week-days" v-for="day in weekDays" :key="day">{{ day }}</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(week, index) in weeks" :key="index">
          <td
            v-for="(day, i) in week"
            :key="i"
            :class="{ 'today': isToday(day), 'selected': isSelected(day), 'inactive': isInactive(day)}"
            @click="day !== '' && selectDate(day)"
          >
            <div class="day">
                <div class="number">{{ day === '' ? prevMonthDays[index * 7 + i] : day }}</div>
                <!-- <div v-if="toDoItems[day]" class="todo-items"> -->
                <div v-for="(item, index) in toDoItems[day]" :key="index" :class="{'todo-item': true, 'pink': item.status === 1, 'yellow': item.status === 2, 'blue': item.status === 3, 'green': item.status === 4}">
                    {{ item.content }}
                </div>
                <!-- </div> -->
            </div>
          </td>
        </tr>
      </tbody>
    </table>
    <van-popup v-model:show="showMonthSelectorPopup" position="bottom">
      <van-picker
        :columns="yearMonthOptions"
        @confirm="confirmMonthSelectorPopup"
        @cancel="hideMonthSelectorPopup"
      />
    </van-popup>
</div>
  </div>
</template>

<script>
import { ref, computed } from 'vue';
import dayjs from 'dayjs';
import { Popup, Picker, Button } from 'vant';
import { useRouter , useRoute } from 'vue-router'

export default {
  name: 'MonthlyCalendar',
  components: {
    [Popup.name]: Popup,
    [Picker.name]: Picker,
    [Button.name]: Button,
  },
  setup() {
    const router = useRouter()
    const route = useRoute()
    const today = ref(dayjs());
    const currentMonth = ref(today.value.format('MMMM'));
    const currentYear = ref(today.value.format('YYYY'));
    const selectedDate = ref(today.value.format('YYYY-MM-DD'));
    const weekDays = ref(['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']);
    const daysInMonth = computed(() => {
      const days = [];
      const firstDayOfMonth = today.value.startOf('month');
      const lastDayOfMonth = today.value.endOf('month');
      const startDay = firstDayOfMonth.day();
      const prevMonthDays = [];
      const prevMonth = today.value.subtract(1, 'month');
      const daysInPrevMonth = prevMonth.endOf('month').date();
      for (let i = startDay - 1; i >= 0; i--) {
        prevMonthDays.push(daysInPrevMonth - i);
      }
      for (let i = 1; i <= lastDayOfMonth.date(); i++) {
        days.push(i);
      }
      return prevMonthDays.concat(days);
    });

    // Mock data: to-do items for specific dates
    const toDoItems = ref({
      '21': [{status: 1, content: 'Task 1Task 1Task 1Task 1Task 1Task 1Task 1Task 1'}, {status: 2, content: 'Task 2'}],
      '10': [{status: 3, content: 'Task 3'}],
      '15': [{status: 4, content: 'Task 4'}],
    });

    const isToday = (day) => {
      return today.value.date() === day;
    };

    const isSelected = (day) => {
      return selectedDate.value === dayjs(`${today.value.format('YYYY-MM')}-${day}`).format('YYYY-MM-DD');
    };

    const isInactive = (day) => {
      return day === '';
    };

    const selectDate = (day) => {
      selectedDate.value = dayjs(`${today.value.format('YYYY-MM')}-${day}`).format('YYYY-MM-DD');
      router.push({ name: 'dailyRecord' })
    };

    const nextMonth = () => {
      today.value = today.value.add(1, 'month');
      currentMonth.value = today.value.format('MMMM');
    };

    const prevMonth = () => {
      today.value = today.value.subtract(1, 'month');
      currentMonth.value = today.value.format('MMMM');
    };

    const showMonthSelector = () => {
      showPopup.value = true;
    };

    const hideMonthSelector = () => {
      showPopup.value = false;
    };

    const monthSelectorOptions = ref([]);
    const showPopup = ref(false);

    const generateMonthSelectorOptions = () => {
      const options = [];
      for (let i = 0; i < 12; i++) {
        const month = dayjs().month(i).format('MMMM');
        const year = today.value.year();
        options.push(`${month} ${year}`);
      }
      monthSelectorOptions.value = [options];
    };

    const confirmMonthSelector = (value, index) => {
      const selectedMonth = dayjs().month(index[0]).format('MMMM');
      const selectedYear = today.value.year();
      currentMonth.value = `${selectedMonth} ${selectedYear}`;
      today.value = dayjs(`${selectedYear}-${index[0] + 1}-01`);
      hideMonthSelector();
    };

    generateMonthSelectorOptions();

    // Year-Month Picker
    const yearMonthOptions = ref([Array.from({ length: 12 }, (_, i) => dayjs().month(i).format('MMMM')), Array.from({ length: 10 }, (_, i) => dayjs().year() - i)]);
    const showMonthSelectorPopup = ref(false);

    const showMonthSelectorPopupFunc = () => {
      showMonthSelectorPopup.value = true;
    };

    const hideMonthSelectorPopup = () => {
      showMonthSelectorPopup.value = false;
    };

    const confirmMonthSelectorPopup = (value) => {
      const selectedYear = value[1];
      const selectedMonth = value[0] + 1;
      today.value = dayjs(`${selectedYear}-${selectedMonth}-01`);
      currentMonth.value = today.value.format('MMMM YYYY');
      hideMonthSelectorPopup();
    };

    const weeks = computed(() => {
      const weeksArray = [];
      const days = daysInMonth.value;
      const totalDays = days.length;
      const weeksCount = Math.ceil(totalDays / 7);
      for (let i = 0; i < weeksCount; i++) {
        const start = i * 7;
        const end = start + 7;
        weeksArray.push(days.slice(start, end));
      }
      return weeksArray;
    });

    return {
      currentMonth,
      currentYear,
      selectedDate,
      weekDays,
      daysInMonth,
      isToday,
      isSelected,
      isInactive,
      selectDate,
      nextMonth,
      prevMonth,
      toDoItems,
      showMonthSelector,
      hideMonthSelector,
      monthSelectorOptions,
      showPopup,
      confirmMonthSelector,
      showMonthSelectorPopupFunc,
      hideMonthSelectorPopup,
      confirmMonthSelectorPopup,
      yearMonthOptions,
      showMonthSelectorPopup,
      weeks,
    };
  },
};
</script>

<style scoped>
.calendar {
  font-family: Arial, sans-serif;
  width: 100%;
}

.month-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 28px;
  margin-bottom: 10px;
}

.month-left {
    display: flex;
}
.month-name {
  /* cursor: pointer; */
  font-size: 28px;
  font-weight: bold;
  color: #DEB7B8;

}

.year-name {
    color: #787785;
    margin-left: 18px;
  /* cursor: pointer; */
}

.arrow {
    border: none;
}
.month-right {
    display: flex;
    align-items: center;
}
.week-days {
  color: #ccc;
  width: 50px;
  padding-bottom: 20px;
}

.day {
  flex: 1;
  text-align: center;
  /* padding: 10px; */
  font-size: 16px;
}

.weekDays {
    width: 50px;
    text-align: center;
}
.days {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 2px;
}

.day {
  cursor: pointer;
  width: 50px;
  height: 108px;
}

.today {
  /* background-color: #ffcccc; */
}

.selected > .day > .number {
    color: #fff;
    width: 28px;
    height: 27px;
    border-radius: 50%;
    background: #000;
    margin: 0 auto;
}

.inactive {
  color: #ccc;
}

.todo-items {
  margin-top: 5px;
}

.todo-item {
  font-size: 8px;
  margin-top: 2px;
  padding: 2px;
  width: 100%;
  /* background: red; */
  border-radius: 5px;
  overflow: hidden;
  color: #000;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.pink {
    background-color: #FFD9D9;
    border: 1px solid #DEB7B8;
}
.yellow {
    background-color: #FEE6C9;
    border: 1px solid #F0C897;
}
.blue {
    background-color: #D2F0FF;
    border: 1px solid #477ecf;
}
.green {
    background-color: #ADD9B9;
    border: 1px solid #88B093;
    /* color: #000; */
}
</style>
