var update = document.getElementById('update');

update.addEventListener('click', function () {
    fetch('goals', {
        method: 'put',
        headers: {'Content-Type':'application/json'},
        body: JSON.stringify({
            'player':'rooney',
            'goals': '999'
        })
    }).then(function (res) {
        if(res.ok) {
            return res.json();
        }
    }).then(function (data) {
        window.location.reload(true);
    });
});

var del = document.getElementById('delete');

del.addEventListener('click', function () {
    fetch('goals', {
        method: 'delete',
        headers: {'Content-Type':'application/json'},
        body: JSON.stringify({
            'player':'giggs'
        })
    }).then(function (res) {
        if(res.ok) {
            return res.json();
        }
    }).then(function (data) {
        console.log('data', data);
        window.location.reload(true);
    });
});