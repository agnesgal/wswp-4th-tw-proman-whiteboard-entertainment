// this object contains the functions which handle the data and its reading/writing
// feel free to extend and change to fit your needs

// (watch out: when you would like to use a property/function of an object from the
// object itself then you must use the 'this' keyword before. For example: 'this._data' below)
DataHandler = {
    Constants: {
        DEFAULT_DATA: {
            "statuses": [
                {
                    "id": 1,
                    "name": "New"
                },
                {
                    "id": 2,
                    "name": "In progress"
                },
                {
                    "id": 3,
                    "name": "Testing"
                },
                {
                    "id": 4,
                    "name": "Done"
                }
            ],
            "boards": [],
            "cards": []
        }
    },

    keyInLocalStorage: 'proman-data', // the string that you use as a key in localStorage to save your application data
    _data: {}, // it contains the boards and their cards and statuses. It is not called from outside.


    _loadData: function() {
        // it is not called from outside
        // loads data from local storage, parses it and put into this._data property
        this._data = JSON.parse(localStorage[this.keyInLocalStorage]);

        let BreakException = {};
        let that = this;
        try {
            this.Constants.DEFAULT_DATA.keys().forEach(function (currentKey) {
                if (!that._data.contains(currentKey)) {
                    throw BreakException;
                }
            });
        } catch (exception) {
            this._data = Object.assing({}, this.Constants.DEFAULT_DATA);
        }
    },


    _saveData: function() {
        // it is not called from outside
        // saves the data from this._data to local storage
        localStorage[this.keyInLocalStorage] = JSON.parse(this._data);
    },


    init: function() {
        this._loadData();
    },


    getBoards: function(callback) {
        // the boards are retrieved and then the callback function is called with the boards
    },


    getBoard: function(boardId, callback) {
        // the board is retrieved and then the callback function is called with the board
    },


    getStatuses: function() {
        // the statuses are retrieved and then the callback function is called with the statuses
    },


    getStatus: function(statusId, callback) {
        // the status is retrieved and then the callback function is called with the status
    },


    getCardsByBoardId: function(boardId, callback) {
        // the cards are retrieved and then the callback function is called with the cards
        // get all of the card details connected to the specified board
        // get statuses
        // separate cards by status id and returns the object
        /*
            {
                status1: [card1, card2]
                ...
            }
        */
    },


    getCard: function(cardId, callback) {
        // the card is retrieved and then the callback function is called with the card
    },


    createNewBoard: function(boardTitle, callback) {
        // creates new board, saves it and calls the callback function with its data
        // callback is the showBoard from the dom module
        let newID = (this._data.boards)? this._data.boards.length + 1 : 1;
        let board = {
            "id": newID,
            "title": boardTitle,
            "is_active": true,
        };
        if ('boards' in this._data) {
            this._data.boards.push(board);
        } else {
            this._data['boards'] = [board] ;
        }

        callback(board);
    },


    createNewCard: function(cardTitle, boardId, statusId, callback) {
        // creates new card, saves it and calls the callback function with its data
    }


    // here comes more features
};

