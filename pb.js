function openCity(evt, cityName) {
    var i, tabcontent, tablinks;
    tabcontent = document.getElementsByClassName("tabcontent");
    for (i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = "none";
    }
    tablinks = document.getElementsByClassName("tablinks");
    for (i = 0; i < tablinks.length; i++) {
        tablinks[i].className = tablinks[i].className.replace(" active", "");
    }
    document.getElementById(cityName).style.display = "block";
    evt.currentTarget.className += " active";
}

var percent = 80;



    var ratio=percent/100;

    var pie=d3.layout.pie()
            .value(function(d){return d})
            .sort(null);

    var w=600,h=600;

    var outerRadius=(w/2)-10;
    var innerRadius=260;


    var color = ['#ececec','green'];

    var arc=d3.svg.arc()
            .innerRadius(innerRadius)
            .outerRadius(outerRadius)
            .startAngle(0)
            .endAngle(Math.PI);


    var arcLine=d3.svg.arc()
            .innerRadius(innerRadius)
            .outerRadius(outerRadius)
            .startAngle(0);

    var svg=d3.select("#chart")
            .append("svg")
            .attr({
                width:w,
                height:h,
                class:'shadow'
            }).append('g')
            .attr({
                transform:'translate('+w/2+','+h/2+')'
            });



    var path=svg.append('path')
            .attr({
                d:arc,
                transform:'rotate(-90)'
            }).attr({
                'stroke-width':"1",
                stroke:"#666666"
            })
            .style({
                fill:color[0]
            });


    var pathForeground=svg.append('path')
            .datum({endAngle:0})
            .attr({
                d:arcLine,
                transform:'rotate(-90)'
            })
            .style({
                fill: function (d,i) {
                    return color[1];
                }
            });


    var middleCount=svg.append('text')
            .datum(0)
            .text(function(d){
                return d;
            })
            .attr({
                class:'middleText',
                'text-anchor':'middle',
                dy:-150,
                dx:5
            })
            .style({
                fill:d3.rgb('black'),
                'font-size':'60px'



            });

    var oldValue=0;
    var arcTween=function(transition, newValue,oldValue) {
        transition.attrTween("d", function (d) {
            var interpolate = d3.interpolate(d.endAngle, ((Math.PI))*(newValue/100));

            var interpolateCount = d3.interpolate(oldValue, newValue);

            return function (t) {
                d.endAngle = interpolate(t);
                middleCount.text(Math.floor(interpolateCount(t))+'%');

                return arcLine(d);
            };
        });
    };


    pathForeground.transition()
            .duration(750)
            .ease('cubic')
            .call(arcTween,percent,oldValue);