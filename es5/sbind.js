'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

var sBind = function () {
  // simple databinding namespace
  var domStore = {}; // private storage of jQuery references
  return {
    domStoreDump: function domStoreDump() {
      // for testing purposes only
      console.log(domStore);
    },
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
    bind: function bind(args) {
      // with keys: type, reference, key, $object,
      // typeOfEvent, callback, eventData
      // argument checking
      if ((typeof args === 'undefined' ? 'undefined' : _typeof(args)) !== 'object') {
        console.log('bad args in sBind.bind()!');
        return false;
      }
      if (_typeof(args.reference) !== 'object') {
        console.log('bad args.reference to bind from in sBind.bind()');
        return false;
      }
      // meat of code
      if (args.type === 'input') {
        if (!(args.$object instanceof jQuery)) {
          console.log('bad args.$object passed to sBind.bind()!');
          return false;
        }
        if (args.typeOfEvent === 'click') {
          if (_typeof(args.eventData) === 'object') {
            args.$object.on(args.typeOfEvent, args.eventData, args.callback);
          } else {
            args.$object.on(args.typeOfEvent, args.callback);
          }
        }
        // implement other types of handlers?
        else {
            console.log('bad args.typeOfEvent passed to sBind.bind()!');
            return false;
          }
      } else {
        // default to output
        if (typeof args.key !== 'string' && typeof args.key !== 'number') {
          console.log('bad args.key passed to sBind.bind()!');
          return false;
        }
        if (!(args.$object instanceof jQuery)) {
          args.$object = $('<span>'); // default bind to span
        }
        args.$object.text(args.reference.get(args.key));
      }

      var objectName = args.reference.get('name'),
          entry = domStore[objectName]; // retrieve the name of the object
      // here manage our domStore, for use by sBind.update()
      if (entry) {
        // if domStore entry for this object exists
        if (entry[args.key]) {
          // if array exists for this particular key
          entry[args.key].push(args.$object);
        } else {
          // object exists in store, but not array for key
          entry[args.key] = [args.$object];
        }
      } else {
        // no domStore entry exists for this object
        var rName = args.reference.get('name');
        domStore[rName] = {};
        domStore[rName][args.key] = [];
        domStore[rName][args.key].push(args.$object);
      }
      return args.$object;
    }
  };
}();