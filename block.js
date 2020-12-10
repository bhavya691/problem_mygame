class Block{
    constructor(x,y){
        var options = {
            isStatic: true
        }
        this.body = Bodies.rectangle(x,y,50,100,options);
        this.width = 50;
        this.height = 130;
        this.Visiblity = 100;
        World.add(world,this.body);
    }
    display(){
        var pos = this.body.position;
        var angle = this.body.angle;
        push()
        translate(pos.x,pos.y)
        rotate(angle)
        rectMode(CENTER)
        rect(pos.x , pos.y , this.width , this.height);
        pop()
    }
}