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

    <ul :class="s.table">
        <li :class="s.tableItem" :style="{border: item.border}" v-for="item in tableItem">
            <p :class="s.tableTitle" :style="{color: item.color}">{{ item.title }}</p>
            <p :class="s.gradientLine" :style="{background: item.titleStyle}"></p>
        </li>
    </ul>

    <div>
        
    </div>
    <van-button :class="s.addButton" icon="plus"></van-button>
  </div>
</template>
<script>
import { ref, toRefs, reactive, defineComponent, onMounted, computed } from "vue";
import dayjs from 'dayjs';
import 'dayjs/locale/en'; // 引入英文语言包
dayjs.locale('en'); // 设置 dayjs 使用英文语言

export default defineComponent({
    setup() {
        const data = reactive({
            tableItem: [
                {
                    title: "urgent & not important",
                    color: "#787785",
                    border: "1px solid #787785",
                    titleStyle: "linear-gradient(to right, #787785, #C4C4C4, rgba(255, 0, 0, 0))"
                },
                {
                    title: "urgent & important",
                    color: "#DEB7B8",
                    border: "1px solid #DEB7B8",
                    titleStyle: "linear-gradient(to right, #DEB7B8, #C4C4C4, rgba(255, 0, 0, 0))"
                },
                {
                    title: "not urgent & not important",
                    color: "#88B093",
                    border: "1px solid #88B093",
                    titleStyle: "linear-gradient(to right, #88B093, #C4C4C4, rgba(255, 0, 0, 0))"
                },
                {
                    title: "not urgent & important",
                    color: "#B1A3CE",
                    border: "1px solid #B1A3CE",
                    titleStyle: "linear-gradient(to right, #B1A3CE, #C4C4C4, rgba(255, 0, 0, 0))"
                }
            ]
      })
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

        const getDayOfWeek = (date) => {
            return weekDays.value[dayjs(date).day()];
        };
        
      return {
        ...toRefs(data),
        weekDays,
        today,
        dates,
        getDayOfWeek,
        currentMonth,
        currentyYear,
        dayjs
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

.table {
    padding-top: 24px;
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
   
}
.tableItem {
    border-radius: 10px;
    padding: 8px;
    height: 256px;
    width: calc(50% - 8px);
    margin-bottom: 24px;
    background: #F6F2F1;
}
.tableTitle {
    font-size: 12px;
}

.gradientLine {
  width: 100%; /* 确保渐变线占满容器的宽度 */
  height: 2px; /* 渐变线的高度 */
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
</style>
