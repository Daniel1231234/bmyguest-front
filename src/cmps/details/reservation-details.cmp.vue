<template >
    <div class="reservation-details flex reservation-layout ">
        <div class="flex reservation-header">
            <h2>
                ${{ stay.price }}
                <span>night</span>
            </h2>
            <div>
                <span> <i class=" fa fa-star"></i> {{ (stay.reviewScores.rating / 20).toFixed(2) }} <span
                        class="dot"></span></span>
                <span>
                    {{ stay.reviews.length }} reviews
                </span>
            </div>
        </div>
        <div class="option-container flex">
            <div @submit.stop class="date-container">
                <div class="checkin clickable">
                    <span class="top">CHECKIN</span>
                    <span v-if="!date.length" class="bottom">Add dates</span>
                    <span v-else class="bottom">{{
                            date[0].getDate()
                    }}/{{ date[0].getMonth() + 1 }}/{{ date[0].getYear() - 100 }}</span>
                </div>
                <div class="checkout clickable ">
                    <span class="top" style="padding-bottom: px;">CHECKOUT</span>
                    <span v-if="!date.length" class="bottom">Add dates</span>
                    <span v-else class="bottom">{{ date[1].getDate() }}/{{ date[1].getMonth() + 1 }}/{{
                            date[1].getYear() -
                            100
                    }}</span>
                </div>
                <el-date-picker v-model="date" @change="changeDate" start-placeholder="Check in "
                    end-placeholder="Check out " type="daterange" range-separator="|"
                    style=">* border: none; height: 65px;" />
            </div>
            <div class="dropdown">
                <button @click="toggle" class="dropbtn">
                    <h5>GUESTS</h5>
                    <div class="flex justify-between" style="align-items: center;">
                        <div>
                            <span v-if="guestAmount <= 1">{{ guestAmount }} guest</span>
                            <span v-else>{{ guestAmount }} guests</span>
                        </div>
                        <span><svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"
                                role="presentation" focusable="false"
                                style="display: block; fill: none; height: 16px; width: 16px; stroke: currentcolor; stroke-width: 4; overflow: visible;">
                                <g fill="none">
                                    <path
                                        d="m28 12-11.2928932 11.2928932c-.3905243.3905243-1.0236893.3905243-1.4142136 0l-11.2928932-11.2928932">
                                    </path>
                                </g>
                            </svg></span>
                    </div>
                </button>
                <div v-if="active" id="myDropdown" class="dropdown-content flex column">
                    <div class="flex justify-between">
                        <span>Adults</span>
                        <div>
                            <button v-if="adultAmount > 1" @click="inc(-1)">-</button>
                            <span class="adult-ctr">{{ adultAmount }}</span>
                            <button v-if="adultAmount < 9" @click="inc(1)">+</button>
                        </div>
                    </div>
                    <div class="flex justify-between">
                        <span>children</span>
                        <div>
                            <button v-if="children > 0" @click="incChildren(-1)">-</button>
                            <span class="adult-ctr">{{ children }}</span>
                            <button v-if="children < 9" @click="incChildren(1)">+</button>
                        </div>
                    </div>
                    <div class="flex justify-between" style="border: none;">
                        <span>infants</span>
                        <div>
                            <button v-if="infants > 0" @click="incInfants(-1)">-</button>
                            <span class="adult-ctr">{{ infants }}</span>
                            <button v-if="infants < 9" @click="incInfants(1)">+</button>
                        </div>
                    </div>
                    <span @click="active = false"
                        style="border-bottom: none; cursor: pointer; font-family: airbnb-bold; align-self: flex-end; text-decoration: underline;">
                        close </span>
                </div>
            </div>
        </div>
        <button class="reserve-btn" @click="reserveOrder"> Reserve </button>
        <div class="reservation-total-price" v-if="nights">
            <span>you will not be charged yet</span>
            <div class="total">
                <span>${{ stay.price }} x {{ nights }} nights</span><span>${{ totalPrice }}</span>
            </div>
            <div class="total-last">
                <span>service fee</span><span>$300</span>
            </div>
            <p>
                <span>Total:</span><span>${{ totalPrice + 300 }}</span>
            </p>
        </div>
    </div>
    <div v-if="this.openReservModal" class="modal-reserv-overlay">
    </div>
    <div v-if="this.openReservModal" class="reserv-modal flex justify-center justify-between">
        <div class="modal-main flex column">
            <div class="flex justify-between">
                <h2 class="bold">Reservation success!</h2>
                <svg class="clickable" @click="this.openReservModal = false" viewBox="0 0 32 32"
                    xmlns="http://www.w3.org/2000/svg" aria-hidden="true" role="presentation" focusable="false"
                    style="display: block; fill: none; height: 16px; width: 16px; stroke: currentcolor; stroke-width: 2; overflow: visible;">
                    <path d="m6 6 20 20"></path>
                    <path d="m26 6-20 20"></path>
                </svg>
            </div>


            <div class="trip-det flex column">
                <h3 class="pink bold">Your trip:</h3>


                <div class="flex justify-between"><span class="bold checkin">Check-In</span>{{
                        date[0].getDate()
                }}/{{ date[0].getMonth() + 1 }}/{{ date[0].getYear() - 100 }}</div>
                <div class="flex justify-between"><span class="bold checkout">Check-Out</span>{{ date[1].getDate()
                }}/{{
        date[1].getMonth() + 1
}}/{{ date[1].getYear() - 100 }}</div>
                <div class="flex justify-between"><span class="bold  night">Host name:</span>{{
                        this.stay.host.fullname
                }}</div>
            </div>
            <div class="flex column">
                <stayPreview :stay="this.stay" />
                <div class="price-det">
                    <h3 class="pink bold">Price details</h3>
                    <div class="flex justify-between"><span class="bold  adult">Adults:</span>{{ this.adultAmount }}
                    </div>
                    <div class="flex justify-between"><span class="bold  price">Total price:</span>${{
                            this.totalPrice
                    }}
                    </div>
                    <div class="flex justify-between"><span class="bold  night">Total nights:</span>{{ this.nights
                    }}
                    </div>
                </div>
            </div>
            <button class="reserve-btn" @click="goToStays">Look for more places to stay </button>
        </div>
    </div>
