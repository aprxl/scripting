//region dependencies


/**
 * @title Vector
 * @version 1.0.0
 * @description A 2d and 3d Vector and angle lib for Onetap.
 */

/**
 * Converts radians into degrees
 *
 * @param {Number} rad The radian value.
 */
function radian_to_degree(rad)
{
  return rad * 180 / Math.PI;
}

/**
 * Converts degrees into radians
 *
 * @param {Number} rad The degree value.
 */
function degree_to_radian(deg)
{
  return deg * Math.PI / 180;
}

/**
 * Creates a new Angle instance
 *
 * @param  {Number|Array} p Pitch
 * @param  {Number} y Yaw
 * @param  {Number} r Roll
 * @return {void}
 */
function Angle(p, y, r)
{
  if (p instanceof Array)
  {
      this.p = p[0] || 0;
      this.y = p[1] || 0;
      this.r = p[2] || 0;
      return;
  }

  this.p = p || 0;
  this.y = y || 0;
  this.r = r || 0;
}


/**
 * Overrides the values of a angle object.
 *
 * @param  {Number|Array} p New pitch
 * @param  {Number} y New yaw
 * @param  {Number} r New roll
 * @return {void}
 */
Angle.prototype.set = function(p, y, r)
{
  if (p instanceof Array)
  {
    this.p = p[0] || 0;
    this.y = p[1] || 0;
    this.r = p[2] || 0;
    return;
  }

  this.p = p || 0;
  this.y = y || 0;
  this.r = r || 0;
}


/**
 * Adds an offset to your angle
 *
 * @param  {Number|Array} p Pitch offset
 * @param  {Number} y Yaw offset
 * @param  {Number} r Roll offset
 * @return {void}
 */
Angle.prototype.offset = function(p, y, r)
{
  if (p instanceof Array)
  {
    this.p = this.p + (p[0] || 0);
    this.y = this.y + (p[1] || 0);
    this.r = this.r + (p[2] || 0);
    return;
  }

  this.p = this.p + (p || 0);
  this.y = this.y + (y || 0);
  this.r = this.r + (r || 0);
}


/**
 * Creates a new Angle instance from already existing angle object.
 *
 * @return {Angle}  The original angle object.
 */
Angle.prototype.copy = function()
{
  return new Angle(
    this.p,
    this.y,
    this.r
  );
}


/**
 * Creates a new Angle instance from already existing angle object with an offset.
 *
 * @param  {Number|Array} p Pitch offset
 * @param  {Number} y Yaw offset
 * @param  {Number} r Roll offset
 * @return {Angle}   The new angle object.
 */
Angle.prototype.copy_offset = function(p, y, r)
{
  if (p instanceof Array)
  {
    return new Angle(
      this.p + (p[0] || 0),
      this.y + (p[1] || 0),
      this.r + (p[2] || 0)
    );
  }

  return new Angle(
    this.p + (p || 0),
    this.y + (y || 0),
    this.r + (r || 0)
  );
}


/**
 * Returns the angle object into an array.
 *
 * @return +{Array}  The angles array.
 */
Angle.prototype.to_array = function()
{
  return [this.p, this.y, this.r];
}

/**
 * Set all angles to 0
 *
 * @return {void}
 */
Angle.prototype.zero = function()
{
  this.p = 0;
  this.y = 0;
  this.r = 0;
}


/**
 * Converts the angle object into an string.
 *
 * @return {String}  The converted string.
 */
Angle.prototype.toString = function()
{
  return this.p + ", " + this.y + ", " + this.r;
}


/**
 * Adds a value, an array or another angle object to this angle instance.
 *
 * @param  {Number|Array|Angle} p The pitch amount
 * @param  {Number} y The yaw amount
 * @param  {Number} r The roll amount
 * @return {Angle}   The final angle.
 */
Angle.prototype.add = function(p, y, r)
{
  if (p instanceof Array)
  {
      this.p = this.p + (p[0] || 0);
      this.y = this.y + (p[1] || 0);
      this.r = this.r + (p[2] || 0);
      return;
  }

  if (p instanceof Angle)
  {
    this.p = this.p + (p.p || 0);
    this.y = this.y + (p.y || 0);
    this.r = this.r + (p.r || 0);
    return;
  }

  if (p != undefined && y == undefined && r == undefined)
  {
    this.p = this.p + p;
    this.y = this.y + p;
    this.r = this.r + p;
    return;
  }

    this.p = this.p + (p || 0);
    this.y = this.y + (y || 0);
    this.r = this.r + (r || 0);
}

