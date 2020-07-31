<template>
	<div class="main-container">
		<v-calendar
				v-model="start"
				:start="start"
				:weekdays="weekday"
				:type="isWeekView"
				@click:date="contextMenuEvent($event)"
				@click:day="contextMenuEvent($event)"
				@contextmenu:day="contextMenuEvent($event)"
				:events="events"
				@click:event="showEvent"
				:event-color="getEventColor"
				
			></v-calendar>
				<!-- {{ events }} -->
			<!--  v-model="value"
				:events="events"
				:event-overlap-mode="mode"
				:event-overlap-threshold="30"
				:event-color="getEventColor"
				@change="getEvents" -->


			<v-menu
				v-model="selectedOpen"
				:close-on-content-click="false"
				:activator="selectedElement"
				offset-x
			>
				<v-card
					color="grey lighten-4"
					min-width="350px"
					flat
				>
					<v-toolbar
						:color="selectedEvent.color"
						dark
					>
						<v-btn icon>
							<v-icon>mdi-pencil</v-icon>
						</v-btn>
						<v-toolbar-title v-html="selectedEvent.name"></v-toolbar-title>
						<v-spacer></v-spacer>
						<v-btn icon>
							<v-icon>mdi-heart</v-icon>
						</v-btn>
						<v-btn icon>
							<v-icon>mdi-dots-vertical</v-icon>
						</v-btn>
					</v-toolbar>
					<v-card-text>
						<span v-html="selectedEvent.details"></span>
					</v-card-text>
					<v-card-actions>
						<v-btn
							text
							color="secondary"
							@click="selectedOpen = false"
						>
							Cancel
						</v-btn>
					</v-card-actions>
				</v-card>
			</v-menu>



	</div>
</template>

<script>
import axios from 'axios';

export default {
	name: "EventCalendar",
	props: [
		'weekday',
		'isWeekView',
		'pickedDay',
		'newEvent',
	],
	model: {
			prop: 'pickedDay',
			event: 'pickedDayIsPicked'
	},
	data: () => ({
		events: [],
		celebrationJSON: null,
		start: null,
		// start: `${this.pickedDay}` yyyy-mm-dd,
		selectedEvent: {},
		selectedElement: null,
		selectedOpen: false,
		initPickedDay: new Date,
		colorOnTable: 'black'
	}),
	created() {
		// console.log('created ', this.initPickedDay)
		this.start = `${this.initPickedDay.getFullYear()}-${this.initPickedDay.getMonth() + 1 }-${this.initPickedDay.getDate()}`
	},
	mounted() {
		// console.log('mouned ', this.initPickedDay)
		axios
			.get(`https://clients6.google.com/calendar/v3/calendars/ru.by%23holiday@group.v.calendar.google.com/events?calendarId=ru.by%23holiday%40group.v.calendar.google.com&singleEvents=true&timeZone=Europe%2FMinsk&maxAttendees=1&maxResults=250&sanitizeHtml=true&timeMin=2000-01-01T00%3A00%3A00%2B03%3A00&timeMax=2025-08-01T00%3A00%3A00%2B03%3A00&key=AIzaSyBNlYH01_9Hc5S1J9vuFmu2nUqBZJNAXxs`)
			.then(response => {
				// console.log(response.data.items)
				this.celebrationJSON = response.data.items;
				this.getEventsForCalendar()
			})
			.catch(error => {
				console.log(error);
			})
	},
	watch: {
		pickedDay() {
			this.start = `${this.pickedDay.getFullYear()}-${this.pickedDay.getMonth() + 1}-${this.pickedDay.getDate()}`
		},
		newEvent() {
			if (this.newEvent.isEveryMonthEvent) {
				this.addEventToEveruMonth();
			} 
			else if (this.newEvent.isEveryDayEvent) {

				const currentMonth = this.newEvent.start.getMonth();
				const selectDay = this.newEvent.start.getTime();

				for (let i = currentMonth; i < 12; i++) {

					this.newEvent.start.setDate(1)
					let date = new Date(this.newEvent.start.setMonth(i));

					let lastDayOfMonth = new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();

					for (let y = 1; y <= lastDayOfMonth; y++) {

						let x = this.newEvent.start.setDate(y);

						if ( x >= selectDay ) this.events.push({
													name: this.newEvent.title,
													start: this.newEvent.start.setDate(y),
													end: this.newEvent.start.setDate(y),
													timed: null,
													color: 'green'
												})
					}	
				}
			}
			else if (this.newEvent.isEveryWeekEvent) {
				const currentMonth = this.newEvent.start.getMonth();
				const selectDay = this.newEvent.start.getTime();

				// divided on 7 

				for (let i = currentMonth; i < 12; i++) {

					this.newEvent.start.setDate(1)
					let date = new Date(this.newEvent.start.setMonth(i));

					let lastDayOfMonth = new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();

					for (let y = 1; y <= lastDayOfMonth; y++) {

						let x = this.newEvent.start.setDate(y);

						if ( x >= selectDay ) this.events.push({
													name: this.newEvent.title,
													start: this.newEvent.start.setDate(y),
													end: this.newEvent.start.setDate(y),
													timed: null,
													color: 'green'
												})
					}	
				}
			}

		}
	},
	methods: {
		contextMenuEvent(event) {
			this.pickedDay = {
				day: event.day,
				month: event.month,
				year: event.year  
			}
			this.start = `${this.pickedDay.year}-${this.pickedDay.month}-${this.pickedDay.day}`.toString()
			this.$emit('pickedDayIsPicked', this.pickedDay);
		},
		addEventToEveruMonth() {
			const currentMonth = this.newEvent.start.getMonth();

			for (let i = currentMonth; i < 12; i++) {
			
				this.events.push({
					name: this.newEvent.title,
					start: this.newEvent.start.setMonth(i),
					end: this.newEvent.start.setMonth(i),
					timed: null,
					color: 'blue'
				})
			}
		},
		getEventsForCalendar() {
			this.celebrationJSON.forEach(value => {
				this.events.push({
					name: value.summary,
					start: value.start.date,
					end: value.start.date,
					color: 'red',
					timed: null
				})
			}) 
		},
		showEvent ({ nativeEvent, event }) {
			const open = () => {
				this.selectedEvent = event
				this.selectedElement = nativeEvent.target
				setTimeout(() => this.selectedOpen = true, 10)
			}

			if (this.selectedOpen) {
				this.selectedOpen = false
				setTimeout(open, 10)
			} else {
				open()
			}

			nativeEvent.stopPropagation()
		},
		getEventColor (event) {
			return event.color
		},
	}
};
</script>

<style lang="scss" scoped>
	.main-container {
		margin: 0 10px;
		margin-right: 0;
		width: 100%;
		height: 70vh;
		box-shadow: 0px 3px 1px -2px rgba(0, 0, 0, 0.2),
        0px 2px 2px 0px rgba(0, 0, 0, 0.14), 0px 1px 5px 0px rgba(0, 0, 0, 0.12);
	}

	@media (max-width: 769px) {
		.main-container {
			margin: 0;
			margin-top: 10px;
			height: fit-content;
		}
}
</style>