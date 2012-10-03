// Generated by CoffeeScript 1.3.3
(function() {
  var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    __indexOf = [].indexOf || function(item) { for (var i = 0, l = this.length; i < l; i++) { if (i in this && this[i] === item) return i; } return -1; };

  window.OpenCoffeeScad = {};

  OpenCoffeeScad.log = function(txt) {
    var deltatime, prevtime, timeInMs;
    timeInMs = Date.now();
    prevtime = OpenCoffeeScad.log.prevLogTime;
    prevtime = !prevtime ? timeInMs : void 0;
    deltatime = timeInMs - prevtime;
    return OpenCoffeeScad.log.prevLogTime = timeInMs;
    /*timefmt = (deltatime*0.001).toFixed(3)
    txt = "["+timefmt+"] "+txt
    if (typeof(console) == "object") && (typeof(console.log) == "function") 
      console.log(txt)
    else if (typeof(self) == "object") && (typeof(self.postMessage) == "function") 
      self.postMessage({cmd: 'log', txt: txt})
    else throw new Error("Cannot log")
    */

  };

  OpenCoffeeScad.isChrome = function() {
    return navigator.userAgent.search("Chrome") >= 0;
  };

  OpenCoffeeScad.Processor = (function() {

    function Processor(debug, currentObject, statusdiv, viewer) {
      this.currentObject = currentObject;
      this.statusdiv = statusdiv;
      this.viewer = viewer;
      this.rebuildSolid = __bind(this.rebuildSolid, this);

      this.setCurrentObject = __bind(this.setCurrentObject, this);

      this.debug = debug != null ? debug : true;
      console.log("debug " + this.debug + ",@statusdiv : " + this.statusdiv + ", @viewer: " + this.viewer);
    }

    Processor.prototype.abort = function() {};

    Processor.prototype.setError = function(errorMsg) {
      return console.log("ERROR: " + errorMsg);
    };

    Processor.prototype.setCurrentObject = function(obj) {
      var csg, ext;
      this.currentObject = obj;
      if (this.viewer) {
        csg = this.convertToSolid(obj);
        this.viewer.setCsg(csg);
      }
      this.hasValidCurrentObject = true;
      ext = this.extensionForCurrentObject();
    };

    Processor.prototype.convertToSolid = function(obj) {
      if ((typeof obj === "object") && (obj instanceof CAG)) {
        obj = obj.extrude({
          offset: [0, 0, 0.1]
        });
      } else if ((typeof obj === "object") && (obj instanceof CSG)) {

      } else {
        throw new Error("Cannot convert to solid");
      }
      return obj;
    };

    Processor.prototype.extensionForCurrentObject = function() {
      extension;

      var extension;
      if (this.currentObject instanceof CSG) {
        extension = "stl";
      } else if (this.currentObject instanceof CAG) {
        extension = "dxf";
      } else {
        throw new Error("Not supported");
      }
      return extension;
    };

    Processor.prototype.clearViewer = function() {
      this.clearOutputFile();
      this.setCurrentObject(new CSG());
      this.hasValidCurrentObject = false;
      return this.enableItems();
    };

    Processor.prototype.clearOutputFile = function() {
      if (this.hasOutputFile) {
        this.hasOutputFile = false;
        if (this.outputFileDirEntry) {
          this.outputFileDirEntry.removeRecursively(function() {});
          this.outputFileDirEntry = null;
        }
        if (this.outputFileBlobUrl) {
          OpenJsCad.revokeBlobUrl(this.outputFileBlobUrl);
          this.outputFileBlobUrl = null;
        }
        this.enableItems();
        if (this.onchange) {
          return this.onchange();
        }
      }
    };

    Processor.prototype.enableItems = function() {};

    /*
      runMainInWorker: (mainParams) -> 
        try
          #TODO: adapt this to coffeescad
          if (typeof(main) != 'function') 
            throw new Error('Your jscad file should contain a function main() which returns a CSG solid or a CAG area.')
            #OpenJsCad.log.prevLogTime = Date.now()
            result = main(mainParameters);
            if( (typeof(result) != "object") || ((!(result instanceof CSG)) && (!(result instanceof CAG))))
              throw new Error("Your main() function should return a CSG solid or a CAG area.")
            result_compact = result.toCompactBinary()
            result = null # not needed anymore
            #self.postMessage({cmd: 'rendered', result: result_compact});
            
        catch error
          errorTxt = error.stack
          if errtxt?
            errorTxt = error.toString()
            postMessage({cmd: 'error', err: errorTxt})
    */


    Processor.prototype.parseJsCadScriptSync = function(script, mainParameters, debugging) {
      var f, result, workerscript;
      workerscript = "";
      workerscript += script;
      if (this.debuging) {
        workerscript += "\n\n\n\n\n\n\n/* -------------------------------------------------------------------------\n";
        workerscript += "OpenJsCad debugging\n\nAssuming you are running Chrome:\nF10 steps over an instruction\nF11 steps into an instruction\n";
        workerscript += "F8  continues running\nPress the (||) button at the bottom to enable pausing whenever an error occurs\n";
        workerscript += "Click on a line number to set or clear a breakpoint\n";
        workerscript += "For more information see: http://code.google.com/chrome/devtools/docs/overview.html\n\n";
        workerscript += "------------------------------------------------------------------------- */\n";
        workerscript += "\n\n// Now press F11 twice to enter your main() function:\n\n";
        workerscript += "debugger;\n";
      }
      workerscript += "return main(" + JSON.stringify(mainParameters) + ");";
      f = new Function(workerscript);
      result = f();
      return result;
    };

    Processor.prototype.parseCoffeesCadScriptSync = function(script, mainParameters, debugging) {
      var f, result, workerscript;
      workerscript = "";
      workerscript += script;
      if (this.debuging) {
        workerscript += "\n\n\n\n\n\n\n/* -------------------------------------------------------------------------\n";
        workerscript += "OpenJsCad debugging\n\nAssuming you are running Chrome:\nF10 steps over an instruction\nF11 steps into an instruction\n";
        workerscript += "F8  continues running\nPress the (||) button at the bottom to enable pausing whenever an error occurs\n";
        workerscript += "Click on a line number to set or clear a breakpoint\n";
        workerscript += "For more information see: http://code.google.com/chrome/devtools/docs/overview.html\n\n";
        workerscript += "------------------------------------------------------------------------- */\n";
        workerscript += "\n\n// Now press F11 twice to enter your main() function:\n\n";
        workerscript += "debugger;\n";
      }
      workerscript += "return main(" + JSON.stringify(mainParameters) + ");";
      f = new Function(workerscript);
      result = f();
      return result;
    };

    Processor.prototype.getBlobBuilder = function() {
      bb;

      var bb;
      if (window.BlobBuilder) {
        bb = new window.BlobBuilder();
      } else if (window.WebKitBlobBuilder) {
        bb = new window.WebKitBlobBuilder();
      } else if (window.MozBlobBuilder) {
        bb = new window.MozBlobBuilder();
      } else {
        throw new Error("Your browser doesn't support BlobBuilder");
      }
      return bb;
    };

    Processor.prototype.setJsCad = function(script, filename) {
      var scripthaserrors;
      filename = !filename ? "openjscad.jscad" : void 0;
      filename = filename.replace(/\.jscad$/i, "");
      this.clearViewer();
      this.paramDefinitions = [];
      this.paramControls = [];
      this.script = null;
      scripthaserrors = false;
      try {

      } catch (e) {
        this.setError(e.toString());
        scripthaserrors = true;
      }
      if (!scripthaserrors) {
        this.script = script;
        this.filename = filename;
        return this.rebuildSolid();
      } else {

      }
    };

    Processor.prototype.createParamControls = function() {
      var captions, control, errorprefix, i, label, option, paramControls, paramdef, selectedindex, tablerows, td, tr, type, valueindex, values, _i, _j, _ref, _ref1;
      this.paramControls = [];
      paramControls = [];
      tablerows = [];
      for (i = _i = 0, _ref = this.paramDefinitions.length; 0 <= _ref ? _i <= _ref : _i >= _ref; i = 0 <= _ref ? ++_i : --_i) {
        errorprefix = "Error in parameter definition #" + (i + 1) + ": ";
        paramdef = this.paramDefinitions[i];
        if (!(__indexOf.call(paramdef, 'name') >= 0)) {
          throw new Error(errorprefix + "Should include a 'name' parameter");
        }
        type = "text";
        type = __indexOf.call(paramdef, 'type') >= 0 ? paramdef.type : void 0;
        if ((type !== "text") && (type !== "int") && (type !== "float") && (type !== "choice")) {
          throw new Error(errorprefix + "Unknown parameter type '" + type + "'");
        }
        control = null;
        if ((type === "text") || (type === "int") || (type === "float")) {
          control = document.createElement("input");
          control.type = "text";
          if ((__indexOf.call(paramdef, 'default') >= 0)) {
            control.value = paramdef["default"];
          } else {
            if ((type === "int") || (type === "float")) {
              control.value = "0";
            } else {
              control.value = "";
            }
          }
        } else if (type === "choice") {
          if (!(__indexOf.call(paramdef, 'values') >= 0)) {
            throw new Error(errorprefix + "Should include a 'values' parameter");
          }
          control = document.createElement("select");
          values = paramdef.values;
          captions = null;
          if (__indexOf.call(paramdef, 'captions') >= 0) {
            captions = paramdef.captions;
            if (captions.length !== values.length) {
              throw new Error(errorprefix + "'captions' and 'values' should have the same number of items");
            }
          } else {
            captions = values;
          }
          selectedindex = 0;
          for (valueindex = _j = 0, _ref1 = values.length; 0 <= _ref1 ? _j <= _ref1 : _j >= _ref1; valueindex = 0 <= _ref1 ? ++_j : --_j) {
            option = document.createElement("option");
            option.value = values[valueindex];
            option.text = captions[valueindex];
            control.add(option);
            if (__indexOf.call(paramdef, 'default') >= 0) {
              if (paramdef["default"] === values[valueindex]) {
                selectedindex = valueindex;
              }
            }
          }
          if (values.length > 0) {
            control.selectedIndex = selectedindex;
          }
        }
        paramControls.push(control);
        tr = document.createElement("tr");
        td = document.createElement("td");
        label = paramdef.name + ":";
        if (__indexOf.call(paramdef, 'caption') >= 0) {
          label = paramdef.caption;
        }
        td.innerHTML = label;
        tr.appendChild(td);
        td = document.createElement("td");
        td.appendChild(control);
        tr.appendChild(td);
        tablerows.push(tr);
      }
      tablerows.map(function(tr) {
        return this.parameterstable.appendChild(tr);
      });
      return this.paramControls = paramControls;
    };

    Processor.prototype.getParamDefinitions = function(script) {
      var f, params, script1, scriptisvalid;
      scriptisvalid = true;
      try {
        f = new Function(script);
        f();
      } catch (e) {
        scriptisvalid = false;
      }
      params = [];
      if (scriptisvalid) {
        script1 = "if(typeof(getParameterDefinitions) == 'function') {return getParameterDefinitions();} else {return [];} ";
        script1 += script;
        f = new Function(script1);
        params = f();
        if ((typeof params !== "object") || (typeof params.length !== "number")) {
          throw new Error("The getParameterDefinitions() function should return an array with the parameter definitions");
        }
      }
      return params;
    };

    Processor.prototype.getParamValues = function() {
      var control, i, isnumber, paramValues, paramdef, type, value, _i, _ref;
      if (this.debug) {
        console.log("Getting param values");
        console.log("" + this.paramDefinitions.length);
      }
      paramValues = {};
      for (i = _i = 0, _ref = this.paramDefinitions.length; 0 <= _ref ? _i < _ref : _i > _ref; i = 0 <= _ref ? ++_i : --_i) {
        paramdef = this.paramDefinitions[i];
        type = "text";
        if (__indexOf.call(paramdef, 'type') >= 0) {
          type = paramdef.type;
        }
        control = this.paramControls[i];
        value = "";
        if ((type === "text") || (type === "float") || (type === "int")) {
          value = control.value;
          if ((type === "float") || (type === "int")) {
            isnumber = !isNaN(parseFloat(value)) && isFinite(value);
            if (!isnumber) {
              throw new Error("Not a number: " + value);
            }
            if (type === "int") {
              value = parseInt(value);
            } else {
              value = parseFloat(value);
            }
          }
        } else if (type === "choice") {
          value = control.options[control.selectedIndex].value;
        }
        paramValues[paramdef.name] = value;
      }
      if (this.debug) {
        console.log("Finished getting param values");
      }
      return paramValues;
    };

    Processor.prototype.rebuildSolid = function() {
      var errtxt, obj, paramValues, useSync;
      if (this.debug) {
        this.processing = true;
        paramValues = null;
        useSync = this.debug;
        if (!useSync) {
          try {
            this.worker = this.parseJsCadScriptASync(this.script, paramValues, function(err, obj) {
              this.processing = false;
              this.worker = null;
              if (err) {
                return this.setError(err);
              } else {
                return this.setCurrentObject(obj);
              }
            });
            this.enableItems();
          } catch (e) {
            useSync = true;
          }
        }
        if (useSync) {
          try {
            obj = this.parseJsCadScriptSync(this.script, paramValues, this.debugging);
            this.setCurrentObject(obj);
            return this.processing = false;
          } catch (e) {
            this.processing = false;
            errtxt = e.stack;
            if (!errtxt) {
              errtxt = e.toString();
            }
            return this.setError(errtxt);
          }
        }
      }
    };

    return Processor;

  })();

}).call(this);
