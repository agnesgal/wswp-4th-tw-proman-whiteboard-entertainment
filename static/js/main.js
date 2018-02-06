// This function is to initialize the application
function init() {
    DataHandler.init();
    (DataHandler._data.boards) ? DOM.showBoards() : null;
    let newBoardButton = document.getElementById(DOM.Constants.CreateBoardIDs.BUTTON_ID);
    newBoardButton.addEventListener('click', function() {
        let title = document.getElementById(DOM.Constants.CreateBoardIDs.INPUT_ID).value;
        document.getElementById(DOM.Constants.CreateBoardIDs.INPUT_ID).value = "";
        DataHandler.createNewBoard(title, DOM.showBoards);
    });
    // it uses the dom.js to show boards
}

init();
