<template>
	<div>
		<section class="is-fullheight is-turquoise" style="min-height:100vh;">
			<!-- Navbar -->
			<Navbar isLogoActive="none" />

			<!-- style="justify-content: center;" -->
			<div class="container" style="display: flex; justify-content: center; align-items: center;">
				<div class="columns is-mobile is-multiline">
					<div class="column is-1">
						<SidebarMenu width='280px' :menu="menu" collapsed />
					</div>
					<div class="column is-11 box" style="margin-top: 14px;">
						<article class="media">
							<div class="media-content" style="overflow-x: hidden; text-align: center;">
								<div style="width: 380px; margin-right:10px;">
									<p class="decode-result"><b>Scan QR to vote.</b></p>

									<qrcode-stream :camera="camera" @decode="onDecode" @init="onInit">
										<div v-if="validationSuccess" class="validation-success">
											This is a URL
										</div>

										<div v-if="validationFailure" class="validation-failure">
											This is NOT a URL!
										</div>

										<div v-if="validationPending" class="validation-pending">
											Validation in progress...
										</div>
									</qrcode-stream>

									<p class="decode-result">Last result: <b>{{ result }}</b></p>
								</div>
							</div>
						</article>
					</div>
				</div>
			</div>
		</section>
	</div>
</template>

<script>
	import Navbar from './Navbar.vue'
	import {
		QrcodeStream,
		QrcodeDropZone,
		QrcodeCapture
	} from 'vue-qrcode-reader'
	import { SidebarMenu } from 'vue-sidebar-menu'
	import 'vue-sidebar-menu/dist/vue-sidebar-menu.css'

	import Tx from 'ethereumjs-tx'
	import getWeb3 from '../utils/getWeb3'
	import DenemelerContract from '../../build/contracts/Denemeler.json'

	export default {
		name: "election",
		components: {
			Navbar,
			SidebarMenu,
			QrcodeStream,
			QrcodeDropZone,
			QrcodeCapture,
		},
		data() {
			return {
				isValid: undefined,
				camera: 'auto',
				result: null,
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
				contractInstance: null,
				contractABI: DenemelerContract.abi,
				oylaWeb3: null,
			}
		},
		methods: {
			onInit(promise) {
				promise
					.catch(console.error)
					.then(this.resetValidationState);
			},

			resetValidationState() {
				this.isValid = undefined;
			},

			async onDecode(content) {
				this.result = content;
				this.turnCameraOff();
				console.log('Content type:', typeof content);
				// pretend it's taking really long

				await function() {
					console.log('Test');
				}

				await this.timeout(2200);
				// this.isValid = content.startsWith('http');

				// TODO: Send transaction with given private key.

				// some more delay, so users have time to read the message
				await this.timeout(2000);

				this.$dialog.confirm({
					title: 'Deleting account',
					message: 'Are you sure you want to <b>delete</b> your account? This action cannot be undone.',
					confirmText: 'Delete Account',
					type: 'is-info',
					hasIcon: true,
					onConfirm: () => this.$toast.open('Account deleted!')
				});

				this.turnCameraOn();
			},

			turnCameraOn() {
				this.camera = 'auto';
			},

			turnCameraOff() {
				this.camera = 'off';
			},

			timeout(ms) {
				return new Promise(resolve => {
					window.setTimeout(resolve, ms);
				})
			},

			instantiateContract() {
				this.contractInstance = new this.oylaWeb3.eth.Contract(this.contractABI, '0xabcf4325a6DB0da91b5AB0A008002C4868eD2541');
			}
		},
		computed: {
			validationPending() {
				return this.isValid === undefined && this.camera === 'off';
			},

			validationSuccess() {
				return this.isValid === true;
			},

			validationFailure() {
				return this.isValid === false;
			}
		},
		created() {
			getWeb3.then(data => {
				console.log('Web3 bağlandı.')
				this.oylaWeb3 = data;
			});
		}
	}
</script>

<style scoped>
	.is-turquoise {
		background-color: #09f0cd;
	}

	.center-items {
		display: flex;
		justify-content: center;
		align-items: center;
	}

	.validation-success,
	.validation-failure,
	.validation-pending {
		position: absolute;
		width: 100%;
		height: 100%;

		background-color: rgba(255, 255, 255, .8);
		text-align: center;
		font-weight: bold;
		font-size: 1.4rem;
		padding: 10px;

		display: flex;
		flex-flow: column nowrap;
		justify-content: center;
	}

	.validation-success {
		color: green;
	}

	.validation-failure {
		color: red;
	}
</style>