var list = [];
var current = -1;

// we load list.json which lists all images so far

function updateCurrent() {
	var im = document.getElementById("image");
	if (current >= 0) {
		var element = document.getElementById("current_id");
		if (element.textContent != undefined)
			element.textContent = current+" ("+list[current]+")";
		else
			element.innerText = current+" ("+list[current]+")";
		im.src = "img/"+list[current];
	}
}

function update_list(play_sound) {
	$.getJSON( "list.json?r="+Math.random(), function(data) {
		var do_go_last = false;
		if (current == list.length - 1) do_go_last = true;
		list = data;
		if ((do_go_last) && (current != list.length - 1)) {
			go_last();
			if (play_sound)
				$.playSound('sound');
		}
	});
	setTimeout(function() { update_list(true); }, 60000);
}

function go_prev() {
	if (current <= 0) return;
	current--;
	updateCurrent();
}

function go_next() {
	if (current >= (list.length-1)) return;
	current++;
	updateCurrent();
}

function go_first() {
	current = 0;
	updateCurrent();
}

function go_last() {
	current = list.length-1;
	updateCurrent();
}

update_list(false);
