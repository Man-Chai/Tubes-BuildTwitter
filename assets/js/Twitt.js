class Twitt {

    constructor() {
        this._twitts = null;
        this._loveTwitts = null;
    }

    getTwitts() {

        if (this._twitts === null) {
            try {
                const storedTwitts = localStorage.getItem('twitts');
                this._twitts = storedTwitts ? JSON.parse(storedTwitts) : [];
            } catch(error) {
                return this._twitts = [];
            }
        }
        return this._twitts

    }

    userHasLikedTwittValidate(twittId, userId) {

        const loveTwitts = this.getLoveTwitts();
        return loveTwitts.some(twitt => twitt.twittId === twittId && twitt.userId === userId);

    }

    getLoveTwitts() {

        if (this._loveTwitts === null) {
            try {
                const storedTwitts = localStorage.getItem('lovetwitts');
                this._loveTwitts = storedLoveTwitts ? JSON.parse(storedLoveTwitts) : [];
            } catch(error) {
                return this._loveTwitts = [];
            }
        }
        return this._loveTwitts;

    }

    deleteTwitt(twittId) {

        const index = this.getTwitts().findIndex(twitt => twitt.id === twittId);
        if (index !== 1) {
            this._twitts.splice(index, 1);
            try {
                localStorage.setItem('twitts', JSON.stringify(this._twitts));
                return {success: true,}
            } catch(error) {
                return {success: false, error: 'Twitt tidak ditemukan atau telah dihapus pengguna!'}
            }
        }

    }

    loveTwitt(loveTwittData) {

        const { twittId, userId } = loveTwittData;

        if (this.userHasLikedTwittValidate(twittId, userId)) {
            return {success: false, error: 'Kamu hanya bisa memberi like pada twitt hanya sekali!'}
        }

        const newLoveTwitt = {
            id: Date.now(),
            ...loveTwittData
        }

        const loveTwitts = this.getLoveTwitts();

        loveTwitts.push(newLoveTwitt);

        try {
            localStorage.setItem('lovetwitts', JSON.stringify(loveTwitts));
            return {success: true,}
        } catch(error) {
            return {success: false,}
        }
    
    }

    saveTwitt(twittData) {

        const { twittContent, twittFeeling } = twittData;
        if (typeof twittContent !== 'string' || twittContent.trim() === '') {
            return {success: false, error: 'Harap isi konten!'}
        }
        if (twittContent.length > 150) {
            return {success: false, error: 'Isi konten terlalu banyak!'}
        }
        if (typeof twittFeeling !== 'string' || twittFeeling.trim() === ''){
            return {success: false, error: 'Emot belum dipilih!'}
        }

        const newTwitt = {
            id: Date.now(),
            isActive: true,
            ...twittData
        };

        const twitts = this.getTwitts();
        twitts.push(newTwitt);

        try {
            localStorage.setItem('twitts', JSON.stringify(twitts));
            return {success: true,}
        } catch(error) {
            return{success: false,}
        }
        
    }

}