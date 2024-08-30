var locoScrollAnimation = function()
{
    gsap.registerPlugin(ScrollTrigger);

// Using Locomotive Scroll from Locomotive https://github.com/locomotivemtl/locomotive-scroll

const locoScroll = new LocomotiveScroll({
  el: document.querySelector("#main"),
  smooth: true
});
// each time Locomotive Scroll updates, tell ScrollTrigger to update too (sync positioning)
locoScroll.on("scroll", ScrollTrigger.update);

// tell ScrollTrigger to use these proxy methods for the "#main" element since Locomotive Scroll is hijacking things
ScrollTrigger.scrollerProxy("#main", {
  scrollTop(value) {
    return arguments.length ? locoScroll.scrollTo(value, 0, 0) : locoScroll.scroll.instance.scroll.y;
  }, // we don't have to define a scrollLeft because we're only scrolling vertically.
  getBoundingClientRect() {
    return {top: 0, left: 0, width: window.innerWidth, height: window.innerHeight};
  },
  // LocomotiveScroll handles things completely differently on mobile devices - it doesn't even transform the container at all! So to get the correct behavior and avoid jitters, we should pin things with position: fixed on mobile. We sense it by checking to see if there's a transform applied to the container (the LocomotiveScroll-controlled element).
  pinType: document.querySelector("#main").style.transform ? "transform" : "fixed"
});
// each time the window updates, we should refresh ScrollTrigger and then update LocomotiveScroll. 
ScrollTrigger.addEventListener("refresh", () => locoScroll.update());

// after everything is set up, refresh() ScrollTrigger and update LocomotiveScroll because padding may have been added for pinning, etc.
ScrollTrigger.refresh();

}
var opacityLine = function()
{
    gsap.to(".line",{
        opacity:1   //it is for the bug when i reload then something is view of reload page
    })
}
var timer = function()
{
    gsap.from("#line1-part1",
        {   
        opacity:0,
        onStart:function()
        {
        var counter = document.querySelector("#line1-part1 h5");
        var grow = 0 ;
        setInterval(function()
        {
        if(grow<=100)
        {
        counter.textContent = grow
        grow++
        }
        },15)
        } 
        }
        );
}
var nowanimation = function()
{
    gsap.to("#line3-part2",
        {
           opacity:1,
           animationName:"blinking"
        }
    );
}
var animationLoading = function()
{
opacityLine();
timer();
nowanimation();
var tl = gsap.timeline();
tl.from(".line h1",
{
 y:200,
 duration:1,
 opacity:0,
 delay:0.4,
 stagger:0.2
});
tl.to("#loader",
{   
    delay:0.8,
    opacity:0,
    duration:0.3,
    display:"none",
    onEnd:function()
    {
        window.scrollTo(0,0)
    }
})
tl.from("#page1",
{   
    delay:0,
    opacity:0,
    y:500,
    ease:Power4,
    duration:0.5
})
tl.from(".hero h1",
    {
        y:160,
        opacity:0,
        delay:0.2,
        duration:0.7,
        stagger:0.2,
    }
)
tl.from("#nav-part3 h5",
    { 
        y:-10,
        duration:0.2,
        opacity:0
    })
// tl.from(".hero:nth-child(2)",
//     {
//         opacity:0
//     },"-=1.2"
//)
}
var crsrAnimation = function()
{
    // document.addEventListener("mousemove",
    //     function(positions)
    //     {
    //         gsap.to("#crsr",{
    //            x:positions.x,
    //            y:positions.y
    //         })
    //     }
    // )
    Shery.mouseFollower(
        {
            skey:true,
            ease:"cubic-bezier(0.23,1,0.320,1)",
            duration:0.3,
        }
    );
    Shery.makeMagnet("#nav-part3 h5");
    var video = document.querySelector("#video-container video");
    var videoContainer = document.querySelector("#video-container");
    var flag_image = document.querySelector("#flag");
    var hero3 = document.querySelector("#hero3");
    videoContainer.addEventListener("mouseenter",
        function()
        {
            videoContainer.addEventListener("mousemove",
                function(dets)
                {   
                    gsap.to(".mousefollower",
                        {
                         opacity:0
                        });
                    gsap.to("#video-crsr",
                        {
                           left:dets.x - 570,
                           y:dets.y - 100
                        }
                        );
                }
              );
        }
    );
    videoContainer.addEventListener("mouseleave",
        function()
        {
            gsap.to(".mousefollower",
                {
                  opacity:1  
                }
            );
            gsap.to("#video-crsr",
                {
                    left:"70%",
                    y:"0%"
                }
            );
        }
    );
    var flag = 0 ;
    videoContainer.addEventListener("click",
        function()
        {
            if(flag==0)
            {
                video.play();
                video.style.opacity = 1;
                document.querySelector("#video-crsr").innerHTML = `<i class="ri-pause-mini-fill"></i>`
                gsap.to("#video-crse",{scale:0.5});
                flag=1;
            }
            else
            {
               video.pause();
               video.style.opacity = 0;
               document.querySelector("#video-crsr").innerHTML = `<i class="ri-play-mini-fill"></i>`
               gsap.to("#video-crse",{scale:0.5});
               flag=0;
            }  
        }
    )
    document.addEventListener("mousemove",
        function(dets)
        {
            gsap.to("#flag",
                {
                    x:dets.x,
                    y:dets.y
                }
            )
        }
    )
    hero3.addEventListener("mouseenter",
        function()
        {
            flag_image.style.opacity = 1;
        }
    )
    hero3.addEventListener("mouseleave",
        function()
        {
            flag_image.style.opacity = 0;
        }
    )
}
var sheryAnimations = function()
{
    Shery.imageEffect(".image-div",
    {
            style:5,
            config:{"a":{"value":2,"range":[0,30]},"b":{"value":-0.59,"range":[-1,1]},"zindex":{"value":-9996999,"range":[-9999999,9999999]},"aspect":{"value":1.142852986702759},"ignoreShapeAspect":{"value":true},"shapePosition":{"value":{"x":0,"y":0}},"shapeScale":{"value":{"x":0.5,"y":0.5}},"shapeEdgeSoftness":{"value":0,"range":[0,0.5]},"shapeRadius":{"value":0,"range":[0,2]},"currentScroll":{"value":0},"scrollLerp":{"value":0.07},"gooey":{"value":true},"infiniteGooey":{"value":false},"growSize":{"value":4,"range":[1,15]},"durationOut":{"value":1,"range":[0.1,5]},"durationIn":{"value":1.5,"range":[0.1,5]},"displaceAmount":{"value":0.5},"masker":{"value":false},"maskVal":{"value":1,"range":[1,5]},"scrollType":{"value":0},"geoVertex":{"range":[1,64],"value":1},"noEffectGooey":{"value":true},"onMouse":{"value":1},"noise_speed":{"value":2.29,"range":[0,10]},"metaball":{"value":0.41,"range":[0,2]},"discard_threshold":{"value":0.18,"range":[0,1]},"antialias_threshold":{"value":0.01,"range":[0,0.1]},"noise_height":{"value":0.11,"range":[0,2]},"noise_scale":{"value":17.56,"range":[0,100]}},
            gooey:true
    }
    )
}
var lastAnimation = function()
{
 $(document).ready(function() {
     // Textillate initialization
     $('.lastAnimation').textillate({
         in: { 
         effect: 'fadeIn' ,
         sync : false,
         sequence:true,
         shuffle:false,
         reverse:false,
         delayScale:.5
         },
         out: { 
         effect: 'fadeOut',
         reverse:false,
         sequence:true,
         shuffle:false,
         delayScale:1
         } 
     });
     $('.lastAnimation').hover(
         function() {
             // On mouse enter
             $(this).textillate('in');
             $(this).css('color','transparent');
             $(this).css('font-family','silk serif');
             $(this).css('webkit-text-stroke','1px white');
             $(this).css('font-weight','500');
         },
         function() {
             // On mouse leave
             $(this).textillate('in');
             $(this).css('font-family','plain light')
             $(this).css('color','white')
             $(this).css('opacity','1')
         }
     );
 });
}
locoScrollAnimation();
animationLoading();
crsrAnimation();
sheryAnimations();
lastAnimation();

