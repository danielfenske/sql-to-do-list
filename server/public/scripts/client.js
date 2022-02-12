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
        
        // trigger renderList
        renderList(response);

    }).catch(function(error){
        console.log('error in GETTER', error);
        
    })
} // end getList
// --------------- END GETTER ------------------//


// ------------- RENDER FUNCTIONS --------------//
function renderList(response){
    console.log('in renderList');
    
    let list = response;

    let el = $('#listItems');

        el.empty();

    for (let i=0; i<list.length; i++) {
        el.append(`
        <tr>
            <td>${list[i].complete}</td>
            <td>${list[i].task}</td>
            <td>${list[i].category}</td>
        </tr>
        `)
    }
} // end renderList
// ----------- END RENDER FUNCTIONS -----------//