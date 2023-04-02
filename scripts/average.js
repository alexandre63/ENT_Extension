var ColorNoteActive = true
var AverageActive = true
var StarActive = true
var ColorAverage = true

function ColorWithPoucentageOfSuccess(PoucentageOfSuccess){
    if(PoucentageOfSuccess < 0.33333){//Red To Orange
        PoucentageOfSuccess *= 3
        return "rgba(255, " + PoucentageOfSuccess*127 + ", 0, 1)"
    }
    else if(PoucentageOfSuccess < 0.66666){//Orange To Yellow
        PoucentageOfSuccess *= 1.5
        return "rgba(255, " + PoucentageOfSuccess*255 + ", 0, 1)"
    }
    else {//Yellow To Green
      PoucentageOfSuccess -= 0.66666
        return "rgba(" + Math.abs(PoucentageOfSuccess*765-255) + ", 255, 0, 1)"
    }
}

if(AverageActive){
    let AllAverageElement = document.getElementsByClassName("bulletin-note-eleve")

    var AllClassAverageElement = document.getElementsByClassName("yui-dt0-col-moyenneClasse yui-dt-col-moyenneClasse")
    AllClassAverageElement = Array.from(AllClassAverageElement)
    AllClassAverageElement.shift()

    var AllNumberNoteElement = document.getElementsByClassName("yui-dt0-col-nombreDevoirComptabilises yui-dt-col-nombreDevoirComptabilises yui-dt-sortable")
    AllNumberNoteElement = Array.from(AllNumberNoteElement)
    AllNumberNoteElement.shift()

    var AllAverage = []
    var AllClassAverage = []
    var AllNumberNote = []

    indexRemove = 0
    for(let i = 0; i < AllAverageElement.length; i++){
        if (AllAverageElement[i].innerText.search(",") !== -1) {
            AllAverage[i-indexRemove] = parseFloat(AllAverageElement[i].innerText.replaceAll(",", "."))
        }
        else{
            indexRemove += 1
        }
    }

    indexRemove = 0
    for(let i = 0; i < AllClassAverageElement.length; i++){
        if (AllClassAverageElement[i].innerText.search(",") !== -1) {
            AllClassAverage[i-indexRemove] = parseFloat(AllClassAverageElement[i].firstChild.innerText.replaceAll(",", "."))
        }
        else{
            indexRemove += 1
        }
    }

    for(let i = 0; i < AllNumberNoteElement.length; i++){
        AllNumberNote[i] = parseInt(AllNumberNoteElement[i].firstChild.firstChild.innerText)
    }

    console.log(AllAverage)

    var MainAverage = AllAverage.reduce((partialSum, a) => partialSum + a, 0) / AllAverage.length

    var MainClassAverage = AllClassAverage.reduce((partialSum, a) => partialSum + a, 0) / AllClassAverage.length

    var NumberNote = AllNumberNote.reduce((partialSum, a) => partialSum + a, 0)

    NewRow = '<tr id="yui-recx" class=" yui-dt-even" style="height: 48.38px;"><td headers="yui-dt0-th-matiere " class="yui-dt0-col-matiere yui-dt-col-matiere yui-dt-sortable yui-dt-first" style="width: 150px;"><div class="yui-dt-liner"><div class="bulletin-matiere-ligne"><div class="bulletin-matiere-libelle ellipse fw-700" title="MOYENNE">MOYENNE</div></div></div></td><td headers="yui-dt0-th-yui-dt-col1 yui-dt0-th-moyenneEleve " class="yui-dt0-col-moyenneEleve yui-dt-col-moyenneEleve yui-dt-sortable" style="width: 30px;"><div class="yui-dt-liner bulletin-note bulletin-note-eleve">' + MainAverage.toFixed(2).replaceAll(".", ",") + '</div></td><td headers="yui-dt0-th-yui-dt-col1 yui-dt0-th-nombreDevoirComptabilises " class="yui-dt0-col-nombreDevoirComptabilises yui-dt-col-nombreDevoirComptabilises yui-dt-sortable" style="width: 30px;"><div class="yui-dt-liner bulletin-note"><div class="txt-center">' + NumberNote + '</div></div></td><td headers="yui-dt0-th-yui-dt-col4 yui-dt0-th-moyenneClasse " class="yui-dt0-col-moyenneClasse yui-dt-col-moyenneClasse" style="width: 30px;"><div class="yui-dt-liner bulletin-note">' + MainClassAverage.toFixed(2).replaceAll(".", ",") + '</div></td><td headers="yui-dt0-th-yui-dt-col4 yui-dt0-th-moyenneClasseMin " class="yui-dt0-col-moyenneClasseMin yui-dt-col-moyenneClasseMin" style="width: 30px;"><div class="yui-dt-liner bulletin-note"></div></td><td headers="yui-dt0-th-yui-dt-col4 yui-dt0-th-moyenneClasseMax " class="yui-dt0-col-moyenneClasseMax yui-dt-col-moyenneClasseMax" style="width: 30px;"><div class="yui-dt-liner bulletin-note"></div></td><td headers="yui-dt0-th-notesEleve " class="yui-dt0-col-notesEleve yui-dt-col-notesEleve yui-dt-last"><div class="yui-dt-liner"><div class="list-devoirs-eleve"></div></div></td></tr>'

    AllTable = document.querySelector(".yui-dt-data")

    AllTable.insertAdjacentHTML("beforeend", NewRow)
}