</template>

<script>
import reservationDropdown from '../details/reservation-dropdown.cmp.vue'
import datePicker from '../home/date-picker.cmp.vue'
import { showSuccessMsg } from '../../services/event-bus.service.js'
import stayPreview from '../stay-reserv-preview.cmp.vue'
import { socketService } from '../../services/socket.service'


export default {
    props: {
        stay: {
            type: Object,
            required: true,
        },
    },
    data() {
        return {
            active: false,
            adultAmount: 1,
            children: 0,
            infants: 0,
            date: [],
            totalPrice: 0,
            nights: null,
            loggedinUser: {},
            openReservModal: false,
            checkIn: null,
            chackOut: null,
            guestAmount: 1,
        };
    },
    async created() {
        try {
            this.loggedinUser = await this.$store.getters.loggedinUser
            this.date = this.$store.getters.getCurrDate
            if (this.date.length) this.changeDate()
        } catch (err) {
            console.log(" Error in loggedin", err)
            throw err
        }

        this.checkIn = new Date(this.date[0]).toLocaleDateString("en", { year: "numeric", month: "short", day: "numeric" })
        this.chackOut = new Date(this.date[1]).toLocaleDateString("en", { year: "numeric", month: "short", day: "numeric" })
    },
    methods: {
        getCreateAt() {
            let hours = new Date().getHours()
            let min = new Date().getMinutes()
            let day = new Date().getDate();
            let munth = new Date().getMonth()
            let createAt = `${day}/${munth}  ${hours}:${min}`
            return createAt
        },
        toggle() {
            this.active = !this.active
        },
        inc(num) {
            this.adultAmount += num
            this.guestAmount += num
        },
        incChildren(num) {
            this.children += num
            this.guestAmount += num
        },
        incInfants(num) {
            this.infants += num
            this.guestAmount += num
        },
        reservationValue() {
            const _MS_PER_DAY = 1000 * 60 * 60 * 24;
            const utc1 = Date.UTC(this.date[0].getFullYear(), this.date[0].getMonth(), this.date[0].getDate());
            const utc2 = Date.UTC(this.date[1].getFullYear(), this.date[1].getMonth(), this.date[1].getDate());
            this.nights = (Math.floor((utc2 - utc1) / _MS_PER_DAY))
        },
        async reserveOrder() {
            if (!this.date.length) {
                showSuccessMsg(`please choose date!`)
                return
            }
            this.openReservModal = true
            const orderDet = {
                checkin: this.date[0],
                checkout: this.date[1],
                guests: this.adultAmount,
                guestsDetails: {
                    guestId: this.loggedinUser._id,
                    guestName: this.loggedinUser.fullname,
                    imgUrl: this.loggedinUser.imgUrl,
                    phone: this.loggedinUser.phone,
                    email: this.loggedinUser.email
                },
                price: this.stay.price,
                totalPrice: this.totalPrice,
                stayId: this.stay._id,
                totalNight: this.nights,
                host: {
                    hostId: this.stay.host.id,
                    hostName: this.stay.host.fullname,
                },
                stay: {
                    name: this.stay.name,
                    imgUrl: this.stay.imgUrls[0]
                },
                status: 'pending',
                createAt: this.getCreateAt(),
            }
            this.$store.dispatch({ type: 'saveOrder', order: orderDet })
            socketService.emit('order-added', orderDet)
            console.log(this.date)
        },
        getTotalPrice() {
            this.totalPrice = +this.stay.price * this.nights
        },
        changeDate() {
            this.reservationValue()
            this.getTotalPrice()
        },
        goToStays() {
            this.$router.push('/')

        },
    },
    computed: {

    },
    unmounted() { },
    components: {
        reservationDropdown,
        datePicker,
        stayPreview,

    }
};
</script>
<style >
</style>