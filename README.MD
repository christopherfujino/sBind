# sBind
A simple data-binding module depending only on jQuery and written in ES2015.

## Changelog

* changed: deprecated .bind()

### 0.2

* new: added README.md
* fixed: moved code managing domStore to only execute for output bindings, otherwise no reason to perform an update
* new: separate methods for .bindInput() & .bindOutput() which now use separate parameters, rather than object
* fixed: typo of args.key rather than key
* fixed: bug where sBind.bindOutput() failed to return $object

### 0.1

* initial version
* fixed: bug where domStore child object was named "key," rather than the value of args.key

## To Do List

