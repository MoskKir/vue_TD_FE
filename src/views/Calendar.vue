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

    {{ pickedDay }}

    <div class="calendar-container">

      <DatePicker
        v-model="pickedDay"
        :isMonday="isMonday"
      ></DatePicker>
      
      <EventCalendar
        v-model="pickedDay"
        :weekday="weekday"
        :isWeekView="view"
        :newEvent="newEvent"
      ></EventCalendar>

    </div>

    <!--                                            dialog                                       -->

    <v-dialog 
      max-width="500px"
      v-model="showEventModalCard"  
    >
      <v-card>
        <v-card-title>
          <span class="headline">Заголовок</span>
          {{ pickedDay }}
        </v-card-title>

        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="12" sm="6" md="4">
                <v-checkbox
                  label="Status"
                  color="success"
                  value="success"
                  hide-details
                ></v-checkbox>
              </v-col>
              <v-col cols="12" sm="6" md="4">
                <v-text-field label="Title" ></v-text-field>
              </v-col>
              <v-col cols="12" sm="6" md="4">
                <v-text-field label="Description" ></v-text-field>
              </v-col>
            </v-row>
          </v-container>
        </v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="grey darken-4" text @click="showEventModalCard = false">Cancel</v-btn>
          <v-btn color="grey darken-4" text @click="saveEvent">Save</v-btn>
        </v-card-actions>
      </v-card>

  </v-dialog>




  </div>
</template>

<script>
import DatePicker from '../components/calendar/index';
import EventCalendar from '../components/EventCalendar';

export default {
  components: {
    DatePicker,
    EventCalendar
  },
  data: () => ({
    isMonday: true,
    weekday: [1, 2, 3, 4, 5, 6, 0],
    isWeekView: false,
    view: 'month',
    pickedDay: null,
    showEventModalCard: false,
    newEvent: {
      title: 'new event title lorem',
      start: null,
      end: null,
    }
  }),
  watch: {
    pickedDay() {
      console.log('from calendar ',this.pickedDay)
      this.showEventModalCard = true;
      
    },
    isMonday() {
        (!this.isMonday) 
        ? this.weekday = [0, 1, 2, 3, 4, 5, 6]
        : this.weekday = [1, 2, 3, 4, 5, 6, 0]
    },
    isWeekView() {
        this.view = (this.isWeekView) ? 'week' : 'month' 
    }
  },
  methods: {
    saveEvent() {
      
      this.newEvent = {
        title: 'new event title lorem',
        start: this.pickedDay,
        end: this.pickedDay,
      }
      console.log('new evant ', this.newEvent)
      this.showEventModalCard = false;
    }
  }
}
</script>

<style lang="scss" scoped>

  .main-calendar-container {
    width: 100vw;
    
  }

  .calendar-container {
    display: flex;
    margin: 10px auto;
    height: fit-content;
  }

  .switch {
    margin-top: 0;
    padding-top: 0;
    margin-right: 10px;;
  }

</style>