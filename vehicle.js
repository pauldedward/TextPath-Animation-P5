
//check coding train text challenge video to know how the vehicle class works
//sorry I didn't give a link, just go to youtube and search for coding train :)...booom!

class Vehicle extends p5.Vector {

    constructor(x, y, size) {
        super(random(width), random(height));
        this.target = createVector(x, y);
        this.vel = createVector(0, 0);
        this.acc = createVector(0,0);
        this.mass = 1;
        this.maxSpeed = 15;
        this.maxForce = 1;
        this.r = sqrt(this.mass) * 16;
        this.colour = [random(255), random(255), random(255)];
    }

    behave() {
        this.arrive(this.target);
        this.flee(createVector(mouseX, mouseY));
    }

    arrive(target) {
        let force = p5.Vector.sub(target, this);
        let d = force.mag();
        let speed = this.maxSpeed;
        if(d < 100) {
            speed = map(d, 0, 100, 0, this.maxSpeed);
        }
        force.setMag(speed);
        force.sub(this.vel);
        force.limit(this.maxForce);
        this.applyForce(force)
    }

    seek(target) {
        let force = p5.Vector.sub(target, this);
        force.setMag(this.maxSpeed);
        force.sub(this.vel);
        force.limit(this.maxForce);
        this.applyForce(force)
    }

    flee(target) {
        let force = p5.Vector.sub(target, this);
        let d = force.mag();

        if(d < 50) {
            force.setMag(this.maxSpeed);
            force.mult(-1);
            force.sub(this.vel);
            force.limit(this.maxForce);
            force.mult(5);
            this.applyForce(force)
        }
        
    }

  
    applyForce(force) {
        let f = p5.Vector.div(force,this.mass);
        this.acc.add(f);
      
    }
  
    update() {
  
        this.vel.add(this.acc);
        this.vel.limit(this.maxSpeed);
        this.add(this.vel);
    
        this.acc.set(0,0);
    }

    show() {
        stroke(this.colour[0], this.colour[1], this.colour[2]);
        strokeWeight(strokeValue);
        point(this.x, this.y);
        // image(img, this.x, this.y);
    }
  
}
  
  