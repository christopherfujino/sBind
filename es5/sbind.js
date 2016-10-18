'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var sBind = function () {
  // simple databinding namespace
  'use strict';

  var domStore = {}; // private storage of jQuery references
  return {
    update: function update(refObj, key) {
      // the DOM is never queried :D
      var name = refObj.get('name'),
          value = refObj.get(key),
          arr = domStore[name][key];
      if (!name || value === null || !Array.isArray(arr)) {
        console.log('Error in parameters to sBind.update()');
        return false;
      }
      arr.forEach(function ($span) {
        $span.text(value);
      });
      return true;
    },
    bindOutput: function bindOutput(reference, key, $object) {
      if ((typeof reference === 'undefined' ? 'undefined' : _typeof(reference)) !== 'object') {
        console.log('reference parameter passed to sBind.bindOutput() not an object');
        return false;
      }
      if (typeof key !== 'string') {
        console.log('"key" parameter passed to sBind.bindOutput() not a string');
        return false;
      }
      if (!($object instanceof jQuery)) {
        $object = $('<span>'); // default bind to span
      }
      $object.text(reference.get(key));

      var objectName = reference.get('name'),
          entry = domStore[objectName]; // retrieve the name of the object
      // here manage our domStore, for use by sBind.update()
      if (entry) {
        // if domStore entry for this object exists
        if (!entry[key]) {
          // if array exists for this particular key
          entry[key] = [];
        }
        entry[key].push($object);
      } else {
        // no domStore entry exists for this object
        var rName = reference.get('name');
        domStore[rName] = {};
        domStore[rName][key] = [];
        domStore[rName][key].push($object);
      }
      return $object;
    },
    bindInput: function bindInput($object, typeOfEvent, callback, eventData) {
      if (!($object instanceof jQuery)) {
        console.log('bad type of $object passed to sBind.bindInput()');
        return false;
      }
      if ((typeof eventData === 'undefined' ? 'undefined' : _typeof(eventData)) === 'object') {
        $object.on(typeOfEvent, eventData, callback);
      } else {
        $object.on(typeOfEvent, callback);
      }
      return $object;
    }
  };
}();