/**
 * Subtract a value, an array or another angle object to this angle instance.
 *
 * @param  {Number|Array|Angle} p The pitch amount
 * @param  {Number} y The yaw amount
 * @param  {Number} r The roll amount
 * @return {Angle}   The final angle.
 */
Angle.prototype.sub = function(p, y, r)
{
  if (p instanceof Array)
  {
      this.p = this.p - (p[0] || 0);
      this.y = this.y - (p[1] || 0);
      this.r = this.r - (p[2] || 0);
      return;
  }

  if (p instanceof Angle)
  {
    this.p = this.p - (p.p || 0);
    this.y = this.y - (p.y || 0);
    this.r = this.r - (p.r || 0);
    return;
  }

  if (p != undefined && y == undefined && r == undefined)
  {
    this.p = this.p - p;
    this.y = this.y - p;
    this.r = this.r - p;
    return;
  }

    this.p = this.p - (p || 0);
    this.y = this.y - (y || 0);
    this.r = this.r - (r || 0);
}

/**
 * Multiplies a value, an array or another angle object to this angle instance.
 *
 * @param  {Number|Array|Angle} p The pitch amount
 * @param  {Number} y The yaw amount
 * @param  {Number} r The roll amount
 * @return {Angle}   The final angle.
 */
Angle.prototype.multiply = function(p, y, r)
{
  if (p instanceof Array)
  {
      this.p = this.p * (p[0] || 0);
      this.y = this.y * (p[1] || 0);
      this.r = this.r * (p[2] || 0);
      return;
  }

  if (p instanceof Angle)
  {
    this.p = this.p * (p.p || 0);
    this.y = this.y * (p.y || 0);
    this.r = this.r * (p.r || 0);
    return;
  }

  if (p != undefined && y == undefined && r == undefined)
  {
    this.p = this.p * p;
    this.y = this.y * p;
    this.r = this.r * p;
    return;
  }

    this.p = this.p * (p || 0);
    this.y = this.y * (y || 0);
    this.r = this.r * (r || 0);
}

/**
 * Divide a value, an array or another angle object to this angle instance.
 *
 * @param  {Number|Array|Angle} p The pitch amount
 * @param  {Number} y The yaw amount
 * @param  {Number} r The roll amount
 * @return {Angle}   The final angle.
 */
Angle.prototype.divide = function(p, y, r)
{
  if (p instanceof Array)
  {
      this.p = this.p / (p[0] || 0);
      this.y = this.y / (p[1] || 0);
      this.r = this.r / (p[2] || 0);
      return;
  }

  if (p instanceof Angle)
  {
    this.p = this.p / (p.p || 0);
    this.y = this.y / (p.y || 0);
    this.r = this.r / (p.r || 0);
    return;
  }

  if (p != undefined && y == undefined && r == undefined)
  {
    this.p = this.p / p;
    this.y = this.y / p;
    this.r = this.r / p;
    return;
  }

    this.p = this.p / (p || 0);
    this.y = this.y / (y || 0);
    this.r = this.r / (r || 0);
}

/**
 * Powers a value, an array or another angle object to this angle instance.
 *
 * @param  {Number|Array|Angle} p The pitch amount
 * @param  {Number} y The yaw amount
 * @param  {Number} r The roll amount
 * @return {Angle}   The final angle.
 */
Angle.prototype.pow = function(p, y, r)
{
  if (p instanceof Array)
  {
      this.p = this.p ** (p[0] || 0);
      this.y = this.y ** (p[1] || 0);
      this.r = this.r ** (p[2] || 0);
      return;
  }

  if (p instanceof Angle)
  {
    this.p = this.p ** (p.p || 0);
    this.y = this.y ** (p.y || 0);
    this.r = this.r ** (p.r || 0);
    return;
  }

  if (p != undefined && y == undefined && r == undefined)
  {
    this.p = this.p ** p;
    this.y = this.y ** p;
    this.r = this.r ** p;
    return;
  }

    this.p = this.p ** (p || 0);
    this.y = this.y ** (y || 0);
    this.r = this.r ** (r || 0);
}

