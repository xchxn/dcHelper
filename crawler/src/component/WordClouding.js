import WordCloud from 'react-d3-cloud';
import { scaleOrdinal } from 'd3-scale';
import { schemeCategory10, schemePaired } from 'd3-scale-chromatic';
import '../App.css';
import { useCallback,useRef, useEffect } from 'react';
import cloud from 'd3-cloud'
import * as d3 from 'd3';
import { createCanvas } from 'canvas';

function D3WordCloudComponent( { items } ) {
    const wordCloudRef = useRef();
    useEffect(() => {
        const words = items.map(d=>({
            text: d.word,
            size: 10 + Math.random() * 90,
            color: getRandomColor(),
         }));
    
        cloud()
          .size([960, 500])
          .canvas(() => createCanvas(1, 1))
          .words(words)
          .padding(5)
          .rotate(() => Math.floor(Math.random() * 2) * 90)
          .font("Impact")
          .fontSize(d => d.size)
          .on("end", end)
          .start();
      }, [items]);

      function end(words) {
        d3.select("#word-cloud")
            .append("svg")
            .attr("width", 800)
            .attr("height", 500)
            .style("border", "1px solid black")
          .append("g")
            .attr("transform", "translate(" + 500 / 2 + "," + 500 / 2 + ")")
          .selectAll("text")
            .data(words)
          .enter().append("text")
            .style("font-size", function(d) { return d.size + "px"; })
            .style("font-family", "Impact")
            .attr("text-anchor", "middle")
            .attr("transform", function(d) {
              return "translate(" + [d.x, d.y] + ")rotate(" + d.rotate + ")";
            })
            .text(function(d) { return d.text; });
      }
      const getRandomColor = () => {
        const letters = '0123456789ABCDEF';
        let color = '#';
        for (let i = 0; i < 6; i++) {
          color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
      };
    return (
        <div id="word-cloud"></div>
    );
};
export default D3WordCloudComponent;