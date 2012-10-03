// Generated by CoffeeScript 1.3.3
(function() {
  var AdaServoDriver, CoffeeCup, CubeClass, ELEC_COLOR, cb1, cb2, cof, cube1, cubeStuff, extruded, resolution, result, servoDriver, shape, shape1, shape2, shape3, shape4, sphere1, sphere2, sphere3,
    __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

  ELEC_COLOR = [0.5, 0.5, 0.6];

  AdaServoDriver = (function() {

    AdaServoDriver.prototype.width = 25.4;

    AdaServoDriver.prototype.length = 62.5;

    AdaServoDriver.prototype.height = 3;

    function AdaServoDriver(pos, rot) {
      this.pos = pos != null ? pos : [0, 0, 0];
      this.rot = rot != null ? rot : [0, 0, 0];
      this.render = __bind(this.render, this);

    }

    AdaServoDriver.prototype.render = function() {
      var pcb, result;
      result = new CSG();
      pcb = CSG.cube({
        center: [0, 0, this.height / 2],
        radius: [this.width / 2, this.length / 2, this.height / 2]
      }).setColor(ELEC_COLOR);
      return result.translate(this.pos).rotateX(this.rot[0]).rotateY(this.rot[1]).rotateZ(this.rot[2]);
    };

    return AdaServoDriver;

  })();

  servoDriver = new AdaServoDriver();

  return servoDriver.render();

  resolution = 5;

  cube1 = CSG.roundedCube({
    center: [0, 0, 0],
    radius: [10, 10, 10],
    roundradius: 2,
    resolution: resolution
  });

  result = cube1;

  return result;

  CubeClass = (function() {

    CubeClass.prototype.width = 20;

    CubeClass.prototype.length = 20;

    CubeClass.prototype.height = 20;

    function CubeClass(pos, rot) {
      this.pos = pos != null ? pos : [0, 0, 0];
      this.rot = rot != null ? rot : [0, 0, 0];
      this.render = __bind(this.render, this);

      return this.render();
    }

    CubeClass.prototype.render = function() {
      result = new CSG();
      cube1 = CSG.cube({
        center: [0, 0, this.height / 2],
        radius: [this.width / 2, this.length / 2, this.height / 2]
      });
      result = cube1;
      return result.translate(this.pos).rotateX(this.rot[0]).rotateY(this.rot[1]).rotateZ(this.rot[2]);
    };

    return CubeClass;

  })();

  cubeStuff = new CubeClass();

  return cubeStuff;

  CubeClass = (function() {

    CubeClass.prototype.width = 20;

    CubeClass.prototype.length = 20;

    CubeClass.prototype.height = 20;

    function CubeClass(pos, rot) {
      this.pos = pos != null ? pos : [0, 0, 0];
      this.rot = rot != null ? rot : [0, 0, 0];
      this.render = __bind(this.render, this);

      return this.render();
    }

    CubeClass.prototype.render = function() {
      result = new CSG();
      cube1 = CSG.cube({
        center: [0, 0, this.height / 2],
        radius: [this.width / 2, this.length / 2, this.height / 2]
      });
      result = cube1.setColor(1.0, 0.5, 0.0);
      return result.translate(this.pos).rotateX(this.rot[0]).rotateY(this.rot[1]).rotateZ(this.rot[2]);
    };

    return CubeClass;

  })();

  CoffeeCup = (function() {

    function CoffeeCup(height, lowerDia, upperDia, thickness, pos, rot) {
      this.height = height != null ? height : 20;
      this.lowerDia = lowerDia != null ? lowerDia : 20;
      this.upperDia = upperDia != null ? upperDia : 24;
      this.thickness = thickness != null ? thickness : 3;
      this.pos = pos != null ? pos : [0, 0, 0];
      this.rot = rot != null ? rot : [0, 0, 0];
      this.render = __bind(this.render, this);

      return this.render();
    }

    CoffeeCup.prototype.render = function() {
      var cyl, hole;
      cyl = CSG.cylinder({
        start: [0, 0, 0],
        end: [0, this.height, 0],
        radiusStart: this.lowerDia / 2,
        radiusEnd: this.upperDia / 2,
        resolution: 100
      });
      hole = CSG.cylinder({
        start: [0, 2, 0],
        end: [0, this.height + 2, 0],
        radiusStart: (this.lowerDia - this.thickness) / 2,
        radiusEnd: (this.upperDia - this.thickness) / 2,
        resolution: 32
      });
      return cyl.subtract(hole).setColor(1, 0.8, 0.0);
    };

    return CoffeeCup;

  })();

  result = new CSG();

  cof = new CoffeeCup(35, 30, 40);

  cb1 = new CubeClass().setColor(0.0, 0.8, 0.0);

  cb2 = new CubeClass([3, 12, 7]);

  result = result.union(cb1).union(cb2).translate([0, 45, 0]).union(cof);

  return result;

  resolution = 16;

  cube1 = CSG.roundedCube({
    center: [0, 0, 0],
    radius: [10, 10, 10],
    roundradius: 2,
    resolution: resolution
  });

  sphere1 = CSG.sphere({
    center: [5, 5, 5],
    radius: 10,
    resolution: resolution
  });

  sphere2 = sphere1.translate([12, 5, 0]);

  sphere3 = CSG.sphere({
    center: [20, 0, 0],
    radius: 30,
    resolution: resolution
  });

  result = cube1;

  result = result.union(sphere1);

  result = result.subtract(sphere2);

  result = result.intersect(sphere3);

  return result.setColor(1.0, 0.5, 0.0);

  shape2 = CAG.circle({
    center: [-2, -2],
    radius: 4,
    resolution: 20
  });

  shape3 = CAG.rectangle({
    center: [5, -2],
    radius: [2, 3]
  });

  shape4 = CAG.roundedRectangle({
    center: [5, 7],
    radius: [4, 4],
    roundradius: 1,
    resolution: 24
  });

  shape1 = shape1.expand(1, 20);

  shape = shape1.union([shape2, shape3, shape4]);

  extruded = shape.extrude({
    offset: [0.5, 0, 10],
    twistangle: 30,
    twiststeps: 10
  });

  /*Openscad conversion, manual more complex 
  xtra=0.01
  MECHA_COLOR = [ 0.99, 0.85, 0.0 ]
  
  class tibia2
    constructor: (@pos=[0,0,0],@rot=[0,0,0], @length=54.4, @thickness=5, @servo_borders=3)->
      servo_width=12.5
      servo_length=23
      servo_height=22.5
    
      servo_hole_dia=2
      servo_mount_dist=2.5
      leg_width= 20
  
      r1= servo_width/2+servo_borders
  
      servo_mount_offset= servo_length/2+servo_mount_dist
      end_offset=10
      global_offset=3.2
  
      front_cut_corner_rad=1
      front_cut_center=5
      front_cut_corners=servo_length/2-front_cut_corner_rad
  
      rotate([90,0,0])
      translate(pos) rotate(rot) 
      {
        .setColor(MECHA_COLOR)
      
        difference()
        {
          linear_extrude(height =thickness)
          {
            hull()
            {
              translate([global_offset,15]) circle(r=r1);   
              translate([global_offset,-5])circle(r=r1);  
              translate([end_offset,front_cut_center])  circle(r=r1-1);   
            }
            hull()
            {
              translate([end_offset,front_cut_center])  circle(r=r1-1);   
              translate([0,-length+10])  circle(r=4);     
            }
            hull()
            {
              translate([0,-length+10])  circle(r=3);   
              translate([0,-length])  circle(r=2.8);  
            }
          }
          translate([0,5,thickness/2]) cube([servo_width,servo_length,thickness+xtra], center=true);
    
          translate([0,5-servo_mount_offset,thickness/2+xtra/2]) cylinder(r= servo_hole_dia/2, h= thickness+xtra+10, center=true, $fn=32);
          translate([0,5+servo_mount_offset,thickness/2+xtra/2]) cylinder(r= servo_hole_dia/2, h= thickness+xtra+10, center=true, $fn=32);
          
          //translate([12,3,-xtra/2]) cylinder(r=3, h= thickness+xtra);
    
          translate([0,0,-xtra/2]) 
          linear_extrude(height =thickness+xtra)
          {
            hull()
            {
            
            translate([10,front_cut_center+front_cut_corners])circle(r=1.0); 
            translate([13,front_cut_center]) circle(r=2);   
            translate([10,front_cut_center-front_cut_corners]) circle(r=1.0);   
            } 
          }
    
          translate([0,0,-xtra/2]) 
          linear_extrude(height =thickness+xtra*2)
          {
            hull()
            {
            translate([5,-20]) circle(r=2);   
            translate([0.5,-40])circle(r=1); 
            } 
          }
        }
  */


}).call(this);
