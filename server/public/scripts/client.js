console.log('JS');

$(document).ready(onReady);

function onReady() {
    console.log('JQ');
    
    // get list from server/database
    getList();

    // click listeners
    $('#formContainer').on('click', '#addButton', postListItem);
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
} 
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
} 
// ----------- END RENDER FUNCTIONS -----------//


// --------------- POSTER ----------------------//
function postListItem() {
    console.log('in postListItem');

    let newListItem = {
        complete: false,
        task: $('#toDoTask').val(),
        category: $('#categorySelection').val()
    }
    
    console.log('newListItem', newListItem);
    
    $.ajax({
        type: 'POST',
        url: '/list',
        data: newListItem,
    }).then(function(response){
        console.log('response', response);
       
        // get latest list from database
        getList();
    }).catch(function(error){
        console.log('Error in POSTING', error);
    })
} 
// ----------- END POSTER -----------//