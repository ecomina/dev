function teste(text) {
    alert(text)
}

function dataFormatada(data) {
    var data = new Date(),
    dia  = data.getDate().toString().padStart(2, '0'),
    mes  = (data.getMonth()+1).toString().padStart(2, '0'), //+1 pois no getMonth Janeiro começa com zero.
    ano  = data.getFullYear();
    return dia+"/"+mes+"/"+ano;
}