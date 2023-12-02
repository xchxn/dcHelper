import { render } from 'react-dom';
import WordCloud from 'react-d3-cloud';
import { scaleOrdinal } from 'd3-scale';
import { schemeCategory10 } from 'd3-scale-chromatic';
import '../App.css';
import axios from 'axios';
import { useState, useEffect,useCallback } from 'react';

function WordClouding( { items } ) {
    const data = items.map(item => ({ text: item.word, value: item.trendPoint }));
    
    const fontSize = useCallback((word) => Math.log2(word.value) * 5, []);
    const rotate = useCallback((word) => word.value * 5, []);
    const fill = useCallback((d, i) => scaleOrdinal(schemeCategory10)(i), []);
    const onWordClick = useCallback((word) => {
        //단어 클릭시 해당 단어 컴색 쿼리
        console.log(`onWordClick: ${word}`);
    }, []);
    const onWordMouseOver = useCallback((word) => {
        //마우스올리면 확대
        console.log(`onWordMouseOver: ${word}`);
    }, []);
    const onWordMouseOut = useCallback((word) => {
        //커서가 단어를 벗어나면
        console.log(`onWordMouseOut: ${word}`);
    }, []);

    return (
        <div>
            <WordCloud
            data={data}
            width={500}
            height={500}
            font="Times"
            fontStyle="italic"
            fontWeight="bold"
            fontSize={fontSize}
            spiral="rectangular"
            rotate={rotate}
            padding={5}
            random={Math.random}
            fill={fill}
            onWordClick={onWordClick}
            onWordMouseOver={onWordMouseOver}
            onWordMouseOut={onWordMouseOut}
        /></div>
        
    );
}
export default WordClouding;