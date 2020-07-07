<template>
  <div class="about">
    <h1>This is an about page</h1>
    <Calendar></Calendar>
    <Calendarec></Calendarec>
  </div>
</template>

<script>
import Calendar from '../components/Calendar';
import Calendarec from '../components/calendar/index';

export default {
  components: {
    Calendar,
    Calendarec
  },
}
</script>

<style lang="scss">
  .about {
    display: flex;
  }
</style>