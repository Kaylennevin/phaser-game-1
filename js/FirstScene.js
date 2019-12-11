class FirstScene extends Phaser.Scene {
    player;
    cursors;
    platforms;
    barrier;
    block;
    block2;
    block3;
    stars;
    bomb;
    scoreText;
    score = 0;
    gameOver = false;
    

    constructor(config) {
        super(config);
    }
    preload() {
        this.load.image("background", "assets/png/Background.png");
        this.load.image("ground-1600", "assets/platform-1600.png");
        this.load.image("platform", "assets/platform.png");
        this.load.image("block", "assets/frame-long.png");
        this.load.image("barrier", "assets/PNG/barrier.png");
        this.load.image("star", "assets/png/star.png");
        this.load.image("bomb", "assets/bomb.png");
        this.load.image("player-square", "assets/player-square.png");
        this.load.spritesheet("dude", "assets/dude.png", {
            frameWidth:32,
            frameHeight:48
        });
    }

    create() {
        this.cameras.main.setBounds(0,0,1200,600);
        this.physics.world.setBounds(0,0,1200,600);
        this.add.image(600,300,"background");
        this.player = this.physics.add.sprite(150, 240, "player-square");
        this.player.setCollideWorldBounds(true);
        this.cameras.main.startFollow(this.player,0.05,0.05);
        this.player.jumpCount = 0;
        this.player.body.setVelocityY(0.5,0.5);
        // this.player.setSize(25,40).setOffset(3,8);
        this.cursors = this.input.keyboard.createCursorKeys();

        this.platforms = this.physics.add.staticGroup();
        this.platforms.create(800, 585, "ground-1600");
        this.platforms.create(420, 400, "platform");
        this.platforms.create(335, 450, "platform");
        this.platforms.create(380, 450, "platform");
        this.platforms.create(880, 400, "platform");
        this.platforms.create(835, 400, "platform");
        this.platforms.create(880, 300, "platform");

        this.barrier = this.physics.add.staticGroup();
        this.barrier.create(400, 430, "barrier");
        this.barrier.create(400, 60, "barrier");
        this.barrier.create(900, 330, "barrier");
        this.barrier.create(900, -40, "barrier");
        this.barrier.create(900, 450, "barrier");
        this.barrier.create(900, 450, "barrier");
        
        
        
        

        
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


       


var block = this.physics.add.image(140, 340, 'block')
.setImmovable(true)
.setVelocity(0, 0);


block.body.setAllowGravity(false);

this.tweens.timeline({
    targets: block.body.velocity,
    loop: -1,
    tweens: [
      { x:    100, y: 0, duration: 1000, ease: 'Stepped' },
      { x:    -100, y: 0, duration: 1000, ease: 'Stepped' },
     
      
     
    ]
  });

  


  

  var block2 = this.physics.add.image(750, 225, 'block')
.setImmovable(true)
.setVelocity(0, 0);

block2.body.setAllowGravity(false);

this.tweens.timeline({
    targets: block2.body.velocity,
    loop: -1,
    tweens: [
      { x:    -100, y: 0, duration: 1000, ease: 'Stepped' },
      { x:    100, y: 0, duration: 1000, ease: 'Stepped' },
     
      
     
    ]
  });


  var block3 = this.physics.add.image(1250, 405, 'block')
.setImmovable(true)
.setVelocity(0, 0);

block3.body.setAllowGravity(false);

this.tweens.timeline({
    targets: block3.body.velocity,
    loop: -1,
    tweens: [
      { x:    -100, y: 0, duration: 2000, ease: 'Stepped' },
      { x:    100, y: 0, duration: 2000, ease: 'Stepped' },
     
      
     
    ]
  });

  var block4 = this.physics.add.image(700, 500, 'block')
  .setImmovable(true)
  .setVelocity(0, 0);
  
  block4.body.setAllowGravity(false);
  
  this.tweens.timeline({
      targets: block4.body.velocity,
      loop: -1,
      tweens: [
        { x:    -50, y: 0, duration: 2000, ease: 'Stepped' },
        { x:    50, y: 0, duration: 2000, ease: 'Stepped' },
       
        
       
      ]
    });
  

        

  
      

        this.bombs = this.physics.add.group();
        this.physics.add.collider(this.bombs, [this.bombs, this.platforms, block, block2, block3, block4,]);
        this.physics.add.collider(this.bombs, [block, block2, block3, block4, this.platforms, this.barrier]);
        this.physics.add.collider(this.player, [block,block2,block3,block4,this.barrier]);
        this.physics.add.overlap(this.bombs, this.player, this.endGame, null,this);
        
        this.stars = this.physics.add.group (
            {
                key: "star",
                setXY:  {
                    x: Phaser.Math.Between(0, 600),
                    y: Phaser.Math.Between(0, 300),
                    velocity: (Phaser.Math.Between(-100, 100),5)
                }
            }
        );

  

        this.stars.children.iterate(
            function(child){
                child.setBounceY(Phaser.Math.FloatBetween(0.2,0.8));
                child.setVelocity(Phaser.Math.Between(-100,200),Phaser.Math.Between(100,200));
                child.setCollideWorldBounds(true);
               
           
            });

        


        this.physics.add.collider(this.stars, [this.platforms, block, block2, block3, block4, this.barrier]);
        
        
        this.physics.add.collider(this.player, this.platforms);
        this.physics.add.overlap(this.player, this.stars, this.collectGem, null, this);
        this.scoreText = this.add.text(20,20,"Collect the stars to increase score",
        {
            fontSize: "34px",
            fill: "#000",
            
        }).setScrollFactor(0);

        
       
        
    //     this.anims.create({
    //         key: "left",
    //         frames: this.anims.generateFrameNumbers("dude", {
    //             start:0,
    //             end: 3
    //         }),
    //         frameRate: 10,
    //         repeat: -1
    //     });

    //     this.anims.create({
    //         key: "right",
    //         frames: this.anims.generateFrameNumbers("dude", {
    //             start:5,
    //             end: 8
    //         }),
    //         frameRate: 10,
    //         repeat: -1
    //     });

    //     this.anims.create({
    //         key: "idle",
    //         frames: [{
    //             key: "dude",
    //             frame: 4

    //         }],
    //         frameRate: 10,
    //         repeat: -1
    //     });
    }

    update() {
        if(!this.gameOver) {
        if(this.cursors.left.isDown) {
            this.player.setVelocityX(-300);
            // this.player.anims.play("left", true);

        } else if (this.cursors.right.isDown) {
            this.player.setVelocityX(300);
            // this.player.anims.play("right", true);
        } else {
            this.player.setVelocityX(0);
            // this.player.anims.play("idle", true);
        }
        if(Phaser.Input.Keyboard.JustDown(this.cursors.up) && this.player.jumpCount < 1){
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
        this.score += 1;
        this.makeBomb();
        this.makeBomb();
        this.scoreText.setText("Stars Collected: " +this.score);
        if(this.stars.countActive(true) === 0) {
            this.stars.children.iterate(
                function(child) {
                    child.enableBody(true, Phaser.Math.Between(100,600), Phaser.Math.Between(0, 200), true, true);
                    child.setVelocity(Phaser.Math.Between(-100,200),Phaser.Math.Between(100,200));
                    child.setCollideWorldBounds(true);
                }
            )
            
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
        // this.player.anims.play("turn");
    }


  

    
}

