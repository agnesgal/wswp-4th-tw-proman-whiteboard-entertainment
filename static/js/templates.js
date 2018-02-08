Templates = {
    Constants: {
        HTMLPrefixes: {
            BOARD_ID: 'board_',
            STATUS_COLUMN_ID: 'status_column_',
            CARD_ID: 'card_'
        }
    },

    cardTemplate: function (card) {
        let generatedCard;
        generatedCard = `
                    <div class="card card-default" style="margin: 20px" align="center">
                        <div class="card-body" id="${this.Constants.HTMLPrefixes.CARD_ID}${card.id}">${card.title}</div>
                    </div>`;
        return generatedCard;
    },

    columnTemplate: function (status, boardID) {
        let generatedColumn;
        generatedColumn = `
                        <div class="card">
                            <div class="card-block w-100 h-100">
                                <h4 class="card-header" data-id="${status.id}">${status.name}</h4>
                                <div style="" class="w-100 h-100 column-body" id="${boardID}-${this.Constants.HTMLPrefixes.STATUS_COLUMN_ID}${status.id}">
                                
                                </div>
                            </div>
                        </div>`;
        return generatedColumn;
    },

    boardTemplate: function (board) {
        let generatedBoard;
        generatedBoard = `
            <div class="card">
                <div class="card-header" id="heading${board.id}">
                    <h5 class="mb-0">
                    <button class="btn btn-link" data-toggle="collapse" data-target="#collapse${board.id}" aria-expanded="true" aria-controls="collapse${board.id}">
                      ${board.title}
                    </button>
                    </h5>
                </div>
                <div id="collapse${board.id}" class="collapse" aria-labelledby="heading${board.id}" data-parent="#accordion">
                    <div class="card-body1" >
                        <!-- card group -->
                        <div class="card-group" id="${this.Constants.HTMLPrefixes.BOARD_ID}${board.id}">
                        
                        </div>
                        <!-- end of card group -->
                    </div>
                </div>
            </div>`;
        return generatedBoard;
    }
};
