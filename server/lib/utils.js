var extend = require('util')._extend;

cl = function(m) {console.log(m);}

findIndexForId = function(objs, id) {
		for (var i=0; i<objs.length; i++) {
			if (objs[i].id == id) return i;
		}
        return -1;
};

findNextId = function(objs) {
	var nextId = 0;
	for (var i=0; i<objs.length; i++) {
		if (objs[i].id > nextId) nextId = objs[i].id;
	}
	return nextId+1;
};


addObj = function(objs, obj) {
			objs.push(obj);
};

updateObj = function(objs, obj) {
	var index = findIndexForId(objs, obj.id)
    if (index === -1) return {};
    //	cl("Found index for: '" + obj.id + "': " + index);
    objs[index] = extend(objs[index], obj);
    return objs[index];
};

deleteObj = function(objs, id) {
	var index = findIndexForId(objs, id);
    if (index === -1) return {};
    objs.splice(index, 1);
};