/**
 * Mods a value, an array or another angle object to this angle instance.
 *
 * @param  {Number|Array|Angle} p The pitch amount
 * @param  {Number} y The yaw amount
 * @param  {Number} r The roll amount
 * @return {Angle}   The final angle.
 */
Angle.prototype.mod = function(p, y, r)
{
  if (p instanceof Array)
  {
      this.p = this.p % (p[0] || 0);
      this.y = this.y % (p[1] || 0);
      this.r = this.r % (p[2] || 0);
      return;
  }

  if (p instanceof Angle)
  {
    this.p = this.p % (p.p || 0);
    this.y = this.y % (p.y || 0);
    this.r = this.r % (p.r || 0);
    return;
  }

  if (p != undefined && y == undefined && r == undefined)
  {
    this.p = this.p % p;
    this.y = this.y % p;
    this.r = this.r % p;
    return;
  }

    this.p = this.p % (p || 0);
    this.y = this.y % (y || 0);
    this.r = this.r % (r || 0);
}

/**
 * Inverts your angle object
 *
 * @return {void}
 */
Angle.prototype.negative = function()
{
  this.p = -this.p;
  this.y = -this.y;
  this.r = -this.r;
}

/**
 * Rounds your angle object's values to the nearest digit.
 *
 * @return {void}
 */
Angle.prototype.round = function()
{
  this.p = Math.round(this.p);
  this.y = Math.round(this.y);
  this.r = Math.round(this.r);
}

//Vector


/**
 * @constructor Vector
 *
 * @param  {Number|Array} x The X value
 * @param  {Number} y The Y value
 * @param  {Number} z The Z value
 * @return {void}
 */
function Vector(x, y, z)
{
  if (x instanceof Array)
  {
    this.x = x[0] || 0;
    this.y = x[1] || 0;
    this.z = x[2] || 0;
    return;
  }

  this.x = x || 0;
  this.y = y || 0;
  this.z = z || 0;
}


/**
 * Overrides the values of a vector object.
 *
 * @param  {Number|Array} p New X
 * @param  {Number} y New Y
 * @param  {Number} r New Z
 * @return {void}
 */
Vector.prototype.set = function(x, y, z)
{
  if (x instanceof Array)
  {
    this.x = x[0] || 0;
    this.y = x[1] || 0;
    this.z = x[2] || 0;
    return;
  }

  this.x = x || 0;
  this.y = y || 0;
  this.z = z || 0;
}


/**
 * Adds an offset to your vector
 *
 * @param  {Number|Array} p X offset
 * @param  {Number} y Y offset
 * @param  {Number} r Z offset
 * @return {void}
 */
Vector.prototype.offset = function(x, y, z)
{
  if (x instanceof Array)
  {
    this.x = this.x + (x[0] || 0);
    this.y = this.y + (x[1] || 0);
    this.z = this.z + (x[2] || 0);
    return;
  }

  this.x = this.x + (x || 0);
  this.y = this.y + (y || 0);
  this.z = this.z + (z || 0);
}


/**
 * Creates a new Vector instance from already existing angle object.
 *
 * @return {Vector}  The original vector object.
 */
Vector.prototype.copy = function()
{
  return new Vector(
    this.x,
    this.y,
    this.z
  );
}


/**
 * Creates a new Vector instance from already existing vector object with an offset.
 *
 * @param  {Number|Array} p X offset
 * @param  {Number} y Y offset
 * @param  {Number} r Z offset
 * @return {Vector}   The new vector object.
 */
Vector.prototype.copy_offset = function(x, y, z)
{
  if (x instanceof Array)
  {
    return new Vector(
      this.x + (x[0] || 0),
      this.y + (x[1] || 0),
      this.z + (x[2] || 0)
    );
  }

  return new Vector(
    this.x + (x || 0),
    this.y + (y || 0),
    this.z + (z || 0)
  );
}


/**
 * Returns the vector object into an array.
 *
 * @return {Array}  The vector's array.
 */
Vector.prototype.to_array = function()
{
  return [this.x, this.y, this.z];
}


