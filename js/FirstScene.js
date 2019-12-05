class FirstScene extends Phaser.Scene {
    player;
    cursors;
    platforms;
    block;
    gems;
    bomb;
    scoreText;
    score = 0;
    gameOver = false;
    

    constructor(config) {
        super(config);
    }
    preload() {
        this.load.image("hills", "assets/png/Background.png");
        this.load.image("ground-1600", "assets/platform-1600.png");
        this.load.image("platform-100", "assets/platform-100.png");
        this.load.image("block", "assets/moving-platform.png");
        this.load.image("gem", "assets/png/gem3.png");
        this.load.image("bomb", "assets/bomb.png");
        this.load.spritesheet("dude", "assets/dude.png", {
            frameWidth:32,
            frameHeight:48
        });
    }

    create() {
        this.cameras.main.setBounds(0,0,3400,600);
        this.physics.world.setBounds(0,0,3400,600);
        this.add.image(1700,600,"hills");
        this.player = this.physics.add.sprite(100, 450, "dude");
        this.player.setCollideWorldBounds(true);
        this.cameras.main.startFollow(this.player,0.05,0.05);
        this.player.jumpCount = 0;
        this.player.body.setVelocityY(0.5,0.5);
        this.player.setSize(25,40).setOffset(3,8);
        this.cursors = this.input.keyboard.createCursorKeys();

        this.platforms = this.physics.add.staticGroup();
        this.platforms.create(800, 585, "ground-1600");
        this.platforms.create(250, 500, "platform-100");
        this.platforms.create(350, 275, "platform-100");
        this.platforms.create(350, 150, "platform-100");
        this.platforms.create(650, 110, "platform-100");
        this.platforms.create(550, 110, "platform-100");


        // let bwidth = 30;
        // let bheight = 30;
        // let origin = {x:16, y:400};
        // let dest = {x:16, y:50};
        // let line = new Phaser.Curves.Line(origin, dest);
        // this.baddie = scene.add.follower(line, origin.x, origin.y, "baddie")
        // this.baddie.startFollow({
        //     duration: 3000,
        //     repeat: -1,
        //     yoyo: true

        // });



var block = this.physics.add.image(100, 500, 'block')
.setImmovable(true)
.setVelocity(0, 0);

block.body.setAllowGravity(false);

this.tweens.timeline({
    targets: block.body.velocity,
    loop: -1,
    tweens: [
      { x:    0, y: -200, duration: 2000, ease: 'Stepped' },
      { x:    0, y: 200, duration: 2000, ease: 'Stepped' },
     
      
     
    ]
  });

        

  
      

        this.bombs = this.physics.add.group();
        this.physics.add.collider(this.bombs, this.bombs);
        this.physics.add.collider(this.bombs, this.platforms);
        this.physics.add.collider(this.bombs, block);
        this.physics.add.collider(this.player, block);
        this.physics.add.overlap(this.bombs, this.player, this.endGame, null,this);
        
        this.gems = this.physics.add.group (
            {
                key: "gem",
                repeat: 144,
                setXY:  {
                    X: 25,
                    Y: 0,
                    stepX: 15,
                }
            }
        );

        this.gems.children.iterate(
            function(child){
                child.setBounceY(Phaser.Math.FloatBetween(0.4,0.8));
            }
        );

        // this.gems.scale.setTo(25,25);


        this.physics.add.collider(this.gems, this.platforms);
        this.physics.add.collider(this.gems, block);
        
        this.physics.add.collider(this.player, this.platforms);
        this.physics.add.overlap(this.player, this.gems, this.collectGem, null, this);
        this.scoreText = this.add.text(20,20,"Score: 0",
        {
            fontSize: "34px",
            fill: "#000",
            
        }).setScrollFactor(0);

        this.makeBomb();
       
        
        this.anims.create({
            key: "left",
            frames: this.anims.generateFrameNumbers("dude", {
                start:0,
                end: 3
            }),
            frameRate: 10,
            repeat: -1
        });

        this.anims.create({
            key: "right",
            frames: this.anims.generateFrameNumbers("dude", {
                start:5,
                end: 8
            }),
            frameRate: 10,
            repeat: -1
        });

        this.anims.create({
            key: "idle",
            frames: [{
                key: "dude",
                frame: 4

            }],
            frameRate: 10,
            repeat: -1
        });
    }

    update() {
        if(!this.gameOver) {
        if(this.cursors.left.isDown) {
            this.player.setVelocityX(-160);
            this.player.anims.play("left", true);

        } else if (this.cursors.right.isDown) {
            this.player.setVelocityX(160);
            this.player.anims.play("right", true);
        } else {
            this.player.setVelocityX(0);
            this.player.anims.play("idle", true);
        }
        if(Phaser.Input.Keyboard.JustDown(this.cursors.space) && this.player.jumpCount < 1){
            this.player.jumpCount++;
            this.player.setVelocityY(-250);

        }
        if (this.player.body.touching.down) {
            this.player.jumpCount = 0;
        }
        
    }
}
   
    collectGem(player, gem) {
        gem.disableBody(true, true);
        this.score += 17;
        this.scoreText.setText("Score: " +this.score);
        if(this.gems.countActive(true) === 0) {
            this.gems.children.iterate(
                function(child) {
                    child.enableBody(true, child.x, 0, true, true);
                }
            )
            this.makeBomb();
        }
    }

    makeBomb() {
        //let x = (this.player.x < 600) ? Phaser.Math.Between(1200, 3400) : Phaser.Math.Between(0, 1200);
        let x = Phaser.Math.Between(0, 1200);
        let bomb = this.bombs.create(x, 16, "bomb");
        bomb.setBounce(1);
        bomb.setCollideWorldBounds(true);
        bomb.setVelocity(120,5);

    }

    endGame() {
        this.physics.pause();
        this.player.setTint(0xff0000);
        this.player.anims.play("turn");
    }

}

