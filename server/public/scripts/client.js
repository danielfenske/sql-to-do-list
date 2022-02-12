console.log('JS');

$(document).ready(onReady);

function onReady() {
    console.log('JQ');
    
    // get list from server/database
    getList();
}

// --------------- GETTER ----------------------//
function getList() {
    console.log('in getList');
    
    // setup GETTER
    $.ajax({
        type: 'GET',
        url: '/list'
    }).then(function (response){
        console.log('response', response);
        
    }).catch(function(error){
        console.log('error in GETTER', error);
        
    })
} // end getList
// --------------- END GETTER ------------------//