/**
 * Set all values to 0
 *
 * @return {void}
 */
Vector.prototype.zero = function()
{
  this.x = 0;
  this.y = 0;
  this.z = 0;
}


/**
 * Converts the vector object into an string.
 *
 * @return {String}  The converted string.
 */
Vector.prototype.toString = function()
{
  return this.x + ", " + this.y + ", " + this.z;
}


/**
 * Adds a value, an array or another vector object to this vector instance.
 *
 * @param  {Number|Array|Vector} x The X amount
 * @param  {Number} y The Y amount
 * @param  {Number} z The Z amount
 * @return {Vector}   The final vector.
 */
Vector.prototype.add = function(x, y, z)
{
  if (x instanceof Array)
  {
      this.x = this.x + (x[0] || 0);
      this.y = this.y + (x[1] || 0);
      this.z = this.z + (x[2] || 0);
      return;
  }

  if (x instanceof Vector)
  {
    this.x = this.x + (x.x || 0);
    this.y = this.y + (x.y || 0);
    this.z = this.z + (x.z || 0);
    return;
  }

  if (x != undefined && y == undefined && z == undefined)
  {
    this.x = this.x + x;
    this.y = this.y + x;
    this.z = this.z + x;
    return;
  }

    this.x = this.x + (x || 0);
    this.y = this.y + (y || 0);
    this.z = this.z + (z || 0);
}

/**
 * Subtract a value, an array or another vector object to this vector instance.
 *
 * @param  {Number|Array|Vector} x The X amount
 * @param  {Number} y The Y amount
 * @param  {Number} z The Z amount
 * @return {Vector}   The final vector.
 */
Vector.prototype.sub = function(x, y, z)
{
  if (x instanceof Array)
  {
      this.x = this.x - (x[0] || 0);
      this.y = this.y - (x[1] || 0);
      this.z = this.z - (x[2] || 0);
      return;
  }

  if (x instanceof Vector)
  {
    this.x = this.x - (x.x || 0);
    this.y = this.y - (x.y || 0);
    this.z = this.z - (x.z || 0);
    return;
  }

  if (x != undefined && y == undefined && z == undefined)
  {
    this.x = this.x - x;
    this.y = this.y - x;
    this.z = this.z - x;
    return;
  }

    this.x = this.x - (x || 0);
    this.y = this.y - (y || 0);
    this.z = this.z - (z || 0);
}

/**
 * Multiplies a value, an array or another vector object to this vector instance.
 *
 * @param  {Number|Array|Vector} x The X amount
 * @param  {Number} y The Y amount
 * @param  {Number} z The Z amount
 * @return {Vector}   The final vector.
 */
Vector.prototype.multiply = function(x, y, z)
{
  if (x instanceof Array)
  {
      this.x = this.x * (x[0] || 0);
      this.y = this.y * (x[1] || 0);
      this.z = this.z * (x[2] || 0);
      return;
  }

  if (x instanceof Vector)
  {
    this.x = this.x * (x.x || 0);
    this.y = this.y * (x.y || 0);
    this.z = this.z * (x.z || 0);
    return;
  }

  if (x != undefined && y == undefined && z == undefined)
  {
    this.x = this.x * x;
    this.y = this.y * x;
    this.z = this.z * x;
    return;
  }

    this.x = this.x * (x || 0);
    this.y = this.y * (y || 0);
    this.z = this.z * (z || 0);
}

/**
 * Divides a value, an array or another vector object to this vector instance.
 *
 * @param  {Number|Array|Vector} x The X amount
 * @param  {Number} y The Y amount
 * @param  {Number} z The Z amount
 * @return {Vector}   The final vector.
 */
Vector.prototype.divide = function(x, y, z)
{
  if (x instanceof Array)
  {
      this.x = this.x / (x[0] || 0);
      this.y = this.y / (x[1] || 0);
      this.z = this.z / (x[2] || 0);
      return;
  }

  if (x instanceof Vector)
  {
    this.x = this.x / (x.x || 0);
    this.y = this.y / (x.y || 0);
    this.z = this.z / (x.z || 0);
    return;
  }

  if (x != undefined && y == undefined && z == undefined)
  {
    this.x = this.x / x;
    this.y = this.y / x;
    this.z = this.z / x;
    return;
  }


    this.x = this.x / (x || 0);
    this.y = this.y / (y || 0);
    this.z = this.z / (z || 0);
}

