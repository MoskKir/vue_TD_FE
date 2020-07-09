<template>
  <div class="about">
    <!-- <Calendar></Calendar> -->
    <Calendarec></Calendarec>
  </div>
</template>

<script>
// import Calendar from '../components/Calendar';
import Calendarec from '../components/calendar/index';

export default {
  components: {
    // Calendar,
    Calendarec
  },
}
</script>

<style lang="scss">
  .about {
    display: flex;
    margin: 0 auto;
  }
</style>