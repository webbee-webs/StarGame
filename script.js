const size = 40

var mundo = {
    setBlock: (xy, block) => mundo.mapa[xy] = block,
    getBlock: (xy) => mundo.mapa[xy],
    render: () => {
        for (block in mundo.mapa) {
            mundo.mapa[block].body.style.top = mundo.mapa[block].y + 'px';
            mundo.mapa[block].body.style.left = mundo.mapa[block].x + 'px';
            mundo.mapa[block].body.className= 'block'
            mundo.mapa[block].container.appendChild(mundo.mapa[block].body);
        }
    },
    mapa: {}
}

class player {
    constructor() {
        this.direction = ''
        this.x = 0;
        this.y = 0;
        this.mouseX = 0;
        this.mouseY = 0;
        this.canSetBlockY = true;
        this.canSetBlockX = true;
        this.body = document.getElementById('Player');
        this.controls = () => {
            window.addEventListener('mousemove', (e) => { this.mousemove(e, this.x*size, this.y*size) });
            window.oncontextmenu = () => {
                if (this.canSetBlockX && this.canSetBlockY) {
                    this.ponerBloque(this.mouseX - this.mouseX % size, this.mouseY - this.mouseY % size)
                }
                ; return false;
            }
            window.document.addEventListener('keydown', (event) => {
                if (event.keyCode == 83) {
                    this.direction = 's'
                    if (mundo.mapa[`x${this.x}y${this.y + 1}`] == undefined) {
                        this.y += 1
                    }
                }
                if (event.keyCode == 87) {
                    this.direction = 'n'
                    if (mundo.mapa[`x${this.x}y${this.y -1}`] == undefined) {
                        this.y -= 1
                    }
                    
                }
                if (event.keyCode == 65) {
                    this.direction = 'o'
                    if (mundo.mapa[`x${this.x - 1}y${this.y}`] == undefined) {
                        this.x -= 1
                    }
                    
                }
                if (event.keyCode == 68) {
                    this.direction = 'e'
                    if (mundo.mapa[`x${this.x + 1}y${this.y}`] == undefined) {
                        this.x += 1
                    }
                }
                this.body.style.top = this.y*size + 'px'
                this.body.style.left = this.x*size + 'px'

            }

                , false);
            return true
        }
    }

    ponerBloque(x, y) {
        var mibloque = new bloque(x, y)
        let xy = `x${x/size}y${y/size}`
        mundo.setBlock(xy, mibloque)
        console.log('bloque colocado en ', x/size, y/size)
        mundo.render()
    }

    mousemove(event, x, y) {
        var distanceX = x - event.pageX
        var distanceY = y - event.pageY
        console.log('mouse')
        this.mouseX = event.pageX
        this.mouseY = event.pageY
        if (distanceX < (size*5) && distanceX > -(size*5)) {
            this.canSetBlockX = true;
        } else {
            this.canSetBlockX = false;

        }
        if (distanceY < (size*5) && distanceY > -(size*5)) {
            this.canSetBlockY = true;
        } else {
            this.canSetBlockY = false;

        }

    }
}

class bloque {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.body = document.createElement('span')
        this.container = document.getElementById('container')
    }
    addBlock(xy) {

        console.log(mundo)
    }
}

var miPlayer = new player
miPlayer.controls()