/**
 * Powers a value, an array or another vector object to this vector instance.
 *
 * @param  {Number|Array|Vector} x The X amount
 * @param  {Number} y The Y amount
 * @param  {Number} z The Z amount
 * @return {Vector}   The final vector.
 */
Vector.prototype.pow = function(x, y, z)
{

  if (x instanceof Array)
  {
      this.x = this.x ** (x[0] || 0);
      this.y = this.y ** (x[1] || 0);
      this.z = this.z ** (x[2] || 0);
      return;
  }

  if (x instanceof Vector)
  {
    this.x = this.x ** (x.x || 0);
    this.y = this.y ** (x.y || 0);
    this.z = this.z ** (x.z || 0);
    return;
  }

  if (x != undefined && y == undefined && z == undefined)
  {
    this.x = this.x ** x;
    this.y = this.y ** x;
    this.z = this.z ** x;
    return;
  }

    this.x = this.x ** (x || 0);
    this.y = this.y ** (y || 0);
    this.z = this.z ** (z || 0);
}

/**
 * Mods a value, an array or another vector object to this vector instance.
 *
 * @param  {Number|Array|Vector} x The X amount
 * @param  {Number} y The Y amount
 * @param  {Number} z The Z amount
 * @return {Vector}   The final vector.
 */
Vector.prototype.mod = function(x, y, z)
{
  if (x instanceof Array)
  {
      this.x = this.x % (x[0] || 0);
      this.y = this.y % (x[1] || 0);
      this.z = this.z % (x[2] || 0);
      return;
  }

  if (x instanceof Vector)
  {
    this.x = this.x % (x.x || 0);
    this.y = this.y % (x.y || 0);
    this.z = this.z % (x.z || 0);
    return;
  }

  if (x != undefined && y == undefined && z == undefined)
  {
    this.x = this.x % x;
    this.y = this.y % x;
    this.z = this.z % x;
    return;
  }

    this.x = this.x % (x || 0);
    this.y = this.y % (y || 0);
    this.z = this.z % (z || 0);
}

/**
 * Inverts your vector object
 *
 * @return {void}
 */
Vector.prototype.negative = function()
{
  this.x = -this.x;
  this.y = -this.y;
  this.z = -this.z;
}

/**
 * Rounds your vector object's values to the nearest digit.
 *
 * @return {void}
 */
Vector.prototype.round = function()
{
  this.x = Math.round(this.x);
  this.y = Math.round(this.y);
  this.z = Math.round(this.z);
}


/**
 * Returns the 2D length of this vector
 *
 * @return {Number}  The 2d Length
 */
Vector.prototype.length2d = function()
{
  return Math.sqrt(this.x ** 2 + this.y ** 2);
}


/**
 * Returns the 3D length of this vector
 *
 * @return {Number}  The 3d length
 */
Vector.prototype.length = function()
{
  return Math.sqrt(this.x ** 2 + this.y ** 2 + this.z ** 2);
}


/**
 * Calculates the dot product of this vector.
 *
 * @param  {Vector} vec
 * @return {Number}     The dot product
 */
Vector.prototype.dot_product = function(vec)
{
  return (this.x * vec.x) + (this.y * vec.y) + (this.z * vec.z);
}


/**
 * Calculates the cross product of this vector.
 *
 * @param  {Vector} vec
 * @return {Vector}     The cross product
 */
Vector.prototype.cross_product = function(vec)
{
  return new Vector(
    (this.y * vec.z) - (this.z * vec.y),
    (this.z * vec.x) - (this.x * vec.z),
    (this.x * vec.y) - (this.y * vec.x)
  );
}


/**
 * Calculates the 2D distance from this vector to another vector.
 *
 * @param  {Vector} dst The destination
 * @return {Number}     The 2d distance
 */
Vector.prototype.distance2d = function(dst)
{
  dst.sub(this);
  return dst.length2d();
}


/**
 * Calculates the 3D distance from this vector to another vector.
 *
 * @param  {Vector} dst The destination
 * @return {Number}     The 3d distance
 */
