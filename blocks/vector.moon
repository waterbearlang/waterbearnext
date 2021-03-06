vector{

  // Basic constructor
  fromXY:Vector(x:Float, y:Float){ 
    Runtime.Vector(x,y)
  }

  // Polar constructor
  fromMag_angle_unit:Vector(mag:Float, angle:Float, unit:AngleUnit){
    Runtime.Vector(
      Math.mult(Math.cos(Math.radians(angle, unit) ), mag), 
      Math.mult(Math.sin(Math.radians(angle, unit) ), mag)
    )
  }

  // Vector math
  add:Vector(a:Vector, b:Vector){
    Runtime.Vector(Math.add(a.x, b.x), Math.add(a.y, b.y))
  }
}