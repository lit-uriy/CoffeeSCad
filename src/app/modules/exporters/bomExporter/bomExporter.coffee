define (require) ->
  utils = require "modules/core/utils/utils"
  marionette = require 'marionette'
  
  vent = require 'modules/core/vent'
  reqRes = require 'modules/core/reqRes'
  Project = require 'modules/core/projects/project'
  ModalRegion = require 'modules/core/utils/modalRegion' 
  
  BomExporterView = require './bomExporterView'
  
  
  class BomExporter extends Backbone.Marionette.Application
    ###
    exports the given projects' bom (BILL of material) as a json file
    ###
    constructor:(options)->
      super options
      @mimeType = "application/sla"
      @on("start", @onStart)
    
    start:(options)=>
      @project= options.project ? new Project()
      reqRes.addHandler "bomExportUrl", ()=>
        try
          blobUrl = @export(@project)
          return blobUrl
        catch error
          return null
      
      @trigger("initialize:before", options)
      @initCallbacks.run(options, this)
      @trigger("initialize:after", options)
      @trigger("start", options)
    
    onStart:()=>
      ### 
      #hack
      @partsCollection = null
      if @project.get("partRegistry")?
        @partsCollection = new Backbone.Collection()
        for name,params of @project.get("partRegistry")
          for param, quantity of params
            #console.log "name #{name}, number:#{number} "
            #console.log param
            variantName = "Default"
            if param != ""
              variantName=""
             
            @partsCollection.add { name: name,variant:variantName, params: param,quantity: quantity, included:true } 
      
      @project.set("partsCollection", @partsCollection)
      ###   
          
      bomExporterView = new BomExporterView
        model: @project  
      modReg = new ModalRegion({elName:"exporter",large:true})
      modReg.on("closed", @stop)
      modReg.show bomExporterView
    
    stop:->
      console.log "closing bom exporter"
      
      #taken from marionette module
      # if we are not initialized, don't bother finalizing
      return  unless @_isInitialized
      @_isInitialized = false
      Marionette.triggerMethod.call this, "before:stop"
      
      # stop the sub-modules; depth-first, to make sure the
      # sub-modules are stopped / finalized before parents
      _.each @submodules, (mod) ->
        mod.stop()
      
      # run the finalizers
      @_finalizerCallbacks.run()
      
      # reset the initializers and finalizers
      @_initializerCallbacks.reset()
      @_finalizerCallbacks.reset()
      Marionette.triggerMethod.call this, "stop"
      
    export:(project)=>
      try
        jsonResult = @partsCollection.toJSON()
        jsonResult = encodeURIComponent(JSON.stringify(jsonResult))
      catch error
        console.log "Failed to generate bom data url: #{error}"
      
      exportUrl = "data:text/json;charset=utf-8," + jsonResult
      if not exportUrl then throw new Error("createing object url failed") 
      return exportUrl   
      
  return BomExporter
 
  