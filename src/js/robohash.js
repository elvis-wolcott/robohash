export default class Robohash {

    /* Public API */

    static svg(text) {
        const hash = this._hash(text);
        // reuses hash[0] so that the background color always compliments the foreground
        return this._svgTemplate(this.colors[hash[0]], this.bgColors[hash[0]], hash[2], hash[3], hash[4], hash[5], hash[6]);
    }

    static render(text, $element) {
        $element.innerHTML = this.svg(text)
    }

    static toDataUrl(text) {
        return `data:image/svg+xml;base64,${btoa(this.svg(text))}`;
    }


    /* Private API */
    static _svgTemplate(color, backgroundColor, bodyNr, faceNr, eyesNr, mouthNr, accessoryNr) {
        return this._$svg(this._$robohash(color, backgroundColor, bodyNr, faceNr, eyesNr, mouthNr, accessoryNr));
    }

    static _clippedsvgTemplate(color, backgroundColor, bodyNr, faceNr, eyesNr, mouthNr, accessoryNr) {
        return this._$svg(this._$robohash(color, backgroundColor, bodyNr, faceNr, eyesNr, mouthNr, accessoryNr));
    }

    static _$robohash(color, backgroundColor, bodyNr, faceNr, eyesNr, mouthNr, accessoryNr) {
        return `
            <g style="color:${color}">
                <rect fill="${backgroundColor}" x="0" y="0" width="320" height="320"></rect>
                ${this._$use('body',bodyNr)}
                ${this._$use('face',faceNr)}
                ${this._$use('eyes',eyesNr)}
                ${this._$use('mouth',mouthNr)}
                ${this._$use('accessory',accessoryNr)}
            </g>`
    }

    static _$svg(content) {
        return `
            <svg viewBox="0 0 320 320" width="320" height="320" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/2000/xlink" >
                ${content}
            </svg>`
    }

    static _$use(part, index) {
        return `<use width="320" height="300" transform="translate(0,20)" xlink:href="${location.origin}/dist/robohash.min.svg#${part}-${this._assetIndex(index)}" />`;
    }

    static get colors() {
        return [
            '#ff9800', // orange-500
            '#E53935', // red-600
            '#FDD835', // yellow-600
            '#2745C4', // indigo-500-custom
            '#03a9f4', // light-blue-500
            '#9c27b0', // purple-500
            '#11A387', // teal-500-custom
            '#EA2D75', // pink-400
            '#82C11F', // light-green-500-custom
            '#913C29' // brown-500-custom
        ]
    }

    static get bgColors() {
        return [
            '#58DDB1', // teal-a400-custom
            '#58DDB1', // teal-a400-custom
            '#EB8DFF', // purple-a100-custom
            
            '#FF9E80', // deep-orange-a100
            '#FF8A80', // red-a100
            '#FFD869', // amber-a100-custom
            
            
            '#FF8A80', // red-a100
            '#8c9eff', // indigo-a100
            
            '#FF9E80', // deep-orange-a100
            '#88E9FF', // light-blue-a100
            
            
            
            
            
        ]
    }

    static _assetIndex(index) { index = Number(index) + 1; return index < 10 ? '0' + index : index }

    static _hash(text) {
        return ('' + text
                .split('')
                .map(c => Number(c.charCodeAt(0)) + 3)
                .reduce((a, e) => a * (1 - a) * this.__chaosHash(e), 0.5))
            .split('')
            .reduce((a, e) => e + a, '')
            .substr(4, 10);
    }

    static __chaosHash(number) {
        const k = 3.569956786876;
        let a_n = 1 / number;
        for (let i = 0; i < 100; i++) {
            a_n = (1 - a_n) * a_n * k;
        }
        return a_n;
    }
}