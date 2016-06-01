'use strict';

let sBind = function() { // simple databinding namespace
  let domStore = {};     // private storage of jQuery references
  return {
    domStoreDump : function() { // for testing purposes only
      console.log(domStore);
    },
    update : function(refObj, key) { // the DOM is never queried :D
      const name = refObj.get('name'), value = refObj.get(key),
            arr = domStore[name][key];
      if (!name || value === null || !Array.isArray(arr)) {
        console.log('Error in parameters to sBind.update()');
        return false;
      }
      arr.forEach($span => { $span.text(value); });
      return true;
    },
    bind : function(args) { // with keys: type, reference, key, $object,
                            // typeOfEvent, callback, eventData
      // argument checking
      if (typeof args !== 'object') {
        console.log('bad args in sBind.bind()!');
        return false;
      }
      if (typeof args.reference !== 'object') {
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
          if (typeof args.eventData === 'object') {
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
      } else { // default to output
        if (typeof args.key !== 'string' && typeof args.key !== 'number') {
          console.log('bad args.key passed to sBind.bind()!');
          return false;
        }
        if (!(args.$object instanceof jQuery)) {
          args.$object = $('<span>'); // default bind to span
        }
        args.$object.text(args.reference.get(args.key));
      }

      let objectName = args.reference.get('name'),
          entry = domStore[objectName]; // retrieve the name of the object
      // here manage our domStore, for use by sBind.update()
      if (entry) {             // if domStore entry for this object exists
        if (entry[args.key]) { // if array exists for this particular key
          entry[args.key].push(args.$object);
        } else { // object exists in store, but not array for key
          entry[args.key] = [ args.$object ];
        }
      } else { // no domStore entry exists for this object
        let rName = args.reference.get('name');
        domStore[rName] = {};
        domStore[rName][args.key] = [];
        domStore[rName][args.key].push(args.$object);
      }
      return args.$object;
    }
  };
}();
