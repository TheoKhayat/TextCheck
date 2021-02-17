import React from 'react';
import { TextArea } from 'semantic-ui-react';
import * as d3 from 'd3';

import mlk from './static/sampleData.js'; // demo data

const margin = { top: 30, right: 30, bottom: 30, left: 30 }, //presets
  width = window.innerWidth,
  height = window.innerHeight*.8;

function cleanText(textIn) {return textIn.toLowerCase().replace(/[^0-9a-z]/gi, ``)}; //helper


class MainViz extends React.Component { // state => render HTML
  state = {
    textAreaContent: '',
    selectedWord: 'the',
    selectedPunc: '.'
  };

  handleTextIn = (e, { value }) => this.setState({ textAreaContent: value }); // used in render()

  render() { // re-renders HTML when state changes
    var selectedWord = this.state.selectedWord,
      textIn = this.state.textAreaContent;
    if (!textIn) {textIn = mlk.slice(0,301)}; // sample
    textIn = textIn.trimEnd().replaceAll('\n', ' ');
    
    var splitTextIn = textIn.split(' '),
      wordCount = splitTextIn.length,
      characterCount = textIn.replaceAll(' ', '').length,
      uniqueWords = new Set(splitTextIn.map(word => cleanText(word))),
      uniqueCount = uniqueWords.size;

    // axis
    var xScale = d3.scaleLinear()
      .domain([0, characterCount])
      .range([margin.left, width - margin.left - margin.right]),
    yScale = d3.scaleLinear()
      .domain([0, wordCount])
      .range([margin.bottom, height - margin.top]);

    // viz meta
    var punctuations = {
        '!': { appearances: [], strName: 'exclaimation' },
        ',': { appearances: [], strName: 'comma' },
        '.': { appearances: [], strName: 'period' },
        '?': { appearances: [], strName: 'question' },
        ';': { appearances: [], strName: 'semi-colon' }
      }, // add any additional interesting punctuations ^here
      wordsVizArray = [],
      wordsCounts = {},
      lastUniqueWord = null,
      lastUniqueWordX = null,
      thisX = 0,
      thisY = 0,
      thisHeight = (height - margin.top - margin.bottom)/wordCount;
    for (let i=0; i<wordCount; i++) { // build viz data from textArea input
      var thisWord = splitTextIn[i];
      var cleanWord = cleanText(thisWord);
      if (cleanWord in wordsCounts) {
        wordsCounts[cleanWord] = wordsCounts[cleanWord] + 1;
      } else {
        wordsCounts[cleanWord] = 1;
        if (Object.keys(wordsCounts).length === uniqueCount) {
          lastUniqueWord = thisWord;
          lastUniqueWordX = thisX;
        };
      };
      var wordLength = thisWord.length,
        thisWidth = xScale(wordLength) - margin.right,
        thisPunctuations = [];
      for (let w=0; w<wordLength; w++) {
        if (thisWord.charAt(w) in punctuations) {
          thisPunctuations.push(thisWord.charAt(w));
        };
      };
      for(let p=0; p<thisPunctuations.length; p++){ // build punctuations
        punctuations[thisPunctuations[p]].appearances.push({
          x: thisX + (thisWidth*((p+1)/thisPunctuations.length)),
          occurance: punctuations[thisPunctuations[p]].appearances.length + 1 // calculates y
        });
      };

      wordsVizArray.push({ // bars data => rectangles
        originalWord: thisWord,
        cleanedWord: cleanWord,
        punctuationsArray: thisPunctuations, // unused as of now
        x: thisX,
        y: thisY,
        width: thisWidth,
        height: thisHeight,
        occurance: wordsCounts[cleanWord]
      });

      thisX = thisX + thisWidth;
      thisY = thisY + thisHeight;
    };

    // main viz
    d3.select('#viz').select('svg').remove();
    var viz = d3.select('#viz')
      .append('svg')
        .attr('width', width)
        .attr('height', height);

    // hover text
    d3.select('#viz').select('div').remove();
    var tooltip = d3.select('#viz')
      .append('div')
      .style('position', 'absolute')
      .style('visibility', 'hidden')
      .style('text-align', 'center')
      .style('font-size', '28px');

    // X & Y Axis
    viz.append('g')
      .call(d3.axisBottom(xScale))
      .attr('transform', `translate(0,${height - margin.bottom})`);
    viz.append('g')
      .call(d3.axisLeft(yScale))
      .attr('transform', `translate(${margin.left},0)`);

    // Key
    viz.append('text') // X
      .html(`X: Characters Used / ${characterCount}`)
        .attr('color', 'black')
        .attr('transform', `translate(${xScale(characterCount * .01)},${yScale(wordCount * .04)})`) // x,y percentiles
        .attr('text-align', 'left');

    viz.append('text') // Y
      .html(`Y: Words Remaining / ${wordCount}`)
        .attr('color', 'black')
        .attr('transform', `translate(${xScale(characterCount * .01)},${yScale(wordCount * .07)})`)
        .attr('text-align', 'left');

    viz.append('path') // triangle key
      .style('stroke', 'black')
      .style('fill', 'red')
      .attr('d', d3.symbol()
        .type(d3.symbolTriangle)
        .size(230))
          .attr('transform', `translate(${xScale(characterCount * .015)},${yScale(wordCount * .1)})rotate(180)`);

    viz.append('text') // unique marker key text
      .html(`"${lastUniqueWord}" ~ last of ${uniqueCount} unique words used`)
        .attr('color', 'black')
        .attr('transform', `translate(${xScale(characterCount * .025)},${yScale(wordCount * .115)})`)
        .attr('text-align', 'center');

    viz.append('path') // plotted triangle
      .style('stroke', 'black')
      .style('fill', 'red')
      .attr('d', d3.symbol()
        .type(d3.symbolTriangle)
        .size(230))
          .attr('transform', `translate(${lastUniqueWordX + margin.left},${yScale(wordCount * .99)})rotate(180)`);

    // Bars
    viz.selectAll('rect')
      .data(wordsVizArray)
      .enter().append('rect')
        .attr('class', d => `WORD_${d.cleanedWord}`)
        .attr('width', d => d.width)
        .attr('height', d => d.height)
        .attr('x', d => d.x + margin.left)
        .attr('y', d => height - d.y - margin.bottom - wordsVizArray[0].height)
        .attr('fill', d => d.cleanedWord === selectedWord ? 'red' : 'blue')
        .on('click', (event, d) => {
          this.setState({selectedWord: d.cleanedWord});
        })
        .on('mouseover', function(event, d) {
          d3.select(this).style('cursor', 'pointer');
          d3.selectAll(`.WORD_${d.cleanedWord}`).classed('hovered', true);
          tooltip.style('visibility', 'visible');
        })
        .on('mousemove', (event, d) => {
          tooltip.html(`${d.occurance} / ${wordsCounts[d.cleanedWord]} uses of "${d.cleanedWord}"`)
            .style('left', `${event.pageX + 5}px`)     
            .style('top', `${event.pageY + 10}px`);
        })
        .on('mouseout', (event, d) => {
          tooltip.style('visibility', 'hidden');
          d3.selectAll(`.WORD_${d.cleanedWord}`).classed('hovered', false);
        });

    //punctuations
    var foundPunctuations = Object.keys(punctuations).filter(p => punctuations[p].appearances.length > 0);
    for(let p=0; p<foundPunctuations.length; p++) {
      let thisPunc = foundPunctuations[p],
        thisPuncStrName = punctuations[thisPunc].strName,
        thisPuncAppearances = punctuations[thisPunc].appearances,
        countThisPunc = thisPuncAppearances.length;
      viz.selectAll('punctuations')
        .data(thisPuncAppearances)
        .enter().append('text')
        .attr('class', d => `PUNC_ PUNC_${thisPuncStrName}`)
        .attr('transform', d => `translate(${d.x + margin.left},${yScale(wordCount*(1 - (d.occurance/countThisPunc)))})`) // y reversed high-low
        .attr('font-size', '80px')
        .html(thisPunc)
          .classed('punc-hovered', thisPunc === this.state.selectedPunc)
        .on('click', (event, d) => {
          this.setState({selectedPunc: thisPunc});
        })
        .on('mouseover', function(event, d) {
          d3.select(this).style('cursor', 'pointer');
          d3.selectAll('.PUNC_')
            .classed('punc-hovered', false); // clear all shadows
          d3.selectAll(`.PUNC_${thisPuncStrName}`)
            .classed('punc-hovered', true); // add shadows to hovered          
          tooltip.html(`${d.occurance} / ${countThisPunc} uses of "${thisPunc}"`)
            .style('visibility', 'visible');
        })
        .on('mousemove', (event) => {
          tooltip
            .style('left', `${event.pageX + 12}px`)
            .style('top', `${event.pageY}px`);
        })
        .on('mouseout', (event, d) => {
          tooltip.style('visibility', 'hidden');
          d3.selectAll('.PUNC_')
            .classed('punc-hovered', false);
          d3.selectAll(`.PUNC_${punctuations[this.state.selectedPunc].strName}`)
            .classed('punc-hovered', true);
        });
    };

    // wordCount
    d3.select('#wordCount').select('ol').remove(); // clear existing
    var textSize = d3.scaleLog()
      .domain([1, Math.max(...Object.values(wordsCounts))])
      .range([20, 90]);
    d3.select('#wordCount')
      .append('ol')
        .style('list-style-type', 'none')
      .selectAll('li')
      .data(Object.keys(wordsCounts).sort(function(a, b){
        if(wordsCounts[a] === wordsCounts[b]) return 0;
        if(wordsCounts[a] < wordsCounts[b]) return 1;
        return -1;
      }))
      .enter().append('li')
      .attr('class', d => `WORD_${d}`)
      .text(d=>d)
        .style('font-size', d => `${textSize(wordsCounts[d])}px`)
        .style('color', d => `${d === this.state.selectedWord ? 'red' : 'blue'}`) // if seleced / hovered
      .on('click', (event, d) => {
        this.setState({selectedWord: d});
      })
      .on('mouseover', function(event, d) {
        d3.select(this).style('cursor', 'pointer');
        d3.selectAll(`.WORD_${d}`)
          .classed('hovered', true);
        tooltip.html(`"${d}" used ${wordsCounts[d]} time${wordsCounts[d] > 1 ? 's' : ''}`)
          .style('visibility', 'visible');
      })
      .on('mousemove', (event) => {
          tooltip
            .style('left', `${event.pageX + 12}px`)
            .style('top', `${event.pageY}px`);
        })
      .on('mouseout', (event, d) => {
        tooltip.style('visibility', 'hidden');
        d3.selectAll(`.WORD_${d}`)
          .classed('hovered', false);
      });

    return (<TextArea
      placeholder={'BEGIN DRAFTING HERE! (currently using default MLK speech) === ' + textIn}
      onChange={this.handleTextIn} />);
  };
};

export default MainViz;