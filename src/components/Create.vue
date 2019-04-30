<template>
	<div class="">
		<section class="is-fullheight is-turquoise" style="min-height:100vh;">
			<!-- Navbar -->
			<Navbar isLogoActive="none" />
			<div class="container">

				<!-- style="justify-content: center;" -->
				<div class="columns is-mobile is-multiline">
					<div class="column is-2">
						<SidebarMenu width='320px' :menu="menu" collapsed/>
					</div>
					<div class="column is-10">
						<section>
							<div class="columns is-mobile">
								<div class="column is-6">
									<b-field label="TITLE">
										<b-input value="Yerel Seçimler" pack="fas" icon="quote-left" type="text" maxlength="30"></b-input>
									</b-field>
								</div>
							</div>

							<div class="form-group" v-for="(cand, index) in candidates" :key="index">
								<b-field label="Candidate">
									<div class="columns is-mobile is-multiline">
										<div class="column is-6">
											<b-input type="text" value="" maxlength="30" v-model="cand.name" icon-pack="far" icon="user">
											</b-input>
										</div>
										<div class="column is-2">
											<b-button v-if="candidates.length > 2"  v-on:click="removeCandidate(index)" type="is-danger" rounded>
												<b-icon pack="fas" icon="minus" size="is-small" />
											</b-button>
										</div>
									</div>
								</b-field>
							</div>

							<div class="columns is-mobile is-multiline">
								<div class="column is-6">
									<div class="buttons" style="justify-content: center;">
										<b-button v-on:click="addCandidate()" type="is-warning" rounded>
											<b-icon pack="fas" icon="plus" size="is-small" />
											<!-- <span>Add Candidate</span> -->
										</b-button>
									</div>
								</div>
							</div>

							<!-- TODO: -->
							<b-field label="Start date">
								<div class="columns">
									<div class="column is-3" style="overflow: visible;">
										<b-datepicker :placeholder="startDatePlaceholder" pack="far" icon="calendar-alt" :disabled="afterLaunchRadio"
										:first-day-of-week=1 position="is-top-right"	:min-date="yesterday" v-model="minEndDate">
										</b-datepicker>										 
									</div>
									<div class="column is-3">
										<b-clockpicker :placeholder="startTimePlaceholder" v-model="startTime" pack="far" :disabled="afterLaunchRadio"
										icon="clock" :hour-format="'24'" position="is-top-right" ref="startClockPicker" :readonly="false" >

											<!-- <b-button type="is-primary" size="is-small" v-on:click="setAfterLaunch()" rounded>
												<b-icon icon="clock"></b-icon>
												<span>Start After Launch</span>
											</b-button> -->

											<b-button type="is-danger" size="is-small" v-on:click="startTime = null" rounded>
												<b-icon pack="fas" icon="broom"></b-icon>
												<span>Clear</span>
											</b-button>
										</b-clockpicker>
									</div>

									<div class="column is-4" style="margin-top:8px;">
										 <div class="field">
												<b-checkbox v-model="afterLaunchRadio" :value="true" type="is-warning">
													Start after launch
												</b-checkbox>
										</div>
									</div>
								</div>
							</b-field>

							<b-field label="End date">
								<div class="columns">
									<div class="column is-3" style="overflow: visible;">
										<b-datepicker placeholder="Click to select..." pack="far" icon="calendar-alt" 
										:first-day-of-week=1 position="is-top-right" :min-date="minEndDate">
										</b-datepicker>
									</div>
									<div class="column is-3">
										<b-clockpicker v-model="endTime" pack="far" icon="clock" placeholder="Click to select..." :hour-format="'24'" 
										:min-time="startTime" position="is-top-right" ref="endClockPicker">
											<button class="button is-danger is-rounded" v-on:click="endTime = null">
												<b-icon pack="fas" icon="broom"></b-icon>
												<span>Clear</span>
											</button>
										</b-clockpicker>
									</div>
								</div>
							</b-field>

							<div class="columns is-mobile is-multiline">
								<div class="column is-6">
									<div class="buttons" style="justify-content: center;">
										<b-button type="is-warning" size="is-medium" v-on:click="start()" >
											<span>Start</span>
										</b-button>
									</div>
								</div>
							</div>
							<!-- <ResultChart /> -->
						</section>
					</div>
				</div>

			</div>
		</section>
	</div>
</template>

<script>
	import Navbar from './Navbar.vue'
	import {
		SidebarMenu
	} from 'vue-sidebar-menu'
	// import VueSidebarMenu from 'vue-sidebar-menu'
	import 'vue-sidebar-menu/dist/vue-sidebar-menu.css'

	export default {
		name: "create",
		components: {
			Navbar,
			SidebarMenu,
		},
		data() {
			return {
				candidates: [
					{ name: '' }, { name: '' }
				],
				menu: [{
						header: true,
						title: 'OYLA.',
						// component: componentName
						// visibleOnCollapse: true
						// class:''
						// attributes: {}
					},
					{ // item
						href: '/create',
						title: 'Create an Election',
						icon: 'fas fa-plus-circle',
						// disabled: true
						// class:''
						// attributes: {}
						/*
						badge: {
						    text: 'new',
						    // class:''
						    // attributes: {}
						}
						*/
					},
					{ // item with child
						href: '/create',
						title: 'Results',
						icon: 'fas fa-chart-pie',
						child: [{
								href: '/charts/sublink',
								title: 'Çankaya',
							},
							{
								href: '/charts/sublink',
								title: 'Kadıköy',
							}, {
								href: '/charts/sublink',
								title: 'Beşiktaş',
							}
						]
					},
				],
				startTime: new Date(), // default: `now`
				endTime: null,
				yesterday: this.getYesterdayTime(),
				minEndDate: null, // Helps to disable dates before current day.
				startDatePlaceholder: 'Click to select...',
				startTimePlaceholder: 'Click to select...',
				afterLaunchRadio: false,
			}
		},
		methods: {
			addCandidate() {
				this.printCandidates();
				this.candidates.push({
					name: ''
				});
			},
			removeCandidate(index) {
				this.candidates.splice(index, 1);
			},
			printCandidates() {
				this.candidates.forEach(element => {
					console.log(element.name);
				});
			},
			getYesterdayTime() {
				return new Date(Date.now() - 86400000);
			},
			start() {
				this.$swal({
					title: 'Successfully created an election',
					icon: "success",
				});
			}
		},
	}
</script>

<style scoped>
	.is-turquoise {
		background-color: #00d1b2;
	}
</style>