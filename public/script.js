let submitNotes=document.querySelector("#submitNotes");
submitNotes.addEventListener('click', function(e){
    let notes=document.querySelector('#notes');
    postJSON('/notes',{title:submitNotes.dataset.title,notes:notes.value})
    .then(function(res){
        console.log(res);
    })
})

let applied = document.querySelector("#applied");
applied.addEventListener('click', function(e) {
    postJSON('/applied', { title: submitNotes.dataset.title })
    .then(function(res) {
        console.log(res);
        window.location.reload();
    });
});

let saw=document.querySelector("#saw");
saw.addEventListener('click', function(e){
    postJSON('/applied',{title:submitNotes.dataset.title})
    .then(function(res){
        console.log(res);
        window.location.reload();
    })
})


function postJSON(url, json){
    return new Promise(function(resolve, reject){
        var xhr = new XMLHttpRequest();
        xhr.open('POST', url);
        xhr.onreadystatechange = handler;
        xhr.setRequestHeader('Content-Type', 'application/json;charset=UTF-8'); // ✅ Fixed here
        xhr.send(JSON.stringify(json));

        function handler(){
            if(xhr.readyState == 4){
                if(xhr.status == 200){
                    resolve(xhr.response);
                } else {
                    reject(new Error('postJSON: ' + url + ' failed with status: [' + xhr.status + ']'));
                }
            }
        }
    });
}