<template>
  <div class="main-calendar-container">
    <v-card>
      
      <v-card-actions>

        <v-switch
          v-model="isMonday"
          class="switch"
          inset
          hide-details
          label="is monday"
        ></v-switch>

        <v-switch
          v-model="isWeekView"
          class="switch"
          inset
          hide-details
          label="month/week"
        ></v-switch>

      </v-card-actions>
    </v-card>

    <div class="calendar-container">

      <Calendarec
        v-model="pickedDay"
        :isMonday="isMonday"
      ></Calendarec>
      
      <EventCalendar
        v-model="pickedDay"
        :weekday="weekday"
        :isWeekView="view"
      ></EventCalendar>

    </div>

  </div>
</template>

<script>
import Calendarec from '../components/calendar/index';
import EventCalendar from '../components/EventCalendar';

export default {
  components: {
    Calendarec,
    EventCalendar
  },
  data: () => ({
    pickedDay: null,
    isMonday: true,
    weekday: [1, 2, 3, 4, 5, 6, 0],
    isWeekView: false,
    view: 'month',
  }),

  watch: {
    pickedDay() {
      console.log('from calendar ',this.pickedDay)
    },
    isMonday: function() {
        (!this.isMonday) 
        ? this.weekday = [0, 1, 2, 3, 4, 5, 6]
        : this.weekday = [1, 2, 3, 4, 5, 6, 0]
    },
    isWeekView: function() {
        this.view = (this.isWeekView) ? 'week' : 'month' 
    }
  },
  methods: {
  }
}
</script>

<style lang="scss">

  .main-calendar-container {
    width: 100vw;
    
  }

  .calendar-container {
    display: flex;
    margin: 10px auto;
    height: calc(100vh - 10vh);
  }

  .switch {
    margin-top: 0;
    padding-top: 0;
    margin-right: 10px;;
  }

</style>