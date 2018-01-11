import React, { Component } from 'react'
import Link from 'gatsby-link'

class IndexOfCoincidence extends Component {

    constructor() {
        super();
        this.state = {
            paragraph: `IYGMKQHLCYGZTVWFCMXQIQQNBFCAGDCYLYQGKMHUQHEHTZHVSOPSKIZTELMLAUCEFLSLHKCYJBIQTTGBHYUMBZSGXUXHTZHVSCTSGBGOUCRHHAGRIMMGGWTFEGIKXKFRJCRXHZANJCSFXOOAUHGJRXHVEHOWREVVSBVSBASFGOIKMQCAIUFGNBHUUWVWTBWBDXMKMZWOKNMGGIBQFLSLXKHVEHSXMPOGIYGJXBWAVIVETBWBDNLWKMOYIIQSRJSNHYPATVQREHGGFUIAYWELBWBFFLSLHKCYIQLGLMPRXUZAHZANOWSEITWPQNILAMHNIESXWMJRBITAGOHUUMIUNZWGOGIUAIBVIGJGKMLNCJPWBNHUUJVGIMFSKHGLBWBVDASXMPSFUWYJBBMZUWLSGQGZHYUMBZSFIYXLBVUGYGIDBUWGIIRLAMHEQHWAMBWZUIJSFMGFQAIXKWAFUHHWKBCEUWIAOMFGXYRSGGDEENSUHTCEDYXOHZYGXUXAGBFBTOGWLDOEYUFDXCBCHYHAVBOOBYHWEIMFCUCJXVRRHMYUABWZUFMEBBGZUURAGOZRIM`,
            key: "",
            hl: -1,
        }
    }
    componentDidMount() {
        
    }
    changeParagraph() {
        var t = document.getElementById('par').value;
        this.setState((o) => {
            return {
                paragraph: t,
                key: o.key
        }})
    }
    changeKeyLength() {
        var t = document.getElementById('keylen').value;
        var w = this.state.key.slice(0, parseInt(t));
        for (var i = w.length; i < parseInt(t); i++) w += "?";

        this.setState((o) => {
            return {
                paragraph: o.paragraph,
                key: w,
                hl: o.hl,
            }
        })
    }
    changeKey() {
        var t = document.getElementById('keyinput').value;
        this.setState((o) => {
            return {
                paragraph: o.paragraph,
                key: t,
                hl: o.hl,
            }
        })
    }
    getHighlightFocus(i) {
        if (this.state.key.length == 0) return false;
        if ((this.state.hl >= 0) && ((i - this.state.hl) % this.state.key.length == 0)) {
            i = -1;
        }
        i = i % this.state.key.length;
        this.setState((o) => {
            return {
                paragraph: o.paragraph,
                key: o.key,
                hl: i,
            }
        })
        return false;
    }
    shiftKey(delta) {
        if (this.state.key.length == 0) return false;
        if (this.state.hl < 0) return false;
        var c = this.state.key.charAt(this.state.hl % this.state.key.length);
        if (c === '?') c = 'A';
        c = ((c.charCodeAt(0)-65) + 26 + delta)%26 + 65;
        c = String.fromCharCode(c);
        var s = this.state.key;
        s = s.slice(0, this.state.hl) + c + s.slice(this.state.hl+1);
        this.setState((o) => {
            return {
                paragraph: o.paragraph,
                key: s,
                hl: o.hl
            }
        })
    }

    render() {
        var s = this.state.paragraph.toUpperCase();
        var keylen = this.state.key.length;
        var decodedText = [];
        var highlightText = [];
        var ptable = [];
        for (var i = 0; i < 26; i++) {
            ptable.push(0);
        }
        for (var i = 0; i < s.length; i++) {
            var chStyle = {color: 'black'};
            var chDisplay = s[i];

            if (keylen > 0 && this.state.key.charAt(i%keylen) !== '?') {
                var kc = this.state.key.charAt(i%keylen);
                chDisplay = String.fromCharCode(((s[i].charCodeAt(0)-65) - (kc.charCodeAt(0)-65) + 26)%26 + 65);
            }



            if (keylen > 0 && (i%(keylen*2) >= keylen)) {
                chStyle['backgroundColor'] = '#DDD';
            }

            if (keylen > 0 && this.state.hl >= 0 && (i - this.state.hl) % keylen == 0) {
                chStyle['backgroundColor'] = 'gold';
                highlightText.push((<span onClick={this.getHighlightFocus.bind(this, i)} style={chStyle}>{chDisplay}</span>))
                ptable[chDisplay.charCodeAt(0)-65] += 1;
            }
            

            decodedText.push((<span onClick={this.getHighlightFocus.bind(this, i)} style={chStyle}>{chDisplay}</span>))
        }

        var bars = [];
        var IC = 0, sum = 0;
        if (highlightText.length > 0) {
            for (var i = 0; i < 26; i++) sum += ptable[i];
            for (var i = 0; i < 26; i++) IC += (ptable[i] / sum)*(ptable[i] / sum);
            var lrg = Math.max(...ptable);
            for (var i=0;i<26;i++) {
                var mHeight = 50+ptable[i]*20;
                if (lrg*20+50 > 300) mHeight = 50+ptable[i]*20*0.7;
                bars.push((<div style={{display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', borderRight: '2px solid white', borderLeft: '2px solid white', flexGrow: '1', flex: '1 0 0', backgroundColor: 'darkblue', height: mHeight+"px", color: 'white', textAlign: 'center', fontSize: '100%', transition: 'all 0.5s'}}><span>{ptable[i]}</span><div>{String.fromCharCode(i+65)}</div></div>))
            }
        }
    return (    
        <div>
        <h1>Index of Coincidence</h1>
        
        <div style={{display: "flex"}}>
        <div style={{flex: "0 0 50%"}}>Guess Key Length: <input type='number' id='keylen' onChange={this.changeKeyLength.bind(this)}></input></div>
        <div style={{flex: "0 0 50%"}}>Guess Key:
        <input id='keyinput' onChange={this.changeKey.bind(this)} style={{fontFamily: "monospace", fontSize: "150%"}} value={this.state.key}></input></div>
        </div>
        <p></p>
        <div style={{ fontFamily: "monospace", fontSize: "180%", lineHeight: "1.2"}}>
        {decodedText}
        </div>
        <hr></hr>
        {highlightText.length > 0  && (<div>
        <div style={{ zIndex: 15, fontFamily: "monospace", fontSize: "180%", lineHeight: "1.2"}}>
        {highlightText}
        </div>
        <div style={{ zIndex: 1, display: 'flex', height: '300px', backgroundColor: 'white', alignItems: 'flex-end' }}>
        {bars}
        </div>
        <hr></hr>

        <p> Index of Coincidence: {IC.toFixed(5)} 
        <button onClick={this.shiftKey.bind(this, 1)}>Shift Left</button>
        <button onClick={this.shiftKey.bind(this, -1)}>Shift Right</button>
        </p>
        </div>
         )}

       <textarea id='par' style={{width: "100%"}} onChange={this.changeParagraph.bind(this)} value={this.state.paragraph}></textarea>
        <p></p>
        <Link to="/">Go back to the homepage</Link>
        </div>
    )
    }
}
export default IndexOfCoincidence