if(ColorNoteActive){

    var AllNoteElement = document.getElementsByClassName("bloc-note-releve d-inbl")

    for(let i = 0; i < AllNoteElement.length; i++){
        if(!Number.isNaN(Number.parseFloat(AllNoteElement[i].firstChild.innerText))){
            PoucentageOfSuccess = Number.parseFloat(AllNoteElement[i].firstChild.innerText.replaceAll(",", ".")) / Number.parseFloat(AllNoteElement[i].lastChild.innerText.replaceAll(",", "."))
            AllNoteElement[i].firstChild.style.cssText += 'background-color:' + ColorWithPoucentageOfSuccess(PoucentageOfSuccess) + ' !important'
        }
    }

}

if(StarActive){
    function DOMtoString(document_root) {
        var html = '',
            node = document_root.firstChild;
        while (node) {
            switch (node.nodeType) {
            case Node.ELEMENT_NODE:
                html += node.outerHTML;
                break;
            case Node.TEXT_NODE:
                html += node.nodeValue;
                break;
            case Node.CDATA_SECTION_NODE:
                html += '<![CDATA[' + node.nodeValue + ']]>';
                break;
            case Node.COMMENT_NODE:
                html += '<!--' + node.nodeValue + '-->';
                break;
            case Node.DOCUMENT_TYPE_NODE:
                // (X)HTML documents are identified by public identifiers
                html += "<!DOCTYPE " + node.name + (node.publicId ? ' PUBLIC "' + node.publicId + '"' : '') + (!node.publicId && node.systemId ? ' SYSTEM' : '') + (node.systemId ? ' "' + node.systemId + '"' : '') + '>\n';
                break;
            }
            node = node.nextSibling;
        }
        return html;
    }

    AllHtmlCode = DOMtoString(document)

    AllHtmlCode.split('\n').forEach(line => {
        if(line.search('valuations",formatter:"releveNotesEleve",metas:{"') != -1){
            JSONAllNote = JSON.parse(line.slice(89, -4))
        }
    });

    JSONAllNote.forEach(element => {
        if(element.note != null){
            if(element.note == element.max){
                //style="position: absolute;top: -10px;right: -7.5px;"
                document.getElementById("resultat-devoir-" + element.idDevoir).style.position = "relative"
                document.getElementById("resultat-devoir-" + element.idDevoir).insertAdjacentHTML("beforeend", '<svg style="position: absolute;top: -9.5px;right: -9.5px; width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg"><path stroke="black" d="M4.7558 15.5L5.9375 10.5122L2 7.1561L7.175 6.7061L9.2 2L11.225 6.725L16.4 7.1561L12.4625 10.5122L13.6442 15.5L9.2 12.8558L4.7558 15.5Z" fill="#FFD600"/></svg>')
            }
            else if(element.note == element.min){
                document.getElementById("resultat-devoir-" + element.idDevoir).style.position = "relative"
                document.getElementById("resultat-devoir-" + element.idDevoir).insertAdjacentHTML("beforeend", '<svg style="position: absolute;top: -9.5px;right: -9.5px; width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg"><path stroke="black" d="M4.7558 15.5L5.9375 10.5122L2 7.1561L7.175 6.7061L9.2 2L11.225 6.725L16.4 7.1561L12.4625 10.5122L13.6442 15.5L9.2 12.8558L4.7558 15.5Z" fill="#FF0000"/></svg>')
            }
        }
    })
}

if(ColorAverage){
    let AllAverageElement = document.getElementsByClassName("yui-dt0-col-moyenneEleve yui-dt-col-moyenneEleve yui-dt-sortable")
    AllAverageElement = Array.from(AllAverageElement)
    AllAverageElement.shift()

    for(let i = 0; i <= AllNumberNoteElement.length; i++){
        if(!Number.isNaN(Number.parseFloat(AllAverageElement[i].firstChild.innerText))){
            PoucentageOfSuccess = Number.parseFloat(AllAverageElement[i].firstChild.innerText.replaceAll(",", ".")) / 20
            console.log(PoucentageOfSuccess)
            AllAverageElement[i].style.cssText += 'background-color:' + ColorWithPoucentageOfSuccess(PoucentageOfSuccess)
        }
    }
}