Vector.prototype.distance = function(dst)
{
  dst.sub(this);
  return dst.length();
}


/**
 * Normalizes this vector.
 * This is NOT the same as Angle#Normalize
 *
 * @return {void}
 */
Vector.prototype.normalize = function()
{
  const length = this.length();

  if (length === 0)
  {
    this.x = 0;
    this.y = 0;
    this.z = 1;
    return;
  }

  this.x = this.x / length;
  this.y = this.y / length;
  this.z = this.z / length;
}


/**
 * Maps this vector into your screen and returns its 2D position.
 *
 * @return {Vector}  The mapped 2d vector
 */
Vector.prototype.world_to_screen = function()
{
  const screen = Render.WorldToScreen(this.to_array());

  if (!screen)
    return null;

  return new Vector(screen[0], screen[1], 0);
}


/**
 * Calculates the magnitude of the vector
 * Returns the speed if done in a velocity vector.
 *
 * @return {Number}  The magnitude
 */
Vector.prototype.magnitude = function()
{
  this.pow(2)
  return Math.sqrt(this.x + this.y + this.z);
}


/**
 * Calculates the angle from this vector to another.
 *
 * @param  {Vector} dst The destination vector
 * @return {Angle}     The calculated angles.
 */
Vector.prototype.angle_to = function(dst)
{
  dst.sub(this);

  const yaw = radian_to_degree(Math.atan2(dst.y, dst.x));
  const pitch = radian_to_degree(Math.atan2(-dst.z, Math.sqrt(dst.x ** 2 + dst.y ** 2)));

  return new Angle(pitch, yaw, 0);
}


/**
 * Lerps a vector by a specific fraction.
 *
 * @param  {Vector} dst      The destination vector.
 * @param  {Number} fraction The desired fraction.
 * @return {void}
 */
Vector.prototype.lerp = function(dst, fraction)
{
  dst.sub(this);
  dst.multiply(fraction);
  this.add(dst);
}


/**
 * Traces a line from this vector to another.
 *
 * @param  {Number|EntityID} eid The mask ID.
 * @param  {Vector} dst The destination vector.
 * @return {Array}     The trace info.
 */
Vector.prototype.trace_line = function(eid, dst)
{
  return Trace.Line(eid, this.to_array(), dst.to_array());
}

/**
 * Traces a bullet from this vector to another.
 *
 * @param  {Number|EntityID} eid The mask ID.
 * @param  {Number|EntityID} target The target ID.
 * @param  {Vector} dst The destination vector.
 * @return {Array}     The trace info.
 */
Vector.prototype.trace_bullet = function(eid, target, dst)
{
  return Trace.Bullet(eid, target, this.to_array(), dst.to_array());
}


/**
 * Normalizes this angles to match the Source Engine standards.
 *
 * @return {void}
 */
Angle.prototype.normalize = function()
{
  if (this.x > 89)
      this.x = 89;

  if (this.x < -89)
      this.x = -89;

  while (this.y > 180)
      this.y = this.y - 360;

  while (this.y < -180)
      this.y = this.y + 360;

  this.z = 0;
}


/**
 * Converts this angle into a forward vector.
 *
 * @return {Vector}  The forward vector.
 */
Angle.prototype.to_forward = function()
{
  const sp = Math.sin(degree_to_radian(this.p));
  const cp = Math.cos(degree_to_radian(this.p));
  const sy = Math.sin(degree_to_radian(this.y));
  const cy = Math.cos(degree_to_radian(this.y));

  return new Vector(cp * cy, cp * sy, -sp);
}


/**
 * Converts this angle into a backward vector.
 *
 * @return {Vector}  The backward vector.
 */
Angle.prototype.to_backward = function()
{
  const result = this.to_forward();
  result.negative();

  return result;
}


/**
 * Calculates the FOV from a position to another whilst using this angle.
 *
 * @param  {Vector} from The origin vector.
 * @param  {Vector} to   The destination vector.
 * @return {Number}      The FOV delta.
 */
Angle.prototype.fov_to = function(from, to)
{
  const angles = from.angle_to(to);
  angles.sub(this);

  if (angles.y > 180)
    angles.y = 360 - angles.y;

  return angles.length2d();
}

//endregion
