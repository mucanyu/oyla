<template>
	<div class="">
		<section class="is-fullheight is-turquoise" style="min-height:100vh;">

			<!-- Navbar -->
			<Navbar isLogoActive="none" />

			<!-- style="justify-content: center;" -->
			<div class="columns is-mobile is-multiline">
				<div class="column is-2">
					<SidebarMenu width='320px' :menu="menu" collapsed />
				</div>
				<div class="column is-4">
					<section>
						<b-field label="TITLE">
							<b-input value="Yerel Seçimler" pack="fas" icon="quote-left" type="text" maxlength="30"></b-input>
						</b-field>

						<!-- <b-field label="Candidate" type="is-danger" message="This  is invalid">
							<b-input type="email" value="Kekrem İnanoğlum" maxlength="30">
							</b-input>
						</b-field>

						<b-field label="Candidate" type="is-warning" message="This username is not available">
							<b-input value="Binary Kaldırım" maxlength="30"></b-input>
						</b-field> -->

						<div class="form-group" v-for="(cand, index) in candidates" :key="index">
							<b-field label="Candidate">
								<div class="columns">
									<div class="column is-10">
										<b-input type="text" value="" maxlength="30" v-model="cand.name" icon-pack="far" icon="user">
										</b-input>
									</div>
									<div class="column is-2">
										<b-button v-if="candidates.length > 1" v-on:click="removeCandidate(index)" type="is-danger" rounded>
											<b-icon pack="fas" icon="minus" size="is-medium" />
										</b-button>
									</div>
								</div>
							</b-field>
						</div>

						<div class="columns is-mobile is-multiline">
							<div class="column is-6">
								<div class="buttons">
									<b-button v-on:click="addCandidate()" type="is-warning" rounded>
										<b-icon pack="fas" icon="plus" size="is-small" />
										<span>Add Candidate</span>
									</b-button>
								</div>
							</div>
						</div>

						<b-field label="Start date">
							<div class="columns">
								<div class="column is-6" style="overflow: visible;">
									<b-datepicker placeholder="Click to select..." pack="far" icon="calendar-alt" position="is-top-right">
									</b-datepicker>
								</div>
								<div class="column is-6">
									<b-clockpicker v-model="startTime" placeholder="Click to select..." :hour-format="'24'" 
									position="is-top-right" ref="startClockPicker">

										<button class="button is-primary is-rounded" @click="startTime = new Date()">
											<b-icon icon="clock"></b-icon>
											<span>Now</span>
										</button>

										<button class="button is-danger is-rounded" @click="startTime = null">
											<b-icon pack="fas" icon="broom"></b-icon>
											<span>Clear</span>
										</button>
									</b-clockpicker>
								</div>
							</div>
						</b-field>

						<b-field label="End date">
							<div class="columns">
								<div class="column is-6" style="overflow: visible;">
									<b-datepicker placeholder="Click to select..." pack="far" icon="calendar-alt" position="is-top-right">
									</b-datepicker>
								</div>
								<div class="column is-6">
									<b-clockpicker v-model="endTime" placeholder="Click to select..." :hour-format="'24'" :min-time="startTime"
									position="is-top-right" ref="endClockPicker">
										<button class="button is-danger is-rounded" @click="endTime = null">
											<b-icon pack="fas" icon="broom"></b-icon>
											<span>Clear</span>
										</button>
									</b-clockpicker>
								</div>
							</div>
						</b-field>

						<b-button type="is-primary" size="is-medium" inverted>
							<span>Start</span>
						</b-button>
						<!-- <ResultChart /> -->
					</section>
				</div>

				<div class="column is-6">
					<p>Bu tarafa `pie chart` gelecek.</p>
				</div>

			</div>
		</section>
	</div>
</template>

<script>
	import Navbar from './Navbar.vue'
	import ResultChart from './ResultChart.vue'
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
			ResultChart,
		},
		data() {
			return {
				candidates: [{
					name: ''
				}],
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
				startTime: new Date(),
				endTime: null,
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
		}
	}
</script>

<style scoped>
	.is-turquoise {
		background-color: #00d1b2;
	}

	html {
		min-height:100vh;
	}
</style>