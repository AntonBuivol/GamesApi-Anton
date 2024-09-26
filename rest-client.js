const vue = Vue.createApp({
    data() {
        return {
            gameInModal: {name: null},
            games: [],
            gameInfoModalInstance: null
        }
    },
    async created() {
        this.games = await (await fetch('http://localhost:8080/games')).json();
    },
    methods: {
        getGame: async function(id) {
            this.gameInModal = await (await fetch(`http://localhost:8080/games/${id}`)).json();
            this.gameInfoModalInstance = new bootstrap.Modal(document.getElementById('gameInfoModal'), {});
            this.gameInfoModalInstance.show();
        },
        closeModal() {
            if (this.gameInfoModalInstance) {
                this.gameInfoModalInstance.hide();
            }
        }
    }
}).mount('#app')