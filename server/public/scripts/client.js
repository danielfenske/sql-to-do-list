console.log('JS');

$(document).ready(onReady);

function onReady() {
    console.log('JQ');
    
    // get list from server/database
    getList();

    // click listeners
    $('#formContainer').on('click', '#addButton', postListItem);
    $('#listTable').on('change', '.completeCheckbox', updateTask);
    $('#listTable').on('click', '.deleteButton', deleteTask);
}

// --------------- UPDATE TASK PUTTER ----------------------// 
function updateTask() {
    // define value of unique list item id
    let id = $(this).data('id');
    // define value of list item's completion status (true or false)
    let checkboxStatus = $(this).data('status');

    console.log('in updateTask', id, checkboxStatus);
    
    $.ajax({
        type: 'PUT',
        url: `/list/${id}`,
        data: {
            newCompletionStatus: !checkboxStatus
        }
    }).then(function(response){
        console.log('PUTTER response', response);

        // get latest list from database
        getList();
    }).catch(function(error){
        console.log('error in PUTTER', error);
        
    })
}
// --------------- END UPDATE TASK PUTTER -----------------//


// ----------------- DELETE TASK -----------------------// 
function deleteTask(){
    console.log('in deleteTask');
    
     // define value of unique list item id
     let id = $(this).data('delete');

    $.ajax({
        type: 'DELETE',
        url: `/list/${id}`,
    }).then(function (response){
        console.log('DELETE response', response);
        
        // get latest list from database 
        getList();
    }).catch(function (response){
        console.log('error in DELETE response', error);
        
    })
}
// --------------- END DELETE TASK --------------------// 


// --------------- GETTER ----------------------//
function getList() {
    console.log('in getList');
    
    // setup GETTER
    $.ajax({
        type: 'GET',
        url: '/list'
    }).then(function (response){
        console.log('GETTER response', response);
        
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
        if (list[i].complete === false) {
            el.append(`
            <tr>
                <td id="completedColumn">
                <input type="checkbox" class="completeCheckbox" data-status=${list[i].complete} data-id=${list[i].id}>
                </td>

                <td>${list[i].task}</td>
                <td>${list[i].category}</td>
                <td><button class="deleteButton" data-delete=${list[i].id}>Delete</button></td>
            </tr>
            `)
        } else {
            el.append(`
            <tr>
                <td id="completedColumn">
                <input type="checkbox" class="completeCheckbox" data-status=${list[i].complete} data-id=${list[i].id} checked>
                </td>
                <td class="taskComplete">${list[i].task}</td>
                <td>${list[i].category}</td>
                <td><button class="deleteButton" data-delete=${list[i].id}>Delete</button></td>
            </tr>
            `)
        }
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