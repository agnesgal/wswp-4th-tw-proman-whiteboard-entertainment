// this object contains the functions which handle the data and its reading/writing
// feel free to extend and change to fit your needs

// (watch out: when you would like to use a property/function of an object from the
// object itself then you must use the 'this' keyword before. For example: 'DataHandler._data' below)
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
        },
        KEY_IN_LOCAL_STORAGE: 'proman-data' // the string that you use as a key in localStorage to save your application data
    },

    _data: {}, // it contains the boards and their cards and statuses. It is not called from outside.

    _loadDefaultData: function() {
        DataHandler._data = Object.assign({}, DataHandler.Constants.DEFAULT_DATA);

        // save the default values to local storage:
        DataHandler._saveData();
    },

    _loadData: function() {
        // it is not called from outside
        // loads data from local storage, parses it and put into DataHandler._data property
        if (DataHandler.Constants.KEY_IN_LOCAL_STORAGE in localStorage) {
            DataHandler._data = JSON.parse(localStorage[DataHandler.Constants.KEY_IN_LOCAL_STORAGE]);

            for (let currentKey in DataHandler._data) {
                if (DataHandler.Constants.DEFAULT_DATA.hasOwnProperty(currentKey) && !DataHandler._data.hasOwnProperty(currentKey)) {
                    DataHandler._loadDefaultData();
                    break;
                }
            }
        }
        else {
            DataHandler._loadDefaultData();
        }
    },


    _saveData: function() {
        // it is not called from outside
        // saves the data from DataHandler._data to local storage
        localStorage[DataHandler.Constants.KEY_IN_LOCAL_STORAGE] = JSON.stringify(DataHandler._data);

    },


    init: function() {
        DataHandler._loadData();
    },


    getBoards: function(callback){
        $.ajax({
            dataType: "json",
            url: "/get-board",
            success: (function(data) {
                for (let row of data) {
                    callback(row);
                }
            })
        })
    },


    getStatuses: function() {
        // the statuses are retrieved and then the callback function is called with the statuses
        return DataHandler.Constants.DEFAULT_DATA.statuses;
    },


    createNewBoard: function(boardTitle, callback) {
        // creates new board, saves it and calls the callback function with its data
        // callback is the showBoard from the dom module
        let board = {
            "title": boardTitle,
        };
        $.ajax({
          type: "POST",
          url: "/new-board",
          data: board,
          success: (function(newBoard) {
              callback(newBoard);
          }),
          dataType: "json"
        });
    },

    editBoard: function(boardId, title) {
        $.ajax({
              type: "POST",
              url: "/edit-board",
              data: {'id': boardId, 'title': title},
              dataType: "json"
        });
    },

     editCard: function(card, title, callback) {
        $.ajax({
              type: "POST",
              url: "/edit-card",
              data: {'id': card.id, 'title': title},
              dataType: "json",
              succes: callback(card, title)
        });
    },

    createNewCard: function(cardTitle, boardId, statusId, callback) {
        // creates new card, saves it and calls the callback function with its data
        let newId = 0;
        $.ajax({url:'/get-max-card-id', dataType:'json', success:(function (data) {
                newId = data.id + 1;
                let card = {
                "id": newId,
                "title": cardTitle,
                "board_id": boardId,
                "status_id": statusId,
                };
                $.ajax({
                    type: "POST",
                    url: '/new-card',
                    data: card,
                    success: callback(card),
                    dataType: "json"
                });
            })});

    },


    sortCards: function(statusElementId, currentCardHTMLId) {
        let cardColumnElement = document.getElementById(statusElementId);
        let cardElementList = cardColumnElement.children;
        let statusId = parseInt(cardColumnElement.dataset.statusId);
        let cardId = parseInt(document.getElementById(currentCardHTMLId).dataset.cardId);

        for (let i = 0; i < cardElementList.length; i++){
            if (cardElementList[i].id === currentCardHTMLId) {
                $.ajax({
                    type: "POST",
                    url: '/drop-card',
                    data: {
                        card_id: cardId,
                        new_status_id: statusId,
                        new_order: i + 1
                    },
                    dataType: "json"
                });
                break;
            }
        }
    }
};

