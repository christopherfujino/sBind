# sBind
A simple data-binding module depending only on jQuery and written in ES2015.

## Changelog

* fixed: moved code managing domStore to only execute for output bindings, otherwise no reason to perform an update
* new: added README.md

### 0.1

* initial version
* fixed: bug where domStore child object was named "key," rather than the value of args.key

## To Do List

* split .bind() method into separate .bindInput() & .bindOutput() methods
* change .bind() configuration object parameter to individual parameters
