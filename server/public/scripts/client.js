console.log('JS');

$(document).ready(onReady);

// define global variable for filtering to do list
let selectedCategory = 'all';

function onReady() {
    console.log('JQ');

    // get list from server/database
    getList();

    // click listeners
    $('#formContainer').on('click', '#addButton', postListItem);
    $('#listContainer').on('change', '.completeCheckbox', updateTask);
    $('#listContainer').on('click', '.deleteButton', deleteTask);

    // filter click listener
    $('.dropdown-menu').on('click', '.dropdown-item', determineCategory);
}

function determineCategory() {
    // declare variable for unique value of item selected
    let category = $(this).data().category;

    // reassign global selected category variable using switch case 
    // (determined by grabbing data-category value)

    // conditional will initiate GETTER function depending on value of selectedCategory
    switch (category) {
        case 'all':
            selectedCategory = category;
            getList();
            break;
        case 'chores':
            selectedCategory = category;
            getListCategory();
            break;
        case 'exercise':
            selectedCategory = category;
            getListCategory();
            break;
        case 'goals':
            selectedCategory = category;
            getListCategory();
            break;
        case 'grocery':
            selectedCategory = category;
            getListCategory();
            break;
        case 'other':
            selectedCategory = category;
            getListCategory();
            break;
        default:
            console.log('Something is wrong');
    }
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
    }).then(function (response) {
        console.log('PUTTER response', response);

        // get latest list from database
        getList();
    }).catch(function (error) {
        console.log('error in PUTTER', error);

    })
}
// --------------- END UPDATE TASK PUTTER -----------------//


// ----------------- DELETE TASK -----------------------// 
function deleteTask() {
    console.log('in deleteTask');

    // define value of unique list item id
    let id = $(this).data('delete');

    $.ajax({
        type: 'DELETE',
        url: `/list/${id}`,
    }).then(function (response) {
        console.log('DELETE response', response);

        // get latest list from database 
        getList();
    }).catch(function (response) {
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
    }).then(function (response) {
        console.log('GETTER response', response);

        // trigger renderList
        renderList(response);

    }).catch(function (error) {
        console.log('error in GETTER', error);

    })
}
// --------------- END GETTER ------------------//


// --------------- CATEGORY GETTER ----------------//
function getListCategory() {
    console.log('attempting to get:', selectedCategory);

    $.ajax({
        type: 'GET',
        url: `/list/${selectedCategory}`
    }).then(function(response){
        console.log('GETTER response', response);
        
        // will render list of selected category
        renderList(response);
    }) .catch(function(error){
        console.log('error in GETTER', error);
        
    })
}
// ------------ END CATEGORY GETTER ---------------//


// ------------- RENDER FUNCTIONS --------------//
function renderList(response) {
    console.log('in renderList');

    let list = response;

    let el = $('#listContainer');

    el.empty();

    for (let i = 0; i < list.length; i++) {
        if (list[i].complete === false) {
            el.append(`
            <div class="row justify-content-center align-items-center taskItem">
                <div class="col-1">
                <input type="checkbox" class="completeCheckbox" data-status=${list[i].complete} data-id=${list[i].id}>
                </div>

                <div class="col-4">
                    ${list[i].task}
                </div>
                
                <div class="col-1">
                    <button class="deleteButton btn btn-outline-danger btn-sm" data-delete=${list[i].id}>Delete</button>
                </div>
            </div>
            `)
        } else {
            el.append(`
            <div class="row justify-content-center align-items-center taskItem">
                <div class="col-1">
                <input type="checkbox" class="completeCheckbox" data-status=${list[i].complete} data-id=${list[i].id} checked>
                </div>

                <div class="col-4 taskComplete">
                    ${list[i].task}
                </div>
                
                <div class="col-1">
                    <button class="deleteButton btn btn-outline-danger btn-sm" data-delete=${list[i].id}>Delete</button>
                </div>
            </div>
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

    if (inputValidator(newListItem)) {
        alert("Please enter task");
        return;
    } // end input validator

    $.ajax({
        type: 'POST',
        url: '/list',
        data: newListItem,
    }).then(function (response) {
        console.log('response', response);

        // clear input field
        clearInputField();

        // get latest list from database
        getList();

    }).catch(function (error) {
        console.log('Error in POSTING', error);
    })
}
// ----------- END POSTER -----------//


// --------------- INPUT VALIDATOR ------------------//
function inputValidator(newListItem) {
    console.log('in inputValidator');

    if (newListItem.task === '') {
        return true;
    } else {
        return false;
    }
}
// -------------- END INPUT VALIDATOR ----------------//


// --------------- CLEAR INPUT ------------------//
function clearInputField() {
    console.log('in clearInputField');

    // clear input field
    $('#toDoTask').val('');
}
// --------------- END CLEAR INPUT ----------